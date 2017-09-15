const	template = require('art-template')

template.helper('getTime',function(time){
  time = new Date(time)
  var month = time.getMonth() + 1
  var date = time.getDate()
  var hour = time.getHours()
  var minute = time.getMinutes()
  var second = time.getSeconds()

  hour = hour < 10 ? '0' + hour : hour
  minute = minute <10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second

  return `${time.getFullYear()}-${month}-${date}-${hour}:${minute}:${second}`
})

//模块	导出
module.exports = template