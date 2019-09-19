import axios from '~/plugins/axios.js';

export function fetchLawyerList(params) {
  return axios.get(`/api/lawyer/list`,{params});
}

export function createLawyerMessage(params) {
  return axios.post(`/api/lawyer_message/create`,params);
}


