import host from './host.js';
import fetchIntercept from 'fetch-intercept';
import { getToken, removeToken, requestWithToken } from './helper.js'



let options = {
    headers: {
        "Content-Type": "application/json",
        "X-access-token": getToken()
    },
    mode: 'cors'
}

fetchIntercept.register({
    request: function (url, config) {
        url = (url !== `${host}/setup` && url !== `${host}/login`) ? `${url}${requestWithToken()}`: url
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

export const request = (method, path, data) => {
    const params = (data.params) ? `/${data.params}` : '';
    
    options.method = method;
    options.body = (data.body) ? JSON.stringify(data.body): null; 
    
    return fetch(`${host}${path}${params}`, options)
}
