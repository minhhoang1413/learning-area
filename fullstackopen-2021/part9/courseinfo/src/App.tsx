import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseHaveDescription extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CourseHaveDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseHaveDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CourseHaveDescription {
  type: "special";
  requirements: string[];
}
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

function App() {
  
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]
  const numberOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total numberOfExercises={numberOfExercises} />
    </div>
  );
}

export default App;
