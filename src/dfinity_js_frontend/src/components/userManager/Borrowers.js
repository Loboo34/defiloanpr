import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Borrower from "./Borrower";
import Loader from "../utils/Loader";
import { Row } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getBorrowers as getBorrowerList,
  createBorrower,
  updateBorrower,
  getBorrowerByOwner,
  followBorrower,
} from "../../utils/borrowerManager";
import AddBorrower from "./AddBorrower";
import UpdateBorrower from "./UpdateBorrower";

const Borrowers = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [borrower, setBorrower] = useState({});
  const [loading, setLoading] = useState(false);

  // function to get the list of borrowers
  const getBorrowers = useCallback(async () => {
    try {
      setLoading(true);
      setBorrowers(await getBorrowerList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });
  [];

  // function to get the list of borrowers
  const getBorrowerOwner = useCallback(async () => {
    try {
      setLoading(true);
      getBorrowerByOwner().then((resp) => {
        console.log(resp);
        setBorrower(resp.Ok);
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addBorrower = async (data) => {
    try {
      setLoading(true);
      createBorrower(data).then((resp) => {
        getBorrowers();
        getBorrowerOwner();
      });
      toast(<NotificationSuccess text="Borrower added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a borrower." />);
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    try {
      setLoading(true);
      updateBorrower(data).then((resp) => {
        getBorrowers();
      });
      toast(<NotificationSuccess text="Borrower added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a borrower." />);
    } finally {
      setLoading(false);
    }
  };

  const follow = async (data) => {
    try {
      setLoading(true);
      followBorrower(data).then((resp) => {
        getBorrowers();
      });
      toast(
        <NotificationSuccess text="Borrower added to followers successfully." />
      );
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to follow borrower." />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBorrowers();
    getBorrowerOwner();
  }, []);

  console.log(borrower);

  return (
    <div className="d-flex justify-content-center">
      {!loading ? (
        !borrower?.name ? (
          <AddBorrower save={addBorrower} />
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="fs-4 fw-bold mb-0">Borrowers</h1>
              <UpdateBorrower borrower={borrower} save={update} />
            </div>
            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
              {borrowers.map((_borrower, index) => (
                <Borrower
                  key={index}
                  borrower={{
                    ..._borrower,
                  }}
                  follow={follow}
                />
              ))}
            </Row>
          </div>
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Borrowers;
