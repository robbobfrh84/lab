ddb = (type, action, account, obj, callback)=>{
  // you pass obj which is the box, but instead use GLOABAL boxData...
  const timeStamp = Date.now()
  if (type === 'put') {

    if (action === 'signUp') {
      ddbCreate('accounts', 'accounts', {
        id: account+'-'+action+'-'+timeStamp+'-'+_randId(10),
        signUpDate : timeStamp,
        account : account,
        share : true
      }, ()=>{ if (callback) callback() })
    }

    if (action === 'save') {
      ddbCreate('blocks', account, {
        id: account+'-'+action+'-'+timeStamp+'-'+_randId(10),
        timestamp : timeStamp,
        account : account,
        share : true,
        gallery : [ 'default' ],
        blk : boxData
      }, ()=>{
        if (callback) callback()
      })
    }

    if (action === 'post') {
      ddbCreate('blocks', account, {
        id: account+'-'+action+'-'+timeStamp+'-'+_randId(10),
        timestamp : timeStamp,
        account : account,
        share : true,
        gallery : [ 'default', 'posts' ],
        blk : boxData
      })
      ddbCreate('blocks', 'public', {
        id: account+'-'+action+'-'+timeStamp+'-'+_randId(10),
        timestamp : timeStamp,
        account : account,
        share : true,
        gallery : [ 'default', 'posts' ],
        blk : boxData
      }, ()=>{
        if (callback) callback()
      })
    }

    if (action === 'append') {
      if (!obj.post.appends) obj.post.appends = []
      const id = account+'-append-'+timeStamp+'-'+_randId(10)
      if (!obj.post.decendentTree) obj.post.decendentTree = []
      obj.post.decendentTree.push({pos: obj.selectedPos, parentPos: obj.pos})
      obj.post.appends.push({
        child: id,
        parentPos: obj.pos,
        childPos: obj.selectedPos,
        timeStamp: timeStamp,
        grid: obj.gridSize,
      })
      let newAppend = {
        id: id,
        account: account,
        timestamp: timeStamp,
        blk: boxData,
        parent: obj.post.id,
        share: true,
        gallery: ["default","appends"],
      }
      console.log('New Original Post: ', obj.post)
      console.log('New Append: ', newAppend)
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
