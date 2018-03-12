import { jsonp, request, get, post } from '../request';
import { commonParams, options } from '../config';


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

// 获取推荐列表
export function getRecommendList() {
    let sendData = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        inCharset: "utf8",
        outCharset: "utf - 8",
        notice: 0,
        platform: "yqq",
        needNewCode: 0,
        data: '{"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}'
    };
    return request.get("/api/musicu", sendData).then((res) => {
        return res;
    }).catch((err) => {
        return err;
    });

};
