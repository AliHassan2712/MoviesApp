import {Series} from "../../types/series"
export function filterSeries(tab: string, series: Series[]) {
 if(!series||series.length==0) return []
 switch(tab){
  case"rating":
  return [...series].filter((item=>{return parseFloat(item.imdbRating||"0")>=7})).sort((s1,s2)=>parseInt(s2.imdbRating||"0")-parseInt(s1.imdbRating||"0"))
  case "latest" :
  return  series.filter((item)=>{return parseInt(item.year||"0")>=2000}).sort((s1,s2)=>parseInt(s2.year||"0")-parseInt(s1.year||"0"))
  case"views":
  return  series.sort((s1,s2)=>{return (parseInt(s2.imdbRating||"0")-parseInt(s1.imdbRating||"0"))&&parseInt(s2.year||"0")-parseInt(s1.year||"0")})
  default :
  return series

 
 }
}
