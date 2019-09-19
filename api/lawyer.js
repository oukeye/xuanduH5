import axios from '~/plugins/axios.js';

export function fetchTopicDetail(spId) {

  return axios.get(`/app/activity/topic/detail/h5/${spId}`);
}


