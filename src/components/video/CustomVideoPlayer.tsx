"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Loader2,
  Tv,
  SkipBack,
  SkipForward,
} from "lucide-react";

type CustomVideoPlayerProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  className?: string;
};

export default function CustomVideoPlayer({
  src,
  poster = "",
  autoPlay = false,
  className = "",
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastVolume, setLastVolume] = useState(1);
  const [flashIcon, setFlashIcon] = useState<"play" | "pause" | null>(null);

  // ────────────────────────────────────────────────────────────
  // Auto-hide controls after 2.5 s of no mouse activity
  // ────────────────────────────────────────────────────────────
  const scheduleHide = useCallback((playing: boolean, dragging: boolean) => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (playing && !dragging) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSpeedMenu(false);
      }, 2500);
    }
  }, []);

  const resetControls = useCallback(() => {
    setShowControls(true);
    scheduleHide(isPlaying, isDragging);
  }, [isPlaying, isDragging, scheduleHide]);

  useEffect(() => () => {
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
  }, []);

  // ────────────────────────────────────────────────────────────
  // Helpers
  // ────────────────────────────────────────────────────────────
  const fmt = (t: number) => {
    if (!t || isNaN(t)) return "0:00";
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = Math.floor(t % 60);
    const pad = (n: number) => String(n).padStart(2, "0");
    return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
  };

  const flash = (icon: "play" | "pause") => {
    setFlashIcon(icon);
    setTimeout(() => setFlashIcon(null), 600);
  };

  // ────────────────────────────────────────────────────────────
  // Play / Pause
  // ────────────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      flash("play");
    } else {
      v.pause();
      flash("pause");
    }
    resetControls();
  }, [resetControls]);

  // ────────────────────────────────────────────────────────────
  // Volume
  // ────────────────────────────────────────────────────────────
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isMuted) {
      v.muted = false;
      v.volume = lastVolume;
      setVolume(lastVolume);
      setIsMuted(false);
    } else {
      setLastVolume(volume);
      v.muted = true;
      v.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume, lastVolume]);

  // ────────────────────────────────────────────────────────────
  // Fullscreen
  // ────────────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // ────────────────────────────────────────────────────────────
  // Playback Speed
  // ────────────────────────────────────────────────────────────
  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSpeedMenu(false);
  };

  // ────────────────────────────────────────────────────────────
  // Picture-in-Picture
  // ────────────────────────────────────────────────────────────
  const togglePip = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await v.requestPictureInPicture();
      }
    } catch {}
  };

  // ────────────────────────────────────────────────────────────
  // Seek helpers
  // ────────────────────────────────────────────────────────────
  const seek = (delta: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.currentTime + delta, duration));
    resetControls();
  };

  // ────────────────────────────────────────────────────────────
  // Progress bar
  // ────────────────────────────────────────────────────────────
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) videoRef.current.currentTime = val;
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
    setHoverTime(pos * duration);
    setHoverX(e.clientX - rect.left);
  };

  // ────────────────────────────────────────────────────────────
  // Keyboard shortcuts
  // ────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      switch (e.code) {
        case "Space": e.preventDefault(); togglePlay(); break;
        case "ArrowRight": e.preventDefault(); seek(10); break;
        case "ArrowLeft": e.preventDefault(); seek(-10); break;
        case "ArrowUp":
          e.preventDefault();
          setVolume((v) => {
            const next = Math.min(v + 0.1, 1);
            if (videoRef.current) videoRef.current.volume = next;
            return next;
          });
          resetControls();
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume((v) => {
            const next = Math.max(v - 0.1, 0);
            if (videoRef.current) videoRef.current.volume = next;
            return next;
          });
          resetControls();
          break;
        case "KeyF": e.preventDefault(); toggleFullscreen(); break;
        case "KeyM": e.preventDefault(); toggleMute(); break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePlay, toggleFullscreen, toggleMute, seek, resetControls]);

  // ────────────────────────────────────────────────────────────
  // Derived values
  // ────────────────────────────────────────────────────────────
  const progressPct = duration ? (currentTime / duration) * 100 : 0;
  const volumePct = isMuted ? 0 : volume * 100;

  const SPEEDS = [0.5, 1, 1.25, 1.5, 2];

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControls}
      onMouseLeave={() => { if (isPlaying) { setShowControls(false); setShowSpeedMenu(false); } }}
      className={`group relative overflow-hidden bg-black aspect-video select-none rounded-2xl border border-white/5 shadow-2xl ${className}`}
    >
      {/* ── Video element ── */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        onClick={togglePlay}
        onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
        onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => { setIsBuffering(false); setIsPlaying(true); scheduleHide(true, isDragging); }}
        onPause={() => { setIsPlaying(false); setShowControls(true); if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current); }}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* ── Buffering spinner ── */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <Loader2 className="w-14 h-14 text-primary animate-spin" />
        </div>
      )}

      {/* ── Play / Pause flash ── */}
      {flashIcon && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-black/50 backdrop-blur-md p-6 rounded-full text-white opacity-90 transition-opacity">
            {flashIcon === "play"
              ? <Play size={44} fill="currentColor" />
              : <Pause size={44} fill="currentColor" />
            }
          </div>
        </div>
      )}

      {/* ── Bottom gradient + controls ── */}
      <div className={`absolute inset-0  from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`} />

      <div className={`absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10 flex flex-col gap-3 transition-all duration-300 z-30 ${showControls ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"}`}>

        {/* ── Progress bar ── */}
        <div className="relative flex items-center w-full group/bar">
          {/* Hover timestamp tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-8 bg-black/80 border border-white/10 px-2 py-1 rounded-md text-xs font-bold text-white pointer-events-none -translate-x-1/2 whitespace-nowrap z-50"
              style={{ left: `${hoverX}px` }}
            >
              {fmt(hoverTime)}
            </div>
          )}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            step={0.1}
            onChange={handleProgressChange}
            onMouseMove={handleProgressHover}
            onMouseLeave={() => setHoverTime(null)}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => { setIsDragging(false); scheduleHide(isPlaying, false); }}
            className="w-full h-1.5 group-hover/bar:h-2.5 rounded-full appearance-none cursor-pointer outline-none transition-all duration-150"
            style={{
              background: `linear-gradient(to right, #e50914 ${progressPct}%, rgba(255,255,255,0.25) ${progressPct}%)`,
            }}
          />
        </div>

        {/* ── Controls row ── */}
        <div className="flex items-center justify-between text-white">

          {/* LEFT group */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Rewind 10 s */}
            <button onClick={() => seek(-10)} className="hover:text-primary transition-colors active:scale-90 outline-none hidden sm:block" title="Rewind 10s">
              <SkipBack size={20} />
            </button>

            {/* Play / Pause */}
            <button onClick={togglePlay} className="hover:text-primary transition-colors active:scale-90 outline-none">
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
            </button>

            {/* Forward 10 s */}
            <button onClick={() => seek(10)} className="hover:text-primary transition-colors active:scale-90 outline-none hidden sm:block" title="Forward 10s">
              <SkipForward size={20} />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/vol">
              <button onClick={toggleMute} className="hover:text-primary transition-colors outline-none">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-0 group-hover/vol:w-20 overflow-hidden transition-all duration-300 h-1 rounded-full appearance-none cursor-pointer outline-none"
                style={{
                  background: `linear-gradient(to right, #e50914 ${volumePct}%, rgba(255,255,255,0.3) ${volumePct}%)`,
                }}
              />
            </div>

            {/* Timestamp */}
            <span className="text-xs md:text-sm font-semibold text-white/80 tabular-nums tracking-wide">
              {fmt(currentTime)}
              <span className="mx-1 text-white/40">/</span>
              {fmt(duration)}
            </span>
          </div>

          {/* RIGHT group */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Speed selector */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu((p) => !p)}
                className="text-xs font-bold border border-white/25 hover:border-primary hover:text-primary px-2 py-0.5 rounded-md transition-all outline-none"
              >
                {playbackRate}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-card/95 border border-white/10 rounded-xl overflow-hidden shadow-2xl w-20 z-50">
                  {SPEEDS.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => changeSpeed(rate)}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-primary hover:text-white transition ${
                        playbackRate === rate ? "text-primary" : "text-white/80"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PiP */}
            <button onClick={togglePip} className="hover:text-primary transition-colors outline-none hidden sm:block" title="Picture in Picture">
              <Tv size={20} />
            </button>

            {/* Fullscreen */}
            <button onClick={toggleFullscreen} className="hover:text-primary transition-colors active:scale-90 outline-none">
              {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
