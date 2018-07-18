
import {
    LOAD_QUESTIONS,
    LOAD_QUESTIONS_SUCCESS,
    LOAD_QUESTIONS_FAILED,
    CLICK_RECORD_BUTTON,
    SEND_MESSAGE,
    ASK_QUESTION,
    GET_CURRENT_QUESTION,
    UPDATE_QUESTION
} from "./constants.js";
export const clickRecord = (recroding) => {
    return {
        type: CLICK_RECORD_BUTTON,
        payload:recroding
    }
};

export const loadQuestions = () => (dispatch) => {
    dispatch({ type: LOAD_QUESTIONS });
    fetch("./Questions.json")
        .then(response => response.json())
        .then((data) => dispatch({
            type: LOAD_QUESTIONS_SUCCESS,
            payload: data
        }))
        .catch(err => dispatch({
            type: LOAD_QUESTIONS_FAILED,
            payload: err
        }));
};

// updateConversation
export const sendMessage = (event) => {
    return {
        type: SEND_MESSAGE,
        payload: {
            message: event.target.dataset.value ,
            sender: event.target.dataset.sender,
            time: new Date().getTime()
        }
    };
}

export const updateQuestion = (index,question)=>{
    return {
        type:UPDATE_QUESTION,
        payload:{
            question:question,
            index:index
        }

    }
};

// set current question 
export const askQuestion = (questions) => {
    let length = this.props.questions;
    let index = Math.floor(Math.random() * length);
    return {
        type: ASK_QUESTION,
        payload:questions[index]
    };
};

export const answerQuestion =(text)=>{
    return {
        type:"ANSWER_QUESTION",
        payload:text
    }
}



