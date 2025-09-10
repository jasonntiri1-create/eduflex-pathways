import { useCallback, useEffect, useState } from 'react';

type VibrationPattern = number | number[];

interface VibrationConfig {
  achievement: number[];
  bookmark: number[];
  premium: number[];
  completion: number[];
  notification: number[];
}

export const useMobileVibration = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor;
      const isMobileDevice = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  // Vibration patterns for different events
  const patterns: VibrationConfig = {
    achievement: [200, 100, 200], // Double pulse for achievements
    bookmark: [100], // Short pulse for bookmarks
    premium: [150, 50, 150], // Premium unlock pattern
    completion: [300], // Long pulse for completions
    notification: [50], // Gentle tap for notifications
  };

  const vibrate = useCallback((
    type: keyof VibrationConfig | VibrationPattern,
    force = false
  ) => {
    // Only vibrate on mobile devices unless forced
    if (!isMobile && !force) return;
    
    // Check if vibration is enabled
    if (!isEnabled) return;

    // Check if vibration API is supported
    if (!navigator.vibrate) return;

    try {
      let pattern: VibrationPattern;
      
      if (typeof type === 'string') {
        pattern = patterns[type];
      } else {
        pattern = type;
      }

      navigator.vibrate(pattern);
      
      // Log vibration event for debugging
      console.log(`[EduFlex] Vibration triggered: ${type}`, pattern);
    } catch (error) {
      console.warn('[EduFlex] Vibration failed:', error);
    }
  }, [isMobile, isEnabled, patterns]);

  // Convenience methods for common actions
  const vibrationActions = {
    earnXP: () => vibrate('achievement'),
    saveBookmark: () => vibrate('bookmark'),
    unlockPremium: () => vibrate('premium'),
    completeModule: () => vibrate('completion'),
    receiveNotification: () => vibrate('notification'),
  };

  return {
    ...vibrationActions,
    vibrate,
    isEnabled,
    setIsEnabled,
    isMobile,
    patterns,
  };
};