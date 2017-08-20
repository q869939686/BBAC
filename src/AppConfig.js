/**
 * 此文件放一些配置信息
 */

// 是否开发环境(开发和打包代码不同时可灵活应用此变量)
const isDev = process.env.NODE_ENV === 'development';

// proxy设置再package.json.proxy中， proxyMatch会被替换为'空' 并代理到目标源(target)
// eslint-disable-next-line 
const proxyMatch = '/local';

// 工程名
const projectName = '';

// eslint-disable-next-line 
const BASE_URL = window.location.origin + projectName; // const BASE_URL = window.location.origin + window.location.pathname.replace(/(toLogin)|(\w+\.(html|jsp))/, '');

// BASE_URL + proxyMatch
// eslint-disable-next-line 
const DEV_API = 'http://10.203.99.58/QMS';//

const AppConfig = {
    isDev: isDev,
    BASE_URL: BASE_URL,
    API: isDev? BASE_URL + proxyMatch : BASE_URL
}

export default AppConfig