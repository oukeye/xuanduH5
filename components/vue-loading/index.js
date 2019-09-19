/**
 * Vue-loading
 * @author Surmon.me
 */

import LoadingComponent from "./loading";
const loading = {
  install: function(Vue) {
    Vue.component('loading-box', LoadingComponent.default || LoadingComponent)
  }
};
export default loading;
