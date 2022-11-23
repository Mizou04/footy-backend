export default interface IResponse{
  "get": string,
  "parameters":{
    [key : string] : string
  },
  "errors": any[],
  "results": number,
  "paging": 
  {
   "current": number,
   "total": number
  },
  response : any[]
}