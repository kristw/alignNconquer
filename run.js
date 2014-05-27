var _ = require('lodash');

var START_MARK = '^';
var END_MARK = '$';
var MORE_MARK = '>';
var MAX_PARTITION_LENGTH = 10;

//---------------------------------------------------
// Generate data

function generateChar(n){
  return String.fromCharCode(97 + n);
}

var data = [];
for(var i=0;i<100;i++){
  var str = START_MARK;
  var length = Math.round(Math.random()*20);
  for(var j=0;j<length;j++){
    str += generateChar(Math.round(Math.random()*25));
  }
  str += END_MARK;
  data.push(str);
}

// console.log('data', data);

//---------------------------------------------------

function splitSequence(row, alignments){
  var partitions = [];
  var sequence = row;
  for(var i=0;i<alignments.length;i++){
    var index = sequence.indexOf(alignments[i]);
    if(index >= 0){
      partitions.push(sequence.substring(0,Math.min(index, MAX_PARTITION_LENGTH)));
      // add more mark
      sequence = sequence.substring(index+1);
    }
    else{
      break;
    }
  }
  if(partitions.length>0 && sequence.length>0){
    partitions.push(sequence.substring(0,MAX_PARTITION_LENGTH));
    // add more mark
  }
  return partitions;
}

function process(data, alignments){
  var partitions = data.map(function(row){
      return splitSequence(row, alignments);
    })
    .filter(function(partitions){
      return partitions.length>0;
    })
    .map(function(partitions){
      return partitions.map(function(d,i){
        return {index: i+1, sequence: d};
      });
    })
    .reduce(function(prev, current){
      return prev.concat(current);
    }, []);
  // console.log('partitions', partitions);

  var groups = _.groupBy(partitions, 'index');
  // console.log('groups', groups);

  var aggGroups = Object.keys(groups).map(function(key){
    var counter = groups[key].map(function(partition){
      return partition.sequence;
    })
    .reduce(function(prev, current){
      if(prev[current]){
        prev[current]++;
      }
      else{
        prev[current] = 1;
      }
      return prev;
    }, {});

    return Object.keys(counter).map(function(sequence){
      return {index: key, type: 'forward', sequence: sequence, count: counter[sequence]};
    });
  })
  .reduce(function(prev, current){
    return prev.concat(current);
  }, []);

  console.log('aggGroups', aggGroups);
}

var alignments = ['a', 'c'];
process(data, alignments);