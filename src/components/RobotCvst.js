import React from 'react';

const RobotCvst = (props) => {
    return (
    <div className="conversation">
     <span className="head_icon robot_icon"></span>
     <p className="robot">{props.words}</p>
     </div>);
};

export default RobotCvst;