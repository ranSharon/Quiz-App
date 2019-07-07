import {Dispatch, Middleware, MiddlewareAPI} from 'redux';

const getQuizzesFlow: Middleware = ({dispatch}: MiddlewareAPI) => (next: Dispatch) => action => {
    if (action.type === '[QUIZZES API] GET_GOT_QUIZ') {
        fetchQuiz('data/gamesOfThronesQuiz.json',dispatch);
    }
    if(action.type === '[QUIZZES API] GET_FRIENDS_QUIZ'){
        fetchQuiz('data/friendsQuiz.json',dispatch);
    }
    if(action.type === '[QUIZZES API] GET_SV_QUIZ'){
        fetchQuiz('data/siliconValleyQuiz.json',dispatch);
    }
    return next(action);
};

const fetchQuiz = (quizType: string, dispatch: Function) => {
    fetch(quizType)
        .then(res => res.json())
        .then((data: any) => {
            dispatch({type: '[QUIZ] SET_QUIZ', payload: {...data[0]}});
        })
        .catch((e) => {
            console.error('Quiz Fetch failed', e)
        })
};

export const quizzesMdl = [getQuizzesFlow];
