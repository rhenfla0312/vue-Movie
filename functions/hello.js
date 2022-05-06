// async를 붙여 비동기로 만들어줘야 정상적으로 동작할 수 있다
exports.handler = async function(event, context) {
  return {
    // statusCode - 정상적인 응답
    statusCode: 200,
    // body - serverlise함수로 응답시켜줄 데이터를 명시한다
    body: JSON.stringify({
      name: 'youngmin',
      age: 85,
      email: 'yym1623@naver.com'
    })
  }
}