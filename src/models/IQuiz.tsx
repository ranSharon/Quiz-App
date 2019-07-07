import {IQuestion} from './IQuestion'
import {IResult} from './IResult'

export interface IQuiz {
    quizType: string,
    questions: Array<IQuestion>,
    results: Array<IResult>
}