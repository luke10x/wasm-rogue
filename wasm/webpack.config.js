import path from "path";
import { fileURLToPath } from "url";
const webPath = path.dirname(fileURLToPath(import.meta.url));
import CopyWebpackPlugin from'copy-webpack-plugin';

const cwd = process.cwd();

export default  {
    entry: './src/index.js',
    output: {
        path: path.resolve(webPath, './dist'),
        filename: 'rogue-bundle.js',
        libraryTarget: 'var',
        library: 'rogue'
    },
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Adds CSS to the DOM by injecting a <style> tag
          'css-loader',   // Interprets @import and url() like import/require() and will resolve them
        ],
      },
         // https://webpack.js.org/loaders/babel-loader/#root
            {
                test: /.m?js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          // from: '/opt/wasm-build',
          from: '/opt/rogue5.4.4',
          to: path.resolve(cwd, 'dist'),
        },
        {
          from: path.resolve(cwd, 'index.html'),
          to: path.resolve(cwd, 'dist'),
        },
      ],
    }),
  ],
    devtool: 'source-map'
}

