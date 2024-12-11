import api from './api';

export function getUser() {
  return api.get('/user/getUser/');
};


export function listUsers(termo){
  return api.get(`/user/listUsers?termo=${termo}`);
}

export default {
  getUser,
  listUsers
}