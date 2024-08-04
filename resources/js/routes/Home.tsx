import React from 'react';

const Home: React.FC = () => {
  const scrollToNext = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const section = document.getElementById('aboutMe');

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }
  }

  return (
    <>
      <div className="p-4 h-dvh bg-cover bg-center bg-no-repeat relative intro">
        <div className="text-center relative top-1/2 -translate-y-1/2 max-w-6/12">
          <h1 className="block text-5xl md:text-7xl xl:text-8xl font-semibold m-0 text-gray-200">
            <p>Dom Hart</p>
          </h1>
          <div className="inline-block">
            <p className="block text-2xl md:text-3xl xl:text-5xl m-0 mt-1 text-gray-400 border-r-8 overflow-hidden border-white job__title">Senior Developer</p>
          </div>
          <div className="w-full text-center mt-8 md:mt-14">
            <button type="button" onClick={scrollToNext} className="inline-block text-code-green border-2 border-code-green py-1 md:py-2 px-3 md:px-6 rounded-md text-lg md:text-2xl hover:bg-code-green hover:text-code-dark-gray">Continue</button>
          </div>
        </div>
      </div>
      <div className="bg-white px-6 py-6 md:py-24 text-gray-900" id="aboutMe">
        <div>
          <h2 className="text-3xl md:text-5xl text-center font-bold text-gray-800">Who I am</h2>
          <div className="2xl:w-7/12 mx-auto mt-6 md:mt-12">
            <img src="../../images/me.jpg" alt="Dom Hart" className="block mx-auto mb-12 max-w-full w-36 md:w-48 h-36 md:h-48 rounded-full object-cover" width="200" />
            <ul className="text-lg md:text-2xl block text-left bg-code-dark-gray text-code-gray p-6 md:p-10 rounded my-6">
              <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">const</span> <span class="text-code-yellow">whoIAm</span> <span class="text-white">= (): </span><span class="text-code-green">string</span> <span class="text-code-blue">=></span> <span class="text-white">{</span>' }} />
              <li className="pl-3 md:pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return</span> <span class="text-code-orange">`</span>' }} />
              <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Hi I\'m Dom. I\'m a Full Stack Senior Developer currently working for Newicon. I have worked with a lot of different languages, frameworks and technologies throughout my career but my preferred stack includes PHP and React JS. Outside of work I enjoy <a href="/photos">photography</Link>, working out and improving my dev skills.</span>' }} />
              <li className="pl-3 md:pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">`</span><span class="text-white">;</span>' }} />
              <li dangerouslySetInnerHTML={{ __html: '<span class="text-white">}</span>' }} />
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-6 py-6 md:py-24">
        <div>
          <h2 className="text-3xl md:text-5xl font-semibold text-center text-gray-800">What I know</h2>
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
    </>
  );
};

export default Home;