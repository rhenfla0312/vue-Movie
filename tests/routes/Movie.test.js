import { shallowMount } from "@vue/test-utils";

import store from '~/store'
import router from '~/routes'
import loadImage from '~/plugins/loadImage'
import Movie from '~/foutes/Movie'

describe('routes/Movie.vue',async () => {
  window.scrollTo = jest.fn()

  router.push('/movie/tt1234567')
  await router.isReady()
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })
  })

  test('최초 접속한 URL의 파라미터를 확인합니다', () => {
    expect(wrapper.vm.$route.params.id).toBe('tt1234567')
  })

  test('지정한 이미지 크기로 URL을 변경합니다', () => {
    const url = 'https://google.com/sample_image_SX300.jpg'
    // toCantain으로 비교할땐 이미지의 전체 주소가 아닌 해당하는 특정 문자열의 숫자만 변경되면 되기때문에 그 부분만 넣어줘도 된다 -> 포함이되어져만 있으면 패스라서다
    // toBe()는 전체를 넣어야한다
    expect(wrapper.vm.requeryDiffSizeImage(url)).toContain('SX700')
    expect(wrapper.vm.requestDiffSizeImage(url, 900)).toContain('SX900')
  })

  test('정상적인 이미지 주소가 아닌 경우 빈 문자를 반환합니다', () => {
    expect(wrapper.vm.requeryDiffSizeImage()).toBe('')
    expect(wrapper.vm.requeryDiffSizeImage('N/A')).toBe('')
  })
})