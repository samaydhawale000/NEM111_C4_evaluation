const  express = require("express")
const  app = express();
const cors = require("cors");
const dbConnection = require("./db");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use("/users",userRoute)
app.use("/posts",postRoute)


app.get("/",(req,res)=>{
    res.send("Full stack web application")
})

app.listen(8080,async()=>{

    try{
       await dbConnection
        console.log("DB connected !")
        console.log("server is running on port 8080")
    }
    catch(err){
console.log(err)
    }
    
})