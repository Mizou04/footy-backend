#!/usr/local/nodejs/bin/node

// let qs = require("querystring")
// let sampleUrl = "/standings?season=2022&league=39&country=morocco";

// let spacedString = "country=new zeeland\0";

// let enc = qs.parse(sampleUrl)
// // console.log(JSON.stringify(enc))

// let mtchs = /(\w+)\?(\w+=\w+)/igm.exec(sampleUrl);

// console.log(mtchs[2])

let input = {
  params : "season=2022&id=39"
}

let paramsObj = input.params.split("&").reduce((init, curr)=>{
  let obj = {};
  let currArr = curr.split("=");
  let key = currArr[0];  
  let value = currArr[1];
  init[key] = value;
  return init
}, {})

console.log(paramsObj)