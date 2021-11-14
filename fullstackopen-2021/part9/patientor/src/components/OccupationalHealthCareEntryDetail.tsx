import { OccupationalHealthCareEntry } from "../types";
import React from "react";
import { Segment, Icon } from "semantic-ui-react";
const OccupationalHealthCareEntryDetail = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
    return (
        <Segment>
            <p>{entry.date} <Icon name="medkit" /> </p>
            <p>{entry.description}</p>
            <p>{entry.employerName}</p>
            {entry.sickLeave ?
                <p>{entry.sickLeave.startDate} {entry.sickLeave.endDate}</p>
                : null
            }
        </Segment>
    );
};

export default OccupationalHealthCareEntryDetail;