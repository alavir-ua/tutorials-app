import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";
import moment from 'moment';
import 'moment/locale/en-gb'
moment.locale('en-gb');

const AdminTutorialComments = props => {
  const [comments, setComments] = useState([]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const retrieveComments = id => {

    TutorialDataService.getTutorialsCommentsForAdmin(id)
      .then((response) => {
        setComments(response.data);
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

  const deleteComment = id => {

    if (window.confirm(`Do you want to delete comment with id=${id}?`)) {

      TutorialDataService.deleteCommentByAdmin(id)
        .then(response => {
          setAlert(response.data.message);
          setSuccess(true);
          retrieveComments(props.match.params.id);
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
    }
  }

  const dropAlert = () => {
    setAlert("");
    setSuccess(false);
  }

  useEffect(() => {
    retrieveComments(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        {successful ? (
          <>
            <h4>Managing comments</h4>
            {alert && (
              <div className="form-group">
                <div className={success ? "alert alert-success green-style" : "alert alert-danger red-style"} role="alert">
                  <button type="button" className="close" data-dismiss="alert" aria-label="close">
                    <span aria-hidden="true" className={success ? "green" : "red"} onClick={dropAlert}>x</span>
                  </button>
                  {alert}
                </div>
              </div>
            )}
            <table className="table table-bordered text-light">
              <thead>
              <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Owner</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {
                comments.map((comment, index) => {
                    return (
                      <tr key={index}>
                        <td>{comment.id}</td>
                        <td>{comment.text.substring(0, 80) + "..."}</td>
                        <td>{comment.user.username}</td>

                        <td>{moment(comment.updatedAt).format('LLL')}</td>

                        <td>
                          <button className="badge badge-danger mr-1" onClick={() => deleteComment(comment.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  }
                )
              }
              </tbody>
            </table>
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
  )
};
export default AdminTutorialComments;





