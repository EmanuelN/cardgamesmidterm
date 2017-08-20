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
function getStaging(gameid, table, otherval, cb1, cb2){
  knex(`goofspeil${table}`).select('staging').whereNotNull('staging').andWhere('gameid', gameid)
  .asCallback((err, rows)=>{
    cb1(rows[0].staging, otherval);
    if (cb2){
      cb2()
    }
  })
}
function removeStaging(gameid, playerid, cb){
  knex(`goofspeilp${playerid}hands`)
  .where({gameid: gameid})
  .update({staging: null})
  .asCallback((err, rows)=>{

    cb()
  })
}
function updateScore(gameid, playerid, pts, cb){
  knex(`goofspeilp${playerid}hands`)
  .where({gameid: gameid})
  // .update({staging: null})
  .increment('score', parseInt(pts, 10))
  .asCallback((err, rows)=>{

    cb()
  })
}

updateScore(1, 1, 10, function(){
  removeStaging(1, 1, function(){
    knex.destroy()
  })
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