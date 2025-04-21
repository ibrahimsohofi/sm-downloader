import { useState, useContext, useRef, useEffect } from 'react';
import { ThemeContext, LanguageContext } from '../App';
import { trackEvent } from '../utils/analytics';
import { getTranslation } from '../utils/translations';
import ResponsiveImage from '../components/ResponsiveImage';
import ShareButtons from '../components/ShareButtons';

function Converter() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [format, setFormat] = useState('mp4');
  const [quality, setQuality] = useState('high');
  const [isLoading, setIsLoading] = useState(false);
  const [conversionComplete, setConversionComplete] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const { darkMode } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // Get translations
  const t = (key) => getTranslation(key, language);

  // Reset state when language or theme changes
  useEffect(() => {
    if (conversionComplete) {
      trackEvent('Converter', 'Language Changed During Conversion', language);
    }
  }, [language, darkMode]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    setConversionComplete(false);
    setConversionProgress(0);
    setConvertedFileUrl(null);

    // Detect file type (video or audio)
    const fileType = selectedFile.type.startsWith('video/')
      ? 'video'
      : selectedFile.type.startsWith('audio/')
        ? 'audio'
        : 'unknown';

    setFileType(fileType);

    // Set default format based on file type
    if (fileType === 'video') {
      setFormat('mp4');
    } else if (fileType === 'audio') {
      setFormat('mp3');
    }

    // Track file upload
    trackEvent('Converter', 'File Upload', `${fileType} - ${selectedFile.type}`, Math.round(selectedFile.size / 1024));

    // Generate preview for video or audio
    generatePreview(selectedFile, fileType);
  };

  const generatePreview = (file, type) => {
    if (type === 'unknown') return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  };

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
    trackEvent('Converter', 'Format Change', e.target.value);
  };

  const handleQualityChange = (e) => {
    setQuality(e.target.value);
    trackEvent('Converter', 'Quality Change', e.target.value);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setConversionProgress(0);

    // Track conversion start
    trackEvent('Converter', 'Conversion Start', `${fileType} to ${format} (${quality})`);

    // Simulate conversion process with realistic progress updates
    let progress = 0;
    const interval = setInterval(() => {
      // Simulate non-linear progress
      const increment = Math.random() * (10 - progress / 10);
      progress += increment;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        // Simulate completed conversion
        setConversionProgress(100);
        setIsLoading(false);
        setConversionComplete(true);

        // Generate a fake download URL
        setConvertedFileUrl(`#converted-${Date.now()}`);

        // Track conversion complete
        trackEvent('Converter', 'Conversion Complete', `${fileType} to ${format} (${quality})`, 1);
      } else {
        setConversionProgress(Math.round(progress));
      }
    }, 200);
  };

  const handleReset = () => {
    setFile(null);
    setFileType(null);
    setPreview(null);
    setConversionComplete(false);
    setConversionProgress(0);
    setConvertedFileUrl(null);

    // Track reset
    trackEvent('Converter', 'Reset Converter');
  };

  // Format options for video and audio
  const videoFormats = ['mp4', 'avi', 'mov', 'webm', 'mkv'];
  const audioFormats = ['mp3', 'wav', 'aac', 'ogg', 'flac'];

  return (
    <div className={`py-6 ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in`}>
      <header className="w-full">
        <div className="max-w-4xl mx-auto text-center py-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-orange-500">{t('converter')}</span> {t('appName')}
          </h1>
          <p className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
            {t('converterSubtitle') || "Convert your media files to different formats with ease"}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 sm:p-8 transition-colors duration-300`}>
          <form onSubmit={handleSubmit} className="space-y-6" onDragEnter={handleDrag}>
            {/* File Upload Section */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300
                ${dragActive
                  ? (darkMode ? 'border-orange-500 bg-gray-700' : 'border-orange-500 bg-orange-50')
                  : (darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400')
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex flex-col items-center">
                  {/* File preview */}
                  {preview && (
                    <div className="mb-4 w-full max-w-xs rounded-lg overflow-hidden">
                      {fileType === 'video' ? (
                        <video
                          src={preview}
                          className="w-full h-auto"
                          controls
                          preload="metadata"
                        />
                      ) : fileType === 'audio' ? (
                        <div className={`w-full p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <audio src={preview} className="w-full" controls />
                          <div className="w-full h-24 flex items-center justify-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                            </svg>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}

                  <div className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{file.name}</div>
                  <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                  >
                    {t('removeFile') || "Remove File"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t('dropFileHere') || "Drag and drop your file here, or click to browse"}
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept="video/*,audio/*"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`${darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    } px-4 py-2 rounded-md cursor-pointer inline-block transition-colors duration-300`}
                  >
                    {t('browseFiles') || "Browse Files"}
                  </label>
                </div>
              )}
            </div>

            {/* Conversion Options */}
            {file && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Format Selection */}
                <div>
                  <label className={`block ${darkMode ? 'text-gray-200' : 'text-gray-700'} font-medium mb-2`} htmlFor="format">
                    {t('outputFormat') || "Output Format"}
                  </label>
                  <div className={`border rounded-md overflow-hidden transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} px-4 py-2 font-semibold border-b`}>
                      {t('selectFormat') || "Select Format"}
                    </div>
                    <div className={`p-4 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      {(fileType === 'video' || fileType === 'unknown') && (
                        <div>
                          <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t('video') || "Video"}</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {videoFormats.map((videoFormat) => (
                              <label key={videoFormat} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="format"
                                  value={videoFormat}
                                  checked={format === videoFormat}
                                  onChange={handleFormatChange}
                                  className="text-orange-500 focus:ring-orange-500"
                                />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{videoFormat.toUpperCase()}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      {(fileType === 'audio' || fileType === 'unknown') && (
                        <div>
                          <h3 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t('audio') || "Audio"}</h3>
                          <div className="grid grid-cols-2 gap-2">
                            {audioFormats.map((audioFormat) => (
                              <label key={audioFormat} className="flex items-center space-x-2">
                                <input
                                  type="radio"
                                  name="format"
                                  value={audioFormat}
                                  checked={format === audioFormat}
                                  onChange={handleFormatChange}
                                  className="text-orange-500 focus:ring-orange-500"
                                />
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{audioFormat.toUpperCase()}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quality Selection */}
                <div>
                  <label className={`block ${darkMode ? 'text-gray-200' : 'text-gray-700'} font-medium mb-2`} htmlFor="quality">
                    {t('outputQuality') || "Output Quality"}
                  </label>
                  <div className={`border rounded-md overflow-hidden transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <div className={`${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} px-4 py-2 font-semibold border-b`}>
                      {t('selectQuality') || "Select Quality"}
                    </div>
                    <div className={`p-4 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="quality"
                            value="low"
                            checked={quality === "low"}
                            onChange={handleQualityChange}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {t('qualityLow') || "Low (Faster conversion, smaller file size)"}
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="quality"
                            value="medium"
                            checked={quality === "medium"}
                            onChange={handleQualityChange}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {t('qualityMedium') || "Medium (Balanced quality and size)"}
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="quality"
                            value="high"
                            checked={quality === "high"}
                            onChange={handleQualityChange}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {t('qualityHigh') || "High (Best quality, larger file size)"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Bar (when converting) */}
            {isLoading && (
              <div className="my-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {t('converting') || "Converting..."}
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {conversionProgress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 transition-all duration-300 ease-out"
                    style={{ width: `${conversionProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {file && (
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!file || isLoading}
                  className={`px-8 py-3 rounded-md text-lg font-medium transition-colors duration-300 ${
                    !file || isLoading
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-200"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('converting') || "Converting..."}
                    </span>
                  ) : (
                    t('convertFile') || "Convert File"
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Conversion Complete Message */}
          {conversionComplete && (
            <div className={`mt-8 p-4 ${darkMode ? 'bg-green-900 border-green-800' : 'bg-green-100 border-green-300'} border rounded-md text-center transition-colors duration-300 animate-fade-in`}>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-green-200' : 'text-green-800'} mb-2`}>
                {t('conversionComplete') || "Conversion Complete!"}
              </h3>
              <p className={`${darkMode ? 'text-green-300' : 'text-green-700'} mb-4`}>
                {t('fileSuccessfullyConverted') || "Your file has been successfully converted."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={convertedFileUrl}
                  download={`converted-${file?.name?.split('.').slice(0, -1).join('.')}.${format}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
                  onClick={() => trackEvent('Converter', 'Download Converted', `${fileType} to ${format}`)}
                >
                  {t('downloadConvertedFile') || "Download Converted File"}
                </a>
                <button
                  onClick={handleReset}
                  className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} px-6 py-2 rounded-md transition-colors duration-300`}
                >
                  {t('convertAnother') || "Convert Another File"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className={`mt-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-8 transition-colors duration-300`}>
          <h2 className="text-2xl font-bold mb-4">{t('aboutConverter') || "About Our Converter"}</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>
            {t('converterDescription') || "Our media converter allows you to convert various file formats for both video and audio files. Whether you need to convert videos for compatibility with specific devices or extract audio from videos, our tool has you covered."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {t('features') || "Features"}
              </h3>
              <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
                <li>{t('converterFeature1') || "Convert between multiple video and audio formats"}</li>
                <li>{t('converterFeature2') || "Adjust output quality to your needs"}</li>
                <li>{t('converterFeature3') || "Fast conversion process"}</li>
                <li>{t('converterFeature4') || "No software installation required"}</li>
                <li>{t('converterFeature5') || "Free to use"}</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {t('supportedFormats') || "Supported Formats"}
              </h3>
              <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'} space-y-1`}>
                <li>{t('supportedVideo') || "Video: MP4, AVI, MOV, WMV, WEBM, MKV"}</li>
                <li>{t('supportedAudio') || "Audio: MP3, WAV, AAC, OGG, FLAC"}</li>
                <li>{t('supportedMore') || "And many more..."}</li>
              </ul>
            </div>
          </div>

          {/* Share section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {t('shareTitle') || "Share This Tool"}
            </h3>
            <ShareButtons
              url={window.location.href}
              title={`${t('appName')} - ${t('converter')}`}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Converter;
