import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

import QuestionPage from './pages/QuestionPage';
const App = () => {
  /*<Home/>*/
  return (
    <Router>
      <Routes>
        <Route element={<HomePage/>} path="/"></Route>
        <Route element={<QuestionPage/>} path="/question/:questionId"></Route>
        <Route element={<QuestionPage/>} path="/question/"></Route>
      </Routes>
    </Router>
  );
}

export default App;
