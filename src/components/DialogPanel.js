import React from 'react';
import RobotCvst from './RobotCvst';
import HumanCvst from './HumanCvst';

const DialogPanel = (props)=>{

  let dialog = props.conversations.filter(d=>d).map(
    (c)=>{
      if(c.sender === "USER"){
        return<HumanCvst words={c.message} key={c.time} />;
      }else if(c.sender === "ROBOT"){
        return <RobotCvst words={c.message} key={c.time} />;
      }else{
        return  <RobotCvst words={"unknown system error"} key={new Date().getTime()}/>;
      }
    }
  );
    return( <div id="dialogPanel" className="dialogPanel"><div style={{height:"100%",width:"100%"}}>{dialog}</div>
  </div>);
};

export default DialogPanel;