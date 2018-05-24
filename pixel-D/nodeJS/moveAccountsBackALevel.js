var getRandomValues = require('get-random-values')
var AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"})
var documentClient = new AWS.DynamoDB.DocumentClient();

move = (table, name, attribute, value)=>{
  const params = {
      TableName: table,
      Key: { name: name },
      UpdateExpression: "set "+attribute+" = :b",
      ExpressionAttributeValues:{ ":b": value },
      ReturnValues:"UPDATED_NEW"
  };
  documentClient.update(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log(' ! Update successful !', data)
  })
}

get = (table, name, attribute)=>{
  const getParams = {
    TableName: table,
    Key: { name: name },
    ProjectionExpression: attribute,
  }
  documentClient.get(getParams, function(err, data) {
    if (err) console.log(err, err.stack)
    else {
      for (var i = 0; i < data.Item.accounts.length; i++) {
        if (data.Item.accounts[i].id) {
          console.log('has id')
          console.log(data.Item.accounts[i])
        } else {
          console.log('\n!!! ---- does not have id')
          data.Item.accounts[i].id = data.Item.accounts[i].account+'-signUp-'+data.Item.accounts[i].signUpDate+'-'+_randId(10)
          console.log(data.Item.accounts[i])
        }
        move(table, name, data.Item.accounts[i].account, data.Item.accounts[i])
      }
    }
  })
}

get('pixel-D-demo','accounts')

_randId = (length)=>{

  dec2hex = (dec)=>{
    return ('0' + dec.toString(16)).substr(-2)
  }
  generateId = (len)=>{
    var array = new Uint8Array((len || 40) / 2)
    var randArray = getRandomValues(array)
    return Array.from(randArray, dec2hex).join('')
  }
  return generateId(length)
}
