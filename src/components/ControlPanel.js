import React from "react";
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from "prop-types";

const SpeechRecognition_propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

const ControlPanel = (props) => {
    const { propstranscript, transcript, listening, browserSupportsSpeechRecognition, startListening, stopListening, resetTranscript, onRecordBtnClicked, sendMsg } = props;
    if (!browserSupportsSpeechRecognition) {
        return <p style={{ color: "white" }}>Your browser doesn't support speech recognition,use latest chrom to try this application!</p>
    } else {
        return (
            <div className="dialogControlPanel ">
                <input type="button" onClick={() =>{
                    if(props.recording){
                        stopListening();
                        resetTranscript();
                        props.clickRecord(false);
                        console.log(true);
                    }else{
                        startListening();
                        props.clickRecord(true);
                        console.log(false);
                    }
                }} 
                    className={props.RecordBtn_className}
                />
                <textarea type="textarea" id="redoredText" value={transcript} placeholder={"click the microphone to start"}></textarea>
                <button type="button" className="sendMsg" data-value={transcript} data-sender={"USER"} onClick={(event) => { props.sendMsg(event); resetTranscript(); }} >Send</button>
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