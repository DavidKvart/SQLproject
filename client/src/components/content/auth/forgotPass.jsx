import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { required } from "joi";
const ForgotPassword = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password1: "",
      password2: "",
    },
  });
  return (
    <div className="mainContainer">
      <div class="modal modal-signin position-static d-block  py-5" tabindex="-1" role="dialog" id="modalSignin">
        <div class="modal-dialog" role="document">
          <div class="modal-content rounded-4 shadow">
            <div class="modal-header p-5 pb-4 border-bottom-0">
              <h3 class="fw-bold mb-0 fs-2">enter your new details</h3>
            </div>

            <div class="modal-body p-5 pt-0">
              <form
                onSubmit={handleSubmit((user) => {
                  const url = "http://localhost:3000/api/users/changePassword";
                  console.log(user);
                  axios
                    .post(url, user)
                    .then((res) => {
                      alert("you password has been changed! ");
                      localStorage.setItem("token", res.headers["x-auth-token"]);
                      navigate("/user/home");
                    })
                    .catch((err) => {
                      alert(err.response.data);
                    });

                  reset();
                })}
              >
                <div class="form-floating mb-3">
                  <input {...register("email", { required: true })} type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com"></input>
                  <label for="floatingInput">Email address</label>
                </div>

                <br />
                <div class="form-floating mb-3">
                  <input {...register("password1", { required: true })} type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password"></input>
                  <label for="floatingPassword"> new password</label>
                </div>
                <div class="form-floating mb-3">
                  <input {...register("password2", { required: true })} type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password"></input>
                  <label for="floatingPassword"> new password</label>
                </div>
                <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                  Change password and login
                </button>
                <small class="text-muted">By clicking , you agree to the terms of use.</small>
                <hr class="my-4"></hr>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
