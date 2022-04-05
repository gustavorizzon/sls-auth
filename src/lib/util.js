const buildIAMPolicy = (userId, effect, resource, context) => ({
  principalId: userId,
  policyDocument: {
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    }]
  },
  context
})

module.exports = {
  buildIAMPolicy
}
