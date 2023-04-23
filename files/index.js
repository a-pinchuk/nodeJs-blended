const fs = require('fs/promises');
const path = require('path');

// console.log(__dirname);
// console.log(__filename);

const moviesPath = path.join(__dirname, '..', 'db', 'movies.json');
const andriiPath = path.join(__dirname, '..', 'andrii', 'movies.json');
// console.log(moviesPath);

const asyncHandler = async (func, data) => {
  try {
    if (data) {
      return await func(JSON.stringify(data));
    }
    return await func();
  } catch (error) {
    console.log(error);
  }
};

class OperationsWithFiles {
  constructor(moviesPath, andriiPath) {
    this.moviesPath = moviesPath;
    this.andriiPath = andriiPath;
  }

  read = async () => {
    let data = await fs.readFile(this.moviesPath, 'utf-8');
    return data;
  };

  add = async newData => {
    const data = await fs.writeFile(this.moviesPath, JSON.stringify(newData, null, 4));
    return data;
  };

  update = async newData => {
    const data = await fs.appendFile(this.moviesPath, JSON.stringify(newData, null, 4));
    return data;
  };

  remove = async () => {
    return await fs.unlink(this.moviesPath);
  };

  replace = async () => {
    await fs.rename(this.moviesPath, this.andriiPath);
  };
}

const file = new OperationsWithFiles(moviesPath, andriiPath);
// file.read();

const data = [
  {
    Title: 'Avatar',
    Year: '2009',
  },
  {
    Title: 'I Am Legend',
    Year: '2007',
  },
  {
    Title: '300',
    Year: '2006',
  },
];

// file.add(data);

// file.update({
//   Title: 'NewAvatar3',
//   Year: '2029',
// });
// file.remove();
// file.replace();
// asyncHandler(file.remove);
asyncHandler(file.add, data);
