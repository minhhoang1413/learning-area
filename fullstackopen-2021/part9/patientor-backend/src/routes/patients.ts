import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patiens = patientService.getAllPatients();
    res.json(patiens);
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService.getPatient(id);
    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = toNewPatientEntry(req.body);
        const addedPatientEntry = patientService.addPatient(newPatientEntry);
        res.json(addedPatientEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const id = req.params.id;

        const newEntry = toNewEntry(req.body);

        if (!newEntry) {
            throw new Error('error');
        }
        const addedNewEntryPatient = patientService.addPatientEntry(newEntry, id);
        if (addedNewEntryPatient) {
            res.json(addedNewEntryPatient);
        } else {
            res.sendStatus(404);
        }
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;