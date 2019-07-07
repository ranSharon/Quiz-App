import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from "redux";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

interface IProps {
    text: string,
    value: number,
    currentQuestion: number,
    lastQuestion: number,
    advanceQuestion: Function,
    updateTotalValue: Function
}

const useStyles = makeStyles({
    optionText: {
        fontWeight: 'bold'
    },
    card: {
        minWidth: '56px',
    }
});

const Option: React.FC<IProps> = (props: IProps) => {

    const classes = useStyles();

    const onOptionClick = (value: number) => {
        props.advanceQuestion(props.currentQuestion, props.lastQuestion);
        props.updateTotalValue(value);
    };

    return (
        <Card className={classes.card} onClick={() => onOptionClick(props.value)}>
            <CardActionArea>
                <CardContent >
                    <span className={classes.optionText}>{props.text}</span>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    advanceQuestion: (currentQuestion: number, lastQuestion: number) => {
        if (currentQuestion + 1 === lastQuestion) {
            dispatch({type: '[QUIZ] QUIZ_END', payload: true});
        } else {
            dispatch({type: '[QUIZ] ADVANCE_QUESTION_NUN'});
        }
    },
    updateTotalValue: (value: number) => {
        dispatch({type: '[VALUE] UPDATE_VALUE', payload: value});
    }
});

const mapStateToProps = (state: any) => {
    const currentQuestion = state.quiz.currentQuestion;
    const lastQuestion = state.quiz.lastQuestion;
    return {
        currentQuestion: currentQuestion,
        lastQuestion: lastQuestion
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Option);
