import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, RotateCw, Settings, Loader2, Keyboard, PictureInPicture2 } from 'lucide-react';

interface VideoPlayerProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  duration: string;
}

const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) {
    return '00:00';
  }
  
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isOpen, onClose, duration }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPiP, setIsPiP] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

       // Improved orientation handling
    const handleOrientation = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        const isLandscapeNow = window.matchMedia("(orientation: landscape)").matches;
        setIsLandscape(isLandscapeNow);
        
        // Try to lock orientation if not already in landscape
        if (!isLandscapeNow) {
          try {
            // @ts-ignore - TypeScript doesn't know about screen.orientation.lock
            screen.orientation.lock('landscape').catch(() => {});
          } catch (e) {
            console.log("Orientation lock not supported");
          }
        }
      }
    };

      handleOrientation();
      window.addEventListener('orientationchange', handleOrientation);
       window.addEventListener('resize', handleOrientation);

    // Initial check
    handleOrientation();
      
return () => {
      window.removeEventListener('orientationchange', handleOrientation);
      window.removeEventListener('resize', handleOrientation);
      try {
        // @ts-ignore
        screen.orientation?.unlock();
      } catch (e) {
        console.log("Orientation unlock failed");
      }
    };
  } else {
    document.body.style.overflow = '';
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }
  }
}, [isOpen]);

  
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    
    setCurrentTime(video.currentTime);
    const currentProgress = (video.currentTime / video.duration) * 100;
    setProgress(isNaN(currentProgress) ? 0 : currentProgress);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    
    setVideoDuration(video.duration);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const video = videoRef.current;
      if (!video) return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'p':
          togglePiP();
          break;
        case 'arrowleft':
          skipBackward();
          break;
        case 'arrowright':
          skipForward();
          break;
        case 'arrowup':
          const newVolumeUp = Math.min(1, volume + 0.1);
          video.volume = newVolumeUp;
          setVolume(newVolumeUp);
          setIsMuted(false);
          break;
        case 'arrowdown':
          const newVolumeDown = Math.max(0, volume - 0.1);
          video.volume = newVolumeDown;
          setVolume(newVolumeDown);
          setIsMuted(newVolumeDown === 0);
          break;
        case 'escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [volume, isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handlePiPChange = () => {
      setIsPiP(document.pictureInPictureElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('enterpictureinpicture', handlePiPChange);
    document.addEventListener('leavepictureinpicture', handlePiPChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('enterpictureinpicture', handlePiPChange);
      document.removeEventListener('leavepictureinpicture', handlePiPChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

const toggleMute = () => {
  const video = videoRef.current;
  if (!video) return;
  
  if (window.matchMedia("(max-width: 768px)").matches) {
    // On mobile, just toggle slider visibility without muting
    setShowVolumeSlider(!showVolumeSlider);
    return;
  }
  
  // Original desktop behavior
  video.muted = !isMuted;
  setIsMuted(!isMuted);
  if (!isMuted) {
    setVolume(0);
  } else {
    setVolume(1);
    video.volume = 1;
  }
};

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Failed to enter Picture-in-Picture mode:', error);
    }
  };

// 2. Update the volume change handler to ensure unmuting when adjusting
const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const video = videoRef.current;
  if (!video) return;
  
  const newVolume = parseFloat(e.target.value);
  video.volume = newVolume;
  setVolume(newVolume);
  
  // Unmute when adjusting volume
  if (video.muted && newVolume > 0) {
    video.muted = false;
    setIsMuted(false);
  }
  
  // Auto-hide slider after adjustment on mobile
  if (window.matchMedia("(max-width: 768px)").matches) {
    setTimeout(() => setShowVolumeSlider(false), 2000);
  }
};

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    
    const newProgress = parseFloat(e.target.value);
    const newTime = (newProgress / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(newProgress);
    setCurrentTime(newTime);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime += 10;
    setCurrentTime(video.currentTime);
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime -= 10;
    setCurrentTime(video.currentTime);
  };

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    
    if (tapLength < 300 && tapLength > 0) {
      const touchX = e.touches[0].clientX;
      const screenWidth = window.innerWidth;
      
      if (touchX < screenWidth / 2) {
        skipBackward();
      } else {
        skipForward();
      }
    }
    setLastTapTime(currentTime);
  };

  const qualities = ['1080p', '720p', '480p', '260p'];
  const shortcuts = [
    { key: 'Space/K', action: 'Play/Pause' },
    { key: 'M', action: 'Mute/Unmute' },
    { key: 'F', action: 'Toggle Fullscreen' },
    { key: 'P', action: 'Picture in Picture' },
    { key: '←', action: 'Backward 10s' },
    { key: '→', action: 'Forward 10s' },
    { key: '↑', action: 'Volume Up' },
    { key: '↓', action: 'Volume Down' },
    { key: 'Esc', action: 'Exit Fullscreen' },
    { key: 'Double Tap Left', action: 'Backward 10s' },
    { key: 'Double Tap Right', action: 'Forward 10s' }
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? '' : 'bg-black/80'}`}>
      <div
        ref={containerRef}
        className={`video-container relative ${
          isFullscreen || isLandscape
            ? 'w-full h-full'
            : 'w-full max-w-4xl mx-auto aspect-video'
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        onTouchStart={handleTouchStart}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-white hover:text-red-500 transition-colors bg-black/40 p-2 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
          </div>
        )}
        
        <video
          ref={videoRef}
          className="w-full h-full object-contain bg-black"
          autoPlay
          onClick={togglePlay}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        >
          <source src={url} type="video/mp4" />
        </video>

        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none
                     transition-opacity ${showControls ? 'opacity-100' : 'opacity-0'}`}
        />

        {showSettings && (
          <div className="absolute bottom-20 right-4 bg-gray-900/95 rounded-lg shadow-lg p-2 min-w-[200px] backdrop-blur-sm">
            <div className="border-b border-gray-700 pb-2 mb-2">
              <div className="text-sm font-medium text-white px-2">Quality</div>
              {qualities.map((quality) => (
                <button
                  key={quality}
                  onClick={() => {
                    setSelectedQuality(quality);
                    setShowSettings(false);
                  }}
                  className={`block w-full text-left px-4 py-1 text-sm ${
                    selectedQuality === quality ? 'text-red-500' : 'text-white'
                  } hover:bg-gray-800 rounded`}
                >
                  {quality}
                </button>
              ))}
            </div>
            <div>
              <div className="text-sm font-medium text-white px-2">Playback Speed</div>
              {[0.5, 1, 1.5, 2].map((speed) => (
                <button
                  key={speed}
                  onClick={() => changePlaybackSpeed(speed)}
                  className={`block w-full text-left px-4 py-1 text-sm ${
                    playbackSpeed === speed ? 'text-red-500' : 'text-white'
                  } hover:bg-gray-800 rounded`}
                >
                  {speed}x
                </button>
              ))}
            </div>
            
          </div>
        )}

     
        {showShortcuts && !window.matchMedia("(max-width: 768px").matches && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/95 rounded-lg shadow-lg p-4 backdrop-blur-sm max-w-md w-full">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h3 className="text-white font-medium flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Keyboard Shortcuts
              </h3>

              <button
                onClick={() => setShowShortcuts(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            
            </div>
            <div className="grid grid-cols-2 gap-2">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex justify-between items-center p-2 hover:bg-gray-800 rounded">
                  <span className="text-gray-400">{shortcut.action}</span>
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-sm text-white">{shortcut.key}</kbd>
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          className={`absolute bottom-0 left-0 right-0 p-4 pr-6 space-y-2 transition-all ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-white text-sm font-medium">
              {formatTime(currentTime)} / {videoDuration > 0 ? formatTime(videoDuration) : duration}
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #EF4444 ${progress}%, rgba(156, 163, 175, 0.2) ${progress}%)`
            }}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-red-500 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button
                onClick={skipBackward}
                className="text-white hover:text-red-500 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={skipForward}
                className="text-white hover:text-red-500 transition-colors"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-red-500 transition-colors"
                  onTouchEnd={(e) => e.preventDefault()} 
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                 {/* Show volume slider always on desktop, or when showVolumeSlider is true on mobile */}
  {(showVolumeSlider || !window.matchMedia("(max-width: 768px)").matches) && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #EF4444 ${volume * 100}%, rgba(156, 163, 175, 0.2) ${volume * 100}%)`
                  }}
                />
          )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!window.matchMedia("(max-width: 768px)").matches && (
              <button
                onClick={() => setShowShortcuts(true)}
                className="text-white hover:text-red-500 transition-colors"
                title="Keyboard Shortcuts"
              >
                <Keyboard className="w-5 h-5" />
              </button>
            )}

              <button
                onClick={togglePiP}
                className="text-white hover:text-red-500 transition-colors"
                title="Picture in Picture"
              >
                <PictureInPicture2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:text-red-500 transition-colors"
              >
                <Settings className="w-6 h-6" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-red-500 transition-colors"
              >
                {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;