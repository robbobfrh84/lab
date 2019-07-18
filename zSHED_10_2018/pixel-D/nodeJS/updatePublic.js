var AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"})
var documentClient = new AWS.DynamoDB.DocumentClient();

get = (table, name, attribute)=>{
  const params = {
    TableName: table,
    Key: { name: name },
    ProjectionExpression: attribute,
  };
  documentClient.get(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else changeHexToRgb(data.Item.blocks[0].blk, attribute) // ⚠️ Note: the index of "0" will always be zero for specific indexes within array, it'll just return an index with ONLY the one you requested, regarless of what index it was to start.
  })
}

put = (table, name, attribute, value)=>{
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

changeHexToRgb = (data, attribute)=>{
  for (const x in data) {
    for (const y in data[x]) {
      if (data[x][y].color === '#aaa') {
        data[x][y].color = 'rgba(0,0,0,0)'
      }
    }
  }
  console.log(data)
  put('pixel-D-demo', "public", attribute, data)
}

// get('pixel-D-demo', "public", "blocks[0].blk")

// This example goes through and changes attributes of a DDB item,
// ... by specifiying the index WITHIN an attribute.
// Then, It "updates" that value in the specific place as well.
