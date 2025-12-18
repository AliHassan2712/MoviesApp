// components
import Hero from "../home/components/Hero";
import Series from "./components/Series";


export default function SeriesPageComponent() {
    return (
        <div>
            <Hero type="series" limit={5} />
            <Series />
        </div>
    )
}