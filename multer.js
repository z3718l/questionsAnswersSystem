var name = {
    	destination:'www/uploads',
    	filename:function(req,file,cb){
    		var name = req.cookies.username
    		var fileType = file.originalname
    		var arr = fileType.split('.')
    		var headerName = name + '.' + arr[arr.length - 1]
    		cb(null,headerName)
    	}
    }
const multer = require('multer')


const storage = multer.diskStorage(name)
	  uploads = multer({storage})

module.exports = uploads