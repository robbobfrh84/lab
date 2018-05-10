var AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"})
var documentClient = new AWS.DynamoDB.DocumentClient();

main = ()=>{
  get('pixel-D-demo', "public", "blocks[0]") // table name, primary row name.
}

get = (table, name, attribute)=>{
  const getParams = {
    TableName: table,
    Key: { name: name },
    ProjectionExpression: attribute,
  }
  documentClient.get(getParams, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log('JSON obj: ', data.Item.blocks)
  })
}

main()
