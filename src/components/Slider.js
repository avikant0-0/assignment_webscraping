import Carousel from "react-bootstrap/Carousel";
import "../index.css";
function Slider({ slides }) {
  console.log("Asdad", slides);
  return (
    <div style={{ width: "60%" }}>
      <Carousel>
        {slides.map((item, index) => {
          return (
            <Carousel.Item key={index}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4 className="maindata">{item[0]}</h4>
                <h4 className="maindata">{item[1]}</h4>
                <h4 className="maindata green">{item[2]}</h4>
                <h4 className="maindata green">{item[3]}</h4>
                <img alt="Image" src={item[4]} className="sliderimage" />
                <div style={{ display: "flex", width: "10%" }}>
                  <h4 className="maindata">{item[5]}</h4>
                  <div
                    style={{
                      width: `${(parseInt(item[5]) / (parseInt(item[5]) + parseInt(item[6]))) * 100}%`,
                      height: "60%",
                      background: "green",
                    }}
                  >
                    <span className="span1" style={{ color: "green" }}>
                      -
                    </span>
                  </div>
                  <div
                    style={{
                      width: `${(parseInt(item[6]) / (parseInt(item[5]) + parseInt(item[6]))) * 100}%`,
                      height: "60%",
                      background: "red",
                    }}
                  >
                    <span className="span1" style={{ color: "red" }}>
                      -
                    </span>
                  </div>
                  <h4 className="maindata">{item[6]}</h4>
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Slider;
