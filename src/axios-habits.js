import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://habits-6349a-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;