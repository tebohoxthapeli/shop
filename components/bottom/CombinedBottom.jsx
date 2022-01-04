import Newsletter from "./Newsletter";
import Prefooter from "./Prefooter";
import Footer from "./Footer";

export default function CombinedBottom() {
    return (
        <div>
            <Newsletter />
            <Prefooter />
            <Footer />
        </div>
    );
}
