class CalculatorOop {
  constructor(operation, numbers) {
    this.operation = operation;
    this.numbers = numbers;
  }

  init = () => {
    return this.calculate(this.operation, this.numbers);
  };

  calculate = (op, numbersArr) => {
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
}

const [operation, ...data] = process.argv.splice(2);
const numbers = data.map(el => Number(el));

module.exports = new CalculatorOop(operation, numbers);
