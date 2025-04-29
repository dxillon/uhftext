import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw, RotateCw, Settings, Loader2, Keyboard } from 'lucide-react';
import anime from 'animejs';

interface VideoPlayerProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
  duration: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, isOpen, onClose, duration }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      setProgress(0);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      video.volume = volume;
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [volume]);

  useEffect(() => {
    if (isOpen && !isFullscreen) {
      anime({
        targets: '.video-container',
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo'
      });
    }
  }, [isOpen, isFullscreen]);

  const qualities = ['1080p', '720p', '480p', '260p'];
  const shortcuts = [
    { key: 'Space/K', action: 'Play/Pause' },
    { key: 'M', action: 'Mute/Unmute' },
    { key: 'F', action: 'Toggle Fullscreen' },
    { key: '←', action: 'Backward 10s' },
    { key: '→', action: 'Forward 10s' },
    { key: '↑', action: 'Volume Up' },
    { key: '↓', action: 'Volume Down' },
    { key: 'Esc', action: 'Exit Fullscreen' },
    { key: 'Double Tap Left', action: 'Backward 10s' },
    { key: 'Double Tap Right', action: 'Forward 10s' }
  ];

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (videoRef.current) {
      const newTime = (newProgress / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(newProgress);
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

  const changePlaybackSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowSettings(false);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
        case 'arrowleft':
          skipBackward();
          break;
        case 'arrowright':
          skipForward();
          break;
        case 'arrowup':
          if (videoRef.current) {
            const newVolume = Math.min(1, volume + 0.1);
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(false);
          }
          break;
        case 'arrowdown':
          if (videoRef.current) {
            const newVolume = Math.max(0, volume - 0.1);
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
          }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${isFullscreen ? '' : 'bg-black/80 p-8'}`}
        >
          <div
            ref={containerRef}
            className={`video-container relative ${isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl aspect-video'}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
            onTouchStart={handleTouchStart}
          >
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
            >
              <source src={url} type="video/mp4" />
            </video>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
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

            {showShortcuts && (
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 left-0 right-0 p-4 space-y-2"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-white text-sm">
                  {formatTime(currentTime)} / {duration}
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
                    >
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #EF4444 ${volume * 100}%, rgba(156, 163, 175, 0.2) ${volume * 100}%)`
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowShortcuts(true)}
                    className="text-white hover:text-red-500 transition-colors"
                    title="Keyboard Shortcuts"
                  >
                    <Keyboard className="w-5 h-5" />
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

                  <button
                    onClick={onClose}
                    className="text-white hover:text-red-500 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayer;