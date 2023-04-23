// node calc.js sum 3 3 3
// node calc.js sub 10 3 2
// node calc.js mult 4 3 2
// node calc.js div 12 3 2

// console.log(process.argv);

// console.log('🚀 ~ result:', calculate(operation, numbers));
const [operation, ...data] = process.argv.splice(2);
const numbers = data.map(el => Number(el));

const calculate = (op, numbersArr) => {
  let result = null;
  switch (op) {
    case 'sum':
      result = numbersArr.reduce((acc, el) => acc + el);
      break;
    case 'sub':
      result = numbersArr.reduce((acc, el) => acc - el);
      break;
    case 'mult':
      result = numbersArr.reduce((acc, el) => acc * el);
      break;
    case 'div':
      result = numbersArr.reduce((acc, el) => acc / el);
      break;
    default:
      result = 'Uknown operation type';
  }
  return result;
};
