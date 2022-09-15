const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')




//_______________________________________________ Create College ______________________________________________________//


const createCollege = async function(req, res){
    try{

        let collegeData = req.body
        const nameRegex = /^[a-z]+$/
        const fullnameRegex = /^[a-zA-Z\s]+$/
        const logolinkRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
        
        // validation for college name
        if(!collegeData.name) return res.status(400).send({status : false, message : "College name is mandatory"})

        if (!collegeData.name.match(nameRegex)) return res.status(400).send({status:false, message: "name should be in lowercase"})  
        
        let college = await collegeModel.findOne({name: collegeData.name})

        if(college) return res.status(400).send({status:false , message: "College already exist"})

        // validation for fullname 
        if(!collegeData.fullName) return res.status(400).send({status : false, message : "Please provide full name of College"})
      
        if (!collegeData.fullName.match(fullnameRegex)) return res.status(400).send({status:false,msg: "name should be in lowercase"})  
         
        //validation for logoLink
        if(!collegeData.logoLink) return res.status(400).send({status : false, message : "Please provide Logolink"})

        if (!collegeData.logoLink.match(logolinkRegex)) return res.status(400).send({ status:false , message: "logolink is invalid"})  

        // College is created
        let createCollege = await collegeModel.create(collegeData)
        // using destructure find the key value of College
        const { name,fullName,logoLink } = createCollege
        
        // response hit at postman
        let obj = {
            name : name,
            fullName : fullName,
            logoLink : logoLink,
            isDeleted : false
        }
        
        return res.status(201).send({ status : true , data : obj})

    }
    catch (err) {
        return res.status(500).send({ status : false, message : err.message})
    }
}


//_____________________________________________ Get college Interns ______________________________________________________//


const getList = async function(req,res){
    try{
        let data = req.query
        
        if(Object.keys(data) == 0) return res.status(400).send({status : false, message : "Please provide College Name"})
        
        // finding the valid college 
        let findCollege = await collegeModel.findOne({name : data.name, isDeleted : false})
        
        if(!findCollege) return res.status(404).send({status:false , message:"No such college"})

        const {name, fullName, logoLink} = findCollege
    
        if(findCollege.length == 0) return res.status(404).send({status : false, message : "No such a College"})
        //console.log(findCollege);

        let CollegeId = findCollege._id
        //console.log(CollegeId)

        let findIntern = await internModel.find({collegeId : CollegeId}).select({name : 1, email : 1, mobile : 1})
        
        if(findIntern.length == 0) return res.send({status:false , message:"No intern is apply"})
        
        let obj = {
            name : name,
            fullName : fullName,
            logoLink : logoLink,
            interns : findIntern
        }

        return res.status(200).send({status: true ,data : obj})
    }
    catch(err){
        res.status(500).send({status : false, error : err.message})
    }
}


//_______________________________________ module export _____________________________________________//

module.exports.createCollege= createCollege;

module.exports.getList = getList