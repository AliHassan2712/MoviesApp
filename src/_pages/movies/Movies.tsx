// components
import Hero from "../home/components/Hero";
import Movies from "./components/Movies";


export default function MoviesPageComponent() {
    return (
        <div>
            <Hero type="movies" limit={5} />
            <Movies />
        </div>
    )
}
