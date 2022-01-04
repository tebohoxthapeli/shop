import Top from "../components/top/CombinedTop";
import Slider from "../components/Slider";
import Categories from "../components/categories/Categories";
import Bottom from "../components/bottom/CombinedBottom";

export default function Home() {
    return (
        <div>
            <Top />
            <Slider />
            <Categories />
            <Bottom />
        </div>
    );
}
