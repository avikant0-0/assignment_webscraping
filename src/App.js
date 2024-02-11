import axios from "axios";
import "./index.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Slider from "./components/Slider";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [mainData, setMainData] = useState(null);
  const handledata = async () => {
    // console.log("HI");
    const tempdata = await axios.get("http://localhost:3000/fetchalldata");
    if (tempdata.status === 200) {
      setMainData(tempdata.data);
      console.log(tempdata);
    } else {
      console.log("Error Data 404");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onClick={() => handledata()}>Fetch Data</Button>
      <div className="maincolumn">
        <h4 style={{ fontWeight: "bold", fontSize: "13px" }}>
          Indices OverView
        </h4>
        <div className="columncontainer">
          <h3 className="columnrow">Index Name</h3>
          <h3 className="columnrow">Value</h3>
          <h3 className="columnrow">Chg</h3>
          <h3 className="columnrow">%Chg</h3>
          <h3 className="columnrow">Trend</h3>
          <h3 className="columnrow">Advance/Declines</h3>
        </div>
      </div>
      {mainData ? <Slider slides={mainData} /> : <h1>LOADING...</h1>}
    </div>
  );
}

export default App;
