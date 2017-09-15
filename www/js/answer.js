$(function(){
     // 获取到cookie
    var cookieName = $.cookie('username')
    if(cookieName){
        // onerror当文件加载失败时会触发这个事件
        var header = '<img src="/uploads/' + $.cookie('header') + '" onerror="this.src=\'/images/user.png\'">'
        $('#user').empty().html(header + cookieName)
    }

    // 退出删除cookie
    $('.dropdown-menu li').last().click(function(){
        $.removeCookie('username')
        $.removeCookie('header')
        location.reload()
    })

    $('#user').click(function(){
        if(!cookieName){
           $(this).removeAttr('data-toggle')
           location.href = '/sign'
        }
    })

    function checkNumber(){
        var $val = $('textarea').val().length
        $('textarea').next().text(140-$val + '/140')
    }
    var timer
    $('textarea').focus(function(){
        timer = setInterval(checkNumber,20)
    })
    $('textarea').blur(function(){
        clearInterval(timer)
    })
	
    $('.modal-close').click(function(){
    	$('.modal').modal('hide')
    	location.href = '/'
    })
	
    //发起请求
    $('form').submit(function(ev){
        ev.preventDefault()
        var data = $(this).serialize() + '&id=' + $(this).data('id')
        
        $.post('/answer',data).done(function(data){
             $('.modal-body p').text(data.message)
             $('.modal').modal('show')
        })
    })

})
