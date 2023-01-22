import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <div className="mainContainer">
      <div class="modal modal-signin position-static d-block  py-5" tabindex="-1" role="dialog" id="modalSignin">
        <div class="modal-dialog" role="document">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
              <h1 class="fw-bold mb-0 fs-2">Join the millions learning to code with cyberpro for free</h1>

              {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>

            <div class="modal-body p-5 pt-0">
              <form
                onSubmit={handleSubmit((user) => {
                  const url = "http://localhost:3000/api/auth";
                  axios
                    .post(url, user)
                    .then((res) => {
                      localStorage.setItem("token", res.headers["x-auth-token"]);
                      setUser(res.headers["x-auth-token"]);
                      navigate("/user/home");
                    })
                    .catch((err) => {
                      alert(err);
                    });

                  reset();
                })}
              >
                <div class="form-floating mb-3">
                  <input {...register("name")} type="text" class="form-control rounded-3" id="name" placeholder="name"></input>
                  <label for="name">name</label>
                </div>
                <div class="form-floating mb-3">
                  <input {...register("email")} type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com"></input>
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input {...register("password")} type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password"></input>
                  <label for="floatingPassword">Password</label>
                </div>
                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                  Sign up
                </button>
                <small class="text-muted">By clicking Sign up, you agree to the terms of use.</small>
                <hr class="my-4"></hr>
                <h2 class="fs-5 fw-bold mb-3">Or use a third-party</h2>
                <button class="w-100 py-2 mb-2 btn btn-outline-dark rounded-3" type="submit">
                  <svg class="bi me-1" width="16" height="16"></svg>
                  Sign up with google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
