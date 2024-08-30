import React from 'react';

const About: React.FC = () => {
  return (
    <div>
      <div className="pt-10">
        <div className="px-6">
          <h2 className="text-3xl md:text-5xl md:text-center font-semibold text-gray-800">About me</h2>
          <p className="md:text-center md:w-8/12 mx-auto mt-4 text-lg">Here is a summary of who I am, what I do and my career so far.</p>
          <img src="../../images/me.jpg" alt="Dom Hart" className="block mx-auto mt-12 max-w-full w-36 md:w-48 lg:w-56 h-36 md:h-48 lg:h-56 rounded-full object-cover" width="200" />
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
      </div>
    </div>
  );
}

export default About;