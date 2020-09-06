import React, {useState, useRef, useEffect} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../services/auth.service";
import Validator from "../../services/validator";
import TutorialDataService from "../../services/tutorial.service"

const UserProfileEdit = props => {

  const form = useRef();
  const checkBtn = useRef();

  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");

  const dropAlert = () => {
    setAlert("");
  }

  const getCurrentUser = id => {

    TutorialDataService.getUserById(id)
      .then(response => {
        setCurrentUser(response.data);
        setSuccessful(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log("error", error)
        setMessage(resMessage);
        setSuccessful(false);
      });
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const password = e.target.value;
    setConfirmPassword(password);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      getCurrentUser(user.id);
    } else {
      getCurrentUser(null)
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      TutorialDataService.updateUserByUser(currentUser.id, email, password).then(
        (response) => {
          console.log(response.data.message);
          props.history.push("/user/profile");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setAlert(resMessage);
        }
      );
    }
  };

  return (
    successful ? (
      <div className="col-md-7">
        <div className="edit-form">
          <h4>{currentUser.username}</h4>
          <hr/>

          {alert && (
            <div className="form-group">
              <div className="alert alert alert-danger red-style"
                   role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="close">
                  <span aria-hidden="true" className="red" onClick={dropAlert}>x</span>
                </button>
                {alert}
              </div>
            </div>
          )}

          <Form onSubmit={handleUpdate} ref={form}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control transparent"
                name="email"
                value={email}
                onChange={onChangeEmail}
                validations={[Validator.required, Validator.validEmail]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control transparent"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[Validator.required, Validator.validPassword]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm">Confirm password</label>
              <Input
                type="password"
                className="form-control transparent"
                name="confirm"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                validations={[Validator.required, Validator.validPassword, Validator.equalValue]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-outline btn-aqua btn-block">Update</button>
            </div>
            <CheckButton style={{display: "none"}} ref={checkBtn}/>
          </Form>
        </div>
      </div>
    ) : (
      <div className="col-md-12">
        <div className="edit-form">
          <div className="form-group mt-3">
            {message && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfileEdit;





