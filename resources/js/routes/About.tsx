import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="pt-10">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">About me</h2>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Here is a summary of who I am, what I do and my career so far.</p>
          <img src="../../images/me.jpg" alt="Dom Hart" className="block mx-auto mt-12 max-w-full w-36 md:w-48 h-36 md:h-48 rounded-full object-cover" width="200" />
        </div>
        <div className="bg-white px-6 py-6 md:pb-24 text-gray-900" id="aboutMe">
          <div>
            <div className="2xl:w-7/12 mx-auto mt-6 md:mt-8">
              <ul className="text-lg md:text-2xl block text-left bg-code-dark-gray text-code-gray p-6 md:p-10 rounded my-6">
                <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">const</span> <span class="text-code-yellow">whoIAm</span> <span class="text-white">= (): </span><span class="text-code-green">string</span> <span class="text-code-blue">=></span> <span class="text-white">{</span>' }} />
                <li className="pl-3 md:pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return</span> <span class="text-code-orange">`</span>' }} />
                <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Hi I\'m Dom. I\'m a Full Stack Senior Developer currently working for Newicon. I have worked with a lot of different languages, frameworks and technologies throughout my career but my preferred stack includes PHP and React JS. Outside of work I enjoy <a href="/photos">photography</Link>, working out and improving my dev skills.</span>' }} />
                <li className="pl-3 md:pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">`</span><span class="text-white">;</span>' }} />
                <li dangerouslySetInnerHTML={{ __html: '<span class="text-white">}</span>' }} />
              </ul>
            </div>
            <div className="2xl:w-7/12 mx-auto mt-6 md:mt-12">
              <ul className="text-lg md:text-2xl block text-left bg-code-dark-gray text-code-gray p-6 md:p-10 rounded my-6">
                <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">&#8249;?php</span>' }} />
                <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">namespace</span> <span class="text-code-green">App\\Home</span><span class="text-white">;</span> ' }} />
                <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">class</span> <span class="text-code-green">WhatIKnow</span>  ' }} />
                <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-white">{</span> ' }} />
                <li className="pl-10 md:pl-20" dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">public function</span> <span class="text-code-yellow">list</span><span class="text-white">():</span> <span class="text-code-blue">string</span> <span class="text-white">{</span>' }} />
                <li className="pl-14 md:pl-28" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return <span class="text-code-orange">"</span>' }} />
                <li className="pl-20 md:pl-36" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">PHP, AWS, React JS, Vue JS, SQL, Laravel</span>' }} />
                <li className="pl-20 md:pl-36" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Magento 2, Drupal, Azure, Ubuntu, Nginx, Apache2</span>' }} />
                <li className="pl-20 md:pl-36" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">and a lot more.</span>' }} />
                <li className="pl-14 md:pl-28" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">"</span></span><span class="text-white">;</span>' }} />
                <li className="pl-10 md:pl-20" dangerouslySetInnerHTML={{ __html: '</span><span class="text-white">}</span>' }} />
                <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '</span><span class="text-white">}</span>' }} />
                <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">?&#8250;</span>' }} />
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 py-3 md:py-10 px-6 md:px-10 relative">
          <div className="lg:grid lg:grid-cols-2 xl:w-10/12 xl:mx-auto">
            <div className="p-8 md:p-12">
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
            <div className="p-8 md:p-12">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;