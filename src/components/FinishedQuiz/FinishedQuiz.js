import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    const rightCounter = Object.values(props.results).reduce((total, value) => {
        if (value === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li key={index}>
                            <strong>{quizItem.id}</strong>. &nbsp;
                                {quizItem.question}
                                <i className={cls.join(' ')}></i>
                        </li>
                    )
                })}

                <p>Правильно {rightCounter} из {props.quiz.length}</p>

                <div>
                    <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                    <Link to='/'>
                        <Button type='success'>Перейти в список тестов</Button>
                    </Link>
                </div>
            </ul>
        </div>
    )
}

export default FinishedQuiz