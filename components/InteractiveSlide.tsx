
import React from 'react';
import { InteractiveSlide as InteractiveSlideType, DeviceType, ElementInteraction } from '../types';
import SlideElementComponent from './SlideElement';

interface InteractiveSlideProps {
  slide: InteractiveSlideType;
  deviceType: DeviceType;
  onInteract: (interaction: ElementInteraction) => void;
  dynamicElementVisibility: Record<string, boolean>;
}

const InteractiveSlide: React.FC<InteractiveSlideProps> = ({ slide, deviceType, onInteract, dynamicElementVisibility }) => {
  const backgroundStyle: React.CSSProperties =
    slide.background.type === 'image'
      ? { backgroundImage: `url(${slide.background.value})` }
      : { backgroundColor: slide.background.value };

  return (
    <div
      className="w-full h-full relative bg-cover bg-center overflow-hidden"
      style={backgroundStyle}
    >
      {slide.elements.map((element) => (
        <SlideElementComponent
          key={element.id}
          element={element}
          deviceType={deviceType}
          onInteract={onInteract}
          isVisible={dynamicElementVisibility[element.id]}
        />
      ))}
    </div>
  );
};

export default InteractiveSlide;
