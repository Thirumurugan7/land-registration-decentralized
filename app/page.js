import Image from "next/image";
import Link from "next/link";
import homelogo from "../Assets/homellogo1.png";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-[500px] flex flex-col items-center justify-evenly">
        <div>
          <Image src={homelogo} width={200} height={200} alt="homelogo" />
        </div>
        <div>
          <button
            type="button"
            className="inline-block rounded-full border border-blue-300 hover:text-blue-900 hover:bg-white bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          >
            Let's start
          </button>
        </div>
        <div>
          <p class="mb-4 mt-2 text-xl font-light leading-relaxed">
            "Unlock the security and peace of mind your property deserves with
            our reliable land registration framework."
          </p>
        </div>
      </div>
      <footer className="flex flex-col  w-full items-center">
        <div>icons</div>
        <div>copyright@2023</div>
      </footer>
    </main>
  );
}
