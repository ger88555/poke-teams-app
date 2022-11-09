module.exports = {
    env: {
        browser: true,
        "react-native/react-native": true,
        es6: true,
        es2021: true,
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    overrides: [
        {
            files: ["*.jsx"],
            rules: {
                "react/prop-types": "off"
            }
        }
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "react",
        "react-native"
    ],
    rules: {
        indent: [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        quotes: [
            "error",
            "double"
        ],
        semi: [
            "error",
            "never"
        ],
        "react-native/no-color-literals": "error",
        "react-native/no-unused-styles": "error",
        "react-native/no-single-element-style-arrays": "error",
    }
}
