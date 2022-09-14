const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')


const createCollege = async function(req, res){
    try{
        let collegeData = req.body
        let createCollege = await collegeModel.create(collegeData)
        return res.send ({ status : true, msg :"college created successfully", data : createCollege})
    }
    catch (err) {
        return res.status(500).send ({ status : false, msg : err.message})
    }
}



module.exports.createCollege= createCollege;