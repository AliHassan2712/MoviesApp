import {Container} from "@/components/containers/Container"
export default function EpisodesDetailsSkeleton() {
  return (
    <div className="animate-pulse">
          <div className="w-full h-[60vh] bg-card rounded-b-xl mb-8"></div>
          <Container>
            <div className="py-20 flex flex-col gap-8">
              <div className="h-8 w-1/3 bg-card rounded"></div> {/* Title */}
              <div className="h-4 w-1/6 bg-card rounded mt-2"></div> {/* Episode Number */}
              <div className="h-6 w-1/4 bg-card rounded mt-6"></div> {/* Overview Title */}
              <div className="space-y-2 mt-2">
                <div className="h-4 w-full bg-card rounded"></div>
                <div className="h-4 w-5/6 bg-card rounded"></div>
                <div className="h-4 w-3/4 bg-card rounded"></div>
              </div>
            </div>
          </Container>
        </div>
  )
}