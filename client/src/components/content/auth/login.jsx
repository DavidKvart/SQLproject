import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/authContext";
const Login = () => {
  let navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
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
              <h1 class="fw-bold mb-0 fs-2">Welcome back my friend</h1>

              {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>

            <div class="modal-body p-5 pt-0">
              <form
                onSubmit={handleSubmit((user) => {
                  const url = "http://localhost:3000/api/users/login";
                  axios
                    .post(url, user)
                    .then((res) => {
                      localStorage.setItem("token", res.headers["x-auth-token"]);
                      console.log(res.headers["x-auth-token"]);
                      setUser(res.headers["x-auth-token"]);
                    })
                    .catch((err) => {
                      alert(err);
                    });
                  navigate("/user/home");

                  reset();
                })}
              >
                <div class="form-floating mb-3">
                  <input {...register("email")} type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com"></input>
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input {...register("password")} type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password"></input>
                  <label for="floatingPassword">Password</label>
                </div>
                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                  Login
                </button>
                <small class="text-muted">By clicking Login, you agree to the terms of use.</small>
                <hr class="my-4"></hr>
              </form>
              <button type="button" class="btn btn-light" onClick={() => navigate("./creatpass")}>
                forgot password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
