import { CoursePart } from "../App";

const Part = ({ part }: { part: CoursePart }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const parsePart = (part: CoursePart) => {
        switch (part.type) {
            case 'normal':
                return (<p>{part.description}</p>);
            case 'submission':
                return (
                    <>
                        <p>{part.description}</p>
                        <p>submit to {part.exerciseSubmissionLink}</p>
                    </>
                )
            case 'groupProject':
                return <p>project exercises {part.groupProjectCount}</p>;
            case 'special':
                return <p>required skills: {part.requirements.join(', ')}</p>;
            default:
                return assertNever(part);
        }
    }
    return (
        <div>
            <h3>{part.name} {part.exerciseCount}</h3>
            {parsePart(part)}
        </div>
    )

}
export default Part;