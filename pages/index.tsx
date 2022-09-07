import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="bg-slate-400 py-20 px-10 grid gap-10 min-h-screen">
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <span className="font-semibold text-2xl">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="mt-2 pt-2 border-t-2 border-dashed flex justify-between">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <div className="mt-5 bg-blue-500 w-36 mx-auto flex justify-center p-3 rounded-md text-white font-semibold">
          Checkout
        </div>
      </div>
      <div className="bg-white overflow-hidden rounded-2xl shadow-xl group">
        <div className="bg-blue-500 p-6 pb-14">
          <span className="text-white text-xl">Profile</span>
        </div>
        <div className="rounded-3xl p-6 relative -top-5 bg-white">
          <div className="flex justify-between items-end relative -top-16">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-red-200 rounded-full group-hover:bg-red-400 transition" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-medium">$2,310</span>
            </div>
          </div>
          <div className=" relative flex flex-col items-center -mt-10 -mb-3">
            <span className="text-lg font-semibold">Tony Molloy</span>
            <span className="text-gray-500 text-sm">New York, USA</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-xl px-5 py-8">
        <div className="flex justify-between  items-center mb-5">
          <span className="text-3xl font-thin">←</span>
          <div className="space-x-3">
            <span className="text-sm">⭐️ 4.9</span>
            <span className="shadow-md p-1 rounded-md">❤️</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5 " />
        <div className="flex flex-col mb-2">
          <span className="font-medium text-xl">Swoon Lounge</span>
          <span className="text-xs text-gray-500 ">Chair</span>
          <div className="flex justify-between items-center mt-2 mb-4">
            <div className="space-x-2">
              <button className="aspect-square w-5 rounded-full bg-yellow-500 focus:ring-2 ring-offset-2 ring-yellow-500 transition"></button>
              <button className="aspect-square w-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition"></button>
              <button className="aspect-square w-5 rounded-full bg-teal-500 focus:ring-2 ring-offset-2 ring-teal-500 transition"></button>
            </div>
            <div className="space-x-5 flex items-center">
              <button className="rounded-lg  bg-blue-100 aspect-square w-8 font-medium text-xl text-gray-500 hover:bg-blue-200">
                -
              </button>
              <span>1</span>
              <button className="rounded-lg  bg-blue-100 aspect-square w-8 font-medium text-xl text-gray-500 hover:bg-blue-200">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-semibold">$450</span>
          <button className="w-32 bg-blue-500 text-white px-4 py-2 text-sm flex justify-center rounded-md hover:bg-blue-600 active:bg-blue-800">
            Add to cart
          </button>
        </div>
      </div>
      <div className="bg-white  shadow-xl">
        <form className="p-2 flex flex-col space-y-2  ">
          <input
            type="text"
            placeholder="User name"
            className="border p-1 border-gray-400 rounded-md peer"
            required
          />
          <span className="peer-valid:hidden px-4 py-2 bg-white text-red-500 ">
            This input is invalid
          </span>
          <input
            type="password"
            placeholder="Password"
            className="border p-1 border-gray-400 rounded-md peer"
            required
          />
          <span className="peer-valid:hidden px-4 py-2 bg-white text-red-500 ">
            This input is invalid
          </span>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default Home;
