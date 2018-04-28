ddb = (type, action, account, obj, callback)=>{
  // you pass obj which is the box, but instead use GLOABAL boxData...

  if (type === 'put') {

    if (action === 'post') {
      ddbCreate('blocks', account, {
        timestamp : Date.now(),
        account : account,
        share : true,
        gallery : [ 'default', 'posts' ],
        blk : boxData
      })
      ddbCreate('blocks', 'public', {
        timestamp : Date.now(),
        account : account,
        share : true,
        gallery : [ 'default', 'posts' ],
        blk : boxData
      }, ()=>{
        if (callback) callback()
      })
    }

    if (action === 'save') {
      ddbCreate('blocks', account, {
        timestamp : Date.now(),
        account : account,
        share : true,
        gallery : [ 'default' ],
        blk : boxData
      }, ()=>{
        if (callback) callback()
      })
    }


    if (action === 'signUp') {
      ddbCreate('accounts', 'accounts', {
        signUpDate : Date.now(),
        account : account,
        share : true
      }, ()=>{ if (callback) callback() })
    }

  }

  else if (type === 'update') {

    if (action === 'saved') {
      ddbUpdateBlk(account, obj, ()=>{
        if (callback) callback()
      })
    }

  }

}

var ddbTable = 'pixel-D-demo'
var ddbRegion = 'us-east-1'
var ddbCreds = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:cf5562ab-671b-43cf-b256-bba5f6c91f8e',
  RoleArn: 'arn:aws:iam::118070506734:role/Cognito_pixelDDemoUnauth_Role2',
})
AWS.config.update({
    region: ddbRegion,
    credentials: ddbCreds
});
var documentClient = new AWS.DynamoDB.DocumentClient();

ddbGet = (item, callback)=>{
  var params = {
      Key: { "name": item },
      TableName: ddbTable
  };
  _loaderOn()
  documentClient.get(params, function(err, data) {
    _loaderOff()
    if (err) {
      console.log(err);
    } else {
      if (callback) callback(data)
    }
  });
}

// CHANGE UPDATE > to > create!
ddbCreate = (arrkey, account, data, callback) =>{
  _loaderOn()
  const arrayKey = arrkey
  const updateData = data
  documentClient.update({
    TableName: ddbTable,
    Key: { name: account },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #'+arrayKey+' = list_append(if_not_exists(#'+arrayKey+', :empty_list), :'+arrayKey+')',
    ExpressionAttributeNames: {
      ['#'+arrayKey]: arrayKey
    },
    ExpressionAttributeValues: {
      [':'+arrayKey]: [updateData],
      ':empty_list': []
    }
  }, function(err, data) {
      _loaderOff()
      if (err) {
        console.log(err, err.stack)
      } else {
        console.log(' ! Create successful !')
        if (callback) callback()
      }
  });
}

ddbUpdateBlk = (account, blk, callback)=>{
  _loaderOn()
  console.log(blk.index)
  const params = {
      TableName: ddbTable,
      Key: {
          "name": account
      },
      UpdateExpression: "set blocks["+blk.index+"].blk = :b",
      ExpressionAttributeValues:{
          ":b": blk.new
      },
      ReturnValues:"UPDATED_NEW"
  };
  documentClient.update(params, function(err, data) {
    _loaderOff()
    if (err) {
      console.log(err, err.stack)
    } else {
      console.log(' ! Update successful !')
      if (callback) callback()
    }
  })
}
