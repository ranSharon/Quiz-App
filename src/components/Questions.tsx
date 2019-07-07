import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {IQuiz} from '../models/IQuiz';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Question from './Question';

interface IProps {
    imgSrc: string,
    question: string,
    currentQuestion: number,
    quiz: IQuiz,
    setLastQuestion: Function,
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '60%',
        margin: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        position: 'relative',
    },
    content: {
        paddingTop: '8px'
    },
    overlay: {
        position: 'absolute',
        top: '80%',
        width: '100%',
        margin: 'auto',
    },
    overlayQuestion: {
        color: 'black',
        backgroundColor: 'rgba(255,255,255, 0.5)',
        fontWeight: 'bold',
        fontSize: '1.5em'
    },
    progress: {
        margin: theme.spacing(2),
    }
}));

const Questions: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        if (Object.getOwnPropertyNames(props.quiz).length > 0) {
            props.setLastQuestion(props.quiz.questions.length)
        }
    }, [props.quiz]);

    const classes = useStyles();

    if (Object.getOwnPropertyNames(props.quiz).length === 0) {
        return (
            <CircularProgress className={classes.progress}/>
        );
    }
    return (
        <Question
            imgSrc={props.imgSrc}
            question={props.question}
        />
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLastQuestion: (lastQuestion: number) => {
        dispatch({type: '[QUIZ] SET_LAST_QUESTION', payload: lastQuestion});
    }
});

const mapStateToProps = (state: any) => {
    const currentQuestion = state.quiz.currentQuestion;
    let question = '';
    let imgSrc = '';
    const quiz = state.quiz.quiz;
    if (Object.getOwnPropertyNames(quiz).length !== 0) {
        question = quiz.questions[currentQuestion].text;
        imgSrc = quiz.questions[currentQuestion].imgSrc;
    }
    return {
        quiz: quiz,
        question: question,
        imgSrc: imgSrc,
        currentQuestion: currentQuestion
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
