const express = require('express')
	  router = express.Router()

//提问部分
router.post('/ask', signIn, (req, res) => {
	var userid = req.cookies.userid
	var time = new Date()
	var ip = req.ip
	var question = new Questions({
		userid,
		ip,
		time,
		content: req.body.content
	})
	question
	.save(function(err, data){
		if(err) {
			send(res, 'fail', '系统错误')
		} else {
			send(res, 'success', '留言成功。。。。')
		}
	})
})

//回答部分
router.post('/answer', signIn, (req, res) => {
	var id = req.body.id
	var userid = req.cookies.userid
	var header = req.cookies.header
	var answer = Answers({
		userid,
		questionid: id,
		ip: req.ip,
		time: new Date(),
		answer: req.body.answer
	})
	
	answer
	.save(function(err, data){
		if(err) {
			send(res, 'fail', '系统错误')
		} else {
			var result = data
			Answers
			.find({questionid: id})
			.exec(function(err, data) {
				if(err) {
					send(res, 'fail', '系统异常，请重试');
				} else {
					var arr = []
					for(var i = 0; i < data.length; i++) {
						arr.push(data[i]._id)
					}
					Questions
					.update({_id: id}, {$set: {answerlist: arr}})
					.exec(function(err, result) {
						if(err) {
							send(res, 'fail', '系统异常，请重试');
						} else {
							send(res, 'success', '回答成功');
						}
					})
				}
			})
		}
	})
})

module.exports = router