// 1
const mysql = require('mysql')

// 2
const dbDetails = {
  connectionLimit : 10,
  host     : process.env.MYSQL_HOST || 'pfw0ltdr46khxib3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : process.env.MYSQL_USERNAME || 'ol4r6cotc3k8pmtz',
  password : process.env.MYSQL_PASSWORD || 'fpyz2ha87t8wxwji',
  database : process.env.MYSQL_DATABASE || 'xzjrs5msjczif9pp'
}
const connection = mysql.createConnection(dbDetails);
// const connection = mysql.createConnection("mysql://pyqr2bfxi8aoslar:i6x24a129yacj482@phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/jhfzoit8jnhbijbp");

// 3
function allTreats(callback) {
  const query = `
    SELECT * 
    FROM treats
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allTreats = allTreats


function createTreat(treat, callback) {
  // 1
  const query = `
    INSERT INTO treats (amount, date)
    VALUES (?, ?)
  `

  // 2
  const params = [treat.amount, treat.date]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result.insertId)
  })
}
exports.createTreat = createTreat


  
function deleteTreat(treatId, callback) {
  
  //1
  let query = `
  DELETE FROM treats
  WHERE id = ?
  `
  
  //2
  let params = [treatId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deleteTreat = deleteTreat





function updateTreat(id, data, callback) {

  let query = `
  UPDATE treats
  SET completed = ?
  WHERE id = ?
  `

  let params = [data.completed, id]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

  
}
exports.updateTreat = updateTreat
