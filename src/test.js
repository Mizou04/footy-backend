#!/usr/local/nodejs/bin/node

// // let qs = require("querystring")
// // let sampleUrl = "/standings?season=2022&league=39&country=morocco";

// // let spacedString = "country=new zeeland\0";

// // let enc = qs.parse(sampleUrl)
// // // console.log(JSON.stringify(enc))

// // let mtchs = /(\w+)\?(\w+=\w+)/igm.exec(sampleUrl);


// // let input = {
// //   params : "season=2022&id=39"
// // }

// // console.log(process.env.API_KEY)

// // let paramsObj = input.params.split("&").reduce((init, curr)=>{
// //   let obj = {};
// //   let currArr = curr.split("=");
// //   let key = currArr[0];  
// //   let value = currArr[1];
// //   init[key] = value;
// //   return init
// // }, {})
// // console.log(mtchs[2])
// let {Writable, Readable, Transform} = require("stream");

// function generateData(str = "hamza"){ // Readable is for generating data
//   let buff = new ArrayBuffer(str.length);
//   let int8Arr = new Uint8Array(buff);
//   let strm = new Readable({
//     objectMode : true,
//     read(){
//     }
//   })

//   strm.push(Buffer.from(str));
 
//   // strm.push( int8Arr.map((v, index) => {
//   //   v = str.charCodeAt(index);
//   //   return v;
//   // }))
//   return strm;
// }

// function transformer(){
//   let count = 0;
//   let strm = new Transform({
//     objectMode : true,
//     transform(data, _, done){
//       done(null, {data : data, count : ++count});
//     }
//   })

//   return strm
// }

// function writeData(){ // Writable is for rendering data
//   let strm = new Writable({
//     objectMode : true,
//     write(data, _, done){
//       console.log(data.data)
//       done();
//     }
//   })
//   return strm
// }

// // generateData()
// // .pipe(transformer())
// // .pipe(writeData())


// // let arr = new ArrayBuffer(8);
// // let vue = new DataView(arr);
// // vue.setInt32(0, 8, true);
// // console.log(vue)
// // strm
// // let http = require("http")
// // let server = http.createServer({}, (req,res)=>{

// //   let qs = require("qs");
// //   let url = new URL(req.url + "?" + "season=2300", "http://localhost:4000");
// //   console.log(url.search)
// // })

// // server.listen(4000, ()=> console.log("HI"))

// let arr = [];
// for(let i = 2016; i <= 2022; i++){
//   arr.push({year : i})
// }

// // console.log(arr);

// let v = arr.slice(-3).reduce((prev, curr, i)=>{
//   prev[i] = curr.year;
//   return prev
// }, [])

let qs = require( "qs")

let url = new URL("/hamza?id&name=123", `http://localhost`);

let po = qs.parse(url.searchParams.toString());


console.log(url.href)

// console.log("<Buffer 33 34 33 35 38 3a 43 20 30 36 20 4e 6f 76 20 32 30 32 32 20 32 32 3a 35 37 3a 32 34>".toString());

// let cp = require("child_process")
// let path = require("path")

// let spawned = cp.spawn("./persistence/redis/run-server.sh");
// let grep = cp.spawn("grep", ["/"]);

// cp.execFile(path.resolve(__dirname, "./persistence/redis/run-server.sh"))

// spawned.on("data", (data)=>{
//   console.log(data);
// })

// spawned.on('close', (code) => {
//   if (code !== 0) {
//     console.log(`ps process exited with code ${code}`);
//   }
//   grep.stdin.end();
// });

// grep.stdout.on('data', (data) => {
//   console.log(data.toString());
// });


// spawned.on("spawn", e => console.log("spawned"))