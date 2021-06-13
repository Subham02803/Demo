import axios from 'axios';

const instance = axios.create({
    //  baseURL:'http://192.168.0.137:8080/DearBiryaniBackend/neardear/',
    baseURL:'http://localhost:8080/',
    //baseURL:'http://192.168.1.6:8081/neardear/',
    //baseURL: 'http://3.143.226.132:8080/neardear/',
    //baseURL: 'http://139.59.45.107/neardear/',
    //baseURL: 'http://139.59.45.107:8081/neardear',
   //baseURL: 'https://dearbiryani.in/neardear/',
   headers: {'Access-X-Header': 'foobar'}
});
 
export default instance;