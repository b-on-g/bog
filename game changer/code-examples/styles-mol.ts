// $mol — CSS in TypeScript. Fully type-checked.

$mol_style_define( $my_card, {

  display: 'flex',
  flex: {
    direction: 'column',
  },
  background: {
    color: $mol_theme.card,        // auto light/dark theme
  },
  border: {
    radius: $mol_gap.round,
  },
  padding: $mol_gap.block,

  // displya: 'flex',              // ← TypeScript ERROR
  // backgroud: { color: 'white' } // ← TypeScript ERROR
  // collor: 'red'                 // ← TypeScript ERROR

  Title: {
    font: {
      size: '1.25rem',
      weight: 'bold',
    },
    color: $mol_theme.text,        // auto light/dark theme
  },

})
