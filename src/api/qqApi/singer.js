import { jsonp } from "../request";
import { commonParams, options } from '../config';


// 获取推荐位
export function getSingerList() {
    let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
    let data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    });
    return jsonp(url, data, options);
};
