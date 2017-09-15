const express = require('express')
      router = express.Router()

//头像上传
router.post('/header', uploads.single('header'), signIn, (req, res) => {
	var header = req.file.filename
	var name = req.cookies.username

	if(req.file.mimetype.startsWith('image/')){
		Users
		.findOne({username: name})
		.exec(function(err, data) {
			if(err) {
				send(res, 'fail', '系统错误，请稍后重试....')
			} else {
				Users
				.update({username: name}, {header})
				.exec(function(err, result) {
					if(err) {
						send(res, 'fail', '系统错误，请稍后重试....')
					} else {
						res.cookie('header', header)
						send(res, 'success', '头像上传成功...')
					}
				})
			}
		})
	}else{
		send(res, 'fail', '上传文件类型错误')
	}
	
})

module.exports = router