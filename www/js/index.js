$(function() {
    // 获取到cookie
    var cookieName = $.cookie('username')
    if (cookieName) {
        // onerror当文件加载失败时会触发这个事件
        var header = '<img src="uploads/' + $.cookie('header') + '" onerror="this.src=\'images/user.png\'">'
        $('#user').empty().html(header + cookieName)
    }

    // 退出删除cookie
    $('.dropdown-menu li').last().click(function() {
        $.removeCookie('username')
        $.removeCookie('header')
        location.reload()
    })

    $('#user').click(function() {
        if (!cookieName) {
            $(this).removeAttr('data-toggle')
            location.href = '/sign'
        }
    })

    //提问跳转部分
    $('#ask').click(function() {
        if (cookieName) {
            location.href = '/ask'
        } else {
            $('.modal-body p').text('请先登录...')
            $('.modal').modal('show')
        }
    })

    // 回答跳转部分
    $('.question').delegate('.answer', 'click', function() {
        //点击button时获取对应的父元素ul的下标值
        var id = $(this).parents('ul').data('id')
        console.log(id)
        if (cookieName) {
            location.href = '/answer/' + id
        } else {
            $('.modal-body p').text('请先登录...')
            $('.modal').modal('show')
        }
    })

    $('.modal-close').click(function() {
        $('.modal').modal('hide')
        .on('hidden.bs.modal', function() {
            location.href = '/sign'
        })
    })
    // 删除
    $('.remove').click(function() {
        var name = $(this).parent().siblings('.username').text()
        var id = $(this).parents('ul').data('id')
        $('.modal-body p').text('您确定要删除' + name + '?')
        $('.modal').modal('show')
        $('.modal-close').click(function() {
            $('.modal').modal('hide').on('hidden.bs.modal', function() {
                var url = '/question/remove/' + id
                $.get(url, function(data) {
                    if (data.code == 'success') {
                        location.reload()
                    }
                })
            })
        })
    })
        //分页
    var page = $('.pagination .active').index()
    $('.pagination li').first().click(function() {
        if (page > 1) {
            page--
            location.href = '/?page=' + page
        }
    })
    $('.pagination li').last().click(function() {
        if (page < $(this).index() - 1) {
            page++
            location.href = '/?page=' + page
        }
    })

    $('.pagination .active').click(function(ev) {
        ev.preventDefault()
    })

    $('.down').click(function() {
        $(document).find('.list-group-item-info').slideToggle()
    })
})
