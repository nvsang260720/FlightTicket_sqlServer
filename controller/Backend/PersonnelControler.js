
const {conn, sql} = require('../../database/connectDB')

const getHome = async(req, res) => {
	var pool = await conn;
	var sqlString = " SELECT * FROM CHINHANH";
	return await pool.request().query(sqlString, function(err, data){
		console.log(err, data.recordset)
		res.render('home', { chinhanh: data.recordset});
	})
	           
}

const getPersonnel = async(req, res) => {
	
    try {
        var pool = await conn;
		var sqlString = " SELECT * FROM NHANVIEN";
		await pool.request().query(sqlString, async(err, data) => {
			const personnel = data.recordset;
			console.log(err, personnel)
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
	
	var pool = await conn;
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
	console.log(personnelId)

	var pool = await conn;
	var sqlString = "DELETE FROM NHANVIEN WHERE MaNhanVien = @personnelId" ;
	return pool.request()
	.input('personnelId', sql.NVarChar, personnelId)
	.query(sqlString, function(err, data){
		res.redirect("/admin/personnel")
	})
}

const getEditPersonnel = async (req, res)=> {
	const personnelId = req.params.id 
	console.log(personnelId)
	var pool = await conn;
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
	var pool = await conn;
	var sqlString = "UPDATE NHANVIEN SET MaChiNhanh = @machinhanh, Ten = @name, DiaChi = @diachi, SoDienThoai = @moblie , Luong = @price  WHERE MaNhanVien = @maso";
	return await pool.request()
	.input("maso", sql.NVarChar, maso)
	.input("machinhanh", sql.NVarChar, machinhanh)
	.input("name" , sql.NVarChar, name)
	.input("diachi" , sql.NVarChar, diachi)
	.input("moblie" , sql.NVarChar, moblie)
	.input("price" , sql.NVarChar, price)
	.query(sqlString, function(err, data){
		console.log(err, data.recordset)
		res.redirect("/admin/personnel")
	})
}
module.exports = {
    getPersonnel,
    deletePersonnel,
	getHome,
	getAddPersonnel,
	postAddPersonnel,
	getEditPersonnel,
	postEditPersonnel
}