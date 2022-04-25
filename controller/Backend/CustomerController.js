const {conn, sql} = require('../../database/connectDB')
const getCustomer = async(req, res) => {
	
    try {
        var pool = await conn;
		var sqlString = " SELECT * FROM KHACHHANG";
		await pool.request().query(sqlString, async(err, data) => {
			const customer = data.recordset;
			console.log(err, customer)
			return res.render('admin/customer/listCustomer', { customer: customer});
		
		})
        
    } catch (error) {
        res.json({ message: 'get ser fail' })
    }

}
const getEditCustomer = async(req, res)=> {
	const personnelId = req.params.id 
	console.log(personnelId)
	var pool = await conn;
	var sqlString = "SELECT MaKhachHang,Ten,DiaChi,SoDienThoai,CMND  FROM KHACHHANG WHERE MaKhachHang = @personnelId";
	return await pool.request()
	.input("personnelId", sql.NVarChar, personnelId )
	.query(sqlString, function(err, data){
		console.log(err, data.recordset)
		res.render('admin/customer/editCustomer' , {personnel : data.recordset})
	})
}
const postEditCustomer = async ( req, res) => {
	const {makhachang, name, diachi, moblie, cmnd} = req.body
	var pool = await conn;
	var sqlString = "UPDATE KHACHHANG SET  Ten = @name, DiaChi = @diachi, SoDienThoai = @moblie, CMND = @cmnd  WHERE MaKhachHang = @makhachang";
	return await pool.request()
	.input("makhachang", sql.NVarChar, makhachang)
	.input("name" , sql.NVarChar, name)
	.input("diachi" , sql.NVarChar, diachi)
	.input("moblie" , sql.NVarChar, moblie)
	.input("cmnd" , sql.Int, cmnd)
	.query(sqlString, function(err, data){
		console.log(err, data.recordset)
		res.redirect("/admin/customer")
	})
}
const deleteCustomer = async(req, res) => {
	const personnelId = req.params.id 
	console.log(personnelId)

	var pool = await conn;
	var sqlString = "DELETE FROM KHACHHANG WHERE MaKhachHang = @personnelId" ;
	return pool.request()
	.input('personnelId', sql.NVarChar, personnelId)
	.query(sqlString, function(err, data){
		res.redirect("/admin/customer")
	})
}


module.exports = {
 getCustomer,
 getEditCustomer,
 postEditCustomer,
 deleteCustomer
}