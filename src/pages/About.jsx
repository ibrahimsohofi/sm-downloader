import React from 'react';

function About() {
  return (
    <div className="py-6">
      <header className="w-full">
        <div className="max-w-4xl mx-auto text-center py-6 md:py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            About <span className="text-orange-500">Us</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
            Learn more about our service and mission
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-8 md:pb-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="md:w-2/3">
              <p className="text-sm md:text-base text-gray-700 mb-4">
                Welcome to MS Downloader, your go-to platform for downloading and converting media from various sources across the web. We started in 2023 with a simple mission: to create a user-friendly tool that makes downloading and converting videos and audio files as straightforward as possible.
              </p>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                Our team is made up of passionate developers and multimedia enthusiasts who understand the challenges that come with finding reliable tools for downloading and converting media. We've combined our expertise to build a solution that's both powerful and easy to use.
              </p>
              <p className="text-sm md:text-base text-gray-700">
                Whether you're a content creator, a student, or simply someone who enjoys saving videos for offline viewing, MS Downloader is designed with you in mind. We're constantly improving our platform to provide the best possible experience for our users.
              </p>
            </div>
            <div className="md:w-1/3">
              <img
                src="/images/author.jpg"
                alt="Our Team"
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-sm md:text-base text-gray-700 mb-4">
            At MS Downloader, our mission is to provide a free, efficient, and user-friendly platform for downloading and converting media. We believe that accessing content should be straightforward and accessible to everyone, regardless of technical expertise.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
            <div className="p-4 md:p-5 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-sm md:text-base text-gray-600">
                We're committed to making our tools accessible to everyone, with an intuitive interface that doesn't require technical knowledge to use.
              </p>
            </div>
            <div className="p-4 md:p-5 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Quality</h3>
              <p className="text-sm md:text-base text-gray-600">
                We prioritize the quality of downloads and conversions, ensuring that users get the best possible version of their media files.
              </p>
            </div>
            <div className="p-4 md:p-5 border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg md:text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-sm md:text-base text-gray-600">
                We're constantly innovating and improving our platform to keep up with the evolving digital landscape and provide cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Our Services</h2>
          <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
            MS Downloader offers a range of services to meet your media needs:
          </p>
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-gray-100 rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img src="/images/326639_download_file_icon.svg" alt="Video Downloader" className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Video Downloader</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Download videos from various platforms including YouTube, Facebook, Instagram, Twitter, and more. Choose from different quality options to suit your needs.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-gray-100 rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img src="/images/time.svg" alt="Media Converter" className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Media Converter</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Convert your media files to different formats with ease. Our converter supports various video and audio formats, allowing you to tailor your files to your specific needs.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
              <div className="md:w-1/4 flex justify-center">
                <div className="bg-gray-100 rounded-full p-4 md:p-6 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <img src="/svg/clipboard-bold.svg" alt="Audio Extraction" className="w-8 h-8 md:w-12 md:h-12" />
                </div>
              </div>
              <div className="md:w-3/4 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2">Audio Extraction</h3>
                <p className="text-sm md:text-base text-gray-600">
                  Extract audio from videos and save it in your preferred format. Perfect for creating audio tracks from music videos or extracting soundtracks from movies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
