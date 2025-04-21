import { useState, useContext, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import { getTranslation } from '../utils/translations';
import { trackEvent } from '../utils/analytics';

const FeedbackSurvey = ({ onClose }) => {
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const [showSurvey, setShowSurvey] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Translations
  const t = (key) => getTranslation(key, language);

  // Show survey with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if the user has submitted feedback recently
      const lastFeedback = localStorage.getItem('feedback_submitted');
      if (!lastFeedback || (Date.now() - parseInt(lastFeedback)) > 7 * 24 * 60 * 60 * 1000) { // 7 days
        setShowSurvey(true);
      }
    }, 60000); // Show after 1 minute on site

    return () => clearTimeout(timer);
  }, []);

  if (!showSurvey) return null;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    trackEvent('Feedback', 'Set Rating', `${newRating} stars`);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real implementation, send this data to your backend
    trackEvent('Feedback', 'Submit', `Rating: ${rating}, Comment: ${comment.substring(0, 30)}...`);

    // Save submission time to avoid showing again soon
    localStorage.setItem('feedback_submitted', Date.now().toString());
    localStorage.setItem('feedback_data', JSON.stringify({
      rating,
      comment,
      timestamp: new Date().toISOString(),
      language,
      darkMode
    }));

    setSubmitted(true);

    // Close after showing thank you message
    setTimeout(() => {
      setShowSurvey(false);
      if (onClose) onClose();
    }, 3000);
  };

  const handleClose = () => {
    setShowSurvey(false);
    trackEvent('Feedback', 'Dismissed');
    if (onClose) onClose();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm" aria-labelledby="feedback-title" role="dialog">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-lg shadow-lg p-5 transition-all animate-slide-up`}>
        {submitted ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">{t('feedbackThankYou')}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your feedback helps us improve MS Downloader.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between items-center mb-4">
              <h3 id="feedback-title" className="text-lg font-medium">{t('feedbackTitle')}</h3>
              <button
                type="button"
                onClick={handleClose}
                className={`rounded-full p-1 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
                aria-label="Close feedback"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm">{t('feedbackQuestion')}</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                    aria-label={`Rate ${star} out of 5 stars`}
                    aria-pressed={rating === star}
                  >
                    <svg
                      className={`w-8 h-8 transition-colors duration-200 ${
                        rating >= star
                          ? 'text-yellow-400'
                          : `${darkMode ? 'text-gray-600' : 'text-gray-300'}`
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="feedback-comment" className="sr-only">{t('feedbackComment')}</label>
              <textarea
                id="feedback-comment"
                rows="3"
                className={`w-full p-2 border rounded-md resize-none ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder={t('feedbackComment')}
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={rating === 0}
                className={`px-4 py-2 rounded-md text-white text-sm font-medium transition-colors ${
                  rating > 0
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {t('feedbackSubmit')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackSurvey;
