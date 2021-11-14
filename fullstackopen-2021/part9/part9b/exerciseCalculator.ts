
type RatingDescription = 'bad' | 'not bad' | 'good' | 'very good';
type Rating = 1 | 2 | 3;
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: Rating;
    ratingDescription: RatingDescription;
    target: number;
    average: number;
}
export const calculateExercises = (exerciseHours: number[], target: number): Result => {
    let trainingDays = 0;
    let success: boolean;
    let rating: Rating;
    let ratingDescription: RatingDescription;
    let average = 0;
    exerciseHours.forEach(value => {
        if (value > 0) {
            trainingDays += 1;
        }
        average += value;
    });
    average = average / exerciseHours.length;
    const ratio = average / target;
    if (ratio < 0.8) {
        success = false;
        rating = 1;
        ratingDescription = 'bad';
    } else if (ratio < 1) {
        success = false;
        rating = 1;
        ratingDescription = 'not bad';
    } else if (ratio === 1) {
        success = true;
        rating = 2;
        ratingDescription = 'good';
    } else {
        success = true;
        rating = 3;
        ratingDescription = 'very good';
    }
    return {
        periodLength: exerciseHours.length,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};
type ArgsValuesCalculator = {
    value1: number[];
    value2: number;
};
const parseArgumentsCalculator = (args: string[]): ArgsValuesCalculator => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    const value2 = Number(args[2]);
    if (isNaN(value2)) {
        throw new Error('Provided values were not numbers');
    }
    const value1: number[] = [];
    for (let index = 3; index < args.length; index++) {
        const number = Number(args[index]);
        if (isNaN(number)) {
            throw new Error('Provided values were not numbers');
        }
        value1.push(number);
    }
    return { value1, value2 };
};
try {
    const { value1, value2 } = parseArgumentsCalculator(process.argv);
    console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}


