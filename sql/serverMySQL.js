connection = require('mysql').createConnection({
  host: 'localhost',
  user: 'sytek',
  password: 'Cycki12345',
  database: 'discouthero'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to SQL!');
});
const sqlQiuery = `CREATE TABLE test (
  personid int NOT NULL AUTO_INCREMENT,
  lastName varchar(255) NOT NULL,
  firstName varchar(255),
  age int,
  createdAt TIMESTAMP,
  PRIMARY KEY (Personid)
)`
const insert = `INSERT INTO Persons (firstName, lastName,createdAt )
VALUES ('Lars', ? , now(s));`
const insertCol = `ALTER TABLE Persons add timeZone varchar(255)`;

const get = `select * from persons`
connection.query(get, ['cyganski cyganek', new Date()], (error, results, fields) => {
  if (error) throw new Error(error);
  console.log('fields: ', fields);
  console.log('results: ', results);
});




connection.end();