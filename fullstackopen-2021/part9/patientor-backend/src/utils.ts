import { Gender, HealthCheckRating, NewBaseEntry, NewEntry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthCareEntry, NewPatient } from "./types";

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
    const newEntry: NewPatient = {
        name: parseFieldString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseFieldString(ssn),
        occupation: parseFieldString(occupation),
        gender: parseGender(gender),
        //entries: []
    };
    return newEntry;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry | undefined  => {
    const baseEntry: NewBaseEntry = {
        description: parseFieldString(object.description),
        date: parseDate(object.date),
        specialist: parseFieldString(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        //type: parseType(object.type),
    };
    const type = parseType(object.type);

    let newEntry;
    if (type === 'HealthCheck') {
        newEntry = baseEntry as NewHealthCheckEntry;
        newEntry.type = 'HealthCheck';
        newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
        //return newEntry;
    }
    if (type === 'OccupationalHealthCare') {
        newEntry = baseEntry as NewOccupationalHealthCareEntry;
        newEntry.type = 'OccupationalHealthCare';
        newEntry.employerName = parseFieldString(object.employerName);
        newEntry.sickLeave = { startDate: parseDate(object.sickLeave.startDate), endDate: parseDate(object.sickLeave.endDate) };
        //return newEntry;
    }
    if (type === 'Hospital') {
        newEntry = baseEntry as NewHospitalEntry;
        newEntry.type = 'Hospital';
        newEntry.discharge = { date: parseDate(object.discharge.date), criteria: parseFieldString(object.discharge.criteria) };
        //return newEntry;
    }
    return newEntry;

};

const parseFieldString = (field: unknown): string => {
    if (!field || !isString(field)) {
        throw new Error('Incorrect or missing field');
    }
    return field;
};
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if (!diagnosisCodes) {
        return [];
    }
    if (!Array.isArray(diagnosisCodes) || !isStringArray(diagnosisCodes)) {
        throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
    }
    return diagnosisCodes;
};
const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if ((!healthCheckRating && healthCheckRating !==0) || !isHealthCheckRating(healthCheckRating)) {  
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseType = (type: unknown) => {
    if (!type || !isString(type) || (type !== 'HealthCheck' && type !== 'OccupationalHealthCare' && type !== 'Hospital')) {
        throw new Error('Incorrect or missing type ' + type);
    }
    return type;
};
// const parseSickLeave = (sickLeave: unknown) => {
//     if ( !sickLeave ||!sickLeave.startDate || !sickLeave.endDate 
//         || !isString(sickLeave.startDate) || !isString(sickLeave.endDate)
//         || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
//             throw new Error('Incorrect or missing gender: ' + sickLeave);
//     }
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (param: any[]): param is string[] => {
    return param.every(p => typeof (p) === 'string');
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(param);
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
export default toNewPatientEntry;