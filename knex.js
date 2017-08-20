require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      // ssl      : process.env.DB_SSL
  }
});
knex(`goofspeilp1hands`)
.select("*")
.where({gameid : 1})
.asCallback((err, rows)=>{
      let array = []
  for (let row in rows[0]){
    if (rows[0][row] === true){
      array.push(row)
    }
  } if (array.length === 0){
    console.log('array empty!')
  }
  console.log(array)
  knex.destroy()
})
// getStaging(1, 'p1hands', "", function(staging1){
//   getStaging(1, 'p2hands', staging1, function(staging2){
//     console.log('player1 has', staging1)
//     console.log('player2 has', staging2)
//     if (parseInt(staging1) > parseInt(staging2)){
//       getStaging(1, 'deck', '', function(stagingdeck){
//         updateScore(1, 1, stagingdeck, function(){
//           console.log('player 1 won ', stagingdeck, " points")
//           knex.destroy()
//         })
//       }
//      )} else {
//        getStaging(1, 'deck', '', function(stagingdeck){
//         updateScore(1, 2, stagingdeck, function(){
//           console.log('player 2 won ', stagingdeck, " points")
//           knex.destroy()
//         })
//       })
//     }

//   })
// })

// getStaging(1, 2, function(staging2){
//   getStaging(1, 1, function(staging1){
//     console.log('player 1 has ', staging1)
//     console.log('player 2 has ', staging2)
//     if (parseInt(staging1, 10) > parseInt(staging2, 10)){
//       console.log('player1 wins')
//     } else if (parseInt(staging1, 10) < parseInt(staging2, 10)){
//       console.log('player2 wins')
//     } else{
//       console.log('nobody wins')
//     }
//     knex.destroy();
//   }, staging2)
// })