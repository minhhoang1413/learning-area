import {  HospitalEntry } from "../types";
import React from "react";
import {  Segment, Icon } from "semantic-ui-react";
const HospitalEntryDetail = ({entry}: {entry: HospitalEntry}) => {
    return (
        <Segment>
            <p>{entry.date} <Icon name="hospital" /> </p>
            <p>{entry.description}</p>
            <p>{entry.discharge.date} {entry.discharge.criteria}</p>
        </Segment>
    );
};

export default HospitalEntryDetail;