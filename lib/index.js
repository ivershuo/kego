const WordTree  = require('./utils/wordtree');
const CharChain = require('./utils/charchain');

const randNum = function(max){
  return Math.floor(Math.random() * max);
}

class Kego{
  constructor(seed={}){
    let charTable = {};
    for(let char in seed){
      let chain = seed[char];
      let charList = [];
      for(let nc in chain){
        let num = Math.ceil(chain[nc] * 1000);
        charList = charList.concat(new Array(num + 1).join(nc).split(''));
      }
      charTable[char] = charList.slice(0, 1000).sort(() => Math.random() - 0.5);
    }
    this.charTable = charTable;
    this.chars = Object.keys(seed);
  }

  gen(length = 5, startChar){
    let wordChars = [];
    const charTable = this.charTable;
    let lastChar;
    if(!startChar){
      lastChar = this.chars[randNum(this.chars.length)];
    } else {
      lastChar = startChar.toString().toLowerCase();
    }
    wordChars.push(lastChar);
    while(--length){
      let charKey = charTable[lastChar];
      if(charKey){
        lastChar = charKey[randNum(1000)];
        wordChars.push(lastChar);
      } else {
        break;
      }  
    }
    return wordChars.join('');
  }
}
Kego.WordTree  = WordTree;
Kego.CharChain = CharChain;

module.exports = Kego;