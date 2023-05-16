"use client";
import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useStorageUpload } from "@thirdweb-dev/react";
import { UploadDocument } from "./Blockchain";
import { useRouter } from "next/navigation";
const PdfUploadComponent = () => {
  const router = useRouter();

  // const [selectedPdf, setSelectedPdf] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedPdf(file);
  // };

  // const handleUpload = () => {
  // Perform upload logic with the selected PDF file
  //  if (selectedPdf) {
  // Example: You can use FormData or any file upload library to send the file to the server
  // const formData = new FormData();
  // formData.append("pdf", selectedPdf);
  // console.log(formData);
  // Example: Perform an API call or submit the form
  // axios.post('/upload', formData)
  //   .then(response => {
  //     console.log('Upload successful:', response);
  //   })
  //   .catch(error => {
  //     console.error('Upload error:', error);
  //   });
  // }
  //};

  const [file, setFile] = useState();

  const { mutateAsync: upload } = useStorageUpload();

  const uploadToIpfs = async () => {
    const uploadUrl = await upload({
      data: [file],
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
      {/* <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">PDF Upload</h1>
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
                Select a PDF file
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
            onClick={handleUpload}
          >
            Upload
          </button>
        </div> */}
      <div>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <button onClick={uploadToIpfs}>upload</button>
      </div>
    </>
  );
};

export default PdfUploadComponent;
