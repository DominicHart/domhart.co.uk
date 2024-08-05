import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <>
      <div className="p-4 h-[calc(100dvh-60px)] bg-cover bg-center bg-no-repeat relative intro">
        <div className="text-center relative top-1/2 -translate-y-1/2 max-w-6/12">
          <h1 className="block text-5xl md:text-7xl xl:text-8xl font-semibold m-0 text-gray-200">Dom Hart</h1>
          <div className="inline-block">
            <p className="block text-2xl md:text-3xl xl:text-5xl m-0 mt-1 text-gray-400 border-r-8 overflow-hidden border-white job__title">Senior Developer</p>
          </div>
          <div className="w-full text-center mt-8 md:mt-14">
            <Link to="/about" className="inline-block text-code-green border-2 border-code-green py-1 md:py-2 px-3 md:px-6 rounded-md text-lg md:text-2xl hover:bg-code-green hover:text-code-dark-gray">Continue</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;