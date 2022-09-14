const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')


const createCollege = async function(req, res){
    try{
        let collegeData = req.body

        if(!collegeData.name) return res.status(400).send({status : false, msg : "College name is mandatory"})

        if(!collegeData.fullName) return res.status(400).send({status : false, msg : "Please provide full name of College"})

        if(!collegeData.logoLink) return res.status(400).send({status : false, msg : "Please provide Logolink"})

        let createCollege = await collegeModel.create(collegeData)
        return res.status(201).send({ status : true, msg :"college created successfully", data : createCollege})
    }
    catch (err) {
        return res.status(500).send({ status : false, msg : err.message})
    }
}


//_____________________________________Get college Interns______________________________________________-

const getList = async function(req,res){
    try{
        let data = req.query
        if(Object.keys(data) == 0) return res.status(400).send({status : false, msg : "Please provide College Name"})
        
        let findCollege = await collegeModel.findOne({name : data.name, isDeleted : false})
        const {name, fullName, logoLink} = findCollege
    
        if(findCollege.length == 0) return res.status(404).send({status : false, msg : "No such a College"})
        //console.log(findCollege);

        let CollegeId = findCollege._id
        //console.log(CollegeId)

        let findIntern = await internModel.find({collegeId : CollegeId}).select({name : 1, email : 1, mobile : 1})
        
        let obj = {
            name : name,
            fullName : fullName,
            logoLink : logoLink,
            interns : findIntern
        }

        return res.status(400).send({data : obj})
    }
    catch(err){
        res.status(500).send({status : false, error : err.message})
    }
}



module.exports.createCollege= createCollege;
module.exports.getList = getList