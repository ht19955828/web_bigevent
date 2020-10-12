//注意每次调用$.get() 或者$.ajax() 或$.post()
//会先调用ajaxPREfilter
//在这个函数中,可以拿到我们给ajax提供的配置对象

$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);
})