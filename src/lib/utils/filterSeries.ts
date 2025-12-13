import {Series} from "../../types/series"
export function filterSeries(tab: string, series: Series[]) {
 if(!series||series.length==0) return []
 switch(tab){
  case"rating":
  return [...series].filter((item=>{return parseFloat(item.imdbRating)>=7})).sort((s1,s2)=>parseInt(s2.imdbRating)-parseInt(s1.imdbRating))
  case "latest" :
  return  series.filter((item)=>{return parseInt(item.year)>=2000}).sort((s1,s2)=>parseInt(s2.year)-parseInt(s1.year))
  case"views":
  return  series.sort((s1,s2)=>{return (parseInt(s2.imdbRating)-parseInt(s1.imdbRating))&&parseInt(s2.year)-parseInt(s1.year)})
  default :
  return series

 
 }
}
