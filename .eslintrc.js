// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module'
  },
  env: {
      browser: false,
      node: true
  },
  extends: [
      'plugin:vue/base'
      // '@vue/standard'
  ],
  globals: {},
  rules: {
      'indent': ['error', 4],
      'prefer-promise-reject-errors': 'off',
      'template-curly-spacing': 'off',
      'no-useless-escape': 'off',
      'no-unused-vars': 0,
      'camelcase': 0,
      'semi': ['error', 'always'],
      'space-before-function-paren': ['error', {
          'anonymous': 'never',
          'named': 'never',
          'asyncArrow': 'never'
      }],
      'arrow-parens': 0,
      'generator-star-spacing': 0,
      'no-debugger': 0,
      'vue/no-dupe-keys': 'error',
      'vue/no-parsing-error': 'error',
      'vue/no-shared-component-data': 'error',
      'vue/no-template-key': 'off',
      'vue/require-render-return': 'error',
      'vue/require-valid-default-prop': 'error',
      'vue/return-in-computed-property': 'error',
      'vue/valid-template-root': 'error',
      'vue/valid-v-bind': 'error',
      'vue/valid-v-cloak': 'error',
      'vue/valid-v-else-if': 'error',
      'vue/valid-v-else': 'error',
      'vue/valid-v-for': 'error',
      'vue/valid-v-html': 'error',
      'vue/valid-v-if': 'error',
      'vue/valid-v-model': 0,
      'vue/valid-v-on': 'error',
      'vue/valid-v-once': 'error',
      'vue/valid-v-pre': 'error',
      'vue/valid-v-show': 'error',
      'vue/valid-v-text': 'error',
      'vue/html-end-tags': 'off',
      'vue/no-async-in-computed-properties': 'error',
      'vue/no-confusing-v-for-v-if': 'error',
      'vue/no-duplicate-attributes': 'error',
      'vue/no-textarea-mustache': 'error',
      'vue/order-in-components': [2, {
          'order': [
              'el', ['name', 'parent'],
              'functional',
              'delimiters', ['components', 'directives', 'filters'],
              ['extends', 'mixins'],
              ['model', 'props', 'propsData'],
              ['data', 'computed'],
              ['watch', 'LIFECYCLE_HOOKS'],
              'methods', ['template', 'render', 'renderError']
          ]
      }],
      'vue/require-component-is': 'error',
      'vue/require-prop-types': 'error',
      'vue/require-v-for-key': 'error',
      'vue/attribute-hyphenation': 'warn',
      'vue/html-quotes': 'error',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/name-property-casing': 'error',
      'vue/mustache-interpolation-spacing': 'error',
      'vue/no-multi-spaces': 'error',
      'vue/v-bind-style': 'error',
      'vue/v-on-style': 'error',
      'vue/jsx-uses-vars': 'error'
  }
};
