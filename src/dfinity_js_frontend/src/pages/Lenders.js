import React, { useEffect, useState, useCallback } from "react";
import { login } from "../utils/auth";
import { Notification } from "../components/utils/Notifications";
import Lenders from "../components/userManager/Lenders";
import { getLenderByOwner } from "../utils/lenderManager";
import Login from "./Login";

const LendersPage = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(false);

  const isAuthenticated = window.auth.isAuthenticated;

  const fetchClient = useCallback(async () => {
    try {
      setLoading(true);
      setClient(
        await getLenderByOwner().then(async (res) => {
          console.log(res);
          return res.Ok;
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  console.log("client", client);

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <>
      <Notification />
      {isAuthenticated ? (
        !loading ? (
          client?.name ? (
            <main>
              <Lenders client={client} />
            </main>
          ) : (
            <SignLender fetchClient={fetchClient} />
          )
        ) : (
          <Loader />
        )
      ) : (
        <Login login={login} />
      )}
    </>
  );
};

export default LendersPage;
