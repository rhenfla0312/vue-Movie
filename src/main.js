import { createApp } from 'vue';
import App from './App';

// router
import router from './routes/'
// store
import store from './store/'
// load
import loadImage from './plugins/loadImage'

// use() - 현재 프로젝트에 플러그인을 연결할 때 사용하는 메소드다
createApp(App).use(router).use(store).use(loadImage).mount('#app');
