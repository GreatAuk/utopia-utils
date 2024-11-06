import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
}, {
  rules: {
    'n/prefer-global/process': 'off',
  },
})
