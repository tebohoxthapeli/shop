import Announcement from "./Announcement";
import Navbar from "./navbar/NavBar";

export default function CombinedTop() {
    return (
        <div>
            <Announcement />
            <Navbar />
        </div>
    );
}
