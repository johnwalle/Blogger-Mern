import React from "react";
import Footer from "../Footer";


const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      <Footer />
    </>
  );
};

export default Loader;