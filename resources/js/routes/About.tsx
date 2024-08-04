import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="py-10">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Career</h2>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Here is a summary of my professional career so far.</p>
        </div>
        <div className="py-3 md:py-10 px-6 md:px-10 md:w-10/12 md:mx-auto relative">
          <div className="bg-gray-100 p-8 md:p-12">
            <img src="../../images/logos/newicon.svg" width="150" className="max-w-full h-auto w-24 block mb-4" />
            <h3 className="text-2xl font-semibold">
              <a className="text-blue-600" href="https://newicon.net" rel="nofollow">Newicon</a>, Senior Developer
                        </h3>
            <small className="text-sm">November 2021 - Present</small>
            <div className="mt-6">
              <p className="text-lg">
                At Newicon, I have expanded my development skills beyond Laravel and React, delving into Magento, WordPress, Neon, Drupal, and front-end development with Vue.js, alongside a brief exposure to Elixir/Erlang and substantial DevOps work with AWS and Azure.
                This broad exposure has enhanced my technical proficiency and problem-solving abilities, often challenging me to learn quickly and adapt to diverse technologies.
                My role as a Senior Developer involves significant autonomy, including handling development, DevOps, and quality assurance, as well as frequent client interactions that have sharpened my soft skills.
                I have also improved my coding practices by integrating unit testing and using TypeScript for front-end development, all of which have boosted my confidence and enjoyment in tackling new challenges.
              </p>
              <p className="mt-6 text-sm">
                Progression: <span className="font-semibold">Middleweight &#8594; Senior</span>.
              </p>
            </div>
          </div>
          <div className="mt-12 bg-gray-100 p-8 md:p-12">
            <img src="../../images/logos/pdw-logo.webp" width="150" className="max-w-full h-auto w-30 block mb-4" />
            <h3 className="text-2xl font-semibold">
              <a className="text-blue-600" href="https://www.pdwgroup.co.uk/" rel="nofollow">PDW Group</a>, Junior Software Engineer
            </h3>
            <small className="text-sm">October 2018 - November 2021</small>
            <div className="mt-6 text-lg">
              <p>
                My professional career began at PDW Group, where I was introduced to Laravel and quickly transitioned from building basic applications to developing systems for practical use. 
                Starting with a crash course in development, I rebuilt an internal system using Laravel, which soon became my preferred PHP framework. 
                I also encountered React for the first time, which has since become my favorite JavaScript framework. 
                At PDW Group, I developed numerous applications supporting company operations and management tasks, gaining experience in DevOps with Linux and AWS. 
                My role encompassed all aspects of development, including converting specifications into actionable tasks, building user interfaces, backend logic, and managing databases. 
                This comprehensive exposure greatly enhanced my problem-solving skills and technical expertise, providing a solid foundation for my career.
              </p>
              <p className="mt-6 text-sm">
                Progression: <span className="font-semibold">Graduate &#8594; Junior</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;