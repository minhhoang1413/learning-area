import patients from '../../data/patients';
import { Patient, NewPatient, PublicPatient, NewEntry } from '../types';
import { v1 as uuid } from 'uuid';

//const id = uuid();

const getAllPatients = (): Patient[] => {
    return patients;
};
const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};
const getPatient = (id: string): Patient | undefined => {
    console.log(patients);

    return patients.find(p => p.id === id);
};
const addPatient = (entry: NewPatient): Patient => {
    const newPatient = { ...entry, id: uuid(), entries: [] };
    patients.push(newPatient);
    return newPatient;
};
const addPatientEntry = (entry: NewEntry, id:string): Patient => {
    const newEntry = {...entry,id: uuid()};
    const patient = getPatient(id);
    if (!patient) {
        throw new Error('not patient');
    }
    patient.entries = patient.entries.concat(newEntry);
    return patient;
};
export default {
    getAllPatients,
    getPublicPatients,
    getPatient,
    addPatient,
    addPatientEntry
};