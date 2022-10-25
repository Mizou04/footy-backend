import http from "http";
import qs from "querystring"
import "dotenv/config"
import callApi from "./api/callApi";
import mockCallApi from "./api/mockCallApi";

let host = "localhost", port = 3000;

let server = http.createServer({}, async (req, res)=>{
  res.writeHead(200, "OK", {
    "Content-type" : "application/json"
  })
  
  console.log("req.url", req.url);

  let hasParams = (req.url as string).indexOf("?") >=0;

  let url = req.url?.slice(0, hasParams ? req.url.indexOf("?") : undefined);
  console.log("url", url);

  let paramsString = hasParams ? req.url?.slice(req.url.indexOf("?")+1) as string : '';

  console.log("params : ", paramsString)


  try {
    if(!paramsString) throw new Error("params are necessary");
    let callResult = await mockCallApi({url : url as string, params : paramsString});
    
    switch(url){
      case "/api/standings" : {
        try {
          res.end(callResult);
          //res.end(await callApi({url, params : paramsString}));
        } catch (error) {
          console.log(error);
          res.writeHead(500, undefined, {});
          res.end("something went wrong with server")
        }
        break;
      }
      default : 
        res.writeHead(404);
        res.end("{error : not implemented}");
        break;
    }
  } catch (error) {
    console.log(error);
    res.writeHead(404);
    res.end(`{error : page not found}`);
  }

})


server.listen(port, host, undefined, ()=>{
  console.log("listening")
})
