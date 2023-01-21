import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";
const BrowsCourses = () => {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    let url = "http://localhost:3000/api/courses/subjects";
    axios
      .get(url)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  async function submitToCourse(subjectID, subjectName) {
    if (localStorage.getItem("token")) {
      const decodedUserID = jwt(localStorage.getItem("token"))._id;
      const url = "http://localhost:3000/api/courses/addCourse";
      const value = {
        subject: subjectName,
        user_id: decodedUserID,
      };
      axios
        .post(url, value)
        .then((res) => {
          alert(`you are asign to the course ${res.data.name}`);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    } else console.log("no one loged");
  }
  return (
    <div className="coursesContainerDad">
      <div className="coursesContainer">
        {subjects &&
          subjects.map((subject) => {
            let imgLink = `/images/${subject.subject}.png`;
            return (
              <div className="subjectCardContain">
                <div class="card">
                  <div className="cardImageContainer">
                    <img src={imgLink} className="subjectImage" alt="..."></img>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{subject.subject}</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text">
                      <small class="text-muted">rating: {subject.rating}</small>
                      <br />
                      <small class="text-muted">level: {subject.level}</small>
                    </p>
                    <button type="button" class="btn btn-light" onClick={() => submitToCourse(subject.subject_id, subject.subject)}>
                      Submit to course
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BrowsCourses;
