// import Header from "./component/Header";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";

function App() {
  const [data, setData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [arrowDisable, setArrowDisable] = useState(true);
  const ref1 = useRef();

  const getData = () => {
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((res) => res.json())
      .then((json) => setData(json));
  };

  useEffect(() => {
    getData();
  }, []);

  // const handleNext = () => {
  //   ref1.current.scrollTo({
  //     left: 800,
  //     behavior: "smooth",
  //   });
  // };

  // const handlePrev = () => {
  //   ref1.current.scrollTo({
  //     left: -800,
  //     behavior: "smooth",
  //   });
  // };

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <>
      <div className="hero-background"></div>

      <div className="content">
        <header className=" bg-[#210D70]">
          <nav
            className=" ms-[10px] md:mx-[70px] flex items-center  p-3 lg:px-8"
            aria-label="Global"
          >
            <div className="flex">
              <a href="#" className="-m-1.5 p-1.5">
                <img
                  className="h-[100px] w-auto"
                  src="https://redsandventures.io/wp-content/uploads/2023/02/Artboard-12.png"
                  alt="logo"
                />
              </a>
            </div>

            <div className=" w-full  justify-center hidden md:flex">
              <ul className=" d-ul flex text-xs sm:text-xl md:text-sm lg:text-2xl xl:text-3xl">
                <li>Home</li>
                <li>What We Do</li>
                <li>Our Approch</li>
                <li>Who We Are</li>
                <li>Insigts</li>
              </ul>
            </div>
            <div
              className="ml-auto block md:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <TiThMenu fontSize={42} color="white" />
            </div>
          </nav>
        </header>

        <div className="bg-[#210D70] hero-main-div">
          <div className="hero-top">
            <div className="flex flex-col mx-[30px] md:mx-[70px] flex items-center p-3 lg:px-8 w-[80%] md:w-[55%] mt-[10%]">
              <h1 className="main-heading-text1">
                Unceasing innovation. Preserving the natural world.
              </h1>
              <p className="main-heading-details text-sm sm:text-base lg:text-xl ">
                Redsand Ventures is unlocking frontier markets through
                responsible capital. We work with industry players and funders
                to build bold projects where the innovation proves out both the
                return on investment and impact.
              </p>
            </div>
            <div className="mx-[120px] flex justify-ceenter  items-center  mt-[20px] flex">
              <FaChevronRight color="#E7106C" className=" mr-4" fontSize={48} />
              <p className="wed">What We Do</p>
            </div>
          </div>
        </div>

        <div className="slider relative py-[100px] pl-[10px] sm:pl-[30px]  md:pl-[105px] mb-[200px] ">
          <p className="bs mb-[50px]">Best Sellers</p>
          <div className="absolute top-[50%] left-28">
            <RoundButon
              icon={BsArrowRightShort}
              top={1}
              left={1}
              onClick={() => {
                handleHorizantalScroll(ref1.current, 25, 100, -10);
              }}
            >
              <BsArrowLeftShort color="black" fontSize={36} />
            </RoundButon>
          </div>
          <div className="absolute top-[50%] right-20">
            <RoundButon
              icon={BsArrowRightShort}
              top={1}
              left={1}
              onClick={() => {
                handleHorizantalScroll(ref1.current, 25, 100, 10);
              }}
            >
              <BsArrowRightShort color="black" fontSize={36} />
            </RoundButon>
          </div>
          <div
            ref={ref1}
            className="flex flex-nowrap overflow-x-hidden overflow-y-hidden"
          >
            <div className="flex" ref={ref1}>
              {data.map((item) => {
                return <Card key={item.id} item={item} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div
        className={` block md:hidden top-0 right-0 w-[60vw] bg-white p-10 text-black fixed h-full z-40  ease-in-out duration-300 ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <AiFillCloseCircle
          onClick={() => setShowSidebar(false)}
          className="ml-[20px]"
          color="black"
          fontSize={42}
        />

        <div className="flex">
          <ul className="g-ul mt-[40px] font-semibold flex flex-col h-[200px] justify-between text-xl">
            <li>Home</li>
            <li>What We Do</li>
            <li>Our Approch</li>
            <li>Who We Are</li>
            <li>Insigts</li>
          </ul>
        </div>
      </div>

      <div className="hero-background"></div>
    </>
  );
}

export default App;

const Card = ({ item }) => {
  return (
    <div className="bg-white h-[500px] w-[calc(100vw/1)] sm:w-[calc(100vw/2)] md:w-[calc(100vw/2)] lg:w-[calc(100vw/4)] xl:w-[calc(100vw/5)]  mr-[50px]  pt-[20px] rounded-lg">
      <img
        style={{ objectFit: "contain", width: "100%", height: "40%" }}
        src={item.image}
      />
      <div className="flex flex-col px-[30px] mt-[100px]  h-full pb-[4]">
        <div className="flex items-center">
          <p className="mr-auto !opacity-40 text-base">{item.category}</p>
          <StarRatings
            rating={item.rating.rate}
            starRatedColor="#FF6633"
            numberOfStars={5}
            name="rating"
          />
          <p className="ml-[5px] mt-[1px] !opacity-40">{`(${item.rating.count})`}</p>
        </div>
        <p className="font-bold text-lg mt-[10px]">{item.title}</p>
        <p className="text-[#F83A3A] mt-[10px]">{`From ${item.price}`}</p>
        <p className="text-[#00A341] font-bold">
          Pre Order Est Delivery Jul 31
        </p>
      </div>
    </div>
  );
};

const RoundButon = ({ children, onClick }) => {
  return (
    <div clasName="p-10">
      <button
        onClick={onClick}
        className="w-14 h-14 rounded-full  flex justify-center items-center
                       bg-[#F0F0F0] hover:bg-green-100 text-white"
      >
        {children}
      </button>
    </div>
  );
};
