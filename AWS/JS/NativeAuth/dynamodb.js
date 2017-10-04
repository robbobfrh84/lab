start_dynamoDB = (obj = {})=>{
  ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  for (const a of cognitoUser.attributes) { obj[a.Name] = a.Value }
  get_dynamoDB({
    TableName: table1,
      Key: {
        'Username': {S: cognitoUser.username },
        'Client_Id': {S: obj.sub},
      }
    },
    (Userdata)=>{ // callback
      if (Object.keys(Userdata).length === 0) { // if user not in table, add 'em.
        put_dynamoDB({
          TableName: table1,
          Item: {
            'Username': {S: cognitoUser.username },
            'Client_Id': {S: obj.sub},
            'Email': {S: obj.email},
            'User_Pool_Id': {S: cognitoUser.pool.userPoolId},
          }
        })
        console.log('User Added to table')
      } else {
        console.log('* User Has alredy been added to table. ddb: ', ddb , '\n')}
    }
  )
  textArea.innerHTML += '\n\n\n*** DynamoDB, User Row ***\n'
  + 'Table(s): '+table1+'\n\n'
}

get_dynamoDB = (params, callback)=>{
  ddb.getItem(params, (err, data)=>{
    if (err) { console.log("Error", err)
    } else {
      textArea.innerHTML += JSON.stringify(data, null, 2)
      if (callback) callback(data)
    }
  })
}

put_dynamoDB = (params, callback)=>{
  ddb.putItem(params, (err, data)=>{
    if (err) { console.log("Error", err)
    } else { console.log("Success", data)
      textArea.innerHTML += JSON.stringify(params, null, 2)
      if (callback) callback(data)
    }
  })
}

batchGet_dynamoDB = ()=>{ // !!!! --- HARD CODED --- !!!
  const params = {
    RequestItems: {
      [table2]: {
        Keys: [ {'ID': {N: '1'}}, {'ID': {N: '2'}}, ],
        ProjectionExpression: 'ID, IDname, Color'
      }
    }
  };
  ddb.batchGetItem(params, function(err, data) {
    if (err) { console.log("Error", err) }
    else { console.log(data.Responses[table2])
      textArea.innerHTML += JSON.stringify(data, null, 2)
      textArea.scrollTop = textArea.scrollHeight
    }
  })
}

batchWrite_dynamoDB = ()=>{ // !!!! --- HARD CODED --- !!!
  var params = {
    RequestItems: {
      [table2]: [
        {
          PutRequest: {
            Item: {
              "ID": {N: "8" },
                "IDname": {S: "Eight" },
                "Color": {S: "White" },
            }
          }
        },
        {
          PutRequest: {
            Item: {
              "ID": {N: "9" },
                "IDname": {S: "Nine" },
                "Color": {S: "Teal" },
            }
          }
        }
      ]
    }
  }
  ddb.batchWriteItem(params, function(err, data) {
    if (err) {
      console.log("Error", err)
    } else {
      console.log("Success", data)
    }
  })
}
