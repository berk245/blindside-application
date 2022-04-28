import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./routes/Overview";
import WatchVideo from "./routes/WatchVideo";
import PageHeader from "./components/PageHeader/PageHeader";
import Authenticator from "./components/AmplifyAuthComponents/Authenticator";
function App() {
  return localStorage.current_user ? (
    <div className="App">
      <PageHeader></PageHeader>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Overview user={localStorage.current_user} />}
          ></Route>
          <Route path="/watch/*" element={<WatchVideo />}></Route>
        </Routes>
      </Router>
    </div>
  ) : (
    <>
      <PageHeader signedIn={false}></PageHeader>
      <Authenticator></Authenticator>
    </>
  );
}

export default App;
