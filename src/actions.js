
import {
    LOAD_QUESTIONS_PENDING,
    LOAD_QUESTIONS_SUCCESS,
    LOAD_QUESTIONS_FAILED,
    CLICK_RECORD_BUTTON,
    SEND_USER_MESSAGE,
    ASK_QUESTION,
    ANSWER_QUESTION,
    JUDGE_ANSWER,
    SEND_ROBOT_MESSAGE
} from "./constants.js";
export const clickRecord = (recroding) => {
    return {
        type: CLICK_RECORD_BUTTON,
        payload: recroding
    }
};


// updateConversation
export const sendUserMessage = (event) => {
    return {
        type: SEND_USER_MESSAGE,
        payload: {
            message: event.target.dataset.value,
            sender: event.target.dataset.sender,
            time: new Date().getTime(),
            questionIndex: -1
        }
    }
}
export const sendRobotMessage = (message) => {
    return {
        type: SEND_ROBOT_MESSAGE,
        payload: {
            message: message,
            sender: "ROBOT",
            time: new Date().getTime(),
        }
    }
};

export const loadQuestions = () => (dispatch) => {
    dispatch({ type: LOAD_QUESTIONS_PENDING });
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

// set current question 
export const askQuestion = (questions) => {
    let length = questions.length;
    let index = Math.floor(Math.random()*length);
    return {
        type: ASK_QUESTION,
        payload: {
            selectedQuestionIndex: index,
            sender:"ROBOT",
            time:new Date().getTime()
        }
    };
};

export const answerQuestion = (answer, questionIndex) => {
    return {
        type: ANSWER_QUESTION,
        payload: {
            answer: answer,
            selectedQuestionIndex: questionIndex,
            sender:"USER",
            time:new Date().getTime()
        }
    }
}
/**
function retriveKeyWord(answer) {
    let wordArray = answer.split(" ");
    return wordArray[wordArray.length - 1];
}


 * 
 * @param {*} answer 
 * @param {*} questions 
 * @param {*} index 

export const judgeAnswer_old = (answer, questions, index) => {
    var judgement = "";
    if (questions[index].answer === "") {
        judgement = questions[index].notsure;
    } else {
        if (retriveKeyWord(answer).toLowerCase().includes(questions[index].answer.toLowerCase())
            ||
            retriveKeyWord(questions[index].answer).includes(answer.toLowerCase())) { judgement = questions[index].true; }
        else {
            judgement = questions[index].false;
        }
    }
    return {
        type: JUDGE_ANSWER,
        payload: {
            message: judgement,
            sender: "ROBOT",
            time: new Date().getTime()
        }

    }
}; */
export const judgeAnswer = () => {
    return {
        type: JUDGE_ANSWER,
        payload: {
            time: new Date().getTime(),
            sender:"ROBOT"
        }
    }
};
