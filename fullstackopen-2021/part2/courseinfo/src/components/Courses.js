import Course from "./Course"
const Courses = ({ courses }) => (
    <div>
      {courses.map(course =>
        <Course course={course} key={course.id} />
      )}
    </div>
  )

export default Courses