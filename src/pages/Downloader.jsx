import React from 'react';
import DownloadSection from '../components/DownloadSection';
import HowToUse from '../components/HowToUse';

function Downloader() {
  return (
    <div className="py-4">
      <header className="w-full">
        <div className="max-w-4xl mx-auto text-center py-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-orange-500">Video</span> Downloader
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Download videos from YouTube, Facebook, Instagram, Twitter, and more in high quality.
          </p>
        </div>
      </header>

      <main className="flex flex-col items-center h-full w-full">
        <DownloadSection />
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">About Our Video Downloader</h2>
            <p className="text-gray-700 mb-4">
              Our video downloader tool allows you to download videos from various platforms in different formats and qualities. It's completely free to use and doesn't require any registration.
            </p>
            <p className="text-gray-700 mb-4">
              You can download videos in MP4, WEBM, and other formats, with resolutions ranging from 360p to 4K. Our tool also allows you to download just the audio from videos in MP3 format.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Supported Platforms</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>YouTube</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Vimeo</li>
                <li>TikTok</li>
                <li>And many more...</li>
              </ul>
            </div>
          </div>
        </div>

        <HowToUse />
      </main>
    </div>
  );
}

export default Downloader;
