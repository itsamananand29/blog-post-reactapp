import axios from 'axios';
const instance = axios.create({
    baseURL:'https://blogpost-react.firebaseio.com/'
});
export default instance;