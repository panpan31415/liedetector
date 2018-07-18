import React from 'react';

const HumanCvst = (props) => {
    return (<div className="conversation">
        <p className="human">{props.words}</p>
        <span className="head_icon human_icon"></span>
    </div>);
};

export default HumanCvst;