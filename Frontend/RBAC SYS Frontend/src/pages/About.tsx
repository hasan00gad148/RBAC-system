import React from 'react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="mb-4">
        Hi, my name is Alhassan Gad, i recently graduated with a Bachelor’s degree in Computer Science,
        where I developed a strong foundation in various areas of technology (oop, design patterns, algorithm design and datasturcture).
        During my studies, I completed several projects that involved web development, 
        data science, and software engineering and have many coursera certificates.
        Also courses such as Deep Learning, Computer Vision, NLP, and Machine Learning have equipped me with the necessary skills to excel in AI.
        my tech stack is python javascript typescript express.js react.js flask tensorflow scikit-learn pandas numpy matplot
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Let's Connect</h2>
      <p>
        I'm always open to new opportunities and collaborations. Feel free to reach out to me at 
        <a className='text-lg text-green-700 font-semibold' href="mailto:hassan178tv@gmail.com"> my email</a>
      </p>
    </div>
  );
}

export default About