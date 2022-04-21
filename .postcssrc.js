module.exports = {
  // postcss에서 사용할 autoprefixer라는 플러그인을 함수를 통해 가지고와서 직접적으로 연결해준다
  plugins: [
    require('autoprefixer')
  ]
}