import img1 from "./../../assets/images/OIP (8).jpg"
import img2 from "./../../assets/images/OIP (9).jpg"
import img3 from "./../../assets/images/532016111f114d2d8c34ed60499ac762_front.jpg"
import img4 from "./../../assets/images/5ee516895c9745eee62de651bad03b42.jpg"
import img5 from "./../../assets/images/8268-slam-cover-2020-september-1-issue.jpg"
import img6 from "./../../assets/images/209948-14198419Fr.jpg"
const PopularPlayer = () => {
    return (
        <div className="w-10/12 mx-auto mb-12">
            <h1 className="lg:text-5xl text-3xl font-bold text-center lg:mt-24 mt-6 lg:mb-12">Our Popular Player</h1>

            <div className="grid lg:grid-cols-6 grid-cols-3 gap-4 mt-7">
                <img src={img2} alt="" />
                <img src={img1} alt="" />
                <img src={img3} alt="" />
                <img src={img4} alt="" />
                <img src={img5} alt="" />
                <img src={img6} alt="" />
            </div>
        </div>
    );
};

export default PopularPlayer;