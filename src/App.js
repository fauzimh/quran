import './App.css';
import React from 'react';
import CenteredGrid from "./components/centered-grids/CenteredGrid";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import SpacingGrid from "./components/centered-grids/SpacingGrid";

function App() {
  return (
      <React.Fragment>
          <CssBaseline />
          <div className="App">
              {/*<CenteredGrid/>*/}
            <SpacingGrid/>
          </div>
      </React.Fragment>
  );
}

export default App;
