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
      // move(table, 'userBlks', name, data.Item.blocks)
      // move(table, 'users', 'allUsers.'+name, data.Item.blocks) // 👈 This one embeds within anohter value...
    }
  })
}

//
// get('pixel-D-demo', 'VanGogh')
// get('pixel-D-demo', 'Timmy')
// get('pixel-D-demo', 'HomoErectus')
// get('pixel-D-demo', 'PixelPeet')
// get('pixel-D-demo', 'Bob')
