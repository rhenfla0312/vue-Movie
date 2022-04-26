export default {
  // 스토어의 하나의 모듈이 될 수 있게 설정
  namespaced: true,
  
  // state -> data
  // data -> 함수로 만든다 -> 객체데이터는 배열데이터와 동일하게 하나의 참조형 데이터 -> 데이터의 불변성을 유지하기위해 함수로 만들어서 반환을 해줘야 그때그때
  // state라는 속성에서 사용하는 데이터가 고유해질수있다 -> 데이터의 불 변성!! 
  // 화살표 함수안에서는 하나의 객체데이터를 반환할땐 return {} 생략가능 -> 객체데이터를 반환 가능한데 객체데이터는 {}로 시작하니까 ()로 묶어서 반환한다
  state: () => ({
    name: 'YoungMin',
    email: 'yym0312@naver.com',
    phone: '+82-10-1234-5678',
    blog: 'https://youngmin.blog'
    // image: 'C:\Users\yym\Desktop\다운로드.jpg'
  })
}