import React, {useState} from "react";
import TutorialDataService from "../../services/tutorial.service";
import AuthService from "../../services/auth.service"

const AuthorTutorialCreate = props => {

  const user = AuthService.getCurrentUser();
  const userId = user.id;

  const initialTutorialState = {
    title: "",
    description: "",
    published: false,
    userId
  };

  const [tutorial, setTutorial] = useState(initialTutorialState);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const handleInputChange = event => {
    const {name, value} = event.target;
    setTutorial({...tutorial, [name]: value});
  };

  const saveTutorial = () => {

    let data = {
      title: tutorial.title,
      description: tutorial.description,
      published: tutorial.published,
      userId: userId
    };

    TutorialDataService.createTutorialByAuthor(data)
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
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
      });
  };

  const dropAlert = () => {
    setAlert("");
    setSuccess(false);
  }

  return (
    <div className="submit-form">
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
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control transparent"
          id="title"
          required
          value={tutorial.title}
          onChange={handleInputChange}
          name="title"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          rows="6"
          className="form-control transparent"
          id="description"
          required
          value={tutorial.description}
          onChange={handleInputChange}
          name="description"
        />
      </div>
      <div className="form-group">
        <label htmlFor="published">Status</label>
        <select name="published" className="transparent" defaultValue="0" onClick={handleInputChange}>
          <option value="1">Publish</option>
          <option value="0">UnPublish</option>
        </select>
      </div>
      <div style={{float: "right"}}>
        <button onClick={saveTutorial} className="badge badge-success">
          Create
        </button>
      </div>
    </div>
  )
}

export default AuthorTutorialCreate;





