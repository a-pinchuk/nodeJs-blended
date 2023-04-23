const [operation, ...data] = process.argv.splice(2);
const numbers = data.map(el => Number(el));

module.exports = {
  operation,
  numbers,
};
