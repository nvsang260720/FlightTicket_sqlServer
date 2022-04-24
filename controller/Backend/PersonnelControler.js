const User = require('../../models/User')
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

const deletePersonnel = async(req, res) => {
	const personnelId = req.params.id 
	console.log(userId)
	
	if(!userId) return res.json("fail id user")
    try {
		
		var pool = await conn;
		var sqlString = " DELETE * FROM NHANVIEN WHERE id =" + personnelId;
		const deletedUser = await User.findOneAndDelete({_id :userId})
		if (!deletedUser)
			res.redirect('/admin')
		else {
			res.redirect('/admin/get-user')
			
		}	
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

module.exports = {
    getPersonnel,
    deletePersonnel,
	getHome,
	getAddPersonnel
}