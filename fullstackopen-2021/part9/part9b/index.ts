import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});
app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json({error: "malformatted parameters"});
    }
    if (height === 0 || weight === 0) {
        return res.status(400).json({error: "Height and weight must not equal 0"});
        
    }
    
    return res.status(200).json({
        weight,
        height,
        bmi: calculateBmi(height,weight)
    });   
});
app.post('/exercises', (req, res) => {
    
    const body = req.body;
    const daily_exercises = body.daily_exercises;
    const target = body.target;
    console.log(daily_exercises,target);
    
    if (!daily_exercises && !target) {
        return res.status(400).json({error: "parameters missing"});
    }
    if (isNaN(Number(target))) {
        return res.status(400).json({error: "malformatted parameters"});
    }
    const value1: number[] = [];
    for (let index = 0; index < daily_exercises.length; index++) {
        const number = Number(daily_exercises[index]);
        if (isNaN(number)) {
            return res.status(400).json({error: "malformatted parameters"});
        }
        value1.push(number);
    }
    return res.status(200).json(calculateExercises(value1,Number(target)));
});
const PORT = 3002;
app.listen(PORT,() => {
    console.log('server runnung at '+PORT);
    
});