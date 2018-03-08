import jsonp from './request';
import { commonParams, options } from './config';


// 获取推荐位
export function getRecommend() {
    let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    let data = Object.assign({}, commonParams, {
        platform: "h5",
        uin: 0,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        needNewCode: 1
    });
    return jsonp(url, data, options);
};
