import React, { useState, useEffect } from "react";
import "./survey.css";
import Accordion from "@material-ui/core/Accordion";
import Rating from "@material-ui/lab/Rating";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachMoney from "@material-ui/icons/AttachMoney";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import SpeedIcon from "@material-ui/icons/Speed";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import EvStationIcon from "@material-ui/icons/EvStation";
import AndroidIcon from "@material-ui/icons/Android";
import axios from "axios";
import LoadingAnimation from "./load.gif";

const Results = () => {
  const [vehicleList, setVehicleList] = useState(null);
  const base_url = "https://evandgo.onrender.com/recommendations/";
  const survey_id = window.location.href.substr(
    window.location.href.search("/quiz/results/") + 14
  );
  const api_url = base_url.concat(survey_id.toString());
  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        console.log("SUCCESS", response);
        setVehicleList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function CurrencyFormatted(amount) {
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formatter.format(amount);
  }

  const Item = (props) => {
    const data = props.data;

    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="accordionSummary">
            <div className="item-a">
              <b className="bluetext">
                {data.manufacturer} {data.modelName}
              </b>
            </div>
            <div className="item-b">
              <AttachMoney />
              <div className="r">
                <span className="yellowtext">
                  <b>starting at</b>
                </span>{" "}
                {data.price == "0" ? "--" : CurrencyFormatted(data.price)}
              </div>
            </div>
            <div className="item-c">
              <EventSeatIcon />
              <div className="r">
                <span className="yellowtext">
                  <b>comfortably sits</b>
                </span>{" "}
                {data.seating == "0" ? "--" : data.seating}
              </div>
            </div>
            <div className="item-d">
              <QueryBuilderIcon />
              <div className="r">
                <span className="yellowtext">
                  <b>available</b>
                </span>{" "}
                {data.availability == "0" ? "--" : data.availability}
              </div>
            </div>
            <div className="item-e">
              <EvStationIcon />
              <div className="r">
                <span className="yellowtext">
                  <b>top range of</b>
                </span>{" "}
                {data.range == "0" ? "--" : data.range} miles
              </div>
            </div>
            <div className="item-f">
              <SpeedIcon />
              <div className="r">
                <span className="yellowtext">
                  <b>top speed of</b>
                </span>{" "}
                {data.maxSpeed == "0" ? "--" : data.maxSpeed} mph
              </div>
            </div>
            <div className="item-g">
              <AndroidIcon />
              <div className="r">
                <span className="yellowtext">
                  <b>self driving capabilities</b>
                </span>{" "}
                {data.selfDriving}
              </div>
            </div>
            <div className="item-h">
              <img className="resultimages" src={data.imageSource} />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="h">
            <CircularProgressbar
              className="circleprogress"
              value={data.criteriaPercentage}
              text={`${data.criteriaPercentage}%`}
              styles={buildStyles({
                strokeLinecap: "round",
                textSize: "16px",
                pathColor: `#e9c46a`,
                textColor: "#264653",
                trailColor: "#264653",
              })}
            />
            <h5>of your criteria has been met with this vehicle</h5>
          </div>
          <div className="h">
            <h5>EV & GO Rating:</h5>
            <Rating defaultValue={data.EVRank} precision={0.1} readOnly />
            <h5>{data.EVRank} stars</h5>
          </div>
          <h6 text-align="center">
            For more info on this vehicle please go to:
            <br />
            <a href={data.link}>{data.link}</a>
          </h6>
        </AccordionDetails>
      </Accordion>
    );
  };

  const ListView = (props) => {
    const data = props.data;
    const mainRecommendation = data[0];
    const OtherRecommendations = data
      .slice(1)
      .map((d) => <Item key={d.modelName} data={d} />);

    return (
      <div className="resultsTable">
        <div className="accordions">
          <div className="resultitles">
            <b>Our First Choice</b>
          </div>
          <Item data={mainRecommendation} />

          <div className="resultitles">
            <b>Other Recommendations</b>
          </div>
          {OtherRecommendations}
        </div>
      </div>
    );
  };

  const LoadingScreen = () => {
    return (
      <div className="loading">
        <span className="spansd">
          <img className="imgdc" src={LoadingAnimation} />
        </span>
      </div>
    );
  };

  return vehicleList == null ? (
    <LoadingScreen />
  ) : (
    <ListView data={vehicleList} />
  );
};

export default Results;
