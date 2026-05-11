const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.ts",
    caseSimulator: "./src/caseSimulator.ts",
  },
module: {
  rules: [
    {
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },

    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ],
},

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  output: {
  filename: "[name].bundle.js",
  path: path.resolve(__dirname, "dist"),
  clean: true,
},

  plugins: [
  new HtmlWebpackPlugin({
    template: "src/index.html",
    filename: "index.html",
    chunks: ["main"],
  }),

  new HtmlWebpackPlugin({
    template: "src/caseSimulator.html",
    filename: "caseSimulator.html",
    chunks: ["caseSimulator"],
  }),
],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },

    compress: true,
    port: 9000,
  },
};