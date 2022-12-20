module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-extra-semi": 0,
    "react/jsx-uses-react": 'off',
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 'off',
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
};
