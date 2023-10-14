import React from "react";
import { Card, CardBody } from 'reactstrap';

const Body = ({ children }) => {
    return (
        <Card color="dark" dark>
          <CardBody color="dark" dark>      
              {children}
          </CardBody>
        </Card>
    );
};

export default Body;