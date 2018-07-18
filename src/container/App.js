import React, { Component } from 'react';
import DialogPanel from "../components/DialogPanel"
import ControlPanel from "../components/ControlPanel";
import { connect } from "react-redux"
import { clickRecord,sendMessage} from "../actions";

const mapStateToProps = (state) => {
  return {
    RecordBtn_className:state.Rogonition.RecordBtn_className.join(" "),
    recording:state.Rogonition.recording,
    conversations:state.conversation.conversations

  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    clickRecord:(recording)=>dispatch(clickRecord(recording)),
    sendMsg:(event)=>dispatch(sendMessage(event))
  };
}
class App extends Component {

  componentDidMount() {
 //   this.props.onRequestQuestions();
  }
  render() {
    return (
      <div>
        <DialogPanel conversations={this.props.conversations}/>
        <ControlPanel RecordBtn_className={this.props.RecordBtn_className} clickRecord={this.props.clickRecord} recording={this.props.recording} sendMsg={this.props.sendMsg}/>
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);