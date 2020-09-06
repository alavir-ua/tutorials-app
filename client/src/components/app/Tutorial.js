import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";
import AuthService from "../../services/auth.service"
import {Link} from "react-router-dom";
import Comment from "./Comment";
import moment from 'moment';
import 'moment/locale/en-au'

moment.locale('en-au');

const Tutorial = props => {

  const [currentTutorial, setCurrentTutorial] = useState({});
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState({});
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const getTutorial = id => {
    TutorialDataService.findTutorialById(id)
      .then(response => {
        setCurrentTutorial(response.data);
        setCurrentAuthor(response.data.user.username);
        setComments(response.data.comments);
        setCurrentUser(AuthService.getCurrentUser());

        if (currentUser && currentUser.role === "user") {
          const initialComment = {
            text: "",
            tutorialId: response.data.id,
            userId: currentUser.id
          }
          setCurrentComment(initialComment);
        }
      })
  };

  const dropAlert = () => {
    setAlert("");
    setSuccess(false);
  }

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const {name, value} = event.target;
    setCurrentComment({...currentComment, [name]: value});
  };

  const saveComment = () => {

    let data = {
      text: currentComment.text,
      tutorialId: currentTutorial.id,
      userId: currentComment.userId
    };

    TutorialDataService.createCommentByUser(data)
      .then(response => {
        setCurrentComment({
          text: response.data.text,
          tutorialId: response.data.tutorialId,
          userId: response.data.userId
        });
        getTutorial(response.data.tutorialId);
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

  return (
    <>
      {currentTutorial &&
      <div className="row mt-5">
        <div className="col-lg-8">
          <h3>{currentTutorial.title}</h3>
          <p>{currentTutorial.description}</p>
          <div className="text-right">
            <p className="mb-0"><small><b>Published: {moment(currentTutorial.updatedAt).format('LL')}</b></small></p>
            <p><small><b>Author: <Link
              to={"/author/" + currentTutorial.userId}
            >
              {currentAuthor}
            </Link></b></small></p>
          </div>
        </div>
      </div>
      }

      {comments.length !== 0 && (
        <div className="row mt-3">
          <div className="col-lg-8">
            <h5>Comments</h5>
            <ul className="list-group">
              {comments.map((comment, index) => (
                  <Comment id={comment.id} key={index}/>
                )
              )}
            </ul>
          </div>
        </div>
      )}

      {currentUser && currentUser.role === "user" && (
        <div className="row mt-3">
          <div className="col-lg-8">
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
              <label htmlFor="comment">Write a comment</label>
              <textarea
                rows="4"
                className="form-control transparent"
                id="comment"
                name="text"
                value={currentComment.text}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={saveComment} className="badge badge-success">
              Add
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Tutorial;


