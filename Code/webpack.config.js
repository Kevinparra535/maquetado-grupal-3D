const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // Punto de entrada
  entry: './src/index.js',

  // Punto de salida
  output: {
    //Esto nos dice en que ruta está nuestro proyecto y asi poderlo utilizar
    path: path.resolve(__dirname, 'dist'),

    // Nombre del archivo que resulta despues de la compilación
    filename: 'main.js',
    assetModuleFilename: 'assets/images/[name][ext][query]',
  },

  resolve: {
    // Identifica que archivos hay dentro del proyecto mediante sus extensiones
    extensions: ['.js'],

    alias: {
      '@utils': path.resolve(__dirname, 'src/assets/utils/'),
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js$/, //Revisa los archivos JS y los modulos JS
        exclude: /node_modules/, //Excluye la carpeta node
        use: {
          loader: 'babel-loader', // Loader de babel
        },
      },
      {
        // CSS/SCSS Loader
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        // Esto es para importar imgs en el codigo tipo react
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        // Loader para fonts
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: false, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
            // Habilita o deshabilita la transformación de archivos en base64.

            mimetype: 'application/font-woff',
            // Especifica el tipo MIME con el que se alineará el archivo.
            // Los MIME Types (Multipurpose Internet Mail Extensions)
            // son la manera standard de mandar contenido a través de la red.

            name: '[name].[ext]',
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
            // ubuntu-regularhola.woff

            outputPath: './assets/fonts/',
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)

            publicPath: './assets/fonts/',
            // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)

            esModule: false,
            // AVISAR EXPLICITAMENTE SI ES UN MODULO
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true, //Hace la insercion de los elementos
      template: './public/index.html',
      filename: './index.html', // Es la transformacion final del template
    }),

    new MiniCssExtractPlugin(),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets/images'),
          to: 'assets/images',
        },
      ],
    }),

    new Dotenv(),

    new CleanWebpackPlugin(),
  ],

  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
