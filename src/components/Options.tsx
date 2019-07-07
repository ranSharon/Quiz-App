import React from 'react';
import {connect} from 'react-redux';
import {IOption} from '../models/IOption';
import Option from './Option';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

interface IProps {
    options: Array<IOption>;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    option: {
        textAlign: 'center',
    }
});

const Options: React.FC<IProps> = (props: IProps) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center">
                {props.options.map((option, index) =>
                    <Grid key={index} item md={2} className={classes.option}>
                        <Option
                            text={option.text}
                            value={option.value}
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const currentQuestion = state.quiz.currentQuestion;
    const quiz = state.quiz.quiz;
    const options = [...quiz.questions[currentQuestion].options];
    return {
        options: [...options],
    }
};

export default connect(mapStateToProps, null)(Options);
