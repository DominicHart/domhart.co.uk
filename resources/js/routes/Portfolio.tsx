import React from 'react';

const Portfolio: React.FC = () => {
  return (
    <div>
      <div className="py-10 px-6">
        <h1 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Portfolio</h1>
        <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Like all industry employed developers, the majority of my work was completed for clients and is therefore Intellectual Property. But here are a few of my personal projects.</p>
      </div>
      <div className="pb-10">
        <div className="p-8 md:p-16 bg-gray-100">
          <h2 className="text-xl md:text-3xl font-semibold">
            <a href="https://domhart.co.uk" target="_blank" className="text-blue-600">domhart.co.uk</a>
          </h2>
          <p className="mt-4 text-lg">
            domhart.co.uk is my personal portfolio website.
            This website lists my professional experience, showcases some of my personal projects and allows you to view a selection of the photos that I have taken in my free time.
            This website is still a work in progress and more content may be added to it in the future.
          </p>
          <div className="block grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 mt-8">
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-black py-2 px-4 font-semibold rounded bg-[rgba(255,255,255,0.65)]">
                Homepage
              </div>
              <img src="../../images/portfolio/domhart/domhart.jpg" alt="homepage" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                Photos
              </div>
              <img src="../../images/portfolio/domhart/photos.jpg" alt="photos" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                About Page
              </div>
              <img src="../../images/portfolio/domhart/about.jpg" alt="contact" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold">Built using:</p>
            <div className="mt-8">
              <a className="text-blue-600 font-semibold inline-block align-middle" href="https://laravel.com/docs/11.x/releases">
                <img src="../../images/logos/laravel.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://react.dev/">
                <img src="../../images/logos/react.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://www.typescriptlang.org/">
                <img src="../../images/logos/typescript.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://tailwindcss.com/">
                <img src="../../images/logos/tailwind.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <p className="mt-8 text-sm">Laravel, React JS, TypeScript and TailwindCSS.</p>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-16">
          <h2 className="text-xl md:text-3xl font-semibold">
            <a href="https://ceireburbidge.co.uk" target="_blank" className="text-blue-600">ceireburbidge.co.uk</a>
          </h2>
          <p className="mt-4 text-lg">
            ceireburbidge.co.uk is a photography portfolio for Ceire Burbidge.
            This portfolio allows Ceire to organise her photos into albums and utilises the react-editable-photo-grid allowing her to position her photos as she likes.
            The website features a bespoke stats dashboard where Ceire can see how many times people have viewed her albums and photos.
            There is a basic about page and a contact form which allows people to contact Ceire through the website.
          </p>
          <div className="block grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 mt-8">
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                Albums
              </div>
              <img src="../../images/portfolio/ceireburbidge/portfolio.jpg" alt="portfolio" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                PhotoGrid
              </div>
              <img src="../../images/portfolio/ceireburbidge/photogrid.jpg" alt="photogrid" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                Stats
              </div>
              <img src="../../images/portfolio/ceireburbidge/statistics.jpg" alt="homepage" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold">Built using:</p>
            <div className="mt-8">
              <a className="text-blue-600 font-semibold inline-block align-middle" href="https://laravel.com/docs/11.x/releases">
                <img src="../../images/logos/laravel.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://react.dev/">
                <img src="../../images/logos/react.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://www.typescriptlang.org/">
                <img src="../../images/logos/typescript.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://tailwindcss.com/">
                <img src="../../images/logos/tailwind.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <p className="mt-8 text-sm">Laravel, React JS, TypeScript and TailwindCSS.</p>
            </div>
          </div>
        </div>
        <div className="p-8 md:p-16 bg-gray-100">
          <h2 className="text-xl md:text-3xl font-semibold">
            <a href="https://www.npmjs.com/package/react-editable-photo-grid" target="_blank" className="text-blue-600">react-editable-photo-grid</a>
          </h2>
          <p className="mt-3 text-lg">
            react-edit-photo-grid is an NPM package that allows you to render your photos in a responsive grid and edit the position of them.
            Photos are organised into rows and columns. Controls are provided to move rows and photos around the grid.
            It also includes a basic gallery component that can be launched when a photo is clicked.
            This package does not include data management.
          </p>
          <div className="block grid md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 mt-8">
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                NPM
              </div>
              <img src="../../images/portfolio/photogrid/npm.jpg" alt="npm" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                Editable Photogrid
              </div>
              <img src="../../images/portfolio/photogrid/photos.jpg" alt="code" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
            <div className="relative portfolio__item">
              <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-12 text-white py-2 px-4 font-semibold rounded bg-[rgba(0,0,0,0.65)]">
                Gallery
              </div>
              <img src="../../images/portfolio/photogrid/gallery.jpg" alt="edit grid" className="block max-w-full h-full object-cover w-full shadow-md" width="300" />
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold">Built using:</p>
            <div className="mt-8">
              <span className="text-blue-600 font-semibold inline-block align-middle">
                <img src="../../images/logos/css.png" className="h-8 md:h-16 w-auto max-w-full" />
              </span>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://www.javascript.com/">
                <img src="../../images/logos/javascript.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <a className="text-blue-600 font-semibold inline-block align-middle ml-6" href="https://www.typescriptlang.org/">
                <img src="../../images/logos/typescript.png" className="h-8 md:h-16 w-auto max-w-full" />
              </a>
              <p className="mt-8 text-sm">CSS, JavaScript and TypeScript.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;