const internModel = require("../model/internModel")
const collegeModel = require("../model/collegeModel")



//____________________________________________ Create Intern __________________________________________________________//


const createIntern = async function(req,res){
    try{
        let data = req.body
        let collegeName = data.collegeName
        
        const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const nameRegex = /^[a-zA-Z\s]+$/
        const mobileRegex = /^[0-9]{10}$/

        if(Object.keys(data).length === 0) return res.status(400).send({status : false, msg : "Provide data. Body can't be empty!"})
        
        // validation for intern name
        if(!data.name) return res.status(400).send({status : false, msg : "Name is Mandatory"})

        if(!data.name.match(nameRegex)) return res.status(400).send({status : false, msg : "Invalid format of Name"})
       
        // validation for college name 
        if(!collegeName) return res.status(400).send({status : false, msg : "College Name is mandatory"})
        
        //validation for mobile
        if (!data.mobile) return res.status(400).send({ Status: false, msg: "mobile is required" })

        if(!data.mobile.match(mobileRegex)) return res.status(400).send({status : false, msg : "Invalid format of mobile number"})
        
        let validmobile = await internModel.findOne({mobile : data.mobile})

        if (validmobile)  return res.status(400).send({status: false ,msg:"Mobilenumber is already exist"})
        
        // validation for email
        if (!data.email) return res.status(400).send({ Status: false, msg: "email is required" })

        if(!data.email.match(emailRegex)) return res.status(400).send({status : false, msg : "Invalid Format of Email"})

        let validEmail = await internModel.findOne({email : data.email})

        if(validEmail) return res.status(400).send({status : false, msg : "Email already exist"})

        let findCollege = await collegeModel.findOne({name : collegeName})
         // if college doesnot exist 
        if(!findCollege){
            return res.status(404).send({status : false, msg : "No such a College"})
        }
        
        let CollegeId = findCollege._id.toString()
        data.collegeId = CollegeId // added college Id in DB // collegeId is the key which we insert for our requirement
        //CollegeId is the id of findCollege
        let intern = await internModel.create(data)
        
        // it is only for response at postman
        let internresponse = {
            name : data.name,
            email : data.email,
            mobile : data.mobile,
            collegeId : CollegeId,
            isDeleted : false
        }

        return res.status(200).send({status : true , data : internresponse})

    }

    catch(err){
        res.status(500).send({status : false, error : err.message})
    }
}

//_____________________________________ module export ____________________________________________________________// 

module.exports.createIntern = createIntern