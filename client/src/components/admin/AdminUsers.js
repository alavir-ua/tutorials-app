import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";
import Pagination from "@material-ui/lab/Pagination"
import moment from 'moment';
import 'moment/locale/en-gb'

moment.locale('en-gb');

const AdminUsers = () => {

  const [users, setUsers] = useState([]);
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

  const changeUserRole = id => {

    if (window.confirm(`Do you want to change role of user with id=${id}?`)) {

      TutorialDataService.updateUserRoleByAdmin(id)
        .then(response => {
          setAlert(response.data.message);
          setSuccess(true);
          retrieveUsers();
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

  const deleteUser = id => {

    if (window.confirm(`Do you want to delete user with id=${id}?`)) {

      TutorialDataService.deleteUserByAdmin(id)
        .then(response => {
          setAlert(response.data.message);
          setSuccess(true);
          retrieveUsers();
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

  const retrieveUsers = () => {

    setMessage("");
    setSuccessful(false);

    const params = getRequestParams(page, 5);

    TutorialDataService.getAllUsersForAdmin(params)
      .then((response) => {
        const {items, totalPages} = response.data;
        setUsers(items);
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

  useEffect(retrieveUsers, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="row mt-4">
      <div className="col-md-12">
        {successful ? (
          users.length !== 0 ? (
          <>
            <h4>User management</h4>
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
                <th>Username</th>
                <th>Email</th>
                <th>Registered</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{moment(user.createdAt).format('LLL')}</td>
                      <td>{user.role.name}</td>
                      <td>
                        <button
                          className="badge badge-primary mr-1" style={{width: "70px"}}
                          onClick={() => changeUserRole(user.id)}
                        >
                          {user.role.name === "author" ? "User" : "Author"}
                        </button>
                        <button className="badge badge-danger mr-1" onClick={() => deleteUser(user.id)}>
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

export default AdminUsers;





