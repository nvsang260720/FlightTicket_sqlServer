
const sql = require('mssql')
const {config, config_dn, config_sg, config_hn} = require('./config')
const connectDB = async (server) => {
  await sql.close()
  
   if(server == "tt"){
      console.log("connect server: " + server);
      let pool = await sql.connect(config).catch(err => console.log(err))
      return pool
  }
   if(server == "dn"){
      console.log("connect server: " + server);
      let pool = await sql.connect(config_dn).catch(err => console.log(err))
      return pool
   }  
   if(server == "sg"){
      console.log("connect server: " + server);
      await sql.close()
      let pool = await sql.connect(config_sg).catch(err => console.log(err))
      return pool
   }
   if(server == "hn"){
     console.log("connect server: " + server);
    let pool = await sql.connect(config_hn).catch(err => console.log(err))
    return pool
   }
   
}

module.exports = {
  connectDB, sql
}
