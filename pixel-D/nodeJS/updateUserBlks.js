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
    else changeHexToRgb(table, name, attribute, data.Item) // ⚠️ Note: the index of "0" will always be zero for specific indexes within array, it'll just return an index with ONLY the one you requested, regarless of what index it was to start.
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

changeHexToRgb = (table, name, attribute, data)=>{
  for (const user in data) {
    for (const blks in data[user]) {
      for (const x in data[user][blks].blk) {
        for (const y in data[user][blks].blk[x]) {
          if (data[user][blks].blk[x][y].color === '#aaa') {
            data[user][blks].blk[x][y].color = 'rgba(0,0,0,0)'
          }
        }
      }
    }
    put(table, name, user, data[user])
  }
}
// get('pixel-D-demo', "userBlks")


// This example goes through and changes attributes of a DDB item,
// ... by specifiying the index WITHIN an attribute.
// Then, It "updates" that value in the specific place as well.
