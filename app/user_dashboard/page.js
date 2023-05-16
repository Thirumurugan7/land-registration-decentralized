"use client";
import { useEffect, useState } from "react";
import {
  AllUsers,
  UserData,
  ApproveUser,
  ApproveDocument,
} from "@/components/Blockchain";
import Table from "@/components/Table";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [usersAddress, setUsersAddress] = useState([]);
  const [userWHohDoc, setUserWHohDoc] = useState([]);

  const [gotdata, setGotdata] = useState(false);
  const userDataFromChain = [];
  const userAddressFromChain = [];
  const userWhoHaveDoc = [];
  const userSubmittedDoc = [];
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await AllUsers();
      // console.log(res);
      // console.log(res.length);
      const resLength = res.length;
      for (let i = 0; i < resLength; i++) {
        //  console.log(res[i]);
        const address = res[i];
        userAddressFromChain.push(address);
        // const userData = await UserData({ res[0] });
        // console.log(userData);
        //  console.log(address);
        const userData = await UserData({ address });

        //console.log(userData[0], i);

        userDataFromChain.push(userData);
        //  console.log(userDataFromChain);
        userDataFromChain.map((data, index) => {
          if (data[6]) {
            userWhoHaveDoc.push(userAddressFromChain[index]);
          }
          console.log(data[0]);
          console.log(data[4]);
        });
        console.log("addresses we need actually : ", userWhoHaveDoc);
        setUserWHohDoc(userWhoHaveDoc);

        console.log(userAddressFromChain);
      }

      for (let j = 0; j < userWhoHaveDoc.length; j++) {
        const address = userWhoHaveDoc[j];

        const userDataAfterDoc = await UserData({ address });

        userSubmittedDoc.push(userDataAfterDoc);
      }
      setUsers(userSubmittedDoc);
      setGotdata(true);
      //setUsers(userDataFromChain);
      setUsersAddress(userAddressFromChain);
      // localStorage.setItem("chainData", JSON).stringify(userDataFromChain);
    };
    if (!gotdata) {
      getAllUsers();
    }

    if (gotdata) {
      alert("got it my boy");
      alert(users);
      console.log(usersAddress);
      console.log(userWHohDoc);
    }
  }, [gotdata]);

  const approveUser = async (index) => {
    console.log("approve started");
    console.log(index);
    console.log(userWHohDoc[index]);
    const address = userWHohDoc[index];
    const res = await ApproveDocument({ address });

    console.log(res);
  };
  return (
    <div>
      {" "}
      {gotdata ? (
        <section className="flex justify-center items-center h-screen pb-[100px] scroll-auto w-full">
          <div className="overflow-x-auto ">
            {console.log(users)}
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    email
                  </th>
                  <th scope="col" className="px-6 py-4">
                    address
                  </th>

                  <th scope="col" className="px-6 py-4">
                    Document
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((data, index) => (
                    <tr
                      className="border-b dark:border-neutral-500"
                      key={index}
                    >
                      {console.log(data)}
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">{data[0]}</td>
                      <td className="whitespace-nowrap px-6 py-4">{data[1]}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {userWHohDoc[index]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <a href={data[8]} target="_blank">
                          {" "}
                          {data[8]}{" "}
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {!data[7] ? "Not Verified" : "Verified"}
                      </td>
                      {/* <td className="whitespace-nowrap px-6 py-4">
                        {!data[7] ? (
                          <button
                            type="button"
                            onClick={approveUser.bind(null, index)}
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          >
                            Approve
                          </button>
                        ) : (
                          ""
                        )}
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <h1>Loading ....</h1>
      )}
    </div>
  );
}
