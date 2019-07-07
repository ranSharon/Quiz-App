import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Route, Link} from "react-router-dom";
import Quiz from '../pages/Quiz/Quiz';
import Home from '../pages/Home/Home';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import InvertColors from '@material-ui/icons/InvertColors';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

interface IProps {
    currentNavTab: number,
    themeType: string,
    onQuizClick: Function,
    onIconClick: Function
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        marginTop: theme.spacing(1),
        fontSize: 32,
        marginLeft: 'auto',
        marginRight: theme.spacing(10),
        cursor: 'pointer'
    },
}));

const NavBar: React.FC<IProps> = (props: IProps) => {

    const classes = useStyles();

    return (
        <div>
            <Paper>
                <Grid className={classes.root} container spacing={0}>
                    <Grid item xs={10}>
                        <Tabs
                            value={props.currentNavTab}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab
                                label="Home"
                                component={Link}
                                to="/"
                                onClick={() => props.onQuizClick('')}
                            />
                            <Tab
                                label="Game Of Thrones Quiz"
                                component={Link}
                                to="/gameOfThronesQuiz"
                                onClick={() => props.onQuizClick('Game Of Thrones')}
                            />
                            <Tab
                                label="Friends Quiz"
                                component={Link}
                                to="/friendsQuiz"
                                onClick={() => props.onQuizClick('Friends')}
                            />
                            <Tab
                                label="Silicon Valley Quiz"
                                component={Link}
                                to="/siliconValleyQuiz"
                                onClick={() => props.onQuizClick('Silicon Valley')}
                            />
                        </Tabs>
                    </Grid>
                    <Grid item xs={2}>
                        <Tooltip title="Toggle light/dark theme">
                                <InvertColors
                                    className={classes.icon}
                                    onClick={() => props.onIconClick(props.themeType)}
                                />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
            <Route exact path="/" component={Home}/>
            <Route path="/gameOfThronesQuiz" component={Quiz}/>
            <Route path="/friendsQuiz" component={Quiz}/>
            <Route path="/siliconValleyQuiz" component={Quiz}/>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onQuizClick: (quizType: string) => {
        dispatch({type: '[QUIZ] UPDATE_QUIZ_TYPE', payload: quizType});
        dispatch({type: '[QUIZ] RESET_LAST_QUESTION'});
        dispatch({type: '[QUIZ] QUIZ_START', payload: false});
        dispatch({type: '[QUIZ] RESET_QUESTION_NUM'});
        dispatch({type: '[QUIZ] QUIZ_END', payload: false});
        dispatch({type: '[VALUE] RESET_VALUE'});
        dispatch({type: '[QUIZ] RESET_QUIZ'});
    },
    onIconClick: (themeType: string) => {
        let newThemeType = '';
        switch (themeType) {
            case 'dark':
                newThemeType = 'light';
                break;
            case 'light':
                newThemeType = 'dark';
                break;
        }
        console.log(newThemeType);
        dispatch({type: '[THEME TYPE] UPDATE_THEME_TYPE', payload: newThemeType});
    }
});

const mapStateToProps = (state: any) => {
    const currentNavTab = state.navTab.currentNavTab;
    const themeType = state.theme.themeType;
    return {
        currentNavTab: currentNavTab,
        themeType: themeType
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
