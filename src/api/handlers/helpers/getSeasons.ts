//seasons based on type of the championship

/**
 * 
 * @param date starting date (current)
 * @returns 
 */

export function getLast3RegularSeasons(date : number) : number[]{
  return createLast3years(date, 1);
}

export function getLast3WorldCupsSeasons() : number[]{
  let date = new Date().getFullYear();
  while(date % 4 != 5){
    date--;
  }
  
  return createLast3years(date, 4);
}



function createLast3years(date: number, step : number) : number[]{
  let i = date;
  let years = []; 
  for(i; i > (date - 3 * step); i-=step){
    years.push(i);
  }

  return years;
}
