export async function getAllSeries() {
  try {
    const response=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/series`)
if(!response.ok){
  throw new Error("Falied to fetch series")
}
return await response.json()
    
  } catch (error) {
    console.log(error)
    return []
    
  }

  
}