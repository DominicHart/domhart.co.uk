import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="py-10 md:py-20">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">Experience</h2>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Here is a summary of my professional career so far.</p>
        </div>
        <div className="bg-gray-100 py-3 md:py-6 px-6 mt-12 md:px-8 md:w-10/12 md:mx-auto relative">
          <div>
            <h3 className="text-2xl font-semibold">Newicon, Senior Developer</h3>
            <small>November 2021 - Present</small>
            <div className="mt-4">
              <p className="text-lg">
                Newicon was a big step up. I'd gotten very comfortable working with the same stack day in, day out.
                This allowed me to become proficient with Laravel and React but also meant that I hadn't expanded my skillset as much as I'd hoped.
                On my second day this problem was solved when I was asked to learn the basics of Magento. Magento is quite unlike any other PHP framework.
                It's built to accomodate pretty much any business needs that you can imagine and as a result, it's a very complex framework to learn.
              </p>
              <p className="mt-4 text-lg">
                During my time at Newicon I've also been introduced to Wordpress, Neon and Drupal. Projects are always bespoke so the technology varies.
                It's not just PHP frameworks that I've explored.
                I've built frontends in Vue JS and even had a brief encounter with Elixir/Erlang.
                I've worked with AWS and Azure which has taken my DevOps skills to a whole new level.
                I've also worked with many APIs, often integrating multiple for a single project.
              </p>
              <p className="mt-4 text-lg">
                I've not just learned about new ways to develop but how to develop better.
                Problem solving is a large part of being a developer and it's a skill that you're always looking to improve.
                At Newicon I've had to solve all sorts of problems and quite a few have taken me through the 5 stages of grief... and back again.
                My confidence has grown and I've learned to enjoy taking on new challenges.
                I've also improved my soft skills mostly due to frequent direct contact with Clients.
              </p>
              <p className="mt-4 text-lg">
                As a Senior developer I've learned to work with a lot of autonomy. I am often the developer, the DevOps and the Quality Assurance.
                I've learned how to integrate unit testing into my PHP which allows me to write better code first time.
                I've recently embraced Typescript which has been a learning curve but has resulted in me writing better frontend code.
                I am always striving to write better code and Newicon provides me with the opportunities to do that.
              </p>
              <p className="mt-4 font-semibold text-lg">
                Progression: Middleweight Developer &#8594; Senior Developer.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold">PDW Group, Junior Software Engineer</h3>
            <small>October 2018 - November 2021</small>
            <div className="mt-4 text-lg">
              <p>
                PDW Group was the start of my professional career and my introduction to Laravel.
                It was a crash course into all things development.
                I'd built a few basic applications and played around with various techologies but I'd never built anything that was going to be <em>used</em> before.
                Within a few days I'd already been tasked with rebuilding one of their internal systems.
                This coincidentally was my first experience working with a PHP framework (Laravel).
              </p>
              <p className="mt-4 text-lg">
                After writing vanilla PHP for so long a framework felt like cheating, very plug and play.
                After a few weeks I couldn't believe that I'd ever not used a framework.
                Laravel remains my preferred PHP framework to this day.
                I gained a good perspective on how applications are used in the real world.
                I learned a lot of technologies while working at PDW Group and improved my problem solving abilities.
                This was also where I was introduced to React, which happens to be my favourite JS framework.
              </p>
              <p className="mt-4 text-lg">
                I worked on quite a few applications to support the day to day operations of the company and help people manage everything.
                I learned dev ops quite early on: starting with basic Linux deployment and progressing to AWS.
                During my time there I experienced all aspects of being a developer and I was responsible for the whole application.
                I converted the specification into a workable set of tasks. I built User Interfaces, backend logic and built the databases.
              </p>
              <p className="mt-4 font-semibold text-lg">
                Progression: Graduate Developer &#8594; Junior Developer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 md:py-20">
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