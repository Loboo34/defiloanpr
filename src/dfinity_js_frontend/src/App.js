import React, { useEffect, useCallback, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BorrowersPage from "./pages/Borrowers";
import LoansPage from "./pages/Loans";
import { Container, Nav } from "react-bootstrap";
import "./App.css";
import Wallet from "./components/Wallet";
import coverImg from "./assets/img/sandwich.jpg";
import { login, logout as destroy } from "./utils/auth";
import { balance as principalBalance } from "./utils/ledger";
import Cover from "./components/utils/Cover";
import { Notification } from "./components/utils/Notifications";
import { getAddressFromPrincipal } from "./utils/loanManager";
import { Principal } from "@dfinity/principal";

const App = function AppWrapper() {
  const isAuthenticated = window.auth.isAuthenticated;
  const principal = window.auth.principalText;
  const principalAcc = Principal.from(principal);

  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState("");

  const getBalance = useCallback(async () => {
    if (isAuthenticated) {
      setBalance(await principalBalance());
    }
  });

  const getAddress = useCallback(async () => {
    if (isAuthenticated) {
      setAddress(await getAddressFromPrincipal(principalAcc));
    }
  });

  useEffect(() => {
    getBalance();
    getAddress();
  }, [getBalance]);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        <Container fluid="md">
          <Router>
            <Nav className="d-flex align-items-center justify-content-between gap-2 pt-3 pb-5">
              <Link
                to="/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                className=""
                style={{ fontSize: "1.5rem" }}
              >
                Loans page
              </Link>
              <Link
                to="/borrowers?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai"
                className=""
                style={{ fontSize: "1.5rem" }}
              >
                Borrowers page
              </Link>
              <Nav.Item>
                <Wallet
                  principal={principal}
                  address={address}
                  balance={balance}
                  symbol={"ICP"}
                  isAuthenticated={isAuthenticated}
                  destroy={destroy}
                />
              </Nav.Item>
            </Nav>
            <main>
              <Routes>
                <Route exact path="/" element={<LoansPage />} />
                <Route path="/borrowers" element={<BorrowersPage />} />
              </Routes>
            </main>
          </Router>
        </Container>
      ) : (
        <Cover name="Street Food" login={login} coverImg={coverImg} />
      )}
    </>
  );
};

export default App;
