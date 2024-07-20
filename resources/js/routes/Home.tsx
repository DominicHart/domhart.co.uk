import React from 'react';

const Home: React.FC = () => {
  const scrollToNext = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    const section = document.getElementById('aboutMe');

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }

  return (
    <>
      <div className="p-4 h-[calc(100vh-112px)] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('../../images/code.jpg')" }}>
        <div className="text-center relative top-1/2 -translate-y-1/2">
          <h1 className="block text-5xl md:text-7xl font-semibold m-0 text-code-blue">
            <a href="#aboutMe" role="button" className="cursor-pointer" onClick={scrollToNext}>Dom Hart</a>
          </h1>
          <p className="block text-2xl md:text-3xl m-0 mt-2 text-code-gray">Senior Developer</p>
        </div>
      </div>
      <div className="bg-white px-6 py-6 md:py-24 text-gray-900" id="aboutMe">
        <div>
          <h2 className="text-3xl md:text-5xl text-center font-semibold text-gray-800">About Me</h2>
          <div className="2xl:w-7/12 mx-auto mt-6 md:mt-12">
            <img src="../../images/me.jpg" alt="Dom Hart" className="block mx-auto mb-12 max-w-full w-36 md:w-48 h-36 md:h-48 rounded-full object-cover" width="200" />
            <ul className="text-lg md:text-2xl block text-left bg-code-dark-gray text-code-gray p-6 md:p-10 rounded my-6">
              <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">const</span> <span class="text-code-yellow">aboutMe</span> <span class="text-white">= ()</span> <span class="text-code-blue">=></span> <span class="text-white">{</span>' }} />
              <li className="pl-3 md:pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return</span> <span class="text-code-orange">`</span>' }} />
              <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Hi I\'m Dom. I\'m a Full Stack Senior Developer currently working for Newicon. I have worked with a lot of different languages, frameworks and technologies throughout my career but my preferred stack includes PHP and React JS. Outside of work I enjoy <a href="/photos">photography</Link>, working out and improving my dev skills.</span>' }} />
              <li className="pl-3 md:pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">`</span><span class="text-white">;</span>' }} />
              <li dangerouslySetInnerHTML={{ __html: '<span class="text-white">}</span>' }} />
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 px-6 py-6 md:py-24">
        <div>
          <h2 className="text-3xl md:text-5xl font-semibold text-center text-gray-800">What I know</h2>
          <div className="2xl:w-7/12 mx-auto mt-6 md:mt-12">
            <ul className="text-lg md:text-2xl block text-left bg-code-dark-gray text-code-gray p-6 md:p-10 rounded my-6">
              <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">&#8249;?php</span>' }} />
              <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">namespace</span> <span class="text-code-green">App\\Home</span><span class="text-white">;</span> ' }} />
              <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">class</span> <span class="text-code-green">WhatIKnow</span>  ' }} />
              <li className="pl-6 md:pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-white">{</span> ' }} />
              <li className="pl-10 md:pl-20" dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">public function</span> <span class="text-code-yellow">show()</span> <span class="text-white">{</span>' }} />
              <li className="pl-14 md:pl-28" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return <span class="text-code-orange">"</span>' }} />
              <li className="pl-20 md:pl-36" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">PHP | AWS | React JS | Vue JS | SQL | Laravel</span>' }} />
              <li className="pl-20 md:pl-36" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Magento 2 | Drupal | Azure | Ubuntu | Nginx | Apache2</span>' }} />
              <li className="pl-20 md:pl-36" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">And a lot more.</span>' }} />
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