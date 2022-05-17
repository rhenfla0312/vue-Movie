// jest - node.js환경에서 동작한다
module.exports = {
  // 확장자 매핑
  moduleFileExtensions: [
    'js',
    'vue'
  ],
  // 별칭 매핑
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1'
  },
  // 일치하는 경로에 있는 모듈을 가져오지 않는다
  modulePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist'
  ],

  // 테스트 환경에서 동작하기위한 URL -> 로컬 URL
  testURL: 'http://localhost',

  // jest -> 테스트할 확장자 지정 -> 변환 모듈을 통해 지정한다
  transform: {
    // vue -> vue-jest로 변환
    '^.+\\.vue$': 'vue-jest',
    // js -> bable-jest로 변환
    '^.+\\.js$': 'babel-jest'
  }
}
