import React from 'react'
import classes from './ActiveQuiz.module.css'
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.QuizQuestion}>
            <span>
                <strong>{props.activeQuestion}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.activeQuestion} из {props.quizLength}</small>
        </p>

        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)

export default ActiveQuiz