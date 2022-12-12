import React from "react";

const Title = ({ message, day, year }) => {
    return (
        <div className="d-flex justify-content-between pr-4">
            <h4 className="pl-4">{message || `Day ${day}, ${year}`}</h4>
            {day && year && <a target="_blank" href={`https://adventofcode.com/${year}/day/${day}`}>Puzzle</a>}
        </div>
    );
};

export default Title;