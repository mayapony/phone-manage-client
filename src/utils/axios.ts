import axios from 'axios';
import { IResponse } from '../interface/IResponse';

axios.defaults.timeout = 6000;

axios.defaults.baseURL = 'http://localhost:8080/api';
// axios.defaults.baseURL = 'http://121.5.239.20:8080/api';

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST'): Promise<IResponse> {
  //设置 url params type 的默认值
  return new Promise<IResponse>((resolve, reject) => {
    let promise;
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params,
      });
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params,
      });
    }
    //处理返回
    if (promise) {
      promise
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
