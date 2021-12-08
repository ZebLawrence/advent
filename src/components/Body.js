import React from "react";
import { Card, CardBody } from 'reactstrap';

const Body = ({ children }) => {
    return (
        <Card>
          <CardBody>         
              {children}
          </CardBody>
        </Card>
    );
};

export default Body;