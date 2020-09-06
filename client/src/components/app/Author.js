import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service";
import {Link} from "react-router-dom"

const Author = props => {

  const [currentAuthor, setCurrentAuthor] = useState({});

  const getAuthor = id => {
    TutorialDataService.findAuthorById(id)
      .then(response => {
        setCurrentAuthor(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAuthor(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="row mt-5">
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
  );
};

export default Author;






