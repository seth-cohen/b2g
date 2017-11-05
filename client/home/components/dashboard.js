import React from "react";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <header
          className="jumbotron"
          style={{
            backgroundColor: "#A9F16C"
          }}
        >
          <div className="container">
            <div className="row">
              <h1>Dude this is your dashboard</h1>
              <p />
            </div>
          </div>
        </header>

        <div className="container">
          <div className="row">
            Dashboard things
          </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;
