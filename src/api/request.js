import * as config from './config';
import jsonp from '../common/js/jsonp';

// 处理请求
export default function request(url, data, option) {
    return jsonp(url, data, option).then((res) => {
        if (res.code === config.ERR_OK) {
            return Promise.resolve(res);
        }
        return Promise.reject(res);
    }).catch((res) => {
        return res;
    });
}
