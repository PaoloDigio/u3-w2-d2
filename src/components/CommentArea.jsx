import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = function (props) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (props.asin) {
      const fetchComments = () => {
        setIsLoading(true);
        fetch("https://striveschool-api.herokuapp.com/api/comments/" + props.asin, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYTRlZjRjNTllYzAwMTk5MGQ3MjMiLCJpYXQiOjE3MTA0MjM3NjIsImV4cCI6MTcxMTYzMzM2Mn0.EMx3nhjPaBJEYXN84kCp85qNkqpf7F0Pxu78VqJAcTI",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              setIsError(true);
            }
          })
          .then((comments) => {
            setComments(comments);
            setIsLoading(false);
            setIsError(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
            setIsError(true);
          });
      };
      fetchComments();
    }
  }, [props.asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
