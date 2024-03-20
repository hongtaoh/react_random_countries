import { Card } from 'react-bootstrap';
import React from 'react';

function Country(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.flags.png} />
      <p>{props.name.official}</p>
      <p>Capital city: {props.capital ?? ""}</p>
    </Card>
  );
}

export default Country;
