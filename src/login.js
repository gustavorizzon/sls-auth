const users = require('../db/users.json');
const JWT_KEY = process.env.JWT_KEY;
const { sign } = require('jsonwebtoken')

const login = async event => {
	console.log('Login invoked... ', new Date().toISOString(), event.body)

	const { 
		username,
		password
	} = JSON.parse(event.body)

	console.log(username, password)

	const validUser = users.find(user => user.username === username && user.password === password)

	if (!validUser) { 
		return {
			statusCoed: 401,
			body: JSON.stringify({
				message: 'Unauthorized'
			})
		}
	}

	const signUser = {
		scopes: validUser.scopes,
		username: validUser.username,
	}

	const accessToken = sign({
		user: signUser
	}, JWT_KEY, { expiresIn: '5m' })

	return {
		statusCode: 200,
		body: JSON.stringify({ accessToken })
	}
}

exports.handler = login
