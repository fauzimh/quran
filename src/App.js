import './App.css';
import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SpacingGrid from "./components/centered-grids/SpacingGrid";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <React.Fragment>
          <CssBaseline />
          <BrowserRouter>
          <div className="App">
              {/*<CenteredGrid/>*/}
            <SpacingGrid/>
          </div>
          </BrowserRouter>
      </React.Fragment>
  );
}

export default App;
