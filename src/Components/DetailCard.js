import React from "react";
import Card from "react-bootstrap/Card";

function DetailCard(props) {
  return (
    <>
      {props.data !== null && (
        <Card style={{ width: "100%" }}>
          <Card.Img variant="top" src={props.data.poster} />
          <Card.Body>
            <Card.Title>{props.data.name}</Card.Title>
            <Card.Text>{props.data.description}</Card.Text>
            <Card.Link href={props.data.webpage}>
              {props.data.webpage}
            </Card.Link>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default DetailCard;
