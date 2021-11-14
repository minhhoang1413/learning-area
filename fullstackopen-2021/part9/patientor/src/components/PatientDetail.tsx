import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useStateValue } from "../state";
import { Diagnosis, Entry, HealthCheckEntryFormValues, Patient } from "../types";
import React from "react";
import { apiBaseUrl } from "../constants";
import { addPatient, setDiagnosisList } from "../state/reducer";
import HospitalEntryDetail from "./HospitalEntryDetail";
import HealthCheckEntryDetail from "./HealthCheckEntryDetail";
import OccupationalHealthCareEntryDetail from "./OccupationalHealthCareEntryDetail";
import { Button, Icon } from "semantic-ui-react";
import { AddEntryModal } from "../AddPatientModal";
const PatientDetail = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ patients, diagnoses }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        console.log(' effect 1');
        const fetchDiagnoseList = async () => {
            console.log(' effect 2');

            try {
                const { data: diagnosisList } = await axios.get<Diagnosis[]>(
                    `${apiBaseUrl}/diagnoses`
                );
                dispatch(setDiagnosisList(diagnosisList));
                // console.log('patient',patient);
                // console.log('patients',patients);

            } catch (e) {
                console.error(e);
            }
        };
        void fetchDiagnoseList();
    }, []);
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState<string|undefined>(undefined);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };
    
    const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
        try {
          const { data: addedNewEntryPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          dispatch(addPatient(addedNewEntryPatient));
          closeModal();
        } catch (error: unknown) {
            let errorMessage = 'Something went wrong.';
            if(axios.isAxiosError(error) && error.response) {
              console.error(error.response.data);
              errorMessage += error.response.data;
            }
            setError(errorMessage);
        }
      };


      const patient = patients[id];

    if (!patient) {
        return (
            <div>
                null
            </div>
        );
    }
    return (
        <div>
            <div>
                <h2>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : patient.gender === 'female' ? 'venus' : 'genderless'} /></h2>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h3>entries</h3>
                {patient.entries.map(entry =>
                    <EntryDetail key={entry.id} entry={entry} />
                )}
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );

};
const EntryDetail = ({ entry }: { entry: Entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    switch (entry.type) {
        case 'Hospital':
            return <HospitalEntryDetail entry={entry} />;
        case 'HealthCheck':
            return <HealthCheckEntryDetail entry={entry} />;
        case 'OccupationalHealthCare':
            return <OccupationalHealthCareEntryDetail entry={entry} />;
        default:
            return assertNever(entry);
    }
};
export default PatientDetail;