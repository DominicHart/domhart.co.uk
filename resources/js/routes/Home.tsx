import React from 'react';

const Home: React.FC = () => {
    return (
        <>
            <div className="p-4 h-[calc(100vh-7rem)] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('../../images/code.jpg')" }}>
                <div className="relative top-1/2 -translate-y-1/2 text-center">
                    <h1 className="block text-7xl font-semibold m-0 text-code-blue">Dom Hart</h1>
                    <p className="block text-3xl m-0 mt-2 text-code-gray">Senior Developer</p>
                </div>
            </div>
            <div className="bg-white h-screen px-8 text-gray-900">
                <div className="relative top-1/2 -translate-y-1/2">
                    <h2 className="text-5xl text-center font-semibold text-gray-800">About Me</h2>
                    <div className="2xl:w-7/12 mx-auto mt-12">
                        <img src="" alt="Dom Hart" className="block mx-auto mb-4 max-w-full h-auto" width="200" />
                        <ul className="text-2xl block text-left bg-code-dark-gray text-code-gray p-10 rounded my-6">
                            <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">const</span> <span class="text-code-yellow">aboutMe</span> <span class="text-white">= ()</span> <span class="text-code-blue">=></span> <span class="text-white">{</span>' }} />
                            <li className="pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return</span> <span class="text-code-orange">`</span>' }} />
                            <li className="pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Hi I\'m Dom. I\'m a Full Stack Senior Developer currently working for Newicon. I have worked with a lot of different languages, frameworks and technologies throughout my career but my preferred stack includes PHP and React JS. Outside of work I enjoy <a href="/photography">photography</Link>, working out and improving my dev skills.</span>' }} />
                            <li className="pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">`</span><span class="text-white">;</span>' }} />
                            <li dangerouslySetInnerHTML={{ __html: '<span class="text-white">}</span>' }} />
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 h-screen px-8">
                <div className="relative top-1/2 -translate-y-1/2">
                    <h2 className="text-5xl font-semibold text-center text-gray-800">What I know</h2>
                    <div className="2xl:w-7/12 mx-auto mt-12">
                        <ul className="text-2xl block text-left bg-code-dark-gray text-code-gray p-10 rounded my-6">
                            <li dangerouslySetInnerHTML={{ __html: '<span class="text-code-blue">cons</span> <span class="text-code-yellow">whatIKnow</span> <span class="text-white">= ()</span> <span class="text-code-blue">=></span> <span class="text-white">{</span>' }} />
                            <li className="pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-pink">return</span> <span class="text-code-orange">`</span>' }} />
                            <li className="pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Here are some of the technologies that I have worked with:</span>' }} />
                            <li className="pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">PHP | AWS | React JS | Vue JS | SQL | Laravel</span>' }} />
                            <li className="pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">Magento 2 | Drupal | Azure | Ubuntu | Nginx | Apache2</span>' }} />
                            <li className="pl-12" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">And a lot more.</span>' }} />
                            <li className="pl-6" dangerouslySetInnerHTML={{ __html: '<span class="text-code-orange">`</span></span><span class="text-white">;</span>' }} />
                            <li dangerouslySetInnerHTML={{ __html: '<span class="text-white">}</span>' }} />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;