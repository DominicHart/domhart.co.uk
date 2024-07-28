import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="py-10">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Experience</h2>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Here is a summary of my professional career so far.</p>
        </div>
        <div className="bg-gray-100 py-3 md:py-10 px-6 mt-12 md:px-10 md:w-10/12 md:mx-auto relative">
          <div>
            <img src="../../images/logos/newicon.svg" width="150" className="max-w-full h-auto w-24 block mb-4" />
            <h3 className="text-2xl font-semibold">
              <a className="text-blue-600" href="https://newicon.net" rel="nofollow">Newicon</a>, Senior Developer
            </h3>
            <small className="text-sm">November 2021 - Present</small>
            <div className="mt-6">
              <p className="text-lg">
                At Newicon, I have encountered a significant shift in my development work, moving beyond my comfort zone with Laravel and React.
                On my second day, I was tasked with learning the basics of Magento, a complex PHP framework designed to accommodate diverse business needs.
                This experience has been a stark contrast to my previous work, forcing me to expand my skillset rapidly.
                Additionally, I have been introduced to various other technologies such as WordPress, Neon, and Drupal, and I work on bespoke projects that vary in technology.
                This broad exposure includes front-end development with Vue.js, a brief foray into Elixir/Erlang, and substantial DevOps experience with AWS and Azure, significantly enhancing my proficiency in these areas.
              </p>
              <p className="mt-4 text-lg">
                During my tenure at Newicon, I am not only exploring new development methods but also improving my problem-solving skills.
                This journey involves tackling diverse and challenging issues, which at times take me through the "five stages of grief."
                This experience has boosted my confidence and my enjoyment of new challenges.
                Frequent direct interactions with clients have honed my soft skills.
                As a Senior Developer, I work with considerable autonomy, often handling development, DevOps, and quality assurance.
                I have integrated unit testing into my PHP code, embraced TypeScript for better front-end development, and continuously strive to write superior code, benefiting from the opportunities provided by Newicon.
              </p>
              <p className="mt-6 text-sm">
                Progression: <span className="font-semibold">Middleweight &#8594; Senior</span>.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <img src="../../images/logos/pdw-logo.webp" width="150" className="max-w-full h-auto w-30 block mb-4" />
            <h3 className="text-2xl font-semibold">
              <a className="text-blue-600" href="https://www.pdwgroup.co.uk/" rel="nofollow">PDW Group</a>, Junior Software Engineer
            </h3>
            <small className="text-sm">October 2018 - November 2021</small>
            <div className="mt-6 text-lg">
              <p>
                PDW Group marked the beginning of my professional career and my introduction to Laravel.
                It was an intense crash course in development, transitioning from building basic applications to creating systems intended for actual use.
                Within a few days, I was tasked with rebuilding one of their internal systems, marking my first experience with a PHP framework (Laravel).
                Initially, working with a framework felt like cheating after writing vanilla PHP for so long, but within a few weeks, I couldn't imagine not using one.
                Laravel remains my preferred PHP framework to this day, and this experience provided valuable insights into how applications are used in the real world.
                Additionally, it was at PDW Group where I first encountered React, which has since become my favorite JavaScript framework.
              </p>
              <p className="mt-4 text-lg">
                At PDW Group, I developed numerous applications to support daily company operations and aid in management tasks.
                I learned DevOps early on, starting with basic Linux deployment and eventually advancing to AWS.
                My role encompassed all aspects of being a developer, from converting specifications into actionable tasks to building user interfaces, backend logic, and databases.
                This comprehensive exposure improved my problem-solving abilities and expanded my technical skillset across various technologies.
                My time at PDW Group was instrumental in shaping my development expertise and laying a strong foundation for my career.
              </p>
              <p className="mt-6 text-sm">
                Progression: <span className="font-semibold">Graduate &#8594; Junior</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Get in touch</h2>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">If you would like to contact me you can use one of the methods below:</p>
        </div>
        <div className="py-3 md:py-20 px-6 mt-12 md:mt-0 md:px-8 md:w-6/12 md:mx-auto relative md:text-center">
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

export default About;