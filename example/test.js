const Kego = require('../lib');

/* This seed chain is gened from the Marvel film's dialogues*/
const seed = require('./marvel.seed.json');

let kego = new Kego(seed);
let word = kego.gen();
console.log(word);