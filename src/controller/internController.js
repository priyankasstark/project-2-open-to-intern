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

        if(Object.keys(data).length === 0) return res.status(400).send({status : false, message : "Provide data. Body can't be empty!"})
        
        // validation for intern name
        if(!data.name) return res.status(400).send({status : false, message : "Name is Mandatory"})

        if(!data.name.match(nameRegex)) return res.status(400).send({status : false, message : "Invalid format of Name"})
       
        // validation for college name 
        if(!collegeName) return res.status(400).send({status : false, message : "College Name is mandatory"})
        
        //validation for mobile
        if (!data.mobile) return res.status(400).send({ status: false, message : "mobile number is required" })

        if(!data.mobile.match(mobileRegex)) return res.status(400).send({status : false, message : "Invalid format of mobile number"})
        
        let validmobile = await internModel.findOne({mobile : data.mobile})

        if (validmobile)  return res.status(400).send({status: false , message:"Mobile number is already exist"})
        
        // validation for email
        if (!data.email) return res.status(400).send({ Status: false, message: "email is required" })

        if(!data.email.match(emailRegex)) return res.status(400).send({status : false, message : "Invalid Format of Email"})

        // checking duplicate email
        let validEmail = await internModel.findOne({email : data.email})

        if(validEmail) return res.status(400).send({status : false, message : "Email is already exist"})

        let findCollege = await collegeModel.findOne({name : collegeName})
         // if college doesnot exist 
        if(!findCollege){
            return res.status(404).send({status : false, message : "No such a College"})
        }
        
        let CollegeId = findCollege._id.toString()
        data.collegeId = CollegeId // added college Id in DB // collegeId is the key which we insert for our requirement
        //CollegeId is the id of findCollege

        // creating intern 
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