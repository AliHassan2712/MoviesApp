import { Container } from "@/components/containers/Container";
import EpisodeCardSkeleton from "./EpisodeCardSkeleton";

type Props = {
  count?: number;
};

export default function EpisodesCardSkeleton({ count = 6 }: Props) {
  return (
 <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
    
      {Array.from({ length: count }).map((_, i) => (
        <EpisodeCardSkeleton key={i} />
      ))}
  
    </Container>

   
  );
}
