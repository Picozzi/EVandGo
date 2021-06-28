export const json = {
    title : "Perfect EV Quiz",
    "showProgressBar": "top",
    "progressBarType": "buttons",
    requiredText: "*",
    pages: [
        {
            name: "page0",
            elements: [
                {
                    name: "panel0",
                    type: "panel",
                    elements: [
                        {
                            type: "html",
                            name: "income_intro",
                            html: "<div><h1 class='intro__heading intro__heading--income title'>Introduction</h1><div class='intro__body wysiwyg'><p>In this quiz, you will be asked about your:</p><ul><li>Vehicular Background</li><li>Vehicular Needs<li>Vehicular Preferences</li></ul><p>We hope that the results from this quiz will accelerate your purchase of an electric vehicle and help you buy the <b>Perfect EV!</b></p></div></div>"
                        },
                        {
                            type: "text",
                            name: "name",
                            title: "Name:",
                            placeHolder: "Your Name Here",
                            isRequired: true, //change after
                            autoComplete: "name"
                        },
                        {
                            name: "email",
                            type: "text",
                            inputType: "email",
                            title: "Email:",
                            placeHolder: "electric@evandgo.com",
                            isRequired: true, //change after
                            autoComplete: "email",
                            validators: [
                                {
                                    type: "email"
                                }
                            ]
                        }
                    ],
                }
            ],
        },
        {
            name: "page1",
            navigationTitle: "Background",
            "elements": [
                {
                    name: "panel1",
                    type: "panel",
                    elements: [
                        {
                            type: "multipletext",
                            name: "current_vehicle",
                            title: "What vehicle do you currently drive?",
                            isRequired: true,
                            colCount: 1,
                            items: [
                                {
                                    name: "current_manufacturer",
                                    title: "Manufactuer",
                                    placeHolder: "...",
                                }, 
                                {
                                    name: "current_model",
                                    title: "Model",
                                    placeHolder: "...",

                                },
                                {
                                    name: "current_year",
                                    title: "Year",
                                    placeHolder: "...",
                                }
                            ]
                        },
                        {
                            type: "boolean",
                            name: "similiar_car",
                            label: "Are you looking for an electric vehicle similiar to your current vehicle?",
                            isRequired: true,
                        },
                        {
                            type: "dropdown",
                            name: "user_region",
                            title: "Select your region...",
                            isRequired: true,
                            choices: ["Africa", "Americas", "Asia", "Europe", "Oceania"]
                        }, 
                        {
                            type: "dropdown",
                            name: "user_country",
                            title: "Select your country...",
                            isRequired: true,
                            choicesByUrl: {
                                url: "https://restcountries.eu/rest/v2/region/{user_region}",
                                valueName: "name"
                            }
                        },
                        {
                            type: "dropdown",
                            name: "daily_commute",
                            title: "What is your daily commute",
                            colCount: 0,
                            isRequired: true,
                            choices: [
                                "< 10 minutes",
                                "10 - 30 minutes",
                                "30 - 60 minutes",
                                "> 1 hour"
                            ]
                        },
                    ]
                }
            ]
        },
        {
            name: "page2",
            navigationTitle: "Needs",
            elements: [
                {
                    name: "panel2",
                    type: "panel",
                    "elements": [
                        {
                            type: "dropdown",
                            name: "body_style",
                            title: "What body style are you looking for?",
                            colCount: 0,
                            isRequired: true,
                            choices: [
                                "Coupe",
                                "Convertible",
                                "Sedan",
                                "Hatchback",
                                "Station Wagon",
                                "Minivan",
                                "SUV",
                                "Sport",
                                "Pickup"
                            ]
                        },
                        {
                            type: "dropdown",
                            name: "drivetrain",
                            title: "What type of drivetrain are you looking for?",
                            colCount: 0,
                            isRequired: true,
                            choices: [
                                "AWD",
                                "RWD",
                                "FWD",
                                "Any"
                            ]
                        },
                        {
                            type: "multipletext",
                            name: "budget",
                            title: "What is the ... ",
                            isRequired: true,
                            colCount: 1,
                            items: [
                                {
                                    name: "max_budget",
                                    title: "Maximum amount you would pay for this vehicle"
                                }, {
                                    name: "min_budget",
                                    title: "Least amount you would pay for this vehicle"
                                }
                            ]
                        },
                        {
                            type: "dropdown",
                            name: "availability",
                            title: "When would this vehicle need to be available by?",
                            colCount: 0,
                            isRequired: true,
                            choices: [
                                "Now",
                                "Late 2021",
                                "Early 2022",
                                "Late 2022",
                                "2023 and Beyond"
                            ]
                        },
                        {
                            type: "rating",
                            name: "car_capacity",
                            title: "On average, how many passengers will you need to carry?",
                            isRequired: true,
                            rateMin: 0,
                            rateMax: 10,
                        },
                        {
                            "type": "imagepicker",
                            "name": "cargo_size",
                            "title": "What size of cargo do you require?",
                            "imageHeight": "250%",
                            "imageWidth": "250%",
                            isRequired: true,
                            "choices": [
                                {
                                    "value": "small",
                                    "imageLink": "https://evandgo.s3.us-east-2.amazonaws.com/survey_questions/cargo_q1.jpg",
                                }, 
                                {
                                    "value": "medium",
                                    "imageLink": "https://evandgo.s3.us-east-2.amazonaws.com/survey_questions/cargo_q2.jpg"
                                }, 
                                {
                                    "value": "large",
                                    "imageLink": "https://evandgo.s3.us-east-2.amazonaws.com/survey_questions/cargo_q3.jpg"
                                }
                            ]
                        },
                        {
                            type: "boolean",
                            name: "carseats_required",
                            label: "Are you going to be using child car seats in this vehicle?",
                            isRequired: true,
                        },
                        {
                            type: "boolean",
                            name: "towing_required",
                            title: "Will this vehicle need to be able to tow?",
                            isRequired: true,
                        },
                    ]
                }
            ]
        },
        {
            name: "page3",
            navigationTitle: "Preferences",
            elements: [
                {
                    name: "panel3",
                    type: "panel",
                    "elements": [
                        {
                            type: "rating",
                            name: "efficiency",
                            title: "How important is vehicle efficiency to you?",
                            isRequired: true,
                            rateMin: 0,
                            rateMax: 5,
                            minRateDescription: "Less Important",
                            maxRateDescription: "More Important"
                        },
                        {
                            type: "dropdown",
                            name: "electricity_cost",
                            title: "On average, how much are you willing to spend per year on charging?",
                            colCount: 0,
                            isRequired: true,
                            choices: [
                                "< $100",
                                "$200",
                                "$300",
                                "$400+"
                            ]
                        },
                        {
                            type: "dropdown",
                            name: "charging_time",
                            title: "On average, how many hours are you willing to wait for one full charge of your vehicle?",
                            isRequired: true,
                            colCount: 0,
                            choices: [
                                "< 1 hour",
                                "2 - 4 hours",
                                "5 - 7 hours",
                                "8+ hours"
                            ]
                        },
                        {
                            "type": "nouislider",
                            "name": "speed",
                            "title": "Please estimate the maximum speed you desire (in mph):",
                            isRequired: true,
                            "rangeMin": 0,
                            "rangeMax": 300, 
                            step:10,
                            tooltips:true,
                        },
                        {
                            type: "boolean",
                            name: "autopilot",
                            title: "Will autopilot or the ability to gain autopilot in the future be required?",
                            isRequired: true,
                        },
                        {
                            type: "ranking",
                            name: "car_brands",
                            title: "Please rank the following automakers in order of preference?",
                            isRequired: true,
                            colCount: 2,
                            choices: [
                                "Audi",
                                "BMW",
                                "Ford",
                                "General Motors",
                                "Honda",
                                "Hyundai",
                                "Mazda",
                                "Mercedes-Benz",
                                "Nissan",
                                "Porsche",
                                "Tesla",
                                "Volkswagen",
                            ]
                        },
                        {
                            type: "rating",
                            name: "build_quality",
                            title: "How important is build quality to you?",
                            isRequired: true,
                            rateMin: 0,
                            rateMax: 10,
                            minRateDescription: "Less Important",
                            maxRateDescription: "More Important"
                        },
                        {
                            type: "boolean",
                            name: "legacy_oem",
                            title: "Will this vehicle need to come from a legacy automaker?",
                            isRequired: true,
                        },
                        {
                            type: "rating",
                            name: "branding_importance",
                            title: "How important is the name brand of the vehicle to you?",
                            isRequired: true,
                            rateMin: 0,
                            rateMax: 5,
                            minRateDescription: "Less Important",
                            maxRateDescription: "More Important"
                        }
                    ],
                }
            ],
        }
    ]
};