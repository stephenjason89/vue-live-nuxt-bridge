module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        },
        vueFeatures: {
            interpolationAsNonHTML: true,
        },
    },
    extends: [
        '@nuxtjs',
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
        'prettier',
        'plugin:prettier/recommended',
    ],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        'vue/script-setup-uses-vars': 'error',
        'vue/no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_' }],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                },
            },
        ],
        'vue/v-bind-style': ['error', 'shorthand'],
        'vue/v-on-style': ['error', 'shorthand'],
        'vue/v-slot-style': ['error'],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],
        'import/no-named-as-default': 0,
        'vue/multi-word-component-names': 'off',
    },
}
