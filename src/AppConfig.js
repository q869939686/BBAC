/**
 * 此文件放一些配置信息
 */

// 是否开发环境
const isDev = process.env.NODE_ENV === 'development';
const BASE_PATH = window.location.origin + window.location.pathname.replace(/\w+\.(html|jsp)/, '');
const AppConfig = {
    isDev: isDev,
    API: isDev? 'local': BASE_PATH,
    STATIC_PATH: isDev ? BASE_PATH + 'src/static/' : BASE_PATH + 'static/'
}

export default AppConfig