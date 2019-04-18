const CharsDef = (() => {
  let map = {};
  let charCode = 97;
  while(charCode < 123){
    map[String.fromCharCode(charCode++)] = {};
  }
  return map;
})();

class CharChain {
  constructor(){
    this.charMap   = CharChain.newCharMap();
    this.markovMap = CharChain.newCharMap();
    this.markovArr = CharChain.newCharMap();
  }

  addWord(word){
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    let chars = word.split('');
    for(let i = 0, l = chars.length - 1; i < l;){
      let char = chars[i],
          nextChar = chars[++i];
      this._reduce(char, nextChar);
    }
    return this;
  }

  addWords(words){
    words.forEach(word => {
      this.addWord(word);
    });
    return this;
  }

  rank(){
    const charMap = this.charMap;
    let markovMap = this.markovMap;
    let markovArr = this.markovArr;
    for(let char in charMap){
      let chains = charMap[char];
      let mChains = markovMap[char];
      let total = Object.values(chains).reduce((t, v) => t + v, 0);
      for(let c in chains){
        mChains[c] = chains[c]/total;
      }
      markovArr[char] = Object.keys(chains);
    }
    delete this.charMap;
    return this;
  }

  getChain(){
    return this.markovMap;
  }

  getSimpleChain(){
    return this.markovArr;
  }

  _reduce(char, nextChar){
    try{
      let charChain = this.charMap[char];
      if(!charChain[nextChar]){
        charChain[nextChar] = 1;
      } else {
        charChain[nextChar] += 1;
      }
    }catch(e){}    
    return this;
  }

  static newCharMap(){
    return JSON.parse(JSON.stringify(CharsDef));
  }
}

module.exports = CharChain;