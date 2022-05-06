// import
const path = require('path')
// html-plugin
const HtmlPlugin = require('html-webpack-plugin')
// copy-plugin
const CopyPlugin = require('copy-webpack-plugin')
// dotenv
const Dotenv = require('dotenv-webpack')

// vue
const { VueLoaderPlugin } = require('vue-loader');

// export
module.exports = {
  // 확장자 생략가능
  resolve: {
    extensions: ['.js', '.vue'],
    // 경로 별칭 - 상대경로나 절대경로가 아닌 해당하는 경로별칭이 지칭하는 실제 경로로 바로 점프할수가 있다 
    alias: {
      // 속성부분에는 특수한 기호를 사용할 수 없어서 문자데이터로 만들어서 속성의 키값으로 사용
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    clean: true
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          // css를 사용할 수 있게 해준다
          // 순서 중요 
          // vue-style-loader 오류 -> style-loader로 적용 완료
          // 'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: '@import "~/scss/main";'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        // 사진
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      } 
    ]
  },

  // plugin
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
      ]
    }),
    new VueLoaderPlugin(),
    new Dotenv()
  ],

  devServer: {
    host: 'localhost',
    port: 8079,
    hot: true
  }
} 