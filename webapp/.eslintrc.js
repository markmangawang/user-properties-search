module.exports = {
  extends: "airbnb",
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  plugins: ["jest"],
  env: {
    browser: true,
    jest: true
  },
};
