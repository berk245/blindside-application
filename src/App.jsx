import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./routes/Overview";
import WatchVideo from "./routes/WatchVideo";
import PageHeader from "./components/PageHeader/PageHeader";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <div className="App">
      <PageHeader></PageHeader>
      <Router>
        <Routes>
          <Route path="/" element={<Overview />}></Route>
          <Route path="/watch/*" element={<WatchVideo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
