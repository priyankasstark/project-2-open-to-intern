const express = require("express")
const bodyParser = require("body-parser")
const route = require("./routes/route.js")
const { default: mongoose } = require("mongoose")
const app = express()

app.use(bodyParser.json())
app.use('/',route)

mongoose.connect("mongodb+srv://PrachiRakhonde:TidE9uPBxvyZRFOn@cluster0.vdm2ccj.mongodb.net/group25Database?retryWrites=true&w=majority",{
    useNewUrlParser: true
})

.then(() => console.log("Mongoose is connected"))
.catch ( err => console.log(arr) )

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
