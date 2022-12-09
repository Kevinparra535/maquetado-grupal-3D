const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // Punto de entrada
  entry: './src/index.js',

  mode: 'development',

  devtool: 'source-map',

  // Punto de salida
  output: {
    //Esto nos dice en que ruta está nuestro proyecto y asi poderlo utilizar
    path: path.resolve(__dirname, 'dist'),

    // Nombre del archivo que resulta despues de la compilación
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]',
  },

  devServer: {
    compress: true,
    port: 5000,
  },

  resolve: {
    // Identifica que archivos hay dentro del proyecto mediante sus extensiones
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/assets/utils'), //Alias
    },
  },

  module: {
    rules: [
      {
        // Babel Loader
        test: /\.m?js$/, //Revisa los archivos JS y los modulos JS
        exclude: /node_modules/, //Excluye la carpeta node
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // CSS/SCSS Loader
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        //  Loader de imagenes
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

            name: '[name].[contenthash].[ext]',
            // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
            // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria
            // ubuntu-regularhola.woff

            outputPath: './assets/fonts/',
            // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)

            publicPath: '../assets/fonts/',
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

    // Procesamiento de css, para que arme un archivo css separado
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
    }),

    /**
     * Copia la carpeta de imagenes
     * From ⇒ que recurso (archivo o directorio) deseamos copiar al directorio final
     * To ⇒ en que ruta dentro de la carpeta final terminara los recursos
     */
    new CopyPlugin({
      patterns: [
        {
          // Desde donde
          from: path.resolve(__dirname, 'src', 'assets/images'),

          // Hacia donde
          to: 'assets/images',
        },
      ],
    }),
    new Dotenv(), // Variables de entorno
  ],
};
