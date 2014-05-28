var chai = require('chai');
var expect = chai.expect;

describe('sequenceKnife', function(){
  var sequenceKnife = require('../src/sequenceKnife');

  it('should exist', function(){
    expect(sequenceKnife).to.exist;
  });

  describe('#removeDuplicateConsecutiveSymbols()', function(){
    it('should remove duplicate consecutive symbols in the given sequence', function(){
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('cba')).to.equal('cba');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaa')).to.equal('a');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaab')).to.equal('ab');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('')).to.equal('');
    });

    it('should remove only duplicate consecutive symbols in the included list', function(){
      var includedSymbols = ['a', 'b'];

      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('cba', includedSymbols)).to.equal('cba');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaa', includedSymbols)).to.equal('a');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaab', includedSymbols)).to.equal('ab');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aabcccccc', includedSymbols)).to.equal('abcccccc');
    });

    it('should skip symbols in the excluded list', function(){
      var excludedSymbols = ['a'];

      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('cba', null, excludedSymbols)).to.equal('cba');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaa', null, excludedSymbols)).to.equal('aaaa');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaabbb', null, excludedSymbols)).to.equal('aaaab');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aabcccccc', null, excludedSymbols)).to.equal('aabc');
    });

    it('should process symbols in the includes list and skip other symbols', function(){
      var includedSymbols = ['a'];
      var excludedSymbols = ['b'];

      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('cba', includedSymbols, excludedSymbols)).to.equal('cba');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaa', includedSymbols, excludedSymbols)).to.equal('a');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aaaabbb', includedSymbols, excludedSymbols)).to.equal('abbb');
      expect(sequenceKnife.removeDuplicateConsecutiveSymbols('aabbcccccc', includedSymbols, excludedSymbols)).to.equal('abbcccccc');
    });

  });

  describe('#reverse()', function(){
    it('should reverse symbols in the given sequence', function(){
      expect(sequenceKnife.reverse('cba')).to.equal('abc');
      expect(sequenceKnife.reverse('dabc')).to.equal('cbad');
      expect(sequenceKnife.reverse('')).to.equal('');
    });
  });

  describe('#sortSymbols()', function(){
    it('should sort symbols in the given sequence', function(){
      expect(sequenceKnife.sortSymbols('cba')).to.equal('abc');
      expect(sequenceKnife.sortSymbols('dabc')).to.equal('abcd');
      expect(sequenceKnife.sortSymbols('')).to.equal('');
    });
  });

  describe('#truncateBack()', function(){
    it('should return original sequence if shorter than maxLength', function(){
      expect(sequenceKnife.truncateBack('cba', 3)).to.equal('cba');
      expect(sequenceKnife.truncateBack('cba', 4)).to.equal('cba');
      expect(sequenceKnife.truncateBack('cb', 2)).to.equal('cb');
      expect(sequenceKnife.truncateBack('', 2)).to.equal('');
    });

    it('should return truncated sequence if shorter than maxLength', function(){
      var moreSymbol = sequenceKnife.moreSymbol();

      expect(sequenceKnife.truncateBack('cbaa', 3)).to.equal('cb'+moreSymbol);
      expect(sequenceKnife.truncateBack('cbaawererw', 4)).to.equal('cba'+moreSymbol);
    });

  });

  describe('#truncateFront()', function(){
    it('should return original sequence if shorter than maxLength', function(){
      expect(sequenceKnife.truncateFront('cba', 3)).to.equal('cba');
      expect(sequenceKnife.truncateFront('cba', 4)).to.equal('cba');
      expect(sequenceKnife.truncateFront('cb', 2)).to.equal('cb');
      expect(sequenceKnife.truncateFront('', 2)).to.equal('');
    });

    it('should return truncated sequence if shorter than maxLength', function(){
      var moreSymbol = sequenceKnife.moreSymbol();

      expect(sequenceKnife.truncateFront('cbaa', 3)).to.equal(moreSymbol+'aa');
      expect(sequenceKnife.truncateFront('cbaawererw', 4)).to.equal(moreSymbol+'erw');
    });

  });

});