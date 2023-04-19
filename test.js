
const autocannon = require('autocannon')

async function foo (){
   const result= await autocannon({
        url: 'http://localhost:7077',
        connections: 1000, //default
        pipelining: 1, // default
        duration: 10, // default
        require :[
      {
          method:"GET",
          path:"/users"
      },
      {
          method:"POST",
          path:"/users",
          body: JSON.stringify(
              {
                  name:"string",
                  password: "123wd545",
                  budget:10000011
              }
          )
      }
        ]
      }, console.log)
      
      result.on("start", ()=> console.log("Test started"))
      result.on("done", ()=> muFunc)
      
      function muFunc(req){
          console.log(req);
      }
      
      autocannon.track(result, {renderProgressBar: false})

}


foo ()