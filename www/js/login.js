$(function(){
    var cookieName = $.cookie('username')
    //如果用户未登录，则隐藏登录按钮
    //如果用户登录,则显示用户头像以及用户名
    if(cookieName){
        var header = '<img src="uploads/' + $.cookie('header') + '" onerror="this.src=\'images/user.png\'">'
        $('#user').empty().html(header + cookieName).show()
    }else{
        $('#user').hide()
    }

    // 退出删除cookie
    $('.dropdown-menu li').last().click(function(){
        $.removeCookie('username')
        $.removeCookie('header')
        location.reload()
    })

    // 点击注册按钮跳转到注册页面
    $('#register').click(function(){
        location.href = '/regist'
    })

    //历史记录回退
    $('#goBack').click(function(){
        history.go(-1)
    })

    // 发起请求
    $('form').submit(function(ev){
        ev.preventDefault()
        var $username = $(this).find('input[name="username"]').val()
        var $pass = $(this).find('input[name="password"]').val()
        $.get('/login/'+$username+'/'+$pass,function(data){
            if(data.code == 'success'){
                location.href = '/'
            }else{
                $('.modal-body p').text(data.message)
                $('.modal').modal('show')
            }
        })
    })
})
