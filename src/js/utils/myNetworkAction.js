import { browserHistory } from 'react-router';


// export class NetworkAction {

// }

// let networkAction = new NetworkAction();
// export default networkAction;

export default function networkRequest(method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
        body = undefined; // fetch的GET不允许有body，参数只能放在url中
    } else {
        body = body && JSON.stringify(body);
    }

    return fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
        },
        body
    })
        .then((res) => {
            if (res.status === 401) {
                browserHistory.push('/login');
                return Promise.reject('Unauthorized.');
            } else {
                const token = res.headers.get('access-token');
                if (token) {
                    sessionStorage.setItem('access_token', token);
                }
                return res.json();
            }
        });
}

export const get = url => networkRequest('GET', url);
export const post = (url, body) => networkRequest('POST', url, body);
export const put = (url, body) => networkRequest('PUT', url, body);
export const del = (url, body) => networkRequest('DELETE', url, body);