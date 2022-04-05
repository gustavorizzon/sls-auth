const { verify } = require('jsonwebtoken')
const { buildIAMPolicy } = require('./lib/util')
const JWT_KEY = process.env.JWT_KEY

const roles = {
  'heroes:list': 'private'
}

const authorizeUser = (userScopes, methodArn) => {
  return userScopes.find(
    scope => ~methodArn.indexOf(roles[scope])
  )
}

exports.handler = async event => { 
  const token = event.authorizationToken

  try {
    const decodedJWT = verify(token, JWT_KEY)

    const user = decodedJWT.user
    const userId = user.username
    const isAllowed = authorizeUser(user.scopes, event.methodArn)
    const authorizerContext = {
      user: JSON.stringify(user)
    }
    const policyDocument = buildIAMPolicy(userId, isAllowed ? 'Allow' : 'Deny', event.methodArn, authorizerContext)

    return policyDocument
  } catch (error) {
    console.log('auth error', error.stack)

    return {
      statusCode: 401,
      body: 'Unauthorized'
    }
  }
}
