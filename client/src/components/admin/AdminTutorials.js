import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import TutorialDataService from "../../services/tutorial.service";
import Pagination from "@material-ui/lab/Pagination"
import moment from 'moment';
import 'moment/locale/en-gb'

moment.locale('en-gb');

const AdminTutorials = () => {

  const [tutorials, setTutorials] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const dropAlert = () => {
    setAlert("");
    setSuccess(false);
  }

  const changeTutorialStatus = id => {

    if (window.confirm(`Do you want to change status of tutorial with id=${id}?`)) {

      TutorialDataService.updateTutorialStatusByAdmin(id)
        .then(response => {
          setAlert(response.data.message);
          setSuccess(true);
          retrieveTutorials();
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
  };

  const deleteTutorial = id => {

    if (window.confirm(`Do you want to delete tutorial with id=${id}?`)) {

      TutorialDataService.deleteTutorialByAdmin(id)
        .then(response => {
          setAlert(response.data.message);
          setSuccess(true);
          retrieveTutorials();
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

  const retrieveTutorials = () => {

    setMessage("");
    setSuccessful(false);

    const params = getRequestParams(page, 5);

    TutorialDataService.getAllTutorialsForAdmin(params)
      .then((response) => {
        const {items, totalPages} = response.data;
        setTutorials(items);
        setCount(totalPages);
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

  useEffect(retrieveTutorials, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        {successful ? (
          tutorials.length !== 0 ? (
          <>
            <h4>Management of tutorials</h4>
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
                <th>Title</th>
                <th>Author</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {
                tutorials.map((tutorial, index) => {
                    return (
                      <tr key={index}>
                        <td>{tutorial.id}</td>
                        <td>{tutorial.title.substring(0, 55) + "..."}</td>
                        <td>{tutorial.user.username}</td>
                        {tutorial.published === true ?
                          (<td>{moment(tutorial.updatedAt).format('LLL')}</td>
                          ) : (
                            <td>unpublished</td>
                          )
                        }
                        <td>
                          <button
                            className="badge badge-primary mr-1"
                            onClick={() => changeTutorialStatus(tutorial.id)}
                          >
                            {tutorial.published === true ? "UnPublish" : "Publish"}
                          </button>
                          <button className="badge badge-danger mr-1" onClick={() => deleteTutorial(tutorial.id)}>
                            Delete
                          </button>

                          <Link to={`/admin/tutorial/${tutorial.id}/comments`} className="badge badge-success mr-1">
                            Comments
                          </Link>
                        </td>

                      </tr>
                    )
                  }
                )
              }
              </tbody>
            </table>
            <div className="mt-3">

              <Pagination
                className="group my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
              />
            </div>
          </>
          ) : (
            <div className="form-group mt-3">
              <h4>There are no users yet...</h4>
            </div>
          )
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

export default AdminTutorials;





