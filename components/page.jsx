"use client";
import { useState } from "react";

import { useStorageUpload } from "@thirdweb-dev/react";
import { UploadDocument } from "./Blockchain";
import { useRouter } from "next/navigation";
const PdfUploadComponent = () => {
  const router = useRouter();

  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedPdf(file);
  };

  // const handleUpload = () => {
  //   // Perform upload logic with the selected PDF file
  //   if (selectedPdf) {
  //     // Example: You can use FormData or any file upload library to send the file to the server
  //     const formData = new FormData();
  //     formData.append("pdf", selectedPdf);
  //     console.log(formData);
  //     //Example: Perform an API call or submit the form
  //     axios
  //       .post("/upload", formData)
  //       .then((response) => {
  //         console.log("Upload successful:", response);
  //       })
  //       .catch((error) => {
  //         console.error("Upload error:", error);
  //       });
  //   }
  // };

  const [file, setFile] = useState();

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [selectedPdf],
      options: {
        uploadWithGatewayUrl: true,
        uploadWithoutDirectory: true,
      },
    });

    console.log("upload URL", uploadUrl);
    const urlData = uploadUrl[0].toString();
    console.log(urlData);
    const res = await UploadDocument({ urlData });

    console.log(res);

    if (res) {
      alert("Document uploaded successfully");
      router.push("/user_dashboard");
    } else {
      alert("something went wrong");
    }
  };

  return (
    <>
      {" "}
      <nav
        className="flex px-5 py-3 text-white border border-gray-200 rounded-lg justify-between "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-white hover:text-blue-600 dark:text-white dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <a
                href="/register"
                className="ml-1 text-sm font-medium text-white hover:text-blue-600 md:ml-2 dark:text-white dark:hover:text-white"
              >
                Register
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-white md:ml-2 dark:text-white">
                Dashboard
              </span>
            </div>
          </li>
        </ol>
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a
              href="/upload_document"
              className="inline-flex items-center text-sm font-medium text-white hover:text-black dark:text-white dark:hover:text-white"
            >
              Upload Document for verification
            </a>
          </li>
        </ol>
      </nav>{" "}
      <div className="container mx-auto px-4 py-8 flex flex-col w-4/5 items-center justify-center mt-[100px]">
        <h1 className="text-2xl font-bold mb-4">Upload for verification</h1>
        <div className="flex items-center mb-4">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-gray-100 text-blue-500 rounded-lg shadow-lg tracking-wide cursor-pointer border border-blue-500 hover:bg-blue-500 hover:text-white">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 16V8H2V4a2 2 0 0 1 2-2h6.586a1 1 0 0 1 .707.293l3.414 3.414A1 1 0 0 1 16 6.586V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4-4H8v2H6v-2H4v-2h2V8h2v2h2v2z"
              />
            </svg>
            <span className="mt-2 text-base leading-normal">
              Upload your Document to verify
            </span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {selectedPdf && (
          <div className="mt-4">
            <p className="font-bold">Selected PDF:</p>
            <p>{selectedPdf.name}</p>
          </div>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          onClick={uploadToIpfs}
        >
          upload
        </button>
        {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
          Upload
        </button> */}
      </div>
      <div>
        {/* <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        /> */}
      </div>
    </>
  );
};

export default PdfUploadComponent;
