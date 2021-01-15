import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE, QUIZ_RETRY
} from '../actions/actionTypes'

const initialState = {
    quizes: [],
    isLoading: false,
    results: {},
    activeQuestion: 0,
    isFinished: false,
    answerStatus: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, isLoading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, isLoading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, isLoading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, isLoading: false, quiz: action.quiz
            }
        case QUIZ_FINISHED:
            return {
                ...state, isFinished: true
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerStatus: action.answerStatus, results: action.results
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.number, answerStatus: null
            }
        case QUIZ_RETRY:
            return {
                ...state,
                results: {},
                activeQuestion: 0,
                isFinished: false,
                answerStatus: null
            }
        default:
            return state
    }
}