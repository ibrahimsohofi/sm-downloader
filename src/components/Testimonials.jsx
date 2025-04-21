import React, { useContext } from 'react';
import { ThemeContext } from '../App';

function Testimonials() {
  const { darkMode } = useContext(ThemeContext);

  const testimonials = [
    {
      name: "Sarah Johnson",
      title: "Content Creator",
      avatar: "/images/author.jpg",
      stars: 5,
      text: "This tool has completely changed my workflow! I can download and convert videos in seconds, and the quality is perfect for my YouTube channel."
    },
    {
      name: "Michael Rodriguez",
      title: "Digital Marketer",
      avatar: "/images/img.jpg",
      stars: 5,
      text: "I've tried many video downloaders, but this one is by far the most reliable. No more broken links or low-quality downloads. Highly recommended!"
    },
    {
      name: "Emily Chen",
      title: "Student",
      avatar: "/images/thumbnail.jpg",
      stars: 4,
      text: "Super easy to use even for someone not tech-savvy. Perfect for downloading study materials and converting them to audio for learning on the go."
    }
  ];

  return (
    <section className={`w-full py-12 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            What Our <span className="text-orange-500">Users</span> Say
          </h2>
          <p className={`text-sm md:text-base max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of satisfied users who trust our platform for their video downloading and conversion needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              darkMode={darkMode}
              animate={true}
              delay={index}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#download-section"
            className={`inline-block px-6 py-3 text-white font-medium rounded-md transition-colors duration-300 ${darkMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            Try It Now - It's Free!
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, darkMode, animate, delay }) {
  const { name, title, avatar, stars, text } = testimonial;

  // Generate star rating
  const starRating = Array(5).fill(0).map((_, i) => (
    <svg
      key={i}
      className={`w-5 h-5 ${i < stars ? 'text-yellow-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));

  const animationClass = animate ? `animate-slide-up stagger-${delay}` : '';

  return (
    <div
      className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
      p-6 rounded-lg shadow-lg border ${animationClass} hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-start mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="font-bold text-lg">{name}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
          <div className="flex mt-1">
            {starRating}
          </div>
        </div>
      </div>
      <p className={`italic text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{text}"</p>
    </div>
  );
}

export default Testimonials;
