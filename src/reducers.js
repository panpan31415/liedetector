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


/**
 * the status of regonition module
 */
const initialState_Recogonition = {
    RecordBtn_className: [],
    recording: false
};

export const Rogonition = (state = initialState_Recogonition, action = {}) => {
    switch (action.type) {
        case CLICK_RECORD_BUTTON:
            {
                let RecordBtn_className;
                let recording;
                if (action.payload) {
                    RecordBtn_className = ["recordingActive"];
                } else {
                    RecordBtn_className = [];
                }
                recording = action.payload;
                return { ...state, RecordBtn_className: RecordBtn_className, recording: recording }
            } default: {
                return state;
            }
    }
};
/**
 * questions 
 */
const initialState_Conversations =
{
    questions: [],
    currentQuestionIndex: -1,
    loadQuestionError: null,
    conversations: [{
        message: "Hello, the microphone doesn't work properly sometimes",
        sender: "ROBOT", time: new Date().getTime()
    }],
    currentUserAnswer: "",
};
export const Questions = (state = initialState_Conversations, action = {}) => {
    switch (action.type) {
        case LOAD_QUESTIONS_PENDING: {
            return state;
        }
        case LOAD_QUESTIONS_SUCCESS: {
            return { ...state, questions: action.payload }
        }
        case LOAD_QUESTIONS_FAILED: {
            return { ...state, loadQuestionError: action.payload }
        }
        case ASK_QUESTION: {
            return {
                ...state,
                currentQuestionIndex: action.payload.selectedQuestionIndex,
                conversations: [...state.conversations, {
                    message: state.questions[action.payload.selectedQuestionIndex].question,
                    sender: action.payload.sender,
                    time: action.payload.time
                }]
            }
        }
        case ANSWER_QUESTION: {
            if (action.payload.selectedQuestionIndex === -1) {
                return {
                    ...state, conversations: [...state.conversations, {
                        message: action.payload.answer,
                        sender: action.payload.sender,
                        time: action.payload.time
                    }]
                };
            } else {
                return {
                    ...state,
                    currentUserAnswer: action.payload.answer,
                    currentQuestionIndex: action.payload.selectedQuestionIndex,
                    conversations: [...state.conversations, {
                        message: action.payload.answer,
                        sender: action.payload.sender,
                        time: action.payload.time
                    }]

                }
            }

        }
        case JUDGE_ANSWER: {
            let judgement = "";
            let questions = state.questions;
            let answer = state.currentUserAnswer;
            let sender = action.payload.sender;
            let questionIndex = state.currentQuestionIndex;
            let { time } = action.payload;
            if (questionIndex === -1) {
                judgement = "hello , But... I need to ask you someting to test your honesty ";
            } else if (answer.trim() === "") {
                judgement = "I can't hear anything";
            }
            else {
                if (questions[questionIndex]["answer"] === "") {
                    judgement = questions[questionIndex].notsure;
                } else {
                    if (answer.toLowerCase().includes(questions[questionIndex].answer.toLowerCase())
                        ||
                        questions[questionIndex].answer.includes(answer.toLowerCase())) {
                        judgement = questions[questionIndex].true;
                    }
                    else {
                        judgement = questions[questionIndex].false;
                    }
                }
                questions[questionIndex].answer = answer;
            }


            return {
                ...state,
                questions: [...questions],
                conversations: [...state.conversations, { message: judgement, sender: sender, time: time }]
            }
        }
        case SEND_USER_MESSAGE: {
            const { message, sender, time } = action.payload;
            return { ...state, conversations: [...state.conversations, { message: message, sender: sender, time: time }] };
        }
        case SEND_ROBOT_MESSAGE: {
            const { message, sender, time } = action.payload;
            return { ...state, conversations: [...state.conversations, { message: message, sender: sender, time: time }] };
        }
        default: {
            return state;
        }

    }
}


