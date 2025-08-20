import React from 'react';
import { SlideElement, DeviceType, ElementInteraction, SlideElementType, HotspotElement, TextElement, ImageElement, ButtonElement } from '../types';

interface SlideElementProps {
  element: SlideElement;
  deviceType: DeviceType;
  onInteract: (interaction: ElementInteraction) => void;
  isVisible: boolean;
}

const SlideElementComponent: React.FC<SlideElementProps> = ({ element, deviceType, onInteract, isVisible }) => {
  const positionStyle = element.position[deviceType];
  
  const baseClasses = "absolute transition-all duration-500 ease-in-out";
  const visibilityClasses = isVisible ? "opacity-100" : "opacity-0 pointer-events-none";

  const renderElementContent = () => {
    switch (element.type) {
      case SlideElementType.Hotspot: {
        const pulseColor = (element as HotspotElement).content.pulseColor || '#ad2122'; // Primary Red
        return (
          <div
            className={`w-full h-full rounded-full animate-pulse-strong cursor-pointer`}
            style={{
              borderColor: pulseColor,
              borderWidth: '2px',
              backgroundColor: `${pulseColor}66` // 40% opacity
            }}
          ></div>
        );
      }
      case SlideElementType.Text: {
        const content = (element as TextElement).content;
        return (
          <p
            style={{ 
              fontSize: content.fontSize[deviceType],
              fontWeight: content.fontWeight || 'normal',
              textAlign: content.textAlign || 'left'
            }}
          >
            {content.text}
          </p>
        );
      }
      case SlideElementType.Image: {
        const content = (element as ImageElement).content;
        return (
          <img
            src={content.src}
            alt={content.alt}
            className="w-full h-full object-contain"
          />
        );
      }
      case SlideElementType.Button: {
        const content = (element as ButtonElement).content;
        return (
            <button className="w-full h-full bg-[#ad2122] hover:bg-[#c13435] text-white font-bold rounded-lg text-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl shadow-black/30">
                {content.text}
            </button>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div
      style={positionStyle}
      className={`${baseClasses} ${visibilityClasses}`}
      onClick={() => element.interaction && onInteract(element.interaction)}
    >
      {renderElementContent()}
    </div>
  );
};

export default SlideElementComponent;