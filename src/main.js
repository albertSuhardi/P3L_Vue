import Vue from 'vue' 
import App from './App'
import Axios from 'axios' 
import router from './router' 
import qs from 'qs'
import vuetify from './plugins/vuetify'; 

Vue.prototype.$qs = qs;
Vue.prototype.$http = Axios; 
Vue.prototype.$apiUrl = 'http://127.0.0.1:8081/API_REST/index.php/api'; 

Vue.config.productionTip = false 

new Vue({ 
  render: h => h(App), 
  router, 
  vuetify, 
  components: { App } 
}).$mount('#app')