import {navTabReducer, quizReducer, valueReducer, themeTypeReducer} from './configureStore';

describe('navTab reducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore
        expect(navTabReducer(undefined, {})).toEqual(
            {
                currentNavTab: 0
            }
        )
    })

    it('should handle [NAV TAB] UPDATE_NAV_TAB', () => {
        const random: number = Math.floor(Math.random()*100);
        expect(
            navTabReducer({currentNavTab: 0}, {
                type: '[NAV TAB] UPDATE_NAV_TAB',
                payload: random
            })
        ).toEqual(
            {
                currentNavTab: random
            }
        )
    })
})

describe('quiz reducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore
        expect(quizReducer(undefined, {})).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] SET_QUIZ', () => {
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] SET_QUIZ',
                // @ts-ignore
                payload: {quiz: 'quiz'}
            })
        ).toEqual(
            {
                quiz: {quiz: 'quiz'},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] UPDATE_QUIZ_TYPE', () => {
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] UPDATE_QUIZ_TYPE',
                // @ts-ignore
                payload: 'quiz type'
            })
        ).toEqual(
            {
                quiz: {},
                quizType: 'quiz type',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] RESET_QUIZ', () => {
        expect(
            quizReducer({
                quiz: {quiz: 'quiz'},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] RESET_QUIZ',
                payload: null
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] ADVANCE_QUESTION_NUN', () => {
        const random: number = Math.floor(Math.random()*100);
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: random,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] ADVANCE_QUESTION_NUN',
                payload: null
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: random + 1,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] RESET_QUESTION_NUM', () => {
        const random: number = Math.floor(Math.random()*100);
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: random,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] RESET_QUESTION_NUM',
                payload: null
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] QUIZ_START', () => {
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] QUIZ_START',
                payload: true
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: true,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] SET_LAST_QUESTION', () => {
        const random: number = Math.floor(Math.random()*100);
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] SET_LAST_QUESTION',
                payload: random
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: random,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] RESET_LAST_QUESTION', () => {
        const random: number = Math.floor(Math.random()*100);
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: random,
                quizEnd: false
            }, {
                type: '[QUIZ] RESET_LAST_QUESTION',
                payload: null
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }
        )
    })

    it('should handle [QUIZ] QUIZ_END', () => {
        expect(
            quizReducer({
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: false
            }, {
                type: '[QUIZ] QUIZ_END',
                payload: true
            })
        ).toEqual(
            {
                quiz: {},
                quizType: '',
                currentQuestion: 0,
                quizStart: false,
                lastQuestion: 0,
                quizEnd: true
            }
        )
    })

})

describe('value reducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore
        expect(valueReducer(undefined, {})).toEqual(
            {
                value: 0
            }
        )
    })

    it('should handle [VALUE] UPDATE_VALUE', () => {
        const random1: number = Math.floor(Math.random()*100);
        const random2: number = Math.floor(Math.random()*100);
        expect(
            valueReducer({value: random1}, {
                type: '[VALUE] UPDATE_VALUE',
                // @ts-ignore
                payload: random2
            })
        ).toEqual(
            {
                value: random1 + random2
            }
        )
    })

    it('should handle [VALUE] RESET_VALUE', () => {
        const random1: number = Math.floor(Math.random()*100);
        expect(
            valueReducer({value: random1}, {
                type: '[VALUE] RESET_VALUE',
                // @ts-ignore
                payload: null
            })
        ).toEqual(
            {
                value: 0
            }
        )
    })
})

describe('themeType reducer', () => {
    it('should return the initial state', () => {
        // @ts-ignore
        expect(themeTypeReducer(undefined, {})).toEqual(
            {
                themeType: 'light'
            }
        )
    })

    it('should handle [THEME TYPE] UPDATE_THEME_TYPE', () => {
        expect(
            themeTypeReducer({themeType: 'light'}, {
                type: '[THEME TYPE] UPDATE_THEME_TYPE',
                // @ts-ignore
                payload: 'dark'
            })
        ).toEqual(
            {
                themeType: 'dark'
            }
        )
    })

})
