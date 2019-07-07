import React from 'react';
import {connect} from 'react-redux';
import {IResult} from "../../models/IResult";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Dispatch} from "redux";

interface IProps {
    result: IResult,
    onRetakeClick: Function
}

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '60%',
        margin: 'auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    button: {
        margin: theme.spacing(1)
    }
}));

const Result: React.FC<IProps> = (props: IProps) => {

    const classes = useStyles();

    return (
        <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={`img/${props.result.imgSrc}`}
                    title="Result image"
                 />
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {props.result.text}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.result.description}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={() => props.onRetakeClick()}

                    >
                        Retake Quiz
                    </Button>
                </CardContent>
        </Card>
    );
};

const mapStateToProps = (state: any) => {
    const results = [...state.quiz.quiz.results];
    let result;
    const totalValue = state.value.value;
    for (let i = 0; i <= results.length - 1; i++) {
        if(results[i].lowValue <= totalValue && results[i].highValue >= totalValue){
            result = {...results[i]};
            break;
        }
    }
    return {
        result: {...result}
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onRetakeClick: () => {
        dispatch({type: '[QUIZ] RESET_QUESTION_NUM'});
        dispatch({type: '[QUIZ] QUIZ_END', payload: false});
        dispatch({type: '[VALUE] RESET_VALUE'});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);

