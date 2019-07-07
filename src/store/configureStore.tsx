import {applyMiddleware, combineReducers, createStore} from 'redux'
import {quizzesMdl} from './quizzes.api.middleware';
import {loadState} from '../localStorage/localStorage';
import { composeWithDevTools } from 'redux-devtools-extension';


export interface Action {
    type: string;
    payload: any;
}

const navTabInitState = {
    currentNavTab: 0
};

export const navTabReducer = (state = navTabInitState, action: Action) => {
    if (action.type === '[NAV TAB] UPDATE_NAV_TAB') {
        return {
            ...state,
            currentNavTab: action.payload
        };
    } else {
        return state;
    }
};

const quizInitState = {
    quiz: {},
    quizType: '',
    currentQuestion: 0,
    quizStart: false,
    lastQuestion: 0,
    quizEnd: false
};

export const quizReducer = (state = quizInitState, action: Action) => {
    switch (action.type) {
        case '[QUIZ] SET_QUIZ':
            return {
                ...state,
                quiz: {...action.payload}
            };
        case '[QUIZ] UPDATE_QUIZ_TYPE':
            return {
                ...state,
                quizType: action.payload
            };
        case '[QUIZ] RESET_QUIZ':
            return {
                ...state,
                quiz: {}
            };
        case '[QUIZ] ADVANCE_QUESTION_NUN':
            return {
                ...state,
                currentQuestion: state.currentQuestion += 1,
            };
        case '[QUIZ] RESET_QUESTION_NUM':
            return {
                ...state,
                currentQuestion: 0,
            };
        case '[QUIZ] QUIZ_START':
            return {
                ...state,
                quizStart: action.payload,
            };
        case '[QUIZ] SET_LAST_QUESTION':
            return {
                ...state,
                lastQuestion: action.payload,
            };
        case '[QUIZ] RESET_LAST_QUESTION':
            return {
                ...state,
                lastQuestion: 0,
            };
        case '[QUIZ] QUIZ_END':
            return {
                ...state,
                quizEnd: action.payload,
            };
        default:
            return state;
    }
};

const valueInitState = {
    value: 0,
};

export const valueReducer = (state = valueInitState, action: Action) => {
    switch (action.type) {
        case '[VALUE] UPDATE_VALUE':
            return {
                ...state,
                value: state.value + action.payload
            };
        case '[VALUE] RESET_VALUE':
            return  {
                ...state,
                value: 0
            };
        default:
            return state;
    }
};

const AppThemeTypeInitState = {
    themeType: 'light' ,
};

export const themeTypeReducer = (state = AppThemeTypeInitState, action: Action) => {
    if (action.type === '[THEME TYPE] UPDATE_THEME_TYPE') {
        return {
            ...state,
            themeType: action.payload
        };
    } else {
        return state;
    }
};

export default function configureStore() {
    const persistedState = loadState();
    const middlewareEnhancer = applyMiddleware(...quizzesMdl);

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const rootReducer = combineReducers({
        quiz: quizReducer,
        value: valueReducer,
        navTab: navTabReducer,
        theme: themeTypeReducer
    });

    // return createStore(rootReducer, persistedState, middlewareEnhancer);
    return createStore(rootReducer, persistedState, composedEnhancers);

}

/////////////////////////////////////////////////////

// export default function configureStore(preloadedState) {
//     const middlewares = [loggerMiddleware, thunkMiddleware]
//     const middlewareEnhancer = applyMiddleware(...middlewares)
//
//     const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//     const composedEnhancers = composeWithDevTools(...enhancers)
//
//     const store = createStore(rootReducer, preloadedState, composedEnhancers)
//
//     return store
// }