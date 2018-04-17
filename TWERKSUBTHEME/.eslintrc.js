/**
 * Use AirBnB ES6 linting standards
 *
 * Rule reference: http://eslint.org/docs/rules
 * Individual rule reference: http://eslint.org/docs/rules/NAME-OF-RULE
 */
module.exports = {
  extends: ["eslint:recommended", "airbnb"],
  env: {
    "browser": true,
  },
  rules: {
    no-console: 0,
  },
};
