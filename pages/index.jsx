import NavBar from "../components/navbar/NavBar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";

export default function Home() {
    return (
        <div>
            <Announcement />
            <NavBar />
            <Slider />
        </div>
    );
}
