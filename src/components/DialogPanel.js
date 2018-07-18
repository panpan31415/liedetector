import React from 'react';
import RobotCvst from './RobotCvst';
import HumanCvst from './HumanCvst';











const DialogPanel = (props)=>{

  let dialog = props.conversations.map(
    (c)=>{
      if(c.sender === "USER"&& c.message){
        return<HumanCvst words={c.message} key={c.time}/>
      }else if(c.sender==="ROBOT"&& c.message){
        return <RobotCvst words={c.message} key={c.time}/>
      }else return null;
    }
  );


    return( <div id="dialogPanel" className="dialogPanel">{dialog}
  </div>);
};

export default DialogPanel;