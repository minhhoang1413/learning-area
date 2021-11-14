import {  HealthCheckEntry } from "../types";
import React from "react";
import { Segment, Icon } from "semantic-ui-react";
const HealthCheckEntryDetail = ({entry}: {entry: HealthCheckEntry}) => {
    const heartColor = (num: number) => {
        if (num === 0) {
            return 'green';
        }
        if (num === 1) {
            return 'yellow';
        }
        if (num === 2) {
            return 'orange';
        }
        if (num === 4) {
            return 'red';
        }
    };
    return (
        <Segment>
            <p>{entry.date} <Icon name="stethoscope" /> </p>
            <p>{entry.description}</p>
            <p> <Icon name="heart" color={heartColor(entry.healthCheckRating)} />   </p>
        </Segment>
    );
};

export default HealthCheckEntryDetail;