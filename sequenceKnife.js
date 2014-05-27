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

    function remapSymbols(sequence, map){

    }

    function sortSymbols(sequence){

    }

    function removeDuplicateConsecutiveSymbols(sequence, includedSymbols, excludedSymbols){

    }

    function partitionByAlignments(sequence, alignments){

    }

    function truncate(sequence, maxLength){

    }

    return {
    };
  }());

  // return module
  return sequenceKnife;

  //---------------------------------------------------
  // END code for this module
  //---------------------------------------------------
}));

