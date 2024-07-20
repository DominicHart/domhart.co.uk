import React from 'react';

const Portfolio: React.FC = () => {
  return (
    <div>
      <div className="py-10 px-6">
        <h1 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Portfolio</h1>
        <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Like all industry employed developers, the majority of my work was completed for clients and is therefore Intellectual Property. But here are a few of my personal projects.</p>
      </div>
      <div className="pb-10">
        <div className="p-8 bg-gray-100">
          <h2 className="text-xl md:text-3xl font-semibold">
            <a href="https://domhart.co.uk" target="_blank" className="text-blue-600">domhart.co.uk</a>
          </h2>
          <p className="mt-3 text-lg">
            domhart.co.uk is my personal portfolio.
            This website introduces me, showcases who I am and what I do.
            It includes examples of what I have achieved, a sample of the photos I take in my free time and a basic contact form.
            This app is built using&nbsp;
            <a className="text-blue-600 font-semibold" href="https://laravel.com/docs/11.x/releases">Laravel 11</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://www.w3schools.com/css/css_intro.asp">CSS</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://react.dev/">React</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://www.typescriptlang.org/">TypeScript</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://tailwindcss.com/">Tailwind</a>.
          </p>
          <div className="block grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 mt-6">
            <div>
              <img src="../../images/portfolio/domhart/domhart.jpg" alt="homepage" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div>
              <img src="../../images/portfolio/domhart/photos.jpg" alt="photos" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div>
              <img src="../../images/portfolio/domhart/getintouch.jpg" alt="contact" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-xl md:text-3xl font-semibold">
            <a href="https://ceireburbidge.co.uk" target="_blank" className="text-blue-600">ceireburbidge.co.uk</a>
          </h2>
          <p className="mt-3 text-lg">
            ceireburbidge.co.uk is a photography portfolio for Ceire Burbidge.
            This portfolio organises Ceire's favourite photos into custom albums and utilises the react-editable-photo-grid allowing her to position her photos as she likes.
            It also includes a basic about page and contact form.
            This app is built using&nbsp;
            <a className="text-blue-600 font-semibold" href="https://laravel.com/docs/11.x/releases">Laravel 11</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://www.w3schools.com/css/css_intro.asp">CSS</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://react.dev/">React</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://www.typescriptlang.org/">TypeScript</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://tailwindcss.com/">Tailwind</a>.
          </p>
          <div className="block grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 mt-6">
            <div>
              <img src="../../images/portfolio/ceireburbidge/ceireburbidge.jpg" alt="homepage" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div>
              <img src="../../images/portfolio/ceireburbidge/portfolio.jpg" alt="portfolio" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div>
              <img src="../../images/portfolio/ceireburbidge/photogrid.jpg" alt="photogrid" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
          </div>
        </div>
        <div className="p-8 bg-gray-100">
          <h2 className="text-xl md:text-3xl font-semibold">
            <a href="https://www.npmjs.com/package/react-editable-photo-grid" target="_blank" className="text-blue-600">react-editable-photo-grid</a>
          </h2>
          <p className="mt-3 text-lg">
            react-edit-photo-grid is an NPM package that allows you to render your photos in a responsive grid and edit the position of them.
            The idea is that photos are grouped by row and column so they can be moved around the grid.
            Rendering photos in a grid has been around for a long time but I also wanted to be able to change the positions.
            This package does not include data management.
            This package is built using&nbsp;
            <a className="text-blue-600 font-semibold" href="https://www.w3schools.com/css/css_intro.asp">CSS</a> |&nbsp;
            <a className="text-blue-600 font-semibold" href="https://www.typescriptlang.org/">TypeScript</a>.
          </p>
          <div className="block grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 mt-6">
            <div>
              <img src="../../images/portfolio/photogrid/npm.jpg" alt="npm" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div>
              <img src="../../images/portfolio/photogrid/code.jpg" alt="code" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div>
              <img src="../../images/portfolio/photogrid/photos.jpg" alt="edit grid" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;