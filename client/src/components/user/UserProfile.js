import React, {useEffect, useState} from "react";
import AuthService from "../../services/auth.service";
import {Link} from "react-router-dom"
import TutorialDataService from "../../services/tutorial.service"

const UserProfile = props => {

  const [currentUser, setCurrentUser] = useState({})
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

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

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      getCurrentUser(user.id);
    } else {
      getCurrentUser(null)
    }
  }, []);

  const removeProfile = id => {

    if (window.confirm(`Are you sure you want to delete your profile?`)) {

      TutorialDataService.deleteUserByUser(id)
        .then(response => {
          if (response.data.num === 1) {
            props.logout();
            props.history.push("/register");
          }
        })
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setAlert(resMessage);
          setSuccess(false);
        })
    }
  }

  const dropAlert = () => {
    setAlert("");
    setSuccess(false);
  }

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        {successful ? (
          <div className="card w-75">
            <div className="card-body">

              {alert && (
                <div className="form-group">
                  <div className={success ? "alert alert-success green-style" : "alert alert-danger red-style"}
                       role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="close">
                      <span aria-hidden="true" className={success ? "green" : "red"} onClick={dropAlert}>x</span>
                    </button>
                    {alert}
                  </div>
                </div>
              )}

              <h3 className="card-title mb-3"><strong>User profile</strong></h3>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item group"><strong>Name:</strong> {currentUser.username}</li>
                <li className="list-group-item group"><strong>Email:</strong> {currentUser.email}</li>
                <li className="list-group-item group"><strong>Role:</strong> {currentUser.role.name.toUpperCase()}</li>
                <li className="list-group-item group"><strong>Id:</strong> {currentUser.id}</li>
              </ul>
              <Link to={`/user/profile/edit`} className="btn btn-outline btn-aqua">
                Edit
              </Link>
              <button className="btn btn-outline btn-red ml-1" onClick={() => removeProfile(currentUser.id)}>Delete
                profile
              </button>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
};

export default UserProfile;




