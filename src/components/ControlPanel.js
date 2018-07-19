import React from "react";
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from "prop-types";

const SpeechRecognition_propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

const ControlPanel = (props) => {
    const {
        transcript,
        browserSupportsSpeechRecognition,
        startListening,
        stopListening,
        resetTranscript,
        recording,
        clickRecord,
        RecordBtn_className,
        currentQuestionIndex,
        answerQuestion,
        askQuestion,
        judgeAnswer,
        questions} = props;
    if (!browserSupportsSpeechRecognition) {
        return <p style={{ color: "white" }}>Your browser doesn't support speech recognition,use latest chrom to try this application!</p>
    } else {
        return (
            <div className="dialogControlPanel ">
                <input type="button"
                    onClick={() => {
                        if (recording) {
                            stopListening();
                            resetTranscript();
                            clickRecord(!recording);
                        } else {
                            startListening();
                            clickRecord(!recording);
                        }
                    }}
                    className={RecordBtn_className}
                />
                <textarea type="textarea" id="redoredText" value={transcript} placeholder={"click the microphone to start"}></textarea>
                <button type="button" className="sendMsg" data-sender={"USER"}
                    onClick={(event) => {
                        answerQuestion(event.target.previousElementSibling.value, currentQuestionIndex);
                        resetTranscript();
                        judgeAnswer();
                        askQuestion(questions);
                    }} >Send</button>
            </div>
        );
    }
};
const options = {
    autoStart: false,
    lang: 'en-DK'
}
ControlPanel.props = { ...ControlPanel.props, ...SpeechRecognition_propTypes };
export default SpeechRecognition(options)(ControlPanel);