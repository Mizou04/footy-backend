export class UnavailableData extends Error{
  constructor(public msg : string){
    super(msg);
  }

  static type = "Unavailable Data"
}