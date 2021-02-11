const express = require('express') 
const database = require('./mysqlDatabase')


const app = express()
app.use('/', function(req, res, next) {
  //var allowedOrigins = ['http://localhost:3000', 'http://localhost:6006', "https://*"];
  var origin = req.headers.origin;
  //console.log(origin);
  /*if(allowedOrigins.indexOf(origin) > -1){
  }*/

  res.setHeader('Access-Control-Allow-Origin', origin || "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.json())


// let meals = [
//   {
//     id: 1,
//     content: "Lunch",
//     completed: 2,
//     date: "03/01/2021"
//   },
//   {
//     id: 2,
//     content: "Breakfast",
//     completed: 3,
//     date: "03/01/2021"
//   },
//   {
//     id: 3,
//     content: "Dinner",
//     completed: 4,
//     date: "03/01/2021"
//   }
// ]
  

app.get('/api/meals', (req, res) => {
  database.allMeals((error, meals) => {
    // 2
    if (error) {
      res.send({error})
      return
    }
    // 3
    res.send({meals})
  })
})


const port = process.env.PORT || 3306
app.listen(port, () => {
  console.log(`The server is listening on port ${port}`)
})
 

app.post('/api/meals/', (req, res) => {
  const meal = req.body
  // 1
  database.createMeal(meal, (error, mealId) => {
    const meal = req.body
    // 2
    if (error) {
      res.send({error})
      return
    }

    meal.id = mealId;

    // 4
    res.send({meal})
  })
})



app.delete('/api/meals/:id', (req, res) => {
  const id = req.params.id;

  database.deleteMeal(id, (error, result) => {
    // 2
    if (error) {
      res.send({error})
      return
    }

    //4
    res.send({result})
  })
})

app.use(express.json())
app.patch('/api/meals/:id', (req, res) => {
    const id = req.params.id
    const mealData = req.body

  database.updateMeal(id, mealData, (error, result) => {
    // 2
    if (error) {
      res.send({error})
      return
    }
    //4
    res.send({result})
  })
  })
  