const express = require('express')
const bodyParser =require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const db ={
	email: 'm@m.com',
	pasword: '123'
}




app.set('view engine', 'pug')
app.set('views', 'templates')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
	secret: 'asdf',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 36000000
	}
}))
app.get('/', function  (req, res){
	const session = req.session.user
	if (session) {
		res.render('home')
	} else {
		res.redirect('/login')
	}

})
app.get('/login', function ( req, res){
	const session = req.session.user
	if (session) {
		res.redirect('/')

	} else {
	  res.render('login') }
 })
app.post('/login', function (req, res){
	const data = req.body
	if(JSON.stringify(db) == JSON.stringify(data)) {
		req.session.user = 'asdf'
		res.redirect('/')

	} else {
		res.render('login', {
			error: 'Usuario o contraseña incorrectos'
		})
	}

})
app.listen(3000)
