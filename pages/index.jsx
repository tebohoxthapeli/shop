import NavBar from "../components/navbar/NavBar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/categories/Categories";
import Newsletter from "../components/Newsletter";
import Prefooter from "../components/Prefooter";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div>
            <Announcement />
            <NavBar />
            <Slider />
            <Categories />
            <Newsletter />
            <Prefooter />
            <Footer />
        </div>
    );
}
