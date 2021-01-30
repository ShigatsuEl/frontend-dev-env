const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  // Loader에 해당하는 부분, Loader는 JS외에 모든 파일을 모듈로 바라볼 수 있도록 도와주며 이말은 모든 파일을 모듈로 사용할 수 있게 해준다는 것이다.
  // 현재 Loader에는 CSS와 File에 해당하는 파일을 모듈로 번들링하는 과정이다.
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./dist",
          name: "[name].[ext]?[hash]",
          limit: 10000, //10kb
        },
      },
    ],
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
};
