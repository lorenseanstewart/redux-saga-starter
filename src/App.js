import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Link } from "react-router-dom";

const Next = props => (
    <div>
        <h1>Second Page, yo!</h1>
        <Link to="/">Back</Link>
    </div>
);
const App = props => (
    <div>
        <div className="header">
            <h2>Welcome to a Saga App</h2>
        </div>
        <section className="body">
            <Link to="/next">Next page</Link>
            <Route path="/next" component={Next} />
        </section>
    </div>
);

App.propTypes = {
    children: PropTypes.node
};

export default App;
