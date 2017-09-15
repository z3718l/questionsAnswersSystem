const express = require('express')
      bodyParser = require('body-parser')
      mongoose = require('./db/db')
	Users = mongoose.User
	Questions = mongoose.Questions
	Answers = mongoose.Answers
      cookieParser = require('cookie-parser')
      template = require('./template')
      uploads = require('./multer')
      public = require('./public')
      send = public.send
      signIn = public.signIn
      app = express()
      

app.use(express.static('www'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.engine('.html',template.__express)
app.set('view engine','html')

//页面渲染
app.use(require('./routes/index'))

//请求验证
app.use(require('./routes/require'))

//问题部分
app.use(require('./routes/question'))

//上传部分
app.use(require('./routes/upload'))

//删除
app.use(require('./routes/remove'))

app.listen(3001,() => {
  console.log('running!')
})
