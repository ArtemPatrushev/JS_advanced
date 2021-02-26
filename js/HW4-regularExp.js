'use strict';

const textBlock = document.querySelector('.text');
const text = textBlock.innerHTML;
// console.log(text);

// const match = text.match(/(\s")|("\s)/gm);
const match = /(\s)'([^']+)'(\s)/gm;
    // (\s)'([^']+) '(\s)
// \s(')\w|\W(') |\w(')\s|\w(')$
// (\b")|("\b)
// (\b")|("\b)|\.(")?
// console.log(match);
    // (\s)(')(\w)

// const newText = text.replace(match, '"');
const newText = text.replace(match, '$1"$2"$3')
console.log(newText);
textBlock.innerHTML = `${newText}`;

// var re = /яблоки/gi;
// var str = 'Яблоки круглые и яблоки сочные.';
// var newstr = str.replace(re, 'апельсины');
// console.log(newstr); // апельсины круглые и апельсины сочные.
