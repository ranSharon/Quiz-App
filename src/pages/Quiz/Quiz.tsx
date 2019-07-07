import React, {useEffect} from 'react';
import Questions from '../../components/Questions';
import Header from '../../components/Header';
// import gotLogo from '../../assets/got.jpg';
// import friendsLogo from '../../assets/friends.jpg';
// import svLogo from '../../assets/sv.png';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import Result from "../Result/Result";
import {IQuiz} from "../../models/IQuiz";

interface IProps {
    quizType: string,
    quizStart: boolean,
    quizEnd: boolean,
    currentQuestion: number,
    lastQuestion: number,
    quiz: IQuiz,
    onStartClick: Function,
    resetQuizData: Function,
    updateQuizType: Function,
    updateNavTab: Function
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '60%',
        margin: 'auto'
    },
    media: {
        width: '100%',
        height: '400px',
    },
    button: {
        margin: theme.spacing(1),
    }
}));

const Quiz: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        const path = window.location.pathname;
        const quizTypeByPath = getQuizTypeByPath(path);
        const navTabByPath = getNavTabByPath(path);
        props.updateNavTab(navTabByPath);

        // condition that take care of the case that the user click back or forward, or change url manually
        if (quizTypeByPath !== props.quizType) {
            props.updateQuizType(quizTypeByPath);
            props.resetQuizData();
        }

        // case user change quiz and immediately refresh page and the prev quiz data didn't finished to reset
        if (Object.getOwnPropertyNames(props.quiz).length > 0) {
            if (props.quizType !== props.quiz.quizType) {
                props.resetQuizData();
            }
        }
    }, []);

    const getQuizTypeByPath = (path: string) => {
        switch (path) {
            case '/gameOfThronesQuiz':
                return 'Game Of Thrones';
            case '/friendsQuiz':
                return 'Friends';
            case '/siliconValleyQuiz':
                return 'Silicon Valley';
        }
    };

    const getNavTabByPath = (path: string) => {
        switch (path) {
            case '/gameOfThronesQuiz':
                return 1;
            case '/friendsQuiz':
                return 2;
            case '/siliconValleyQuiz':
                return 3;
        }
    };

    const classes = useStyles();

    const setImgSrc = () => {
        switch (props.quizType) {
            case 'Game Of Thrones':
                return 'https://www.youtube.com/embed/TZE9gVF1QbA';
            case 'Friends':
                return 'https://www.youtube.com/embed/TgP8v60X23c';
            case 'Silicon Valley':
                return 'https://www.youtube.com/embed/4eMYiDaY3-Q';
        }
    };

    if (props.quizEnd) {
        return (
            <div>
                <Header/>
                <Result/>
            </div>
        );
    }
    if (props.quizStart) {
        return (
            <div>
                <Header/>
                <Questions/>
            </div>
        );
    }
    return (
        <div>
            <Header/>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={setImgSrc()}
                    component="iframe"
                    src="Show opening"
                />
                <CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={() => props.onStartClick(props.quizType)}>
                        Let's Start Quiz
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const quiz = state.quiz.quiz;
    const quizType = state.quiz.quizType;
    const quizStart = state.quiz.quizStart;
    const currentQuestion = state.quiz.currentQuestion;
    const lastQuestion = state.quiz.lastQuestion;
    const quizEnd = state.quiz.quizEnd;
    return {
        quizType: quizType,
        quizStart: quizStart,
        currentQuestion: currentQuestion,
        lastQuestion: lastQuestion,
        quizEnd: quizEnd,
        quiz: quiz
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStartClick: (quizType: string) => {
        dispatch({type: '[QUIZ] QUIZ_START', payload: true});
        switch (quizType) {
            case 'Game Of Thrones':
                dispatch({type: '[QUIZZES API] GET_GOT_QUIZ'});
                break;
            case 'Friends':
                dispatch({type: '[QUIZZES API] GET_FRIENDS_QUIZ'});
                break;
            case 'Silicon Valley':
                dispatch({type: '[QUIZZES API] GET_SV_QUIZ'});
                break;
        }
    },
    updateQuizType: (quizType: string) => {
        dispatch({type: '[QUIZ] UPDATE_QUIZ_TYPE', payload: quizType});

    },
    updateNavTab: (value: number) => {
        dispatch({type: '[NAV TAB] UPDATE_NAV_TAB', payload: value});
    },
    resetQuizData: () => {
        dispatch({type: '[QUIZ] RESET_LAST_QUESTION'});
        dispatch({type: '[QUIZ] QUIZ_START', payload: false});
        dispatch({type: '[QUIZ] RESET_QUESTION_NUM'});
        dispatch({type: '[QUIZ] QUIZ_END', payload: false});
        dispatch({type: '[VALUE] RESET_VALUE'});
        dispatch({type: '[QUIZ] RESET_QUIZ'});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
