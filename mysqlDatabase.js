// 1
const mysql = require('mysql')

// 2
const dbDetails = {
  connectionLimit : 10,
  host     : process.env.MYSQL_HOST || 'phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user     : process.env.MYSQL_USERNAME || 'pyqr2bfxi8aoslar',
  password : process.env.MYSQL_PASSWORD || 'i6x24a129yacj482',
  database : process.env.MYSQL_DATABASE || 'jhfzoit8jnhbijbp'
}
const connection = mysql.createConnection(dbDetails);
// const connection = mysql.createConnection("mysql://pyqr2bfxi8aoslar:i6x24a129yacj482@phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/jhfzoit8jnhbijbp");

// 3
function allMeals(callback) {
  const query = `
    SELECT * 
    FROM meals
  `
  connection.query(query, null, (error, results) => {
    callback(error, results)
  })
}
exports.allMeals = allMeals


function createMeal(meal, callback) {
  // 1
  const query = `
    INSERT INTO meals (content, completed, date)
    VALUES (?, ?, ?)
  `

  // 2
  const params = [meal.content, meal.completed, meal.date]

  // 3
  connection.query(query, params, function (error, result) {
    callback(error, result.insertId)
  })
}
exports.createMeal = createMeal


  
function deleteMeal(mealId, callback) {
  
  //1
  let query = `
  DELETE FROM meals
  WHERE id = ?
  `
  
  //2
  let params = [mealId, callback]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })
}
exports.deleteMeal = deleteMeal





function updateMeal(id, data, callback) {

  let query = `
  UPDATE meals
  SET completed = ?
  WHERE id = ?
  `

  let params = [data.completed, id]

  //3
  connection.query(query, params, (error, result) => {
    callback(error, result)
  })

  
}
exports.updateMeal = updateMeal
