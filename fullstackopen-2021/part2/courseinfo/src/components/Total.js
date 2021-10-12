
const Total = ({ course }) => {
    const totalExercise = course.parts.reduce((total, currentPart) => {
      total += currentPart.exercises;
      return total;
    }, 0)
    return <p style={{fontWeight:900}}>Number of exercises {totalExercise}</p>
  }

  export default Total;