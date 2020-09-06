import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination"

const AuthorsList = () => {

  const [authors, setAuthors] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchName, setSearchName] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};
    if (searchName) {
      params["username"] = searchName;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveAuthors = () => {
    const params = getRequestParams(searchName, page, 5);

    TutorialDataService.getAllAuthors(params)
      .then((response) => {
        const {items, totalPages} = response.data;
        setAuthors(items);
        setCount(totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(retrieveAuthors, [page]);

  const setActiveAuthor = (author, index) => {

    TutorialDataService.findAuthorById(author.id)
      .then((response) => {
        setCurrentAuthor(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setCurrentIndex(index);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <div className="row mt-2">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={retrieveAuthors}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Authors List</h4>
          <ul className="list-group">
            {authors &&
            authors.map((author, index) => (
                <li
                  className={
                    "list-group-item group" + (index === currentIndex ? "active act" : "")
                  }
                  onClick={() => setActiveAuthor(author, index)}
                  key={index}
                >
                  {author.username}
                </li>
              )
            )}
          </ul>
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
        </div>
        <div className="col-md-6">
          {currentAuthor ? (
            <div>
              <h4>Tutorials of <span>{currentAuthor.username}</span></h4>
              <ul className="list-group">
                {currentAuthor.tutorials &&
                currentAuthor.tutorials.map((tutorial, index) => (
                    <li key={index}>
                      <p>
                        <Link className="list"
                              to={"/tutorial/" + tutorial.id}
                        >
                          {tutorial.title}
                        </Link>
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            <div>
              <br/>
              <p>Please click on a Author...</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
};

export default AuthorsList;

