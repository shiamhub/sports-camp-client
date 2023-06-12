import Banner from "./Banner";
import Classes from "./Classes";
import Instructors from "./Instructors";
import PopularPlayer from "./PopularPlayer";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Classes></Classes>
            <Instructors></Instructors>
            <PopularPlayer></PopularPlayer>
        </div>
    );
};

export default Home;