import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import TutorialDataService from "../../services/tutorial.service";
import AuthService from "../../services/auth.service";
import Pagination from "@material-ui/lab/Pagination"
import moment from 'moment';
import 'moment/locale/en-gb'

moment.locale('en-gb');

const AuthorTutorials = () => {

  const [tutorials, setTutorials] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const getRequestParams = (page, pageSize, userId) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    params["userId"] = userId;

    return params;
  };

  const retrieveTutorials = () => {

    setMessage("");
    setSuccessful(false);

    const user = AuthService.getCurrentUser();
    const userId = user ? user.id : null;

    const params = getRequestParams(page, 5, userId);

    TutorialDataService.getTutorialsForAuthor(params)
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
              <table className="table table-bordered text-light">
                <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
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
                          <td>{tutorial.title}</td>
                          {tutorial.published === true ?
                            (<td>{moment(tutorial.updatedAt).format('LLL')}</td>
                            ) : (
                              <td>unpublished</td>
                            )
                          }
                          <td>
                            <Link to={`/author/tutorial/${tutorial.id}/edit`} className="badge badge-success mr-1">
                              Edit
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
              <h4>There are no tutorials yet...</h4>
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

export default AuthorTutorials;





