import {Container} from "@/components/containers/Container"
export default function SeasonDetailsSkeleton() {
  return (
    <div className="animate-pulse">
          <Container>
            <div className="py-20 flex flex-col ">
            
              <div className="h-8 w-1/3 bg-card rounded"></div> {/* Title */}
              <div className="h-15 w-full bg-card rounded mt-2"></div> {/* overview */}
              <div className="h-3 w-1/3 bg-card rounded"></div> {/* Episodes */}       
           
            </div>
          </Container>
        </div>
  )
}