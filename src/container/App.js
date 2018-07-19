import React, { Component } from 'react';
import DialogPanel from "../components/DialogPanel"
import ControlPanel from "../components/ControlPanel";
import { connect } from "react-redux"
import { clickRecord, loadQuestions, askQuestion, answerQuestion, judgeAnswer } from "../actions";

const mapStateToProps = (state) => {
  return {
    RecordBtn_className: state.Rogonition.RecordBtn_className.join(" "),
    recording: state.Rogonition.recording,
    conversations: state.Questions.conversations,
    questions: state.Questions.questions,
    currentQuestionIndex: state.Questions.currentQuestionIndex

  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadQuestions: () => dispatch(loadQuestions()),
    askQuestion: (questions) => dispatch(askQuestion(questions)),
    clickRecord: (recording) => dispatch(clickRecord(recording)),
    answerQuestion: (answer, questionIndex) => dispatch(answerQuestion(answer, questionIndex)),
    judgeAnswer: () => dispatch(judgeAnswer())
  };
}
class App extends Component {
  constructor(props) {
    super(props);
    this.updateScroll = function (docID) {
      var element = document.getElementById(docID);
      element.scrollTop = element.scrollHeight;
    }
  }

  componentDidMount() {
    this.props.loadQuestions();
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.conversations.length > prevProps.conversations.length) {
      this.updateScroll("dialogPanel");
    }
  }


  render() {
    return (
      <div>
        <DialogPanel conversations={this.props.conversations} />
        <ControlPanel
          currentQuestionIndex={this.props.currentQuestionIndex}
          RecordBtn_className={this.props.RecordBtn_className}
          clickRecord={this.props.clickRecord}
          recording={this.props.recording}
          answerQuestion={this.props.answerQuestion}
          judgeAnswer={this.props.judgeAnswer}
          askQuestion={this.props.askQuestion}
          questions={this.props.questions}
        />
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);