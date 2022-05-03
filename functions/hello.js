// async를 붙여 비동기로 만들어줘야 정상적으로 동작할 수 있다
exports.handler = async function(event, context) {
  return {
    // statusCode - 정상적인 응답
    statusCode: 200,
    // body - serverlise함수로 응답시켜줄 데이터를 명시한다
    // body에는 문자데이터만 할당이 가능하다
    // 객체데이터를 할당하고싶다면 -> JSON.stringify({})를 이용해서 하나의 객체데이터를 문자데이터로 변환시켜서 할당할 수 있다
    body: JSON.stringify({
      name: 'youngmin',
      age: 85,
      email: 'yym1623@naver.com'
    })
    // serverlise function구축 - 별도의 서버구축없이도 하나의 함수를 만들어서 내부에다가 여러가지 로직을 담아서 처리가 가능하다
    // return키워드를 통해서 대표적으로 statusCode, body라는 속성에 해당 내용을 작성하면 serverlise 함수로 간단한 api를 만들었다 
    // 로컬에서는 동작이 안해서 배포해서 확인한다
  }
}