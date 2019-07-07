import React from 'react';
import './App.css';
import NavBar from '../../components/NavBar';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {connect} from "react-redux";

interface IProps {
    themeType: string
}

export const App: React.FC<IProps> = (props: IProps) => {

    const setTheme = () => {
        let theme;
        switch (props.themeType) {
            case 'dark':
                theme = createMuiTheme({
                    palette: {
                        type: 'dark', // Switching the dark mode on is a single property value change.
                        primary: {
                            main: '#64b5f6',
                        },
                    },
                });
                break;
            case 'light':
                theme = createMuiTheme({
                    palette: {
                        type: 'light', // Switching the dark mode on is a single property value change.
                        primary: {
                            main: '#3f51b5',
                        },
                    },
                });
                break;
        }
        return theme;
    };

    return (
        <ThemeProvider theme={setTheme()}>
            <CssBaseline/>
            <div className="App">
                <NavBar/>
            </div>
        </ThemeProvider>
    );
};

const mapStateToProps = (state: any) => {
    const themeType = state.theme.themeType;
    return {
        themeType: themeType
    }
};

export default connect(mapStateToProps, null)(App);