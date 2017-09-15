const express = require('express')
      router = express.Router()

router.get('/question/remove/:id', (req, res) => {
    var id = req.params.id
    
    Questions.remove({ _id: id }, function(err) {
        if (err) {
            res.json({ code: 'fail', message: '删除失败' })
        } else {
            res.json({ code: 'success', message: '删除成功' })
        }
    })
})

module.exports = router
