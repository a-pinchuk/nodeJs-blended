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

module.exports = calculate;
