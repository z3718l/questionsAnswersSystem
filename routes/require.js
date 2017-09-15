const express = require('express')
	  router = express.Router()

		
//用户注册验证
router.post('/register',(req,res) => {
	req.body.ip = req.ip
	req.body.time = new Date()
	var user = new Users(req.body)
	user
	.save(function(err,data){
		console.log(data)
		if(err){
			send(res,'fail','系统错误')
		}else{
			send(res,'success','恭喜,注册成功....')
		}
	})
})

//判断用户名是否存在    
router.get('/username/:username',(req,res) => {
	var name = req.params.username
	Users
	.findOne({username:name})
	.exec(function(err,data){
		if(data){
			send(res,'fail','对不起,用户名已存在....')
		}else{
			send(res,'success','恭喜,可以注册....')
		}
	})
})

//登录 
router.get('/login/:username/:password',(req,res) => {
	var name = req.params.username
	var pass = req.params.password

	Users
	.findOne({username:name})
	.exec(function(err,data){
		if(err){
			send(res,'fail','抱歉,系统错误...')
		}else{
			if(data){
				if(pass == data.password){
					res.cookie('username',name)
					res.cookie('userid',data._id)
					send(res,'success','登录成功')
				}else{
					send(res,'fail','您输入的密码不正确....')
				}
			}else{
				send(res,'fail','您输入的用户名不正确....')
			}
		}
	})
})
module.exports = router