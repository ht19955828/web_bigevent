//注意每次调用$.get() 或者$.ajax() 或$.post()
//会先调用ajaxPREfilter
//在这个函数中,可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        //统一为有权限的接口设置headers 请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    };
    options.complete = function(res) {
        console.log('执行了complete回调');
        console.log(res);
        //在complete回调函数中,可以使用res.responseJOSN拿到服务器响应过来的
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token')
                // 2. 强制跳转到登录页面
            location.href = './login.html'
        }
    }



})