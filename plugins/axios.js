import axios from 'axios'
// import {apiConfig} from '~/api.config'
import Cookies from 'js-cookie'
// import {getTrackIdFromCookie, isLogin} from "../utils/logic/isLogin";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';
const service = axios.create({
  // baseURL: apiConfig.baseUrl,
});

// const xdebug = '?XDEBUG_SESSION_START=10994';
const xdebug = '';


service.defaults.withCredentials = true;

// 拦截器
service.interceptors.request.use(config => {
  config.url = config.url+xdebug
  if(!config){
    return config;
  }
  if (process.browser) {
    let token = Cookies.get("token");
    if (token) {
      config.headers.token = token;
    }
  } else {
    // console.log('服务器请求接口....中间件处理', config);
  }
  return config;
}, error => {
  return Promise.reject(error)
});

service.interceptors.response.use(response => {
  let data = response.data;
  if (data.respHeader && data.respHeader.needLogin) {
    if (process.browser) {
      Cookies.set('hisUrl', window.location.href);
      // window.$nuxt && window.$nuxt.$router.push({path: '/user/login'});
    }

  }
  return response
}, error => {
  return Promise.reject(error)
});

// Vue.prototype.$axios = axios;

export default service
