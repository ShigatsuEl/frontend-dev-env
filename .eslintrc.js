// ESLint는 자바스크립트(ES6) 코드를 좀 더 예쁘게 포맷팅하고 문법 검사를 통해 오류가 있는지 확인하는 역할을 한다.
// Prettier는 ESLint보다 좀 더 보기 좋은 포맷팅을 제공하기 때문에 사용한다. 보통 Prettier가 포맷팅을 ESLint가 문법검사 역할을 하게 된다.
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    // eslint-config-prettier는 prettier와 충돌하는 eslint규칙을 끄는 역할을 한다.
    // "eslint-config-prettier",
    // plugin:prettier/recommended는 eslint-config-prettier와 eslitn-plugin-prettier를 같이 사용하기 위한 간편한 설정이다.
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  /* "plugins": [
        // eslint-plugin-prettier는 prettier규칙을 eslint에 추가하여 eslint만 실행하여 prettier까지 실행할 수 있게 해주는 역할을 한다.
        // eslint-plugin-prettier를 사용하기 위해서는 plugins에 prettier를 추가하고 rules에 prettier/prettier를 error로 설정하여 준다.
        "prettier" 
    ], */
  rules: {
    // "prettier/prettier": "error"
  },
};
