
import {
  Film,
  Tv,
  Flame,
  Ghost,
  Laugh,
  Heart,
  Sword,
  Rocket,
  Drama,
} from 'lucide-react'



export const GENRE_ICONS: Record<string, React.ComponentType> = {
  action: Sword,
  adventure: Rocket,
  comedy: Laugh,
  drama: Drama,
  horror: Ghost,
  romance: Heart,
  thriller: Flame,
  sci_fi: Rocket,
  animation: Film,
  tv: Tv,
}