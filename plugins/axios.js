import axios from 'axios'
import {apiConfig} from '~/api.config'
import Cookies from 'js-cookie'
import {isWeixin} from '~/utils/weixin'
import {getTrackIdFromCookie, isLogin} from "../utils/logic/isLogin";
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8';
const service = axios.create({
  // baseURL: apiConfig.baseUrl,
});

service.defaults.withCredentials = true;

// 拦截器
service.interceptors.request.use(config => {
  if(!config){
    return config;
  }
  if (process.browser) {
    let trackId = Cookies.get("trackId");
    if (trackId) {
      config.headers.trackId = trackId;
    }
    if (isWeixin()) {
      config.headers.channel = 4;
    } else {
      config.headers.channel = 5;
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
      window.$nuxt && window.$nuxt.$router.push({path: '/user/login'});
    }

  }
  return response
}, error => {
  return Promise.reject(error)
});

// Vue.prototype.$axios = axios;

export default service
