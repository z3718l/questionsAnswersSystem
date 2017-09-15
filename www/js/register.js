$(function(){
    // 跳转到登录页面
    $('#user').click(function(){
        location.href = '/sign'
    })

    //历史记录回退
    $('#goBack').click(function(){
        history.go(-1)
    })

    //用户名验证
    $('input[name="username"]').blur(function(){
        var $val = $(this).val()
        if($val.length < 2 ||　$val.length >16){
               check(this)
        }
        else{
            //发起请求
            $.get("/username/" + $val,function(data){
                //表单边框颜色按照状态来进行显示
                check('input[name="username"]',data.code)
            })
        }
    })

    //密码验证
    $('input[name="password"]').blur(function(){
        var $val = $(this).val()
        if($val.length < 6 || $val.length > 16){
            check(this)
        }
        else{
            check(this,'success')
        }
    })

    //确认密码验证
    $('input[name="repassword"]').blur(function(){
        var pass = $(':password').map(function(){
            return $(this).val()
        })
        // 判断两次输入的密码是否相等
        if(pass[0] == pass[1]){
            check(this,'success')
        }else{
            check(this)
        }
    })


    //发起请求
    $('form').submit(function(ev){
        ev.preventDefault()
        var data = $(this).serialize()
        $.post("/register",data,function(data){
            console.log(data)
             $('.modal-body p').text(data.message)
             $('.modal').modal('show')
             console.log('1')
             if(data.code == 'success'){
                 //当点击确定，模态框完全隐藏(css过渡效果完成)之后触发的事件
                 $('.modal').on('hidden.bs.modal',function(e){
                     location.href = '/sign'
                 })
             }
        })
    })

    function check(select,status){
        status = status == 'success' ? 'has-success' : 'has-error'
        $(select).parent().removeClass('has-success has-error').addClass(status)
    }
})
