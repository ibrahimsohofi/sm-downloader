import React, { useState } from 'react';

function Faq() {
  const faqs = [
    {
      question: "What is this website about?",
      answer: "This website provides tools for downloading and converting files, as well as information about our services and contact details."
    },
    {
      question: "How do I use the downloader tool?",
      answer: "Navigate to the \"Downloader\" page from the navigation menu. Enter the URL of the file you want to download, and click the \"Download\" button. The file will be saved to your device."
    },
    {
      question: "What types of files can I convert?",
      answer: "Our converter tool supports various file types, including documents, images, audio, and video files. For a detailed list, please visit the \"Converter\" page."
    },
    {
      question: "Is there a limit to the file size I can upload?",
      answer: "Yes, the maximum file size you can upload is 100MB. If your file exceeds this limit, you may need to compress it before uploading."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact us by navigating to the \"Contact\" page and filling out the contact form. We will get back to you as soon as possible."
    },
    {
      question: "Are my files secure on this website?",
      answer: "Yes, we take your privacy and security very seriously. All uploaded files are encrypted and are only accessible to you."
    },
    {
      question: "Is this service free?",
      answer: "Yes, our basic services are free. However, we offer premium features that require a subscription. Check out our \"About\" page for more details."
    },
    {
      question: "Which video platforms are supported?",
      answer: "Our downloader supports YouTube, Facebook, Instagram, Twitter, Vimeo, TikTok, and many more platforms."
    },
    {
      question: "Can I download only the audio from a video?",
      answer: "Yes, our downloader tool allows you to extract audio from videos and save it in various formats like MP3, AAC, or WAV."
    },
    {
      question: "How do I report a bug or suggest a feature?",
      answer: "You can report bugs or suggest features by visiting our Contact page and selecting 'Feedback' as the subject of your message."
    }
  ];

  return (
    <div className="py-6">
      <header className="w-full">
        <div className="max-w-4xl mx-auto text-center py-6 md:py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6">
            Find answers to common questions about our services
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pb-8 md:pb-12">
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className="mt-8 md:mt-12 bg-gray-100 rounded-lg p-4 md:p-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Still have questions?</h2>
          <p className="text-sm md:text-base text-gray-700 mb-3 md:mb-4">
            If you couldn't find the answer to your question, feel free to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white py-1.5 md:py-2 px-4 md:px-6 rounded-md text-sm md:text-base"
          >
            Contact Support
          </a>
        </div>
      </main>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-3 md:pb-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base md:text-lg font-medium text-gray-900">{question}</h3>
        <span className={`ml-4 md:ml-6 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-5 w-5 md:h-6 md:w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`mt-2 ${isOpen ? 'block' : 'hidden'}`}>
        <p className="text-sm md:text-base text-gray-600">{answer}</p>
      </div>
    </div>
  );
}

export default Faq;
