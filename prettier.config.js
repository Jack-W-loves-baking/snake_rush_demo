module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  proseWrap: 'always',
  arrowParens: 'avoid',
  importOrder: [
    '^@components/(.*)$',
    '^@utils/(.*)$',
    '^../',
    '^./',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
