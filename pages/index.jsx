import NavBar from "../components/navbar/NavBar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/categories/Categories";

export default function Home() {
    return (
        <div>
            <Announcement />
            <NavBar />
            <Slider />
            <Categories />
        </div>
    );
}
