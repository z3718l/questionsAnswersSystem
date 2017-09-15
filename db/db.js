const mongoose = require('mongoose')
mongoose.Promise = Promise

//------------连接数据库------------------
mongoose.connect('mongodb://localhost/data')

//-------获取数据库连接的状态-----------
var db = mongoose.connection
db.on('open', function () {
	console.log('数据库连接成功')
})
db.on('error', function () {
	console.log('数据库连接失败')
})

var Schema = mongoose.Schema

// ----------设置用户信息数据库的模式---------
var userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	isMale: Boolean,
	ip: String,
	time: Date,
	header: String
})
var User = mongoose.model('users', userSchema)

// -----------设置提问数据库的模式----------------
var questionSchema = new Schema({
	content: String,
	time: Date,
	ip: String,
	userid: { type: Schema.Types.ObjectId, ref: 'users' },
	answerlist: [{ type: Schema.Types.ObjectId, ref: 'answers' }]
})
var Questions = mongoose.model('questions', questionSchema)

// --------------设置回答问题数据库的模式---------------------
var answerSchema = new Schema({
	answer: String,
	time: Date,
	ip: String,
	userid: { type: Schema.Types.ObjectId, ref: 'users' },
	questionid: { type: Schema.Types.ObjectId, ref: 'questions' }
})
var Answers = mongoose.model('answers', answerSchema)

module.exports = { 
	User, 
	Questions, 
	Answers 
}