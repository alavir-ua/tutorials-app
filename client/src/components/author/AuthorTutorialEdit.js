import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";

const AuthorTutorialEdit = props => {

  const [tutorial, setTutorial] = useState({});
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const dropAlert = () => {
    setAlert("");
    setSuccess(false);
  }

  const getTutorial = id => {

    setMessage("");
    setSuccessful(false);

    TutorialDataService.getTutorialForAuthor(id)
      .then(response => {
        setTutorial(response.data);
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
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setTutorial({...tutorial, [name]: value});
  };

  const updateTutorial = () => {

    TutorialDataService.updateTutorialByAuthor(tutorial.id, tutorial)
      .then(response => {
        setAlert(response.data.message);
        setSuccess(true);
        getTutorial(props.match.params.id);
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
      });
  };

  const deleteTutorial = () => {

    if (window.confirm(`Do you want to delete current tutorial?`)) {

      TutorialDataService.deleteTutorialByAuthor(tutorial.id)
        .then(response => {
          console.log(response);
          props.history.push("/authors/tutorials");
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
  };

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        {successful ? (
          <>
            <div className="edit-form">
              <h4>Tutorial</h4>
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
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control transparent"
                    id="title"
                    name="title"
                    value={tutorial.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows="5"
                    className="form-control transparent"
                    id="description"
                    name="description"
                    value={tutorial.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="published">Status</label>
                  <select name="published" className="transparent" onClick={handleInputChange}>
                    {tutorial.published === true ? (
                      <>
                        <option value="1" selected>Published</option>
                        <option value="0">UnPublished</option>
                      </>
                    ) : (
                      <>
                        <option value="1">Published</option>
                        <option value="0" selected>UnPublished</option>
                      </>
                    )}
                  </select>
                </div>
              </form>
            </div>
            <div style={{float:"right"}}>
              <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
                Delete
              </button>
              <button
                type="submit"
                className="badge badge-success"
                onClick={updateTutorial}
              >
                Update
              </button>
            </div>
          </>
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
  );
};

export default AuthorTutorialEdit;





