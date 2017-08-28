import host from './host.js';
import fetchIntercept from 'fetch-intercept';
import { getToken, removeToken, queryWithToken } from './helper.js'



let options = {
    headers: {
        "Content-Type": "application/json",
        "X-access-token": getToken()
    },
    mode: 'cors'
}

const unregister = fetchIntercept.register({
    request: function (url, config) {
        url = (url !== `${host}/setup` && url !== `${host}/login`) ? `${url}${queryWithToken()}`: url
        if (getToken() === 'undefined') {
            removeToken();
            location.reload()
        }
        return [url, config];
    },
    response: function (response) {
        if(response.status === 403) {
            removeToken();
            location.replace('/')
        }
        if(response.status !== 200) {
            return Promise.reject(response);
        }
        return Promise.resolve(response.json());
    },
});


export const queryBody = (method, path, data) => {
    options.body = JSON.stringify(data);
    options.method = method;
    return fetch(`${host}${path}`, options)
}

export const queryParams = (method, path, data) => {
    options.method = method;
    options.body = null;
    let url = (data) ? `${host}${path}/${data}`:`${host}${path}`;
    return fetch(url, options)
}

