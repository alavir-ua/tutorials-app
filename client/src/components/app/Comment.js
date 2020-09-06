import React, {useState, useEffect} from "react";
import TutorialDataService from "../../services/tutorial.service"

const Comment = props => {

  const [comment, setComment] = useState({});
  const [owner, setOwner] = useState("");

  const getComment = id => {
    TutorialDataService.findCommentById(id)
      .then(response => {
        setComment(response.data);
        setOwner(response.data.user.username)
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComment(props.id);
  }, [props.id]);

  return (
    <li className="list-group-item group mb-1">
      <div style={{fontStyle: "italic"}}>
        {comment.text}
      </div>
      <div className="text-right">
        <small><b>{owner}</b></small>
      </div>
    </li>
  )
}

export default Comment;





