import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";
import {Link} from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import moment from 'moment';
import 'moment/locale/en-au'

moment.locale('en-au');

const TutorialsList = () => {

  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};
    if (searchTitle) {
      params["title"] = searchTitle;
    }
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const retrieveTutorials = () => {
    const params = getRequestParams(searchTitle, page, 6);

    TutorialDataService.getAllTutorials(params)
      .then((response) => {
        const {items, totalPages} = response.data;
        setTutorials(items);
        setCount(totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveTutorials, [page]);

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
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
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={retrieveTutorials}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Tutorials List</h4>
          <ul className="list-group">
            {tutorials &&
            tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item group" + (index === currentIndex ? "active act" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
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
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <p>Title:{" "}{currentTutorial.title}</p>
              </div>
              <div>
                <h6>Description:</h6>
                <p>{currentTutorial.description.substring(0, 150) + "..."}</p>
              </div>
              <div>
                <p>Published:{" "}{moment(currentTutorial.updatedAt).format('LL')}</p>
                <p>Author:{" "}{currentTutorial.user.username}</p>
              </div>
              <Link
                to={"/tutorial/" + currentTutorial.id}
                className="btn btn-outline btn-aqua mt-3"
              >
                View
              </Link>
            </div>
          ) : (
            <div>
              <br/>
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TutorialsList;



