// const config = require("../../../config.json")
import { browserHistory } from 'react-router';
import { getConfig } from "./getConfig"
import {CookieUtil} from "./cookieUtil.js"

/**
 * 这是个用于网络请求的类，只有一个重要的方法：
 * async promiseNetwork(baseData, paramData = {}) {}
 * baseData是外部必须传入的参数，是一个对象，该对象中必须包含url，可选属性为method和contentType（在源码中已备注）。
 * paramData是将要传给后台的数据，默认为空，paramData数据以key-value的形式传入。
 */
export class NetworkAction{
    /**
     * 
     * @param {
     *      url: string (not null)
     *      method: 'GET' | 'POST' (default 'POST')
     *      contentType: 'urlencoded' | 'formdata' | 'json' (default 'urlencode')
     * } baseData // 
     * 
     * @param {} paramData 
     * 
     * @return { Promise }
     */
    async promiseNetwork(baseData , paramData = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const config = getConfig();
                // console.log("config:", config)
                let baseUrl = config.baseUrl; // 先从config文件中拿到统一的baseUrl
                const method = (baseData.method || 'POST').toUpperCase(); // 判断使用get还是post
                const useBody = method === 'POST' || method === 'PUT'; // 判断是否要向后台传数据
                let url = `${baseUrl}` +
                    (baseUrl.endsWith('/') ? '' : '/') +
                    `${baseData.url}`;
                let input; // 将向后台传输的编码后的数据
                let headers = { // 请求数据时的header，很多情况下可写可不写
                    //'Access-Control-Allow-Origin': '*',
                    // "Access-Control-Allow-Credentials": "true",
                    // 'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
                    // 'Access-Control-Allow-Headers': 'x-requested-with, content-type, accept, origin, authorization, x-csrftoken, user-agent, accept-encoding',
                    'Access-Token': "123456"
                };
                if(baseData.contentType) { // 如果外部传了contentType，则依据相应的规则进行编码
                    switch (baseData.contentType) {
                        case 'urlencoded':
                            input = this.urlencodedParam(paramData);
                            headers = Object.assign({}, headers, {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            });
                            break;

                        case 'formdata':
                            input = this.formdataParam(paramData);
                            headers = Object.assign({}, headers, {});
                            break;

                        case 'json':
                            headers = Object.assign(headers, {
                                'Content-Type': 'application/json',
                            });
                            input = this.jsonParam(paramData);
                            break;

                        default:
                            break;
                    }  
                } else {
                    input = this.jsonParam(paramData);
                    console.log("input: " + input);
                    // input = this.urlencodedParam(paramData);
                    headers = Object.assign({}, headers, {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    });
                }
                
                useBody || (url = this.appendQuery(url, input));
                console.log(url, input);
                // input = {"gcSource": "The smelt of fliwers bring back memories."}
                //console.log("header Access-Token: " + headers['Access-Token']);
                // console.log("header Content-Type: " + headers['Content-Type']);
                // console.log("input :" + input);
                //进行网络请求 fetch
                let res = await fetch(url, {
                    method: method,
                    headers: headers,
                    body: input,
                    // body: JSON.stringify(input),
                    // body: JSON.stringify({
                    //     "gcSource": "The smelt of fliwers bring back memories."
                    // }),
                    // body: useBody ? input : null,
                    //credentials: 'include',
                    mode: 'cors'
                })
                // await得到fetch的结果，网络请求完成 
                // 200 <= res.status <= 299 时说明请求是正常的，其他情况则报错。
                if(res.status < 200 || res.status > 299) {
                    throw new Error(res.status + '');
                }
                if(res) {
                    // 把res的内容转为json数据
                    let data = await res.json();
                    // 调用resolve，结束promise，并把数据返回
                    resolve(data);
                } else {
                    resolve(null);
                }
                //console.log(data);
            } catch(error) {
                console.log(error);
                reject(error);
            }
        })
    }

    jsonParam(query) {
        return JSON.stringify(query);
    }

    formdataParam(query) {
        let data = new FormData();
        Object.keys(query).forEach((name) => {
            data.append(name, query[name]);
        })
        return data;
    }

    urlencodedParam(query, scope = '') {
        let key
        let value
        let out = ''
        // console.log("query:", Object.keys(query), "scope:", scope)
        Object.keys(query).forEach((name) => {
            key = scope ? `${scope}[${name}]` : name
            value = query[name]
            console.log("name:", name, "key:", key, "value:", value)
            if (value === undefined) return
            value === null && (value = '')
            if (typeof value === 'object' && !Array.isArray(value)) {
                out += this.urlencodedParam(value, key)
            } else {
                out += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            }
            // console.log("out:",out)
        })
        return scope ? out : out.substr(1)
    }

    appendQuery(link, query) {
        return query ? (link + '&' + query).replace(/[&?]+/, '?') : link
    }
    
    getConfig() {

    }
}

let networkAction = new NetworkAction();
export default networkAction;