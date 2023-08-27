_rand = (min, max)=>{
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function _clearAllChildren(parentID){
  while (parentID.hasChildNodes()){
    parentID.removeChild(parentID.lastChild);
  }
}
