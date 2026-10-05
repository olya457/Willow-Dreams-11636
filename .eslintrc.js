module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [{ files: ['jest.setup.js'], env: { jest: true } }],
  rules: { 'no-void': ['error', { allowAsStatement: true }] },
};
