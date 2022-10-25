import fs from "fs/promises";
import PATH_ from "path"

export default async function readFile(path : string) : Promise<string>{
  let data = await fs.readFile(path, {encoding:"utf-8"});
  return data.toString();
}