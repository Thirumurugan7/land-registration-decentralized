import React from "react";

const Table = ({ userDataFromChain }) => {
  console.log(userDataFromChain);
  const userData = userDataFromChain;
  return (
    <section className="flex justify-center items-center h-screen pb-[100px]">
      <div className="overflow-hidden ">
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
                phone number
              </th>
              <th scope="col" className="px-6 py-4">
                Address
              </th>
              <th scope="col" className="px-6 py-4">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {userData && alert("we have the data")}
            {userData &&
              userData.map((data) => (
                <tr className="border-b dark:border-neutral-500">
                  {console.log(data)}
                  <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td className="whitespace-nowrap px-6 py-4">{data[0]}</td>
                  <td className="whitespace-nowrap px-6 py-4">{data[1]}</td>
                  <td className="whitespace-nowrap px-6 py-4">{data[2]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
