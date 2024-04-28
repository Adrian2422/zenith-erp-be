module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.dto.ts'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '_'
      }
    ],
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': ["warn", { "allow": ["constructors"] }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'camelcase': 'warn',
    'default-case': 'warn',
    'default-param-last': 'warn',
    'eqeqeq': 'error',
    "no-tabs": 0,
    'no-console': 'warn',
    'no-empty-function': ["warn", { "allow": ["constructors"] }],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-shadow': 'warn',
    'no-unused-expressions': 'warn',
    'prefer-const': 'warn',
    'prefer-destructuring': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    'array-bracket-spacing': [ 'off' ],
    'yoda' : [ 'error', 'never' ],
    'eol-last': [ 'error', 'always' ],
    'no-multi-spaces': 'warn',
    'no-multiple-empty-lines': 'warn',
    'quotes': [ 'error', 'single' ],
    'semi-style': [ 'error', 'last' ],
    'no-extra-semi': 'warn',
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ],
    // disallow non-import statements appearing before import statements
    "import/first": "error",
    // Require a newline after the last import/require in a group
    "import/newline-after-import": "error",
    // Forbid import of modules using absolute paths
    "import/no-absolute-path": "error",
    // disallow AMD require/define
    "import/no-amd": "error",
    // forbid default exports
    "import/no-default-export": "error",
    // Forbid the use of extraneous packages
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "peerDependencies": true,
        "optionalDependencies": false
      }
    ],
    // Forbid mutable exports
    "import/no-mutable-exports": "error",
    // Prevent importing the default as if it were named
    "import/no-named-default": "error",
    // Prohibit named exports
    "import/no-named-export": "off", // we want everything to be a named export
    // Forbid a module from importing itself
    "import/no-self-import": "error",
    // Require modules with a single export to use a default export
    "import/prefer-default-export": "off", // we want everything to be named
    "indent": "off"
  },
};
