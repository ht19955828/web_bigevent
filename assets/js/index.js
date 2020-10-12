$(function() {
    getUserInfo();
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        complete: function(res) {
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
}
//渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        $('#layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
//首先绑定点击事件
var layer = layui.layer
$('#btnLogou').on('click', function() {
    alert('ok')
        //调用layer.confirm  提示用户是否退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
        location.href = './login.html'

        // 关闭 confirm 询问框
        layer.close(index)
    })
})