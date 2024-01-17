import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

import { getAllStudents} from "../../api/fetch"
import StudentList from "./StudentList"

import ErrorMessage from "../Errors/ErrorMessage"

import "./StudentCard.css"

function StudentCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    id: "",
    codewars: [],
    certifications: [],
    cohort: []
  });

  const [loadingError, setLoadingError] = useState(false);

  const {
    id:studentId,
    codewars,
    certifications,
    cohort
  } = student;

  const percentOfGoal = codewars.length !==0 ? (codewars.current.total/codewars.goal.total*100).toFixed(0) : 0;
  

  const iconMap = {
    true: "🟢",
    false: "🔴",
  };

  useEffect(() => {
    getAllStudents()
      .then((data) => {
        const studentData = data.find((student)=>student.id === id)
        setStudent(studentData);
        console.log(studentData);
        if (Object.keys(studentData).length === 0) {
          setLoadingError(true);
        } else {
          setLoadingError(false);
        }
      })
      .catch((error) => {
        setLoadingError(true);
      });
  }, [id]);

  return (
    <div>
    {student.id &&
      <>
        <article className="Progress-notes">
          <StudentList student={student} />
          <div className="grades">
            <ul>
              <li><h2>Codewars</h2></li>
              <li>Current Total:{codewars.current.total}</li>
              <li>Last Week: {codewars.current.lastWeek}</li>
              <li>Goal: {codewars.goal.total}</li>
              <li>Percent of Goal Achieved: {percentOfGoal}%</li>
            </ul>
            <ul>
              <li><h2>Scores</h2></li>
              <li>Assignments: {cohort.scores.assignments * 100}%</li>
              <li>Projects: {cohort.scores.projects * 100}%</li>
              <li>Assessments: {cohort.scores.assessments * 100}%</li>
            </ul>
            <ul>
              <li><h2>Certifications</h2></li>
              <li>Resume: {iconMap[certifications.resume]}</li>
              <li>LinkedIn: {iconMap[certifications.linkedin]}</li>
              <li>Mock Interview: {iconMap[certifications.mockInterview]}</li>
              <li>GitHub: {iconMap[certifications.github]}</li>
            </ul>
          </div>
          <div className="notes">
          </div>
        </article>
      </>
    }
    
    </div>
  )
}

export default StudentCard