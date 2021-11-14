type ArgsValues = {
    value1: number;
    value2: number;
};
const parseArguments = (args: string[]): ArgsValues => {
    if (args.length < 4) {
        throw new Error('Not enough arguments');
    }
    if (args.length > 4) {
        throw new Error('Too many arguments');
    }
    const value1 = Number(args[2]);
    const value2 = Number(args[3]);
    if (isNaN(value1) || isNaN(value2)) {
        throw new Error('Provided values were not numbers');
    }
    if (value1 === 0 || value2 === 0) {
        throw new Error('Height and weight must not equal 0');
    }
    return { value1, value2 };
};
export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) / (height / 100);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'normal';
    } else return 'Overweight';

};
try {
    const {value1, value2} = parseArguments(process.argv);
    console.log(calculateBmi(value1,value2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened. ';
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

