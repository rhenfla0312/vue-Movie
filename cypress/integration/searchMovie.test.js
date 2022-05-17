// 시나리오
// 1. 검색(메인) 페이지에 접근하여 영화제목 및 개수를 맞게 입력하고 버튼을 클릭해 영화 목록 30개가 잘 출력되는지
// 2. 영화 목록에서 겨울왕국2 아이템을 클릭한다
// 3. 상세 페이지로 이동해서 정보를 확인한다




describe('영화 검색(겨울왕국2)', () => {
  
  // 1. 검색(메인) 페이지에 접근하여 영화제목 및 개수를 맞게 입력하고 버튼을 클릭해 영화 목록 30개가 잘 출력되는지
  it('검색 페이지로 접근합니다', () => {
    cy.visit('/')
    cy.get('header .nav-link.active').contains('Search')
  })

  // 영화 목록 30개가 잘 출력되는지
  it('영화를 검색합니다', () => {
    // frozen을 입력한다
    cy.get('input.form-control').type('frozen')
    // 개수를 30개를 선택한다
    cy.get('select.form-select:nth-child(2)').select('30')
    // 클릭한다
    cy.get('button.btn').contains('Apply').click()

    // 네트워크 자원을 사용하는거라 기다려야하는데 얼마나 기다려야할지 모르니 wait()메소드를 사용한다
    cy.wait(1000)

    // 검색된 아이템들을 보여준다 -> 검색된 개수 확인
    cy.get('.movie').should('have.length', 30)
  })

  // 2. 영화 목록에서 겨울왕국2 아이템을 클릭한다
  it('겨울왕국2 영화 아이템을 선택합니다', () => {
    // Frozen II 라는 영화제목을 찾아서 클릭한다
    cy.get('.movie .title').contains('Frozen II').click()
  })

  // 3. 상세 페이지로 이동해서 정보를 확인한다
  it('영화 상세 정보를 확인합니다', () => {
    // url() - 현재 접속된 페이지의 url정보를 얻어낸다
    cy.url().should('include', '/movie/tt4520988')
    // 1초 기다린다
    cy.wait(1000)
    // movie navigation으로 이동하는지 확인
    cy.get('header .nav-link.active').contains('Movie')
    // 영화제목을 확인한다
    cy.get('.title').contains('Frozen II')
  })
})