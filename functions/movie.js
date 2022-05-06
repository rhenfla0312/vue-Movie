// 영화 검색 요청을 처리하는 api

// axios가져오기 
const axios = require('axios')
// .env
// const OMDB_API_KEY = process.env.OMDB_API_KEY
// 객체 구조분해로 사용
const { OMDB_API_KEY } = process.env

exports.handler = async function(event, context) {

    console.log(event)
    // netlify -> serverlise functions가 요청이되었을때 요청되는 정보들이 문자데이터로 변환되어 body부분으로 가지고 와진다
    // body부분의 데이터가 js 내부에서 사용이 가능해질 수 있도록 JSON.parse()로 객체데이터로 다시 변환하여 가지고 와져야 한다
    // 예제) payload로 객체데이터로 받아서 거기안에 들어있는 각각의 필요한 데이터들을 객체구조분해로 받아와서 사용한다
    const payload = JSON.parse(event.body)
    const { title, type, year, page, id } = payload;
    // const OMDB_API_KEY = '7035c60c';
    const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
    // 다른 파라미터 없이 API KEY만 가져왔을 경우 catch가 아닌 then으로 에러메세지를 받는 예외처리 예제연습
    // const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;
  

    try {
      const { data } = await axios.get(url)
      if (data.Error) {
        return {
          // 잘못된 요청처리에 대한 에러코드
          statusCode: 400,
          // body부분엔 문자데이터만 반환해야한다, 객체데이터나 배열데이터는 제대로 반환이 불가능하다 
          body: data.Error
        }
      }
      return {
        // 정상적인 요청처리에 대한 코드
        statusCode: 200,
        // data - 영화의 정보를 가지고있는 객체데이터 (문자데이터로 변경해서 정상적인 응답이 올 수 있도록 한다)
        body: JSON.stringify(data)
      }
    } catch (error) {
      return {
        // error.response.status의 정보는 axios의 문서에서 확인할 수 있다
        statusCode: error.response.status,
        body: error.message 
      }
    } 


  
}