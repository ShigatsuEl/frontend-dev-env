const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: "url-loader",
        options: {
          name: "[name].[ext]?[hash]",
          limit: 10000, // 10Kb
        },
      },
    ],
  },
  /**
   * TODO: 아래 플러그인을 추가해서 번들 결과를 만들어 보세요.
   * 1. BannerPlugin: 결과물에 빌드 시간을 출력하세요.
   * 2. HtmlWebpackPlugin: 동적으로 html 파일을 생성하세요.
   * 3. CleanWebpackPlugin: 빌드 전에 아웃풋 폴더를 깨끗히 정리하세요.
   * 4. MiniCssExtractPlugin: 모듈에서 css 파일을 분리하세요.
   */
  // 기본적으로 plugins는 파일 하나하나 적용하는 loader와 다르게 loader로 번들링된 하나의 결과물 파일에 후처리를 하는 작업을 한다.
  plugins: [
    // BannerPlugin은 결과물에 Build 정보들을 추가할 수 있다.
    new webpack.BannerPlugin({
      banner: `
      Build Date: ${new Date().toLocaleDateString()}
      Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
      Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
    // DefinePlugin은 같은 소소코드를 가진 서로 다른 환경이 있을 때 환경 의존적인 정보를 소스가 아닌 별도로 관리할 수 있도록 도와준다.
    new webpack.DefinePlugin({}),
    // HtmlPlugin은 HTML파일을 후처리하는데 사용한다.
    new HtmlWebpackPlugin({
      template: "./src/index.html", // template 경로 지정
      templateParameters: {
        // template에 주입할 파라미터 변수 지정
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "(배포용)",
      },
    }),
    // CleanWebpackPlugin은 빌드할 때마다 이전 결과물을 제거하는 플러그인이다.
    new CleanWebpackPlugin(),
    // MiniCssExtractPlugin은 번들된 자바스크립트 결과에서 스트일시트 코드만 뽑아서 별도의 CSS 파일로 만드는 역할을 한다.
    // 개발할때는 보통 자바스크립트 파일 하나로 JS와 CSS를 번들하지만 배포용일때는 JS파일과 CSS파일을 분리하는 것이 효율적이다.
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
