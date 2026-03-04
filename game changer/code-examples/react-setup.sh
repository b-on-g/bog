# React project setup in 2025

npx create-vite@latest my-app --template react-ts
cd my-app
npm install

# Now add what you actually need:
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install @mui/material @emotion/react @emotion/styled
npm install axios
npm install react-hook-form yup
npm install react-i18next i18next
npm install -D eslint prettier
npm install -D @typescript-eslint/eslint-plugin
npm install -D @testing-library/react jest

# Configure all of them:
# - vite.config.ts
# - tsconfig.json
# - .eslintrc.cjs
# - .prettierrc
# - jest.config.ts
# ... still not writing actual code
