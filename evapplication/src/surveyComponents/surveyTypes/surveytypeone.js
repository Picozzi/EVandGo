import React from 'react';
import 'survey-react/survey.css';
import * as Survey from 'survey-react';
import {json} from '../surveysQuestions/questions';
import * as widgets from "surveyjs-widgets";
import "nouislider/distribute/nouislider.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import 'survey-react/modern.css';
import '../../survey.css'
widgets.nouislider(Survey);

var defaultThemeColors = Survey.StylesManager.ThemeColors["modern"];
defaultThemeColors["$main-color"] = "#e9c46a";
defaultThemeColors["$main-hover-color"] = "#e9c46a";
defaultThemeColors["$text-color"] = "#f5efed";
defaultThemeColors["$header-color"] = "#f5efed";

Survey.StylesManager.applyTheme("modern");

const MySurvey = (props) => {
    return (
        <Survey.Survey
        showCompletedPage={false}
        firstPageIsStarted={true}
        onComplete={data=>props.dd(data.valuesHash)}
        json = {json}/>

    )
}

export default MySurvey;