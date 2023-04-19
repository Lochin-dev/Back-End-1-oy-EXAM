const http =require("http");
const User =require("./models/users");
const Hous =require("./models/wearhous");
const Io=require("./utils/io")
const Users=new Io("./db/users.json")
const Wearhous=new Io("./db/wearhous.json")
const ee = require("./utils/events");
// const { log } = require("console");



const bodyParser = (request)=>{

    return new Promise((resolve , reject)=>{
        try{
          request.on("data", (chunk)=>{
            resolve(JSON.parse(chunk))
          })
        } catch (error) {
            reject()
        }
    })
}

const io = async (req , res)=>{
    // ======================== USERS =========================
    if(req.url==="/users" && req.method === "POST"){

        const {name, weight, password} = await bodyParser(req)
        const users= await Users.read()
        const userscount=users.length
        const newUser= new User(userscount+1, name, weight, password,  new Date() )
       Users.write([...users,  newUser])

       res.writeHead(201, 
        {
            "Content-Type":"Application/json"
        }
        )
       res.end(JSON.stringify({message: "Qo'shildi"}))
    } 

    // // ===================== WEARHOUS ========================

    else if(req.url==="/hous" && req.method === "POST"){
        const {name, weight} = await bodyParser(req)
        const wearhous= await Wearhous.read()
        const wearhouscount=wearhous.length
        const newHous= new Hous(wearhouscount+1, name, weight, new Date() )
        Wearhous.write([...wearhous,  newHous])



       res.writeHead(201, 
        {
            "Content-Type":"Application/json"
        }
        )
       res.end(JSON.stringify({message: "Qo'shildi"}))
    }




    // ====================== PAY ==============================

    else if(req.url==="/pay" && req.method === "POST"){

        const {fromUser, toHous, amount} = await bodyParser(req)
        const allUsers =await Users.read();
        const allWearhous=await Wearhous.read();

        const user=allUsers.find(user =>{
        return user.id === fromUser;
        })

        const hous=allWearhous.find(hous =>{
            return hous.id === toHous;
         })
      
         console.log(user);
       
         if (amount > allWearhous[hous.id-1].weight)  {
            res.end(JSON.stringify({message : "Yetarli emas"}))
        }
        

            ee.emit("pay", {fromId:user.id, toId:hous.id, amount })

        

         res.writeHead(200, {
            "Content-Type":"Aplication/json"
         })

         res.end(JSON.stringify({message: "To'landi"}))
    }


    // ===================== GET ===============================

    else if (req.url==="/users" && req.method==="GET"){
        const allUsers= await Users.read()
        res.end(JSON.stringify(allUsers))
    }
    else if(req.url==="/hous" && req.method === "GET"){
        const wearhous= await Wearhous.read()
       res.end(JSON.stringify(wearhous))
    }

}


http.createServer(io).listen(7777 , ()=>{
    console.log(7777);
})