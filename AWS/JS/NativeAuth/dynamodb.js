start_dynamoDB = (obj = {})=>{
  ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  for (const a of cognitoUser.attributes) { obj[a.Name] = a.Value }

  // get_dynamoDB({
  //   TableName: table1,
  //   Key: {
  //     'Username': {S: cognitoUser.username },
  //     'Client_Id': {S: obj.sub},
  //   }
  // },

  batchGet_dynamoDB({
    RequestItems: {
      [table1]: {
        Keys: [
          {
            'Username': {S: cognitoUser.username },
            'Client_Id': {S: obj.sub},
          },
          {
            'Username': {S: 'ListUsers' },
            'Client_Id': {S: '0'},
          },
        ],
      }
    }
  }, (Userdata)=>{ // callback
    textArea.innerHTML += "\n\n*** YO ***\n\n" + JSON.stringify(Userdata, null, 2)
    textArea.scrollTop = textArea.scrollHeight
    let usersList, userInfo;
    for (const user of Userdata.Responses.SignUpUserList) {
      if (user.zUsers) usersList = user.zUsers.M
      else if (user.Username) userInfo = user
    }

    if (!userInfo) { // if user not in table, add 'em.
      put_dynamoDB({
        TableName: table1,
        Item: {
          'Username': {S: cognitoUser.username },
          'Client_Id': {S: obj.sub},
          'Email': {S: obj.email},
          'User_Pool_Id': {S: cognitoUser.pool.userPoolId},
        }
      }, ()=>{ textArea.innerHTML += "\n\n*** User Added to table ***\n\n" + JSON.stringify(data, null, 2) })
    } else { console.log('* User Data present in table, ddb: ', ddb , '\n')}

/* WHERE I LEFT OFF
- FIGURED HOW TO ADD USERS TO USERLIST BY MAP!
- NEEDS TO BE CLEANED UP FOR SURE. HOWEVER YOU WANT IT
- OK... SO (ALSO, NEED TO CLEAN THIS FLIPPING THING WITH [0] VS [1]...)
  - I THINK STORAGE MIGHT RANDOMIZE IT. SO NEED TO LOOP THIS CONDITION.
- ALSO: WRITE MARKDOWN NOTES ABOUT {SS: ...} VS L, I lots to learn there
  - might want to find a nice dynamoDB chart that lists all these var names.
*/

    if (!usersList[cognitoUser.username]) {
      update_dynamoDB({
        TableName: table1,
        Key: {
          'Username': {S: 'ListUsers' },
          'Client_Id': {S: '0'},
        },
        // UpdateExpression: "SET myList = :o",// Create a new list
        // ExpressionAttributeValues:{
        //     ":o": {SS: ['One']},
        // },
        // UpdateExpression: "ADD myList :o",// Add a new String to list
        // ExpressionAttributeValues:{
        //     ":o": {SS: ['Two']},
        // },
        UpdateExpression: "SET zUsers.duder2 = :o",// Add a new String to list
        ExpressionAttributeValues:{
            ":o": {S:"Two"},
        },
        ReturnValues:"UPDATED_NEW"
      })
      console.log('User Added to ListUsers (',cognitoUser.username,')')
    }

  })
  // textArea.innerHTML += '\n\n\n*** DynamoDB, User & ListUsers Row ***\n'
  // + 'Table(s): '+table1+'\n\n'
}

update_dynamoDB = (params)=>{
  console.log('\n\n\n !!! update db')
  ddb.updateItem(params, function(err, data) {
    if (err) { console.log(err)
      textArea.innerHTML = "Unable to update item: " + "\n" + JSON.stringify(err, undefined, 2);
    } else { console.log(data)
      textArea.innerHTML += "\n\n***\n\nUpdateItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2);
    }
  });
}

get_dynamoDB = (params, callback)=>{
  ddb.getItem(params, (err, data)=>{
    if (err) { console.log("Error", err)
    } else {
      if (callback) callback(data)
    }
  })
}

put_dynamoDB = (params, callback)=>{
  ddb.putItem(params, (err, data)=>{
    if (err) { console.log("Error", err)
    } else {
      console.log("Success", data)
      textArea.innerHTML += JSON.stringify(params, null, 2)
      if (callback) callback(data)
    }
  })
}

batchGet_dynamoDB = (params, callback)=>{
  ddb.batchGetItem(params, function(err, data) {
    if (err) { console.log("Error", err) }
    else {
      if (callback) callback(data)
    }
  })
}

batchWrite_dynamoDB = (params)=>{
  ddb.batchWriteItem(params, function(err, data) {
    if (err) {
      console.log("Error", err)
    } else {
      console.log("Success", data)
    }
  })
}
