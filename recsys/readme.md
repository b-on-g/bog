# $bog_recsys

Tiny offline-friendly recommender for $mol/MAM apps. Pure browser TS — no model files, no WASM, no audio feature extraction. Designed for hundreds to low thousands of items per user.

## What it does

- Ranks a `pool` of generic items by cosine similarity to an optional `seed` plus a per-tag reward signal learned from user feedback.
- Mixes in an ε-greedy exploration arm so the user is not stuck in a single neighbourhood.
- Persists per-tag reward weights via `$mol_state_local` under `bog_recsys_<namespace>_rewards`. One instance per "context" — e.g. `vk_my_music` for one user's music feed.

## API

```ts
type $bog_recsys_item = {
	id: string
	embedding?: Float32Array | number[]
	tags?: readonly string[]
}
type $bog_recsys_feedback = 'play' | 'skip' | 'like' | 'dislike'

class $bog_recsys {
	static namespace( next?: string ): string         // @$mol_mem, default 'default'
	static epsilon( next?: number ): number           // @$mol_mem, default 0.15
	static decay( next?: number ): number             // @$mol_mem, default 0.92

	static recommend(
		pool: readonly $bog_recsys_item[],
		opts?: {
			seed?: $bog_recsys_item | null,
			exclude?: ReadonlySet<string> | string[],
			limit?: number,
		},
	): $bog_recsys_item[]

	static feedback( item: $bog_recsys_item, signal: $bog_recsys_feedback ): void
	static rewards(): Record<string, number>          // @$mol_mem (reactive)
	static reset(): void
}
```

## Score formula

For each candidate (when not exploring):

```
score = 0.6 * cosine(seed.embedding, item.embedding)
      + 0.3 * mean(rewards[tag] for tag in item.tags)
      + 0.1 * Math.random()
```

With probability `epsilon()` the recommender ignores score entirely and picks uniformly random items from the filtered pool.

`feedback` updates per-tag reward as `r' = r * decay() + delta`, where `delta` is `+1` for like, `+0.5` for play, `-0.5` for skip, `-1` for dislike. localStorage failures (private mode etc.) are swallowed.

## Usage

```ts
$bog_recsys.namespace( 'vk_my_music' )

const pool: $bog_recsys_item[] = tracks_from_some_source()
const seed = current_track()

const [ next ] = $bog_recsys.recommend( pool, {
	seed,
	exclude: already_played_ids,
} )

// after the user actually listened:
$bog_recsys.feedback( next, 'play' )
```

## Non-goals

- **No WASM, no ANN, no embeddings library.** Plain `Float32Array` cosine in JS beats voy/usearch at this scale.
- **No audio feature extraction.** Embeddings are expected to be precomputed server-side from text (artist + title + genre via sentence-transformers etc.) — that is cheaper and consistently better than Essentia.js / Meyda on audio for this size of catalogue.
- **Not for >2k items per user.** Above that you want server-side ANN, not in-browser brute force.
- **Not a transformer runtime.** transformers.js plus models is 20–100 MB; here the whole module is a couple of hundred lines.
