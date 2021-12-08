import React from "react";
import { Alert } from 'reactstrap';

const TimeTaken = ({ start, end }) => {
    const total = end - start;
    let color = 'success';

    if (total > 250) {
        color = 'info';
    }

    if (total > 500) {
        color = 'danger';
    }
    
    return (
        <div>
            <hr />
            <Alert color={color}>
                Time taken: {total}
            </Alert>
        </div>
    );
};

export default TimeTaken;