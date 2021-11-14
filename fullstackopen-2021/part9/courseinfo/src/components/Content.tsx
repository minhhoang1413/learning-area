// interface CoursePart {
//     name: string;
//     exerciseCount: number;
// }
import { CoursePart } from "../App";
import Part from "./Part";
type CourseParts = {
    courseParts: Array<CoursePart>;
};

const Content = ({courseParts}: CourseParts) => {
    return (
        <div>
            {courseParts.map(part =>
                // <p key={part.name}>{part.name} {part.exerciseCount}</p>
                <Part key={part.name} part={part} />
            )}
        </div>
    )
}
export default Content;