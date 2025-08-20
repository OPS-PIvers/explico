
import { useState, useEffect } from 'react';
import { DeviceType } from '../types';

const TABLET_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

const getDeviceType = (width: number): DeviceType => {
  if (width < TABLET_BREAKPOINT) {
    return 'mobile';
  }
  if (width < DESKTOP_BREAKPOINT) {
    return 'tablet';
  }
  return 'desktop';
};

export const useResponsive = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return deviceType;
};
