import React from 'react';

const Developer = () => {
    return (
        <section>
            <div className='min-h-screen py-14 max-w-[1480px] mx-auto'>
                <div className="mx-4 mt-5 pb-24 flex-col">
                    <figure>
                        <img src='https://media.licdn.com/dms/image/D5616AQGHqdWhWpnNGg/profile-displaybackgroundimage-shrink_350_1400/0/1670615785691?e=1677110400&v=beta&t=YvnKLYpduWdeyyGRLp3oM9cZ-iC9V_A0p1DirIypse4' className="rounded-lg shadow-2xl w-full" alt='' />
                    </figure>
                    <div>
                        <h1 className='text-4xl font-semibold mb-6 mt-10'>Hi, I am <span className='text-blue-700'>Sorwar Talukder</span>
                        </h1>
                        <p className='text-justify text-xl mb-6'>I am a frontend web developer.  I have worked on many of my projects. Every project is different and works Front-End, Backend and design done by me. I request you to see my projects.
                        </p>
                        <p className='text-justify text-xl mb-6'>A freedom loving person. I enjoy work. The only difference between me and those who upgrade the world is skill. I will work to improve myself. I dream of giving something new to the world one day.
                        </p>
                        <p className='text-justify text-xl'>I am expert with JavaScript, React.js, CSS, Bootstrap, React Bootstrap, Tailwind, DaisyUI, HTML, Express.js, Firebase, MongoDB and I used many tools (Github, Netlify, Canva, Figma, React Icons, React Router, React Toast, React Query, React Photo View, React Hook Form, Context API etc). I consider myself as a self-motivated, responsible and disciplined person. I am always ready to face any problem and try my best to solve it with my analogical knowledge and new technology.
                        </p>
                        <div className='flex text-xl leading-9 my-11'>
                            <div>
                                <p>Full Name</p>
                                <p>Age</p>
                                <p>Nationality</p>
                                <p>Address</p>
                                <p>Portfolio</p>
                            </div>
                            <div className='ml-6'>
                                <p>: MD Golam Sorwar</p>
                                <p>: 22 Years</p>
                                <p>: Bangladeshi</p>
                                <p>: Dhaka, Bangladesh</p>
                                <p>: <a href="https://sorwar-portfolio.web.app/"
                                    target='_blank'
                                    rel="noreferrer"
                                    className='text-primary'
                                >https://sorwar-portfolio.web.app/</a></p>
                            </div>

                        </div>
                        <a href="https://drive.google.com/u/0/uc?id=1_P_F6B3k6TGiXZJTBDMcrGuK4G_xPKko&export=download"
                        >
                            <button className="bg-blue-700 hover:bg-purple-900 text-white text-xl px-6 py-4 hover:shadow-slate-900 hover:shadow-md">Download Resume</button>
                        </a>

                    </div>
                    <strong className='text-center block'><small>Date: Dec 20, 2022</small></strong>
                </div>
            </div>
        </section>
    );
};

export default Developer;