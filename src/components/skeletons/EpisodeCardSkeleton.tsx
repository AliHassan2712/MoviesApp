import { Container } from "../containers/Container";

export default function EpisodeCardSkeleton() {
  return (
    <Container>
      <div className="p-4 h-35 bg-card rounded-xl shadow animate-pulse">
      {/* Title */}
      <div className="h-4 bg-soft rounded w-3/4 mb-2" />
      {/* overview */}
      <div className="h-3 bg-soft rounded w-1/3" />
      <div className="h-3 bg-soft rounded w-1/3" />

      
    </div>
    </Container>
    
  );
}
