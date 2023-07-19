import path from "path";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const isDevelopment = process.env.NODE_ENV !== "production";

const plugins: webpack.WebpackPluginInstance[] = [
  new HTMLWebpackPlugin({
    template: "./public/index.html",
  }),
];
isDevelopment
  ? plugins.push(new ReactRefreshWebpackPlugin())
  : plugins.push(new MiniCssExtractPlugin());

const config: webpack.Configuration = {
  mode: isDevelopment ? "development" : "production",
  devServer: {
    hot: true,
    port: 3000,
  },
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
  },
  plugins,
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [
                isDevelopment && require.resolve("react-refresh/babel"),
              ].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg)$/,
        type: "asset/resource",
      },
    ],
  },
};

export default config;
