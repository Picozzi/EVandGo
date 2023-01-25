import React, { useState, useCallback } from "react";
import MySurvey from "../surveyTypes/surveytypeone";
import axios from "axios";
import uuid from "react-uuid";
import "../../survey.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const ResultsPage = (props) => {
  const [resultsLoaded, setResultsLoaded] = useState(false);

  const WaitingPage = () => {
    const base_url = "quiz/results/";
    const url = base_url.concat(props.id.toString());
    return (
      <div className="results-page">
        <img src="https://media.giphy.com/media/ZfBN3QvdOpiZIiKzFa/giphy.gif" />
        <div className="results-text">
          <h1>Thank you for taking the survey</h1>
          <h2>Click the button below for your results</h2>
          <Button to={url} component={Link} className="bb">
            Results
          </Button>
        </div>
      </div>
    );
  };

  return resultsLoaded ? <div>hi</div> : <WaitingPage />;
};

const SurveyOne = () => {
  const [id, setId] = useState(0);

  const [showPage, setShowPage] = useState(true);
  const onCompletePage = useCallback(
    (data) => {
      const survey_id = uuid();
      const result = Object.assign({}, data, { survey_id: survey_id });
      axios
        .post(
          "https://evandgo.onrender.com/post_survey_data",
          JSON.stringify(result),
          { "Content-Type": "application/json" }
        )
        .then((response) => {
          console.log("SUCCESS", response);
        })
        .catch((error) => {
          console.log(error);
        });
      setId(survey_id);
      setShowPage(!showPage);
    },
    [showPage]
  );

  return showPage ? (
    <MySurvey dd={(data) => onCompletePage(data)} />
  ) : (
    <ResultsPage id={id} />
  );
};

export default SurveyOne;
