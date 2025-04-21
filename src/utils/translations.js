/**
 * Translations for multi-language support
 */

const translations = {
  // English (default)
  en: {
    // Common/Navigation
    appName: "MS Downloader",
    home: "Home",
    downloader: "Downloader",
    converter: "Converter",
    about: "About",
    faq: "FAQs",
    contact: "Contact",
    terms: "Terms",
    privacy: "Privacy",

    // Home page
    heroTitle: "Download <orange>Videos & Audio</orange> Instantly",
    heroSubtitle: "Convert videos into your desired format in just a few clicks!",
    downloadButton: "Download",
    pasteLink: "Paste the video link here...",
    supportedSites: "Supported Websites",
    outputFormats: "Output Formats",
    customerSupport: "Customer Support",
    readyToDownload: "Ready to <orange>Download</orange>?",
    startDownloading: "Start downloading your favorite videos in seconds – no registration required!",
    getStartedNow: "Get Started Now",

    // Downloader page
    enterUrl: "Enter the URL of the video you want to download",
    validUrl: "Please enter a valid URL",
    downloading: "Downloading...",
    downloaded: "Downloaded",
    download: "Download",
    videoTab: "Video",
    audioTab: "Audio",
    historyTab: "History",
    recentDownloads: "Recent Downloads",
    noHistoryAvailable: "No download history available",

    // Format information
    quickTips: "Quick Tips",
    tipHighQuality: "For best quality, choose the highest resolution available (1080p or higher)",
    tipAudioOnly: "Audio-only downloads are perfect for music videos and podcasts",
    tipFormats: "Some formats may not be available for all videos",
    tipHistory: "Your download history is stored locally on your device",

    // How to use
    howToUse: "How to Use",
    step1Title: "Paste Video Link",
    step1Desc: "Copy the URL of the video you want to download from any supported platform.",
    step2Title: "Choose Format",
    step2Desc: "Select your preferred quality and format for the download.",
    step3Title: "Download",
    step3Desc: "Click the download button and save your file.",

    // Error messages
    errorGeneric: "Something went wrong. Please try again.",
    errorInvalidUrl: "Please enter a valid video URL.",
    errorFetchFailed: "Failed to fetch video information. Please check the URL and try again.",
    errorEmptyUrl: "Please enter a URL to proceed.",
    errorClipboard: "Failed to read clipboard contents. Please paste the URL manually.",

    // Cookie consent
    cookieTitle: "Cookie Notice",
    cookieMessage: "We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
    acceptAll: "Accept All",
    customize: "Customize",
    necessaryOnly: "Necessary Only",
    preferencesTitle: "Cookie Preferences",
    savePreferences: "Save Preferences",
    rejectAll: "Reject All",

    // Cookie categories
    necessaryCookies: "Necessary Cookies",
    necessaryCookiesDesc: "These cookies are essential for the website to function properly.",
    analyticsCookies: "Analytics Cookies",
    analyticsCookiesDesc: "These cookies allow us to count visits and traffic sources, so we can measure and improve the performance of our site.",
    marketingCookies: "Marketing Cookies",
    marketingCookiesDesc: "These cookies help us show you relevant advertisements and promotions.",
    preferenceCookies: "Preference Cookies",
    preferenceCookiesDesc: "These cookies remember your preferences like dark mode and download history.",

    // PWA related
    installApp: "Install App",
    installing: "Installing...",
    installTitle: "Install MS Downloader on your device for faster access and offline capabilities!",
    installSuccess: "App successfully installed! You can now access it from your home screen.",
    installError: "There was an error installing the app. Please try again later.",

    // Offline messages
    offline: "You are currently offline. Some features may be unavailable.",
    backOnline: "You're back online! All features are now available.",

    // Feedback
    feedbackTitle: "Help Us Improve",
    feedbackQuestion: "How would you rate your experience?",
    feedbackSubmit: "Submit Feedback",
    feedbackThankYou: "Thank you for your feedback!",
    feedbackComment: "Additional comments (optional)",

    // Share
    shareTitle: "Share This Tool",
    shareVia: "Share via",
    copyLink: "Copy Link",
    linkCopied: "Link copied to clipboard!",

    // Testimonials
    testimonials: "What Our Users Say",

    // Features
    features: "Key Features",
    featureNoAds: "No Ads or Popups",
    featureUnlimited: "Unlimited Downloads",
    featureHighQuality: "High-Quality Formats",
    featureFast: "Fast & Easy to Use",

    // Affiliate
    affiliateTitle: "Recommended Tools",
    affiliateDesc: "Tools we recommend to enhance your video experience",

    // Donation
    supportUs: "Support Us",
    buyMeCoffee: "Buy Me a Coffee",
    donateDesc: "Help us keep this tool free and ad-free",

    // Batch Downloader
    batchTitle: "Batch Video Downloader",
    batchHeroTitle: "Download <orange>Multiple Videos</orange> At Once",
    batchHeroSubtitle: "Save time by processing multiple video downloads in a single batch operation",
    batchInputLabel: "Enter Video URLs",
    batchInputPlaceholder: "Enter one URL per line...",
    batchAddToQueue: "Add to Queue",
    batchProcessing: "Processing...",
    batchImportFromFile: "Import from File",
    batchQueue: "Download Queue",
    batchItems: "Items",
    batchDownloadAll: "Download All",
    batchClearAll: "Clear All",
    batchPending: "Pending",
    batchCompleted: "Completed",
    batchError: "Failed",
    batchDownload: "Download",
    batchRetry: "Retry",
    batchRemove: "Remove",
    batchGenericError: "Error processing this item",
    batchStatusPending: "Pending",
    batchStatusProcessing: "Processing",
    batchStatusCompleted: "Completed",
    batchStatusError: "Error",
    batchFeatures: "Batch Downloader Features",
    batchFeature1Title: "Bulk Processing",
    batchFeature1Desc: "Process hundreds of videos at once with our efficient batch processing engine",
    batchFeature2Title: "Time Saving",
    batchFeature2Desc: "Save hours of manual work by automating your download workflow",
    batchFeature3Title: "Secure Downloads",
    batchFeature3Desc: "All your downloads are processed securely and privately",
    batchHowToUse: "How to Use Batch Downloader",
    batchStep1Title: "Enter URLs",
    batchStep1Desc: "Enter video URLs one per line or import from a text file",
    batchStep2Title: "Select Format",
    batchStep2Desc: "Choose your preferred quality and format for all videos",
    batchStep3Title: "Process & Download",
    batchStep3Desc: "Add to queue and download all processed videos with one click",
    hidePreview: "Hide Preview",
    showPreview: "Show Preview",
    downloads: "Downloads and Counting",
    joinCommunity: "Join our growing community of satisfied users who trust MS Downloader for all their video downloading needs.",
    unknownTitle: "Unknown Title",
    unknownAuthor: "Unknown Author",
    unknownDuration: "Unknown Duration",
    noVideoOptions: "No video options available",
    noAudioOptions: "No audio options available",
    batchValidLinks: "valid links",
    batchInvalidLinks: "invalid links",
    batchErrorMessage: "Failed to fetch video information",
    batchOverallProgress: "overall progress",

    // CPA Locker / Unlock
    unlock: "Unlock Download",

    // Converter
    converterSubtitle: "Convert your media files to different formats with ease",
    dropFileHere: "Drag and drop your file here, or click to browse",
    browseFiles: "Browse Files",
    outputFormat: "Output Format",
    outputQuality: "Output Quality",
    selectFormat: "Select Format",
    selectQuality: "Select Quality",
    video: "Video",
    audio: "Audio",
    qualityLow: "Low (Faster conversion, smaller file size)",
    qualityMedium: "Medium (Balanced quality and size)",
    qualityHigh: "High (Best quality, larger file size)",
    converting: "Converting...",
    convertFile: "Convert File",
    conversionComplete: "Conversion Complete!",
    fileSuccessfullyConverted: "Your file has been successfully converted.",
    downloadConvertedFile: "Download Converted File",
    convertAnother: "Convert Another File",
    removeFile: "Remove File",
    aboutConverter: "About Our Converter",
    converterDescription: "Our media converter allows you to convert various file formats for both video and audio files. Whether you need to convert videos for compatibility with specific devices or extract audio from videos, our tool has you covered.",
    converterFeature1: "Convert between multiple video and audio formats",
    converterFeature2: "Adjust output quality to your needs",
    converterFeature3: "Fast conversion process",
    converterFeature4: "No software installation required",
    converterFeature5: "Free to use",
    supportedFormats: "Supported Formats",
    supportedVideo: "Video: MP4, AVI, MOV, WMV, WEBM, MKV",
    supportedAudio: "Audio: MP3, WAV, AAC, OGG, FLAC",
    supportedMore: "And many more...",
  },

  // Spanish
  es: {
    // Common/Navigation
    appName: "MS Downloader",
    home: "Inicio",
    downloader: "Descargador",
    converter: "Convertidor",
    about: "Acerca de",
    faq: "Preguntas",
    contact: "Contacto",
    terms: "Términos",
    privacy: "Privacidad",

    // Home page
    heroTitle: "Descarga <orange>Videos y Audio</orange> al Instante",
    heroSubtitle: "Convierte videos a tu formato deseado en solo unos clics!",
    downloadButton: "Descargar",
    pasteLink: "Pega el enlace del video aquí...",
    supportedSites: "Sitios Compatibles",
    outputFormats: "Formatos de Salida",
    customerSupport: "Atención al Cliente",
    readyToDownload: "¿Listo para <orange>Descargar</orange>?",
    startDownloading: "Comienza a descargar tus videos favoritos en segundos - sin registro requerido!",
    getStartedNow: "Comenzar Ahora",

    // Downloader page
    enterUrl: "Ingresa la URL del video que quieres descargar",
    validUrl: "Por favor ingresa una URL válida",
    downloading: "Descargando...",
    downloaded: "Descargado",
    download: "Descargar",
    videoTab: "Video",
    audioTab: "Audio",
    historyTab: "Historial",
    recentDownloads: "Descargas Recientes",
    noHistoryAvailable: "No hay historial de descargas disponible",

    // Format information
    quickTips: "Consejos Rápidos",
    tipHighQuality: "Para mejor calidad, elige la resolución más alta disponible (1080p o superior)",
    tipAudioOnly: "Las descargas de solo audio son perfectas para videos musicales y podcasts",
    tipFormats: "Algunos formatos pueden no estar disponibles para todos los videos",
    tipHistory: "Tu historial de descargas se almacena localmente en tu dispositivo",

    // How to use
    howToUse: "Cómo Usar",
    step1Title: "Pegar Enlace de Video",
    step1Desc: "Copia la URL del video que deseas descargar de cualquier plataforma compatible.",
    step2Title: "Elegir Formato",
    step2Desc: "Selecciona tu calidad y formato preferidos para la descarga.",
    step3Title: "Descargar",
    step3Desc: "Haz clic en el botón de descarga y guarda tu archivo.",

    // Error messages
    errorGeneric: "Algo salió mal. Por favor, inténtalo de nuevo.",
    errorInvalidUrl: "Por favor ingresa una URL de video válida.",
    errorFetchFailed: "No se pudo obtener la información del video. Por favor verifica la URL e inténtalo de nuevo.",
    errorEmptyUrl: "Por favor ingresa una URL para continuar.",
    errorClipboard: "No se pudo leer el contenido del portapapeles. Por favor pega la URL manualmente.",

    // Cookie consent
    cookieTitle: "Aviso de Cookies",
    cookieMessage: "Utilizamos cookies para mejorar tu experiencia de navegación, mostrar anuncios o contenido personalizado y analizar nuestro tráfico. Al hacer clic en \"Aceptar Todo\", consientes el uso de cookies.",
    acceptAll: "Aceptar Todo",
    customize: "Personalizar",
    necessaryOnly: "Solo Necesarias",
    preferencesTitle: "Preferencias de Cookies",
    savePreferences: "Guardar Preferencias",
    rejectAll: "Rechazar Todo",

    // Cookie categories
    necessaryCookies: "Cookies Necesarias",
    necessaryCookiesDesc: "Estas cookies son esenciales para que el sitio web funcione correctamente.",
    analyticsCookies: "Cookies Analíticas",
    analyticsCookiesDesc: "Estas cookies nos permiten contar visitas y fuentes de tráfico, para medir y mejorar el rendimiento de nuestro sitio.",
    marketingCookies: "Cookies de Marketing",
    marketingCookiesDesc: "Estas cookies nos ayudan a mostrarte anuncios y promociones relevantes.",
    preferenceCookies: "Cookies de Preferencias",
    preferenceCookiesDesc: "Estas cookies recuerdan tus preferencias como el modo oscuro y el historial de descargas.",

    // PWA related
    installApp: "Instalar App",
    installing: "Instalando...",
    installTitle: "¡Instala MS Downloader en tu dispositivo para un acceso más rápido y capacidades sin conexión!",
    installSuccess: "¡Aplicación instalada correctamente! Ahora puedes acceder desde tu pantalla de inicio.",
    installError: "Hubo un error al instalar la aplicación. Por favor, inténtalo más tarde.",

    // Offline messages
    offline: "Actualmente estás sin conexión. Algunas funciones pueden no estar disponibles.",
    backOnline: "¡Estás de vuelta en línea! Todas las funciones ya están disponibles.",

    // Feedback
    feedbackTitle: "Ayúdanos a Mejorar",
    feedbackQuestion: "¿Cómo calificarías tu experiencia?",
    feedbackSubmit: "Enviar Comentarios",
    feedbackThankYou: "¡Gracias por tus comentarios!",
    feedbackComment: "Comentarios adicionales (opcional)",

    // Share
    shareTitle: "Compartir Esta Herramienta",
    shareVia: "Compartir vía",
    copyLink: "Copiar Enlace",
    linkCopied: "¡Enlace copiado al portapapeles!",

    // Testimonials
    testimonials: "Lo Que Dicen Nuestros Usuarios",

    // Features
    features: "Características Principales",
    featureNoAds: "Sin Anuncios ni Ventanas Emergentes",
    featureUnlimited: "Descargas Ilimitadas",
    featureHighQuality: "Formatos de Alta Calidad",
    featureFast: "Rápido y Fácil de Usar",

    // Affiliate
    affiliateTitle: "Herramientas Recomendadas",
    affiliateDesc: "Herramientas que recomendamos para mejorar tu experiencia con videos",

    // Donation
    supportUs: "Apóyanos",
    buyMeCoffee: "Invítame un Café",
    donateDesc: "Ayúdanos a mantener esta herramienta gratuita y sin anuncios",

    // Batch Downloader
    batchTitle: "Descargador de Videos por Lotes",
    batchHeroTitle: "Descarga <orange>Múltiples Videos</orange> a la Vez",
    batchHeroSubtitle: "Ahorra tiempo procesando múltiples descargas de videos en una sola operación por lotes",
    batchInputLabel: "Introduce URLs de Videos",
    batchInputPlaceholder: "Introduce una URL por línea...",
    batchAddToQueue: "Añadir a la Cola",
    batchProcessing: "Procesando...",
    batchImportFromFile: "Importar desde Archivo",
    batchQueue: "Cola de Descargas",
    batchItems: "Elementos",
    batchDownloadAll: "Descargar Todo",
    batchClearAll: "Limpiar Todo",
    batchPending: "Pendientes",
    batchCompleted: "Completados",
    batchError: "Fallidos",
    batchDownload: "Descargar",
    batchRetry: "Reintentar",
    batchRemove: "Eliminar",
    batchGenericError: "Error al procesar este elemento",
    batchStatusPending: "Pendiente",
    batchStatusProcessing: "Procesando",
    batchStatusCompleted: "Completado",
    batchStatusError: "Error",
    batchFeatures: "Características del Descargador por Lotes",
    batchFeature1Title: "Procesamiento Masivo",
    batchFeature1Desc: "Procesa cientos de videos a la vez con nuestro eficiente motor de procesamiento por lotes",
    batchFeature2Title: "Ahorro de Tiempo",
    batchFeature2Desc: "Ahorra horas de trabajo manual automatizando tu flujo de descargas",
    batchFeature3Title: "Descargas Seguras",
    batchFeature3Desc: "Todas tus descargas se procesan de forma segura y privada",
    batchHowToUse: "Cómo Usar el Descargador por Lotes",
    batchStep1Title: "Introduce URLs",
    batchStep1Desc: "Introduce las URLs de videos una por línea o importa desde un archivo de texto",
    batchStep2Title: "Selecciona Formato",
    batchStep2Desc: "Elige tu calidad y formato preferidos para todos los videos",
    batchStep3Title: "Procesa y Descarga",
    batchStep3Desc: "Añade a la cola y descarga todos los videos procesados con un solo clic",
    hidePreview: "Ocultar Vista Previa",
    showPreview: "Mostrar Vista Previa",
    downloads: "Descargas y Contando",
    joinCommunity: "Únete a nuestra creciente comunidad de usuarios satisfechos que confían en MS Downloader para todas sus necesidades de descarga de videos.",
    unknownTitle: "Título Desconocido",
    unknownAuthor: "Autor Desconocido",
    unknownDuration: "Duración Desconocida",
    noVideoOptions: "No hay opciones de video disponibles",
    noAudioOptions: "No hay opciones de audio disponibles",
    batchValidLinks: "enlaces válidos",
    batchInvalidLinks: "enlaces inválidos",
    batchErrorMessage: "No se pudo obtener la información del video",
    batchOverallProgress: "progreso general",

    // CPA Locker / Unlock
    unlock: "Desbloquear Descarga",

    // Converter
    converterSubtitle: "Convierte tus archivos multimedia a diferentes formatos con facilidad",
    dropFileHere: "Arrastra y suelta tu archivo aquí, o haz clic para navegar",
    browseFiles: "Explorar Archivos",
    outputFormat: "Formato de Salida",
    outputQuality: "Calidad de Salida",
    selectFormat: "Seleccionar Formato",
    selectQuality: "Seleccionar Calidad",
    video: "Video",
    audio: "Audio",
    qualityLow: "Baja (Conversión más rápida, tamaño de archivo más pequeño)",
    qualityMedium: "Media (Calidad y tamaño equilibrados)",
    qualityHigh: "Alta (Mejor calidad, tamaño de archivo más grande)",
    converting: "Convirtiendo...",
    convertFile: "Convertir Archivo",
    conversionComplete: "¡Conversión Completa!",
    fileSuccessfullyConverted: "Tu archivo ha sido convertido exitosamente.",
    downloadConvertedFile: "Descargar Archivo Convertido",
    convertAnother: "Convertir Otro Archivo",
    removeFile: "Eliminar Archivo",
    aboutConverter: "Acerca de Nuestro Convertidor",
    converterDescription: "Nuestro convertidor de medios te permite convertir varios formatos de archivo tanto para videos como para archivos de audio. Ya sea que necesites convertir videos para compatibilidad con dispositivos específicos o extraer audio de videos, nuestra herramienta te tiene cubierto.",
    converterFeature1: "Convierte entre múltiples formatos de video y audio",
    converterFeature2: "Ajusta la calidad de salida según tus necesidades",
    converterFeature3: "Proceso de conversión rápido",
    converterFeature4: "No requiere instalación de software",
    converterFeature5: "Gratis para usar",
    supportedFormats: "Formatos Soportados",
    supportedVideo: "Video: MP4, AVI, MOV, WMV, WEBM, MKV",
    supportedAudio: "Audio: MP3, WAV, AAC, OGG, FLAC",
    supportedMore: "Y muchos más...",
  },

  // French
  fr: {
    // Common/Navigation
    appName: "MS Downloader",
    home: "Accueil",
    downloader: "Téléchargeur",
    converter: "Convertisseur",
    about: "À Propos",
    faq: "FAQ",
    contact: "Contact",
    terms: "Conditions",
    privacy: "Confidentialité",

    // Home page
    heroTitle: "Téléchargez <orange>Vidéos & Audio</orange> Instantanément",
    heroSubtitle: "Convertissez des vidéos dans votre format préféré en quelques clics !",
    downloadButton: "Télécharger",
    pasteLink: "Collez le lien de la vidéo ici...",
    supportedSites: "Sites Supportés",
    outputFormats: "Formats de Sortie",
    customerSupport: "Support Client",
    readyToDownload: "Prêt à <orange>Télécharger</orange> ?",
    startDownloading: "Commencez à télécharger vos vidéos préférées en quelques secondes - sans inscription requise !",
    getStartedNow: "Commencer Maintenant",

    // Downloader page
    enterUrl: "Entrez l'URL de la vidéo que vous souhaitez télécharger",
    validUrl: "Veuillez entrer une URL valide",
    downloading: "Téléchargement en cours...",
    downloaded: "Téléchargé",
    download: "Télécharger",
    videoTab: "Vidéo",
    audioTab: "Audio",
    historyTab: "Historique",
    recentDownloads: "Téléchargements Récents",
    noHistoryAvailable: "Aucun historique de téléchargement disponible",

    // Format information
    quickTips: "Astuces Rapides",
    tipHighQuality: "Pour une meilleure qualité, choisissez la résolution la plus élevée disponible (1080p ou plus)",
    tipAudioOnly: "Les téléchargements audio sont parfaits pour les clips musicaux et les podcasts",
    tipFormats: "Certains formats peuvent ne pas être disponibles pour toutes les vidéos",
    tipHistory: "Votre historique de téléchargement est stocké localement sur votre appareil",

    // How to use
    howToUse: "Comment Utiliser",
    step1Title: "Coller le Lien Vidéo",
    step1Desc: "Copiez l'URL de la vidéo que vous souhaitez télécharger depuis n'importe quelle plateforme prise en charge.",
    step2Title: "Choisir le Format",
    step2Desc: "Sélectionnez votre qualité et format préférés pour le téléchargement.",
    step3Title: "Télécharger",
    step3Desc: "Cliquez sur le bouton de téléchargement et enregistrez votre fichier.",

    // Error messages
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer.",
    errorInvalidUrl: "Veuillez entrer une URL de vidéo valide.",
    errorFetchFailed: "Impossible de récupérer les informations de la vidéo. Veuillez vérifier l'URL et réessayer.",
    errorEmptyUrl: "Veuillez entrer une URL pour continuer.",
    errorClipboard: "Impossible de lire le contenu du presse-papiers. Veuillez coller l'URL manuellement.",

    // Cookie consent
    cookieTitle: "Avis sur les Cookies",
    cookieMessage: "Nous utilisons des cookies pour améliorer votre expérience de navigation, diffuser des publicités ou du contenu personnalisés et analyser notre trafic. En cliquant sur \"Tout Accepter\", vous consentez à notre utilisation des cookies.",
    acceptAll: "Tout Accepter",
    customize: "Personnaliser",
    necessaryOnly: "Uniquement Nécessaires",
    preferencesTitle: "Préférences de Cookies",
    savePreferences: "Enregistrer les Préférences",
    rejectAll: "Tout Rejeter",

    // Cookie categories
    necessaryCookies: "Cookies Nécessaires",
    necessaryCookiesDesc: "Ces cookies sont essentiels au bon fonctionnement du site web.",
    analyticsCookies: "Cookies Analytiques",
    analyticsCookiesDesc: "Ces cookies nous permettent de compter les visites et les sources de trafic afin de mesurer et d'améliorer les performances de notre site.",
    marketingCookies: "Cookies Marketing",
    marketingCookiesDesc: "Ces cookies nous aident à vous montrer des publicités et des promotions pertinentes.",
    preferenceCookies: "Cookies de Préférences",
    preferenceCookiesDesc: "Ces cookies mémorisent vos préférences comme le mode sombre et l'historique des téléchargements.",

    // PWA related
    installApp: "Installer l'App",
    installing: "Installation...",
    installTitle: "Installez MS Downloader sur votre appareil pour un accès plus rapide et des fonctionnalités hors ligne !",
    installSuccess: "Application installée avec succès ! Vous pouvez maintenant y accéder depuis votre écran d'accueil.",
    installError: "Une erreur s'est produite lors de l'installation de l'application. Veuillez réessayer plus tard.",

    // Offline messages
    offline: "Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être indisponibles.",
    backOnline: "Vous êtes de nouveau en ligne ! Toutes les fonctionnalités sont maintenant disponibles.",

    // Feedback
    feedbackTitle: "Aidez-nous à Améliorer",
    feedbackQuestion: "Comment évalueriez-vous votre expérience ?",
    feedbackSubmit: "Envoyer les Commentaires",
    feedbackThankYou: "Merci pour vos commentaires !",
    feedbackComment: "Commentaires supplémentaires (optionnel)",

    // Share
    shareTitle: "Partager Cet Outil",
    shareVia: "Partager via",
    copyLink: "Copier le Lien",
    linkCopied: "Lien copié dans le presse-papiers !",

    // Testimonials
    testimonials: "Ce Que Disent Nos Utilisateurs",

    // Features
    features: "Fonctionnalités Clés",
    featureNoAds: "Sans Publicités ni Popups",
    featureUnlimited: "Téléchargements Illimités",
    featureHighQuality: "Formats Haute Qualité",
    featureFast: "Rapide et Facile à Utiliser",

    // Affiliate
    affiliateTitle: "Outils Recommandés",
    affiliateDesc: "Outils que nous recommandons pour améliorer votre expérience vidéo",

    // Donation
    supportUs: "Soutenez-nous",
    buyMeCoffee: "Offrez-moi un Café",
    donateDesc: "Aidez-nous à maintenir cet outil gratuit et sans publicité",

    // Batch Downloader
    batchTitle: "Téléchargeur Vidéo par Lots",
    batchHeroTitle: "Téléchargez <orange>Plusieurs Vidéos</orange> à la Fois",
    batchHeroSubtitle: "Gagnez du temps en traitant plusieurs téléchargements vidéo en une seule opération par lots",
    batchInputLabel: "Entrez les URLs des Vidéos",
    batchInputPlaceholder: "Entrez une URL par ligne...",
    batchAddToQueue: "Ajouter à la File",
    batchProcessing: "Traitement...",
    batchImportFromFile: "Importer depuis un Fichier",
    batchQueue: "File d'Attente",
    batchItems: "Éléments",
    batchDownloadAll: "Tout Télécharger",
    batchClearAll: "Tout Effacer",
    batchPending: "En Attente",
    batchCompleted: "Terminés",
    batchError: "Échoués",
    batchDownload: "Télécharger",
    batchRetry: "Réessayer",
    batchRemove: "Supprimer",
    batchGenericError: "Erreur lors du traitement de cet élément",
    batchStatusPending: "En Attente",
    batchStatusProcessing: "Traitement",
    batchStatusCompleted: "Terminé",
    batchStatusError: "Erreur",
    batchFeatures: "Fonctionnalités du Téléchargeur par Lots",
    batchFeature1Title: "Traitement en Masse",
    batchFeature1Desc: "Traitez des centaines de vidéos à la fois avec notre moteur de traitement par lots efficace",
    batchFeature2Title: "Gain de Temps",
    batchFeature2Desc: "Économisez des heures de travail manuel en automatisant votre flux de téléchargement",
    batchFeature3Title: "Téléchargements Sécurisés",
    batchFeature3Desc: "Tous vos téléchargements sont traités de manière sécurisée et privée",
    batchHowToUse: "Comment Utiliser le Téléchargeur par Lots",
    batchStep1Title: "Entrer les URLs",
    batchStep1Desc: "Entrez les URLs des vidéos une par ligne ou importez depuis un fichier texte",
    batchStep2Title: "Sélectionner le Format",
    batchStep2Desc: "Choisissez votre qualité et format préférés pour toutes les vidéos",
    batchStep3Title: "Traiter et Télécharger",
    batchStep3Desc: "Ajoutez à la file d'attente et téléchargez toutes les vidéos traitées en un seul clic",
    hidePreview: "Masquer l'Aperçu",
    showPreview: "Afficher l'Aperçu",
    downloads: "Téléchargements et Plus",
    joinCommunity: "Rejoignez notre communauté croissante d'utilisateurs satisfaits qui font confiance à MS Downloader pour tous leurs besoins de téléchargement vidéo.",
    unknownTitle: "Titre Inconnu",
    unknownAuthor: "Auteur Inconnu",
    unknownDuration: "Durée Inconnue",
    noVideoOptions: "Aucune option vidéo disponible",
    noAudioOptions: "Aucune option audio disponible",
    batchValidLinks: "liens valides",
    batchInvalidLinks: "liens invalides",
    batchErrorMessage: "Impossible de récupérer les informations de la vidéo",
    batchOverallProgress: "progrès général",

    // CPA Locker / Unlock
    unlock: "Débloquer Téléchargement",

    // Converter
    converterSubtitle: "Convertissez vos fichiers multimédias en différents formats en toute simplicité",
    dropFileHere: "Faites glisser et déposez votre fichier ici, ou cliquez pour parcourir",
    browseFiles: "Parcourir les Fichiers",
    outputFormat: "Format de Sortie",
    outputQuality: "Qualité de Sortie",
    selectFormat: "Sélectionner le Format",
    selectQuality: "Sélectionner la Qualité",
    video: "Vidéo",
    audio: "Audio",
    qualityLow: "Basse (Conversion plus rapide, taille de fichier plus petite)",
    qualityMedium: "Moyenne (Équilibre entre qualité et taille)",
    qualityHigh: "Haute (Meilleure qualité, taille de fichier plus grande)",
    converting: "Conversion en cours...",
    convertFile: "Convertir le Fichier",
    conversionComplete: "Conversion Terminée !",
    fileSuccessfullyConverted: "Votre fichier a été converti avec succès.",
    downloadConvertedFile: "Télécharger le Fichier Converti",
    convertAnother: "Convertir un Autre Fichier",
    removeFile: "Supprimer le Fichier",
    aboutConverter: "À Propos de Notre Convertisseur",
    converterDescription: "Notre convertisseur multimédia vous permet de convertir divers formats de fichiers pour les vidéos et les fichiers audio. Que vous ayez besoin de convertir des vidéos pour la compatibilité avec des appareils spécifiques ou d'extraire de l'audio à partir de vidéos, notre outil est là pour vous.",
    converterFeature1: "Conversion entre plusieurs formats vidéo et audio",
    converterFeature2: "Ajustez la qualité de sortie selon vos besoins",
    converterFeature3: "Processus de conversion rapide",
    converterFeature4: "Aucune installation de logiciel requise",
    converterFeature5: "Gratuit à utiliser",
    supportedFormats: "Formats Pris en Charge",
    supportedVideo: "Vidéo: MP4, AVI, MOV, WMV, WEBM, MKV",
    supportedAudio: "Audio: MP3, WAV, AAC, OGG, FLAC",
    supportedMore: "Et bien d'autres...",
  }
};

/**
 * Function to get translations by key with specified language
 * @param {string} key
 * @param {string} language
 * @returns {string}
 */
export const getTranslation = (key, language = 'en') => {
  // If language isn't supported, fall back to English
  const lang = translations[language] ? language : 'en';

  // Get the translation or fallback to the key
  const translation = translations[lang][key] || translations['en'][key] || key;

  // Process special markers like <orange> tags
  return translation.replace(/<orange>(.*?)<\/orange>/g, '<span class="text-orange-500">$1</span>');
};

/**
 * Helper function to parse and render HTML in translations
 * @param {string} key
 * @param {string} language
 * @returns {{__html: string}}
 */
export const renderTranslation = (key, language = 'en') => {
  const translation = getTranslation(key, language);
  return { __html: translation };
};

/**
 * List of available languages
 */
export const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' }
];

export default translations;
