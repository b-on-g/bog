// CSS Modules — no type safety
import styles from './Card.module.css'
<div className={styles.cadr}> // typo — no error, just broken UI
  <h2 className={styles.title}>Hello</h2>
</div>

// Styled Components — runtime overhead, no type checks on CSS
const Card = styled.div`
  displya: flex;           // typo — no error
  flex-direction: column;
  backgroud: white;        // typo — no error
  border-radius: 8px;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`

// Tailwind — string soup, no IDE autocomplete for custom values
<div className="flex flex-col bg-white rounded-lg 
  shadow-sm hover:shadow-md transition-shadow 
  duration-200 p-4 gap-2 border border-gray-200
  dark:bg-gray-800 dark:border-gray-700
  sm:p-6 md:p-8 lg:flex-row">
  <h2 className="text-lg font-semibold text-gray-900
    dark:text-white leading-tight tracking-tight">
    Hello
  </h2>
</div>
