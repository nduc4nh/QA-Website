import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import QuestionPage from './pages/QuestionPage';
import Profile from './pages/Profile';
import QueryPage from './pages/QueryPage';
const App = () => {
  /*<Home/>*/
  return (
    <Router>
      <Routes>
        <Route element={<HomePage />} path="/"></Route>
        <Route element={<HomePage />} path="/:page"></Route>
        <Route element={<QuestionPage />} path="/question/:questionId"></Route>
        <Route element={<QuestionPage />} path="/question/"></Route>
        <Route  element={<Login />} path="/login/"></Route>
        <Route element={<Register />} path="/register/"></Route>
        <Route element={<Profile />} path="/profile/:id"></Route>
        <Route element={<QueryPage />} path="/questions/:kind/:search" exact></Route>
      </Routes>
    </Router>
  );
}

export default App;
