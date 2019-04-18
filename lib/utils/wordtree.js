const WordTree = class {
  constructor(){
    this.wordsMap = {};
  }

  addWords(words, i=false){
    let wordsMap = this.wordsMap;
    words = Array.isArray(words) ? words : [words];
    words.forEach((word) => {
      word = word.toString();
      if(i){
        word = word.toLowerCase();
      }
      if(wordsMap[word]){
        wordsMap[word] += 1;
      } else {
        wordsMap[word] = 1;
      }
    });
    return this;
  }

  addText(text, i=false, preHook=null, afterHook=null){
    if(typeof preHook === 'function'){
      text = preHook(text);
    }
    let words = text.replace(/([\s\n])+/g, ' ').match(/\b([a-zA-Z]+)/g);
    if(typeof afterHook === 'function'){
      words = afterHook(words);
    }
    return this.addWords(words, i);
  }

  /**
   * @param max 最多返回词个数
   * @param limit 词最少出现多少次
   */
  getTree(max, limit=0){
    max = max || Infinity;
    let wordsMap = this.wordsMap;
    let wordList = [];
    let wordsTree = [];
    for(let key in wordsMap){
      let num = wordsMap[key];
      if(num >= limit){
        if(wordList[num]){
          wordList[num].push(key);
        } else {
          wordList[num] = [key];
        }
      }
    }
    for(let c = 0, count = wordList.length; --count;){
      let words = wordList[count];
      if(c > max){
        break;
      }
      if(words){
        words.forEach(word => {
          if(c++ < max){
            wordsTree.push({word, count});
          }
        });
      }
    }
    return wordsTree;
  }

  getWords(){
    return Object.keys(this.wordsMap);
  }

  getTotal(){
    return this.getWords().length;
  }
}

module.exports = WordTree;