import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../App';

function Footer() {
  const { darkMode } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`h-fit ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white p-4 transition-colors duration-300`}>
      <article className="flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-0">
        <section className="flex items-center justify-center">
          <Link to="/">
            <img className="h-16 w-16" src="/logo512.png" alt="Site Logo" />
          </Link>
        </section>
        <section className="flex flex-col">
          <h2 className="text-xl font-bold mb-1 text-center md:text-left">Follow Us</h2>
          <hr className="mb-2 mx-auto md:mx-0 w-20 md:w-full" />
          <div className="flex flex-row md:flex-col gap-3 md:gap-0">
            <Link to="https://www.instagram.com" target="_blank" className="hover:text-orange-400 mb-1 transition-colors duration-300">Instagram</Link>
            <Link to="https://www.facebook.com" target="_blank" className="hover:text-orange-400 mb-1 transition-colors duration-300">Facebook</Link>
            <Link to="https://www.twitter.com" target="_blank" className="hover:text-orange-400 mb-1 transition-colors duration-300">Twitter</Link>
            <Link to="https://www.telegram.com" target="_blank" className="hover:text-orange-400 mb-1 transition-colors duration-300">Telegram</Link>
          </div>
        </section>
        <section className="flex flex-col">
          <h2 className="text-xl font-bold mb-1 text-center md:text-left">Useful Links</h2>
          <hr className="mb-2 mx-auto md:mx-0 w-20 md:w-full" />
          <div className="flex flex-row md:flex-col gap-3 md:gap-0">
            <Link to="/downloader" className="hover:text-orange-400 mb-1 transition-colors duration-300">Downloader</Link>
            <Link to="/converter" className="hover:text-orange-400 mb-1 transition-colors duration-300">Converter</Link>
            <Link to="/faq" className="hover:text-orange-400 mb-1 transition-colors duration-300">FAQs</Link>
            <Link to="/contact" className="hover:text-orange-400 mb-1 transition-colors duration-300">Contact Us</Link>
          </div>
        </section>
      </article>
      <hr className="w-10/12 mx-auto mt-6 opacity-30" />
      <div className="text-center mt-4">
        <p className="p-2 text-gray-300">
          ©️Copyright {currentYear} MS Downloader. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6 mt-2 text-sm">
          <Link to="/terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Terms & Conditions</Link>
          <Link to="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
