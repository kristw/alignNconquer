// Define module using Universal Module Definition pattern
// https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // Support AMD. Register as an anonymous module.
    // EDIT: List all dependencies in AMD style
    define(['lodash'], factory);
  }
  else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // EDIT: Pass dependencies to factory function
    module.exports = factory(require('lodash'));
  }
  else {
    // No AMD. Set module as a global variable
    // EDIT: Pass dependencies to factory function
    root.sequenceKnife = factory(root._);
  }
}(this,
//EDIT: The dependencies are passed to this function
function (_) {
  //---------------------------------------------------
  // BEGIN code for this module
  //---------------------------------------------------

  var sequenceKnife = (function(){

    var _moreSymbol = 'x';

    function moreSymbol(value){
      if(arguments.length > 0){
        _moreSymbol = value;
        return this;
      }
      return _moreSymbol;
    }

    function remapSymbols(sequence, map){
      return sequence.split('')
        .map(function(symbol){
          return map[symbol] ? map[symbol] : '';
        })
        .join('');
    }

    function sortSymbols(sequence){
      return sequence.split('')
        .sort(function(a,b){ return a.localeCompare(b); })
        .join('');
    }

    function removeDuplicateConsecutiveSymbols(sequence, includedSymbols, excludedSymbols){
      var hasInclude = includedSymbols && includedSymbols.length > 0;
      var hasExclude = excludedSymbols && excludedSymbols.length > 0;
      var includeLookup = {};
      var excludeLookup = {};
      if(hasInclude){
        includedSymbols.forEach(function(symbol){
          includeLookup[symbol] = true;
        });
      }
      if(hasExclude){
        excludedSymbols.forEach(function(symbol){
          excludeLookup[symbol] = true;
        });
      }

      var output = '';
      var prevSymbol = '';
      sequence.split('').forEach(function(symbol){
        if(symbol!=prevSymbol || (symbol==prevSymbol && (hasInclude && !includeLookup[symbol] || hasExclude && excludeLookup[symbol])) ){
          output += symbol;
        }
        prevSymbol = symbol;
      });
      return output;
    }

    function partitionByAlignments(sequence, alignments){
      var partitions = [];
      for(var i=0;i<alignments.length;i++){
        var index = sequence.indexOf(alignments[i]);
        if(index >= 0){
          partitions.push({
            partitionIndex: partitions.length,
            sequence: sequence.substring(0,index)
          });
          sequence = sequence.substring(index+1);
        }
        else{
          break;
        }
      }
      if(partitions.length>0 && sequence.length>0){
        partitions.push({
          partitionIndex: partitions.length,
          sequence: sequence
        });
      }
      return partitions;
    }

    function reverse(sequence){
      return sequence.split('').reverse().join('');
    }

    function truncateBack(sequence, maxLength){
      return sequence.length <= maxLength ? sequence : sequence.substring(0, maxLength-1) + _moreSymbol;
    }

    function truncateFront(sequence, maxLength){
      return reverse(truncateBack(reverse(sequence), maxLength));
    }

    return {
      moreSymbol: moreSymbol,
      partitionByAlignments: partitionByAlignments,
      remapSymbols: remapSymbols,
      removeDuplicateConsecutiveSymbols: removeDuplicateConsecutiveSymbols,
      reverse: reverse,
      sortSymbols: sortSymbols,
      truncateBack: truncateBack,
      truncateFront: truncateFront
    };
  }());

  // return module
  return sequenceKnife;

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));

