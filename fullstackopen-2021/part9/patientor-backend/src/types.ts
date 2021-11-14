export interface Diagnose {
    code: string;
    name: string;
    latin?: string
}
export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthCare";
    employerName: string;
    sickLeave?: {
        startDate: string,
        endDate: string
    };
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string
    };
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =  HealthCheckEntry | OccupationalHealthCareEntry | HospitalEntry;
export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}
export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
export type NonSSNPatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type NewOccupationalHealthCareEntry = Omit<OccupationalHealthCareEntry, 'id'>;
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewEntry = NewHealthCheckEntry | NewOccupationalHealthCareEntry | NewHospitalEntry;

//type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
//export type NewEntry2 = UnionOmit<Entry, 'id'>;