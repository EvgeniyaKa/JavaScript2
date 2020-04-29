
function quoteTwo(str, quoteBefore, quoteAfter) {
  let result = str.replace(quoteBefore, quoteAfter);
  return result;
}

let aquoteBefore = /\s\'/g;
let quoteAfter = ' \"';
let str = "Он отвернулся и, отходя, пробормотал: 'А всё-таки это совершенно против правил' (Лермонтов). aren't";
result = quoteTwo(str, quoteBefore, quoteAfter)

str = resuit;

quoteBefore = /\'\s/g;
quoteAfter = '" ';

result = quoteTwo(str, quoteBefore, quoteAfter);

console.log(result);