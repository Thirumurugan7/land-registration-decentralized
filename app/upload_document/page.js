"use client";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import PdfUploadComponent from "../../components/page";
export default function Page() {
  return (
    <>
      <ThirdwebProvider activeChain="mumbai">
        <PdfUploadComponent />
      </ThirdwebProvider>
    </>
  );
}
