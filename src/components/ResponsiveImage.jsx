import { useState, useEffect } from 'react';

/**
 * ResponsiveImage Component
 *
 * A component that renders responsive images with automatic srcset generation for better performance
 * Uses the placeholder loading technique for improved UX
 *
 * @param {Object} props
 * @param {string} props.src - Original image source
 * @param {string} props.alt - Image alt text
 * @param {string} props.className - CSS classes for the image
 * @param {string} props.sizes - Sizes attribute for srcset (e.g. "(max-width: 768px) 100vw, 50vw")
 * @param {string} props.loading - Loading strategy ("lazy" or "eager")
 * @param {Object} props.rest - Additional props to pass to the img element
 */
const ResponsiveImage = ({ src, alt, className, sizes = '100vw', loading = 'lazy', ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isLocalImage, setIsLocalImage] = useState(false);

  useEffect(() => {
    // Reset states when the source changes
    setLoaded(false);
    setError(false);

    // Determine if it's a local image
    setIsLocalImage(src.startsWith('/') || src.startsWith('./') || src.startsWith('../'));
  }, [src]);

  // Generate srcset for local images
  const generateSrcSet = () => {
    if (!isLocalImage) return undefined;

    // For local images, we can generate srcset by assuming different sized versions
    // In a real app, you would have a proper image processing system
    // This is more of a demonstration of the concept

    if (src.includes('?')) {
      // Don't modify URLs that already have query parameters
      return undefined;
    }

    if (src.includes('/svg/') || src.endsWith('.svg')) {
      // SVGs are already resolution-independent
      return undefined;
    }

    const imagePath = src.substring(0, src.lastIndexOf('.'));
    const extension = src.substring(src.lastIndexOf('.'));

    // Generate srcset for standard screen sizes
    // In a real app, these would be real pre-generated images
    return `${imagePath}${extension} 1x,
            ${imagePath}${extension} 2x`;
  };

  // Function to handle image load completion
  const handleLoad = () => {
    setLoaded(true);
  };

  // Function to handle image load errors
  const handleError = () => {
    setError(true);
    console.error(`Failed to load image: ${src}`);
  };

  // Get srcset if applicable
  const srcset = generateSrcSet();

  // Render different states based on loading status
  return (
    <>
      {!loaded && !error && (
        <div
          className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse`}
          style={{ minHeight: '20px' }}
          aria-hidden="true"
        />
      )}

      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'block' : 'hidden'}`}
        sizes={sizes}
        srcSet={srcset}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />

      {error && (
        <div className={`${className} flex items-center justify-center bg-gray-200 dark:bg-gray-700`}>
          <span className="text-sm text-gray-500 dark:text-gray-400">Image not available</span>
        </div>
      )}
    </>
  );
};

export default ResponsiveImage;
