import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import { useContext } from 'react';
import { UserContext } from '../../context/authContext';

const UserHome = () => {
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [change, setChange] = useState([]);

  const navigate = useNavigate();

  async function removeCourse(course_id) {
    let url = 'http://localhost:3000/api/courses/removeCourse';
    let value = { course_id: course_id };
    axios
      .post(url, value)
      .then((res) => {
        setChange(!change);
        getCourses();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getCourses() {
    if (user) {
      const decoded = jwt(user);
      console.log(decoded);
      const url = 'http://localhost:3000/api/users/getById';
      const value = decoded;
      console.log(value);
      axios
        .post(url, value)
        .then((res) => {
          setUserDetail(res.data.userData);
          setCourses(res.data.userCourses);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  useEffect(() => {
    getCourses();
  }, [user]);

  return (
    <div className="homePageflexbox">
      <div className="leftSide">
        <div class="alert alert-secondary" role="alert">
          <h4>Upgrade your plane</h4>
          <p>
            Go deeper and lean job-ready skills, practice with real world
            projects, take assessment and earn cetificants!
          </p>
        </div>
        <div className="coursesContainer">
          <div className="headingInhome">
            <h3>Your courses</h3>
            <button
              type="button"
              class="btn btn-light"
              onClick={() => {
                navigate('/user/browse');
              }}>
              browse for more !
            </button>
          </div>

          {courses ? (
            courses.map((course) => {
              let img =
                '/images/' +
                course.name.slice(0, course.name.length - 1) +
                '.png';
              return (
                <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        src={img}
                        class="img-fluid rounded-start"
                        alt="..."></img>
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h5 class="card-title">{course.name}</h5>
                        <p class="card-text">
                          this is a short explanaition about the course , the
                          sunbjects the teacher and so on .
                        </p>
                        <div className="headingInhome">
                          <p class="card-text">
                            <small class="text-muted">
                              starting in : 25 days
                            </small>
                          </p>
                          <button
                            type="button"
                            class="btn-close"
                            onClick={() =>
                              removeCourse(course.course_id)
                            }></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="rightSide">
        <div class="card" style={{ width: '18rem' }}>
          <img src="/images/avatar.jpeg" class="card-img-top" alt="..."></img>
          <div class="card-body">
            <h5 class="card-title">Hi {userDetail.name}</h5>
            <p class="card-text">
              we are happy to see you back in our website ready to learn!.
            </p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">listed email: {userDetail.email}</li>
            <li class="list-group-item">llisted address: 23 cramer streat</li>
            <li class="list-group-item">date of birth : 17/04/1996</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
