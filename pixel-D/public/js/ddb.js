ddb = (type, action, account, obj, callback)=>{
  // you pass obj which is the box, but instead use GLOABAL boxData...
  if (type === 'put') {
    const timeStamp = Date.now()

    if (action === 'signUp') {
      ddbCreateItem('accounts', account, {
        id: account+'_'+action+'_'+timeStamp+'_'+_randId(10),
        signUpDate : timeStamp,
        account : account,
        share : true
      }, ()=>{ if (callback) callback() })
    }

    else if (action === 'save') {
      ddbAddToList('userBlks', account, {
        id: account+'_'+action+'_'+timeStamp+'_'+_randId(10),
        timestamp : timeStamp,
        account : account,
        share : true,
        gallery : [ 'default' ],
        blk : boxData
      }, ()=>{
        if (callback) callback()
      })
    }

    else if (action === 'post') {
      const id = account+'_'+action+'_'+timeStamp+'_'+_randId(10)
      ddbAddToList('userBlks', account, {
        id: id,
        timestamp : timeStamp,
        account : account,
        share : true,
        gallery : [ 'default', 'posts' ],
        blk : boxData
      })
      ddbAddToList('public', 'blocks', {
        id: id,
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
      const id = account+'_'+action+'_'+timeStamp+'_'+_randId(10)
      let nextGen = 0
      obj.post.blks.map(x=>{ if (x.gen > nextGen) nextGen = x.gen })
      nextGen++
      const parentAppend = {
        id: id,
        pos: { grid: obj.gridSize, childPos: obj.selectedPos, parPos: obj.pos },
        gen: nextGen,
        timeStamp: timeStamp,
        appends: {}
      }
      obj.post.blks.push({ gen: nextGen, pos: obj.selectedPos, blk: boxData })
      const newAppend = {
        id: id,
        account: account,
        timestamp: timeStamp,
        blks: obj.post.blks,
        ogPost: obj.post.ogPost || { p: obj.post.id, i: obj.index },
        directLine: obj.post.directLine ? obj.post.directLine+'.appends.'+id : id,
        gen: nextGen,
        grid: obj.gridSize,
        parent: obj.post.id,
        share: true,
        gallery: ['default','appends'],
      }

      callback()

      appendsUpdate = (id, newAppend, parentAppend, account, callback)=>{
        // 👇 ...Add NEW to append ⚠️ Should be done in ONE update as Lambda func in future... this is just slow and bad.
        ddbCreateAddMap('appends', 'blocks', id, newAppend, ()=>{ //
          // 👇 ...UPDATE Parent node
          ddbCreateAddMap('public', 'blocks['+obj.index+'].appends'
            , newAppend.directLine, parentAppend, ()=>{
            // 👇 ...If appending and append, add to that. else just add userBlk
            if (obj.post.parent) {
              ddbCreateAddMap('appends', 'blocks.'+obj.post.id+'.appends'
                , id, parentAppend, ()=>{ //
                // 👇 ...ADD NEW userBlk
                ddbAddToList('userBlks', account, newAppend, ()=>{
                  if (callback) callback()
                })
              })
            } else {

              // 👇 ...ADD NEW userBlk
              ddbAddToList('userBlks', account, newAppend, ()=>{
                if (callback) callback()
              })
            }
          })
        })
      }
      appendsUpdate(id, newAppend, parentAppend, account, callback)
    }
  }

  else if (type === 'update') {

    if (action === 'saved') {
      ddbCreateItem('userBlks', account+'['+obj.index+'].blk', obj.blk, ()=>{
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
      Key: { name: item },
      TableName: ddbTable
  };
  _loaderOn()
  documentClient.get(params, function(err, data) {
    _loaderOff()
    if (err) console.log(err);
    else if (callback) callback(data)
  });
}

ddbGetVal = (name, attribute, callback)=>{
  _loaderOn()
  documentClient.get({
    TableName: ddbTable,
    Key: { name: name },
    ProjectionExpression: attribute
  }, function(err, data) {
    _loaderOff()
    if (err) console.log(err, err.stack)
    else callback(data)
  })
}

ddbCreateItem = (name, attribute, data, callback)=>{
  _loaderOn()
  documentClient.update({
    TableName: ddbTable,
    Key: { name: name },
    UpdateExpression: "set "+attribute+" = :b",
    ExpressionAttributeValues: { ":b": data },
    ReturnValues:"UPDATED_NEW"
  }, function(err, data) {
      _loaderOff()
      if (err) { console.log(err, err.stack) }
      else {
        console.log(' ! Item Added/Updated to List Successful !')
        if (callback) callback()
      }
  });
}

ddbAddToList = (name, attribute, data, callback)=>{
  _loaderOn()
  documentClient.update({
    TableName: ddbTable,
    Key: { name: name },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #'+attribute+' = list_append(if_not_exists(#'
      +attribute+', :empty_list), :'+attribute+')',
    ExpressionAttributeNames: { ['#'+attribute]: attribute },
    ExpressionAttributeValues: { [':'+attribute]: [data], ':empty_list': [] }
  }, function(err, data) {
      _loaderOff()
      if (err) { console.log(err, err.stack) }
      else {
        console.log(' ! Item Added to List Successful !')
        if (callback) callback()
      }
  });
}

ddbCreateAddMap = (name, attribute, node, data, callback)=>{
  _loaderOn()
  documentClient.update({
    TableName: ddbTable,
    Key: { name: name },
    UpdateExpression: "set "+attribute+" = :a",
    ConditionExpression: 'attribute_not_exists('+attribute+')',
    ExpressionAttributeValues: { ":a": {} },
  }, function(err, data2) {
      _loaderOff()
      if (err) console.log('Map of '+attribute+' Exists!')
      else console.log('Map of '+attribute+' did not exsits, now it does')
      ddbCreateItem(name, attribute+'.'+node, data, ()=>{ //
        if (callback) callback()
      })
  });

}
