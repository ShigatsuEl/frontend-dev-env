const path = require("path");

// module은 ES6에서 제공하는 것이 아닌 Node에서 제공하는 메서드이다.
module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
};
