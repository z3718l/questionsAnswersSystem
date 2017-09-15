// 公共方法
function send(res,code,message){
  res.status(200).json({code,message})
}

function signIn(req,res,next){
  var name = req.cookies.username
  if(name){
    next()
  }else{
    // 通过req.xhr来进行判断请求是否是由ajax发起的
    if(req.xhr){
       send(res,'fail','对不起,请先登录...')
    }else{
      // 重定向
       res.direct('/')
    }
  }
}

module.exports = {
	send,
	signIn
}
