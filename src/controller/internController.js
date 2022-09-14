const internModel = require("../model/internModel")
const collegeModel = require("../model/collegeModel")

const createIntern = async function(req,res){
    try{
        let data = req.body
        let collegeName = data.collegeName
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const nameRegex = /^[a-z\s]+$/i
        const mobileRegex = /^[0-9]{10}$/

        if(Object.keys(data).length === 0) return res.status(400).send({status : false, msg : "Provide data. Body can't be empty!"})

        if(!data.name) return res.status(400).send({status : false, msg : "Name is Mandatory"})

        if(!data.name.match(nameRegex)) return res.status(400).send({status : false, msg : "Invalid format of Name"})

        if(!collegeName) return res.status(400).send({status : false, msg : "College Name is mandatory"})

        if (!data.mobile) return res.status(400).send({ Status: false, msg: "mobile is required" })

        if(!data.mobile.match(mobileRegex)) return res.status(400).send({status : false, msg : "Invalid format of mobile number"})
        
        if (!data.email) return res.status(400).send({ Status: false, msg: "email is required" })

        if(!data.email.match(emailRegex)) return res.status(400).send({status : false, msg : "Invalid Format of Email"})

        let validEmail = await internModel.findOne({email : data.email})

        if(validEmail) return res.status(400).send({status : false, msg : "Email already exist"})
               
        let findCollege = await collegeModel.findOne({name : collegeName})
        if(!findCollege){
            return res.status(404).send({status : false, msg : "No such a College"})
        }

        let CollegeId = findCollege._id.toString()
        data.collegeId = CollegeId // added college Id in DB 
        let intern = await internModel.create(data)
        //console.log(intern)
        
        let internresponse = {
            name : data.name,
            email : data.email,
            mobile : data.mobile,
            collegeId : CollegeId,
            isDeleted : false
        }

        return res.status(200).send({status : true, msg : "Intern is created", data : internresponse})

    }

    catch(err){
        res.status(500).send({status : false, error : err.message})
    }
}

module.exports.createIntern = createIntern