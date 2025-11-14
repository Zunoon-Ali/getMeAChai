import Image from "next/image";
import Separator from "@/components/separator";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center text-white h-[44vh] w-1/2 text-center mx-auto">
        <div className="font-bold text-3xl flex items-center justify-center text-center">
          Buy Me a Chai{" "}
          <span className="">
            <img
              src="/chai.gif"
              alt="chai"
              className="w-15 relative -top-4 left-2"
            />
          </span>
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, autem
          id? Id facilis similique fuga quidem laudantium consequatur distinctio
          natus nesciunt ratione atque dolore suscipit architecto harum, veniam
          quisquam eius?
        </p>
        <div className="buttons flex w-2/3 items-center justify-center gap-2 my-4">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl"
          >
            Start Now !
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5 rounded-xl"
          >
            Register Now !
          </button>
        </div>
      </div>
      <Separator />

      <div className="container mx-auto p-6 text-white py-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-200">
          Support the Chai Fund
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <div className="max-w-xs p-6 rounded-xl shadow-2xl bg-gray-800/80 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center flex-col text-center">
              <img
                src="/chai.gif"
                alt="Single Chai"
                className="w-25 h-25 mb-4 rounded-full bg-gray-400 p-1"
              />
              <div className="card-title text-2xl font-semibold mb-2">
                A Quick Chai
              </div>
              <p className="text-sm text-gray-300 mb-4">
                A one-time small token of appreciation for keeping the passion
                flowing.
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold">
                Contribute $5
              </button>
            </div>
          </div>

          <div className="max-w-xs p-6 rounded-xl shadow-2xl bg-gray-800/80 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center flex-col text-center">
              <img
                src="/chai.gif"
                alt="Double Chai"
                className="w-25 h-25 mb-4 rounded-full bg-gray-400 p-1"
              />
              <div className="card-title text-2xl font-semibold mb-2">
                Double Shot Chai
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Enough for a productive afternoon coding session.
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold">
                Contribute $10
              </button>
            </div>
          </div>

          <div className="max-w-xs p-6 rounded-xl shadow-2xl bg-gray-800/80 hover:bg-gray-700 transition duration-300 transform hover:scale-[1.02]">
            <div className="flex items-center flex-col text-center">
              <img
                src="/chai.gif"
                alt="Weekly Supply"
                className="w-25 h-25 mb-4 rounded-full bg-gray-400 p-1"
              />
              <div className="card-title text-2xl font-semibold mb-2">
                Weekly Chai Fund
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Keep the developer fully caffeinated for a whole week of work!
              </p>
              <button className="w-full py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold">
                Contribute $25
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator />

      <div className="container mx-auto p-6 text-white py-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-200">
          Watch the Tutorial for it
        </h2>

        {/* The video embed */}
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=Ysko_HR0dN2Lv3nR"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-lg shadow-2xl"
          ></iframe>
        </div>
      </div>
    </>
  );
}
