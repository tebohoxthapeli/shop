import Top from "./top/CombinedTop";
import Bottom from "./bottom/CombinedBottom";

export default function Layout({ children }) {
    return (
        <div>
            <Top />
            <div>{children}</div>
            <Bottom />
        </div>
    );
}
