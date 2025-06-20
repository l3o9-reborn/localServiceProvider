/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    // Ignore or soften TypeScript strict rules
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',

    // React-specific warnings
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',

    // Next.js warnings
    '@next/next/no-img-element': 'warn',
  },
};
