import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            let quizes = []

            Object.keys(response.data).map((key, index) => {
                return quizes.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz

        if (state.answerStatus && state.answerStatus[answerId] === 'success') {
            return
        }

        const question = state.quiz[state.activeQuestion]
        const results = {...state.results}

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if (isLastQuestion(state)) {
                    dispatch(quizFinished())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'fail'
            dispatch(quizSetState({[answerId]: 'fail'}, results))
        }
    }
}

export function quizSetState(answerStatus, results) {
    return {
        type: QUIZ_SET_STATE,
        answerStatus, results
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizFinished() {
    return {
        type: QUIZ_FINISHED
    }
}

export function quizRetry() {
    return {
        type: QUIZ_RETRY
    }
}

function isLastQuestion(state) {
    return state.activeQuestion + 1 === state.quiz.length
}