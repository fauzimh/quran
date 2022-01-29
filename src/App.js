import './App.css';
import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SpacingGrid from "./components/centered-grids/SpacingGrid";
import {BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

function App() {
    const font_family =  "'Mochiy Pop P One', sans-serif";
    const theme = createTheme({
        typography: { fontFamily: [font_family].join(",") }
    });

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <CssBaseline/>
            <BrowserRouter>
                <div className="App">
                    <SpacingGrid/>
                </div>
            </BrowserRouter>
            </ThemeProvider>
        </React.Fragment>
    );
}

export default App;
