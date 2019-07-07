import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import LinearProgress from '@material-ui/core/LinearProgress';
import Options from './Options';
import {connect} from "react-redux";

interface IProps {
    imgSrc: string,
    question: string,
    currentQuestion: number,
    lastQuestion: number,
}

const useStyles = makeStyles({
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
        fontSize: '2em'
    },
    progressBar: {
        flexGrow: 1,
        maxWidth: '60%',
        paddingBottom: '8px',
        margin: 'auto',
    },
    questionProgress: {
        margin: 0,
    }
});

const Question: React.FC<IProps> = (props: IProps) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.progressBar}>
                <LinearProgress
                    variant="determinate"
                    value={(100 / (props.lastQuestion - 1)) * (props.currentQuestion)}
                />
            </div>
            <Card className={classes.card}>
                <CardHeader
                    action={
                        <h5 className={classes.questionProgress}>
                            {`${props.currentQuestion + 1}/${props.lastQuestion}`}
                        </h5>}
                />
                <CardMedia
                    className={classes.media}
                    image={`img/${props.imgSrc}`}
                    title="Question image">
                    <div className={classes.overlay}>
                        <span className={classes.overlayQuestion}>
                            {props.question}
                        </span>
                    </div>
                </CardMedia>
                <CardContent>
                    <Options/>
                </CardContent>
            </Card>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const currentQuestion = state.quiz.currentQuestion;
    const lastQuestion = state.quiz.lastQuestion;
    return {
        currentQuestion: currentQuestion,
        lastQuestion: lastQuestion
    }
};

export default connect(mapStateToProps, null)(Question);
