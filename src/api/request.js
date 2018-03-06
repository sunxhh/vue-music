import * as config from './config';
import jsonp from '../common/js/jsonp';

export default function request(url, data, option) {
    return jsonp(url, data, option).then((res) => {
        if (res.code === config.ERR_OK) {

        }
        return res;
    }).catch((res) => {
        return res;
    });
}
