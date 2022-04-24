
const sql = require('mssql/msnodesqlv8')


var config = {
  server: "DESKTOP-OHES8UJ\\TRUNGTAM",
  port: 1433,
  user: "sa",
  password: "123456",
  database: "QL_VEMAYBAY",
  driver: "msnodesqlv8"
}
const conn = new sql.ConnectionPool(config).connect().then(pool => {
  return pool;
})
module.exports = {
  conn: conn,
  sql: sql
}
