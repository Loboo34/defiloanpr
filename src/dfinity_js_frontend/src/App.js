import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BorrowersPage from "./pages/Borrowers";
import LoansPage from "./pages/Loans";
import { Container } from "react-bootstrap";
import "./App.css";

import { Notification } from "./components/utils/Notifications";
import LendersPage from "./pages/Lenders";

const App = function AppWrapper() {
  return (
    <>
      <Notification />
      <Container fluid="md">
        <Router>
          <Routes>
            <Route exact path="/" element={<LoansPage />} />
            <Route path="/borrowers" element={<BorrowersPage />} />
            <Route path="/lenders" element={<LendersPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
};

export default App;
