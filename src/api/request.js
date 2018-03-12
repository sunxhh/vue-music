import * as config from './config';
import mjsonp from '../common/js/jsonp';
import axios from "axios";
// 处理请求
export function jsonp(url, data, option) {
    return mjsonp(url, data, option).then((res) => {
        if (res.code === config.ERR_OK) {
            return Promise.resolve(res);
        }
        return Promise.reject(res);
    }).catch((res) => {
        return res;
    });
}

export function post(url, data) {
    return axios({
        method: 'post',
        url: url,
        data: Object.assign({}, data)
    }).then((res) => {
        if (res.data.code === config.ERR_OK) {
            return Promise.resolve(res.data);
        }
        return Promise.reject(res);
    }).catch((error) => {
        return error;
    });
}

export function get(url, data) {
    return axios({
        method: 'get',
        url: url,
        params: Object.assign({}, data)
    }).then((res) => {
        if (res.data.code === config.ERR_OK) {
            return Promise.resolve(res.data);
        }
        return Promise.reject(res);
    }).catch((error) => {
        return error;
    });
}
var request = {
    post,
    get,
    jsonp
};

export { request };
