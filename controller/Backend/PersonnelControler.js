
const {connectDB, sql} = require('../../database/connectDB')
const getHome = async(req, res) => {
	// var pool = await conn;
	let db = await connectDB(process.env.SERVER_NAME)
	console.log(process.env.SERVER_NAME)
	var sqlString = " SELECT * FROM CHINHANH";
	return db.request().query(sqlString, function(err, data){
		res.render('home', { chinhanh: data.recordset});
	})
	           
}
const getDB = async(req, res) => {
	const {machinhanh} = req.body;
	req.app.locals.serverName = machinhanh;
	res.redirect('/admin/personnel')

}

const getPersonnel = async(req, res) => {
    try {
        let pool = await connectDB(req.app.locals.serverName)
		var sqlString = " SELECT * FROM NHANVIEN";
		pool.request().query(sqlString, async(err, data) => {
			const personnel = data.recordset;
			return res.render('admin/personnel/listPersonnel', { personnel: personnel});
		
		})
        
    } catch (error) {
        res.json({ message: 'get ser fail' })
    }

}
const getAddPersonnel = (req, res) => {
    res.render('admin/personnel/addPersonnel', { title: 'Admin' });

}

const postAddPersonnel = async(req, res) => {
	const {maso, machinhanh, name, diachi, moblie, price} = req.body;
	console.log(req.body);
	
	let pool = await connectDB(req.app.locals.serverName)
	var sqlString = " INSERT INTO NHANVIEN (MaNhanVien , MaChiNhanh, Ten, DiaChi, SoDienThoai, Luong) VALUES (@maso, @machinhanh , @name, @diachi, @moblie,  @price)";
	return pool.request()
		.input('maso', sql.NVarChar, maso)
		.input('machinhanh',sql.NVarChar, machinhanh)
		.input('name', sql.NVarChar, name)
		.input('diachi', sql.NVarChar, diachi)
		.input('moblie',sql.NVarChar, moblie)
		.input('price', sql.Float,price)
		.query(sqlString, function(err, data){
			res.redirect("/admin/personnel")
		})

}
const deletePersonnel = async(req, res) => {
	const personnelId = req.params.id 
	

	let pool = await connectDB(process.env.SERVER_NAME)
	var sqlString = "DELETE FROM NHANVIEN WHERE MaNhanVien = @personnelId" ;
	return await pool.request()
	.input('personnelId', sql.NVarChar, personnelId)
	.query(sqlString, function(err, data){
		console.log("delete" + personnelId)
		res.redirect("/admin/personnel")
	})
}

const getEditPersonnel = async (req, res)=> {
	const personnelId = req.params.id 
	console.log(personnelId)
	let pool = await connectDB(process.env.SERVER_NAME)
	var sqlString = "SELECT MaNhanVien,MaChiNhanh,Ten,DiaChi,SoDienThoai,Luong  FROM NHANVIEN WHERE MaNhanVien = @personnelId";
	return await pool.request()
	.input("personnelId", sql.NVarChar, personnelId )
	.query(sqlString, function(err, data){
		console.log(err, data.recordset)
		res.render('admin/personnel/editPersonnel' , {personnel : data.recordset})
	})
}
const postEditPersonnel = async ( req, res) => {
	const {maso, machinhanh, name, diachi, moblie, price} = req.body
	let pool = await connectDB(process.env.SERVER_NAME)
	var sqlString = "UPDATE NHANVIEN SET MaChiNhanh = @machinhanh, Ten = @name, DiaChi = @diachi, SoDienThoai = @moblie , Luong = @price  WHERE MaNhanVien = @maso";
	return await pool.request()
	.input("maso", sql.NVarChar, maso)
	.input("machinhanh", sql.NVarChar, machinhanh)
	.input("name" , sql.NVarChar, name)
	.input("diachi" , sql.NVarChar, diachi)
	.input("moblie" , sql.NVarChar, moblie)
	.input("price" , sql.NVarChar, price)
	.query(sqlString, function(err, data){
		res.redirect("/admin/personnel")
	})
}
module.exports = {
	getDB,
    getPersonnel,
    deletePersonnel,
	getHome,
	getAddPersonnel,
	postAddPersonnel,
	getEditPersonnel,
	postEditPersonnel
}