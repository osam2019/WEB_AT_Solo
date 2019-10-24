const express = require('express')
const router = express.Router()
const createError = require('http-errors')
var multer  = require('multer')
var upload = multer({ dest: 'public/' })

var app = express();

var timeCount = 0
var getTimeCount = function(){
	timeCount += 15
	if(timeCount > 30)
		timeCount = 0

	return timeCount
}

router.get('/download', (req, res) => {
	//res.sendFile(req.body.file_up, {root : 'public/'})
	var fileName = req.url
	console.log(fileName)
	fileName = fileName.split('?')[1]
	console.log(fileName)
	fileName = fileName.split('=')[1]
	var filepath= __dirname+'\\..\\public\\'+fileName
	console.log('url: ', filepath)
	res.status(200).download(filepath)
})

router.post('/upload', upload.single('bin'), function (req, res, next) {
	  var temp = req.body
	  console.log('/upload :::', JSON.stringify(temp))
	  temp.flag_upload = temp.flag_upload === 'true'
	  if(temp.flag_upload == true){
		  temp['file_down'] = req.file.originalname
		  temp['file_up'] = req.file.filename
	  }
	  else
		  console.log('not uploaded files')
  
		console.log('/upload :::', JSON.stringify(temp), req.file)
	  res.status(200).send({temp})
  })
const server = app.listen(8082, () => {
	console.log('server running on port 8082')
})

const io = require('socket.io')(server)
io.on('connection', function(socket){
	console.log('id: ' + socket.id)
	socket.on('msg', (data) =>{
        console.log('data :', data)
		socket.broadcast.emit('msg', data)
	})
	socket.on('sock_initWorks', (data) =>{
		socket.broadcast.emit('sock_initWorks')
	})
	socket.on('works_update', (data) =>{
        //send all clients except for sender
        console.log('data :', data)
		socket.broadcast.emit('works_update', data)
	})
	socket.on('works_add', (data) =>{
        //send all clients except for sender
        console.log('data :', data)
		socket.broadcast.emit('works_add', data)
	})
})

module.exports = router
