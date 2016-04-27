var fs = require('fs');

var totalNumber = 0;
var trueNumber = 0;
var falseNumber = 0;
var sendUpdate = true; 

function initNumbers()
{
  var totals = require("./data/totals.json");
  trueNumber = totals.true;
  falseNumber = totals.false;
  totalNumber = totals.total;
}

function save(chunck) {
	console.log("this data " + chunck); 
	if(chunck === 'answer=True')
	{
	 trueNumber++;
	}
	else if(chunck === 'answer=False')
	{
	 falseNumber++;
	}
	totalNumber++;
	var totalParse = '{"true":' + trueNumber + ', "false":' + falseNumber + ',"total":' + totalNumber +'}';
	// Write numbers to JSON
	var log = fs.createWriteStream('data/totals.json', {'flags': 'w'});
	log.end(totalParse);
}

// calculate percentages
function pollOne()
{
	return trueNumber/totalNumber;
}

function pollTwo()
{
	return falseNumber/totalNumber;
}

exports.sendUpdate = sendUpdate;
exports.initNumbers = initNumbers;
exports.save = save;
exports.pollOne = pollOne;
exports.pollTwo = pollTwo;