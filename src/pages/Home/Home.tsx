import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import TvShowCard from '../../components/TvShowCard';
import Grid from '@material-ui/core/Grid';

interface IProps {
    resetQuizData: Function,
    updateQuizType: Function,
    updateNavTab: Function
}

const Home: React.FC<IProps> = (props: IProps) => {

    useEffect(() => {
        // those functions is needed in case user clicked back or forward, or changed the url manually
        props.updateNavTab(0);
        props.updateQuizType('');
        props.resetQuizData();
    }, []);

    return (
        <div>
            <h1>
                Welcome to WHICH CHARACTER ARE YOU APP!
            </h1>
            <h2>
                Click on one of the tv shows' cards to start a quiz to see WHICH CHARACTER ARE YOU:
            </h2>
            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center">
                <Grid item xs={3}>
                    <TvShowCard tvShow="Game Of Thrones"/>
                </Grid>
                <Grid item xs={3}>
                    <TvShowCard tvShow="Friends"/>
                </Grid>
                <Grid item xs={3}>
                    <TvShowCard tvShow="Silicon Valley"/>
                </Grid>
            </Grid>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
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

export default connect(null, mapDispatchToProps)(Home);
