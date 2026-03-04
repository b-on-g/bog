// Giper Baza — the entire "backend"

class $my_user extends $giper_baza_entity.with({
  Name:  $giper_baza_atom_text,
  Email: $giper_baza_atom_text,
  Age:   $giper_baza_atom_bint,
  Photo: $giper_baza_file,
}) {}

// That's it.
// No server. No database. No config. No API endpoints.
// No authentication setup. No hosting bills.
//
// What you get for free:
// - CRDT sync (zero conflicts)
// - Offline-first (works without internet)
// - Real-time sync (open two tabs — they sync)
// - Crypto auth (instant, on first page load)
// - E2E encryption (by default)
// - Access control (deny / read / post / pull / rule)
// - Proof-of-Work spam protection
// - Every change signed by author
