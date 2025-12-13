export async function getAllSeries() {
  try {
    const response=await fetch("https://fooapi.com/api/movies")
if(!response.ok){
  throw new Error("Falied to fetch series")
}
return await response.json()
    
  } catch (error) {
    console.log(error)
    return null
    
  }

  
}