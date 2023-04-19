const {EventEmitter} = require("events");

const Io=require("./io")
const Users= new Io("./db/users.json")
const Wearhous= new Io("./db/wearhous.json")

const ee=new EventEmitter()

ee.on("pay", async({fromId, toId, amount})=>{
 
    const allWearhous = await Wearhous.read()

    console.log(allWearhous[fromId-1].weight);

    const allUsers = await Users.read()

    allUsers[fromId-1].weight +=amount
    allWearhous[toId-1].weight -=amount

    Users.write([...allUsers])
    Wearhous.write([...allWearhous])
    
})

module.exports=ee