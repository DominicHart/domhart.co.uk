import React from 'react';

const ContactNoForm: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-224px)] relative">
      <div className="py-36 md:py-20">
        <div className="px-6">
          <h1 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Get in touch</h1>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">If you would like to contact me you can use one of the methods below:</p>
        </div>
        <div className="py-6 md:py-20 px-6 mt-12 md:mt-0 md:px-8 md:w-6/12 md:mx-auto relative md:text-center">
          <div>
            <img src="../../images/linked-in.png" alt="homepage" className="align-middle inline-block max-w-full w-12 md:w-20 h-12 md:h-20 object-cover" width="300" />
            <a href="https://www.linkedin.com/in/dominic-hart-592717127" className="text-xl md:text-3xl font-medium ml-6 md:ml-8 align-middle inline-block">Dominic Hart</a>
          </div>
          <div className="mt-12">
            <img src="../../images/github.png" alt="homepage" className="align-middle inline-block max-w-full w-12 md:w-20 h-12 md:h-20 object-cover" width="300" />
            <a href="https://github.com/DominicHart" className="text-xl md:text-3xl font-medium ml-6 md:ml-8 align-middle inline-block">DominicHart</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactNoForm;