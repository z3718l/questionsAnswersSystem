const express = require('express')
router = express.Router()

//首页
router.get('/', (req, res) => {
    //分页
    var page = req.query.page || 1
    page = parseInt(page)
    var countOfPage = 5
    Questions
    .count()
    .exec(function(err, total) {
        var count = Math.ceil(total / countOfPage)
        var pages = []
        for(var i = 0; i < count; i++) {
            pages[i] = i + 1
        }
        Questions
        .find()
        .populate({
            path: 'userid answerlist',
            populate: {
                path: 'userid'
            }
        })
        .sort({time:-1})
        .skip((page - 1) * 5)
        .limit(countOfPage)
        .exec(function(err, question) {
            // console.log(question)
            res.render('index', {
                question,
                page,
                count,
                pages
            })
        })
    })

})

//登录页面页面渲染
router.get('/sign', (req, res) => {
    res.render('user/login', {
        title: '登录',
        back: true
    })
})

//注册页面渲染
router.get('/regist', (req, res) => {
    res.render('user/register', {
        title: '注册',
        back: true
    })
})

//提问页面渲染
router.get('/ask', (req, res) => {
    res.render('ask', {
        title: '提问'
    })
})

//回答页面渲染
router.get('/answer/:id', (req, res) => {
    var id = req.params.id
    res.render('answer', {
        id,
        title: '回答'
    })
})

//个人信息页面渲染
router.get('/user', (req, res) => {
    res.render('user/photo', {
        title: '个人信息'
    })
})

module.exports = router
