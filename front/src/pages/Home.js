import Footer from "../components/Footer";
import Posts from "../components/Posts";

const Home = () => {
    return (
        <>
            <div className="mt-24 mx-2 pb-44 sm:mx-2 md:mx-2">
                <Posts />
            </div>
            <Footer />
        </>
    );
};

export default Home;