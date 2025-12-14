// components
import Movies from "../movies/components/Movies";
import Hero from "./components/Hero";


export default function HomePageComponent() {

    return (
        <>
            <Hero type="movies" limit={5} />
            <Movies />
        </>
    )

}
