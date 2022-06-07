module.exports = {
    env: {
        browser: true, // Browser global variables like `window` etc.
        commonjs: true, // CommonJS global variables and CommonJS scoping.Allows require, exports and module.
        es6: true, // Enable all ECMAScript 6 features except for modules.
        jest: true, // Jest global variables like `it` etc.
        node: true // Defines things like process.env when generating through node
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    parser: "babel-eslint", // Uses babel-eslint transforms.
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
    },
    plugins: [
        "import"
    ],
    root: true, // For configuration cascading.
    rules: {
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "react/no-children-prop": "off",
        "no-prototype-builtins": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "eqeqeq": "error",
        "padding-line-between-statements": [
          "error",
          {
            "blankLine": "always",
            "prev": "*",
            "next": "return"
          }
        ],
        "no-sequences": "error",
        "yoda": "error"
    },
    settings: {
        react: {
            version: "detect" // Detect react version
        }
    }
};
