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
 * prepare  conversation
 */
const initialState_Conversation = {
    conversations: [],
    currentConversationIndex: 0
}
export const conversation = (state = initialState_Conversation, action = {}) => {
    switch (action.type) {
        case SEND_MESSAGE: {
            const { message, sender, time } = action.payload;
            return { ...state, conversations: [...state.conversations, { message: message, sender: sender, time: time }] };
        } default: {
            return state;
         }
    }
}