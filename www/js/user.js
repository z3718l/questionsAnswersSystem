$(function(){
     // 获取到cookie
    var cookieName = $.cookie('username')
    if(cookieName){
        // onerror当文件加载失败时会触发这个事件
        var header = '<img src="uploads/' + $.cookie('header') + '" onerror="this.src=\'images/user.png\'">'
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

    $('form').submit(function(ev){
        ev.preventDefault()
        var data = new FormData(this)

        $.post({
            url:'/header',
            data:data,
            contentType:false,
            processData:false,
            success:function(data){
             	$('.modal-body p').text(data.message)
            	$('.modal-footer button').eq(1).hide()
            	$('.modal-footer button').eq(0).attr('data-dismiss','modal')
             	$('.modal').modal('show')
             	if(data.code == 'success'){
                 	$('.modal').on('hidden.bs.modal',function(){
                     	location.href = '/'
                 	})
             	}
            }
        })
    })
})
