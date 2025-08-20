export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface Position {
  top: string;
  left: string;
  width: string;
  height: string;
}

export type ResponsivePosition = {
  [key in DeviceType]: Position;
};

export enum ElementActionType {
  Navigate = 'NAVIGATE',
  OpenModal = 'OPEN_MODAL',
  ShowElement = 'SHOW_ELEMENT',
  HideElement = 'HIDE_ELEMENT',
  Spotlight = 'SPOTLIGHT',
  PanZoom = 'PAN_ZOOM',
  ResetView = 'RESET_VIEW',
}

export enum SlideElementType {
  Hotspot = 'hotspot',
  Text = 'text',
  Image = 'image',
  Button = 'button',
}

export enum ModalContentType {
  Video = 'video',
  Quiz = 'quiz',
  TextInfo = 'textInfo',
}

export interface BaseAction<T, P> {
    type: T;
    payload: P;
}

export type NavigateAction = BaseAction<ElementActionType.Navigate, { slideId: string }>;
export type OpenModalAction = BaseAction<ElementActionType.OpenModal, { content: ModalContent }>;
export type ShowElementAction = BaseAction<ElementActionType.ShowElement, { elementId: string }>;
export type HideElementAction = BaseAction<ElementActionType.HideElement, { elementId: string }>;

export interface SpotlightActionPayload {
    position: ResponsivePosition;
}
export type SpotlightAction = BaseAction<ElementActionType.Spotlight, SpotlightActionPayload>;

export interface PanZoomActionPayload {
    elementId: string;
    zoom: number;
    banner: {
        text: string;
        position: 'top' | 'bottom';
    };
}
export type PanZoomAction = BaseAction<ElementActionType.PanZoom, PanZoomActionPayload>;

export type ResetViewAction = BaseAction<ElementActionType.ResetView, Record<string, unknown>>;


export type ElementAction = 
    | NavigateAction 
    | OpenModalAction 
    | ShowElementAction 
    | HideElementAction
    | SpotlightAction
    | PanZoomAction
    | ResetViewAction;

export interface ElementInteraction {
  trigger: 'onClick';
  action: ElementAction;
}

export interface BaseSlideElement {
  id: string;
  type: SlideElementType;
  position: ResponsivePosition;
  interaction?: ElementInteraction;
  initiallyVisible?: boolean;
}

export interface HotspotElement extends BaseSlideElement {
  type: SlideElementType.Hotspot;
  content: {
    pulseColor?: string;
  };
}

export interface TextElement extends BaseSlideElement {
  type: SlideElementType.Text;
  content: {
    text: string;
    fontSize: ResponsiveValue<string>;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface ImageElement extends BaseSlideElement {
  type: SlideElementType.Image;
  content: {
    src: string;
    alt: string;
  };
}

export interface ButtonElement extends BaseSlideElement {
    type: SlideElementType.Button;
    content: {
        text: string;
    };
}

export type SlideElement = HotspotElement | TextElement | ImageElement | ButtonElement;

export interface VideoModalContent {
  type: ModalContentType.Video;
  src: string;
  title: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}
  
export interface QuizModalContent {
    type: ModalContentType.Quiz;
    title: string;
    questions: QuizQuestion[];
}

export interface TextInfoModalContent {
    type: ModalContentType.TextInfo;
    title: string;
    text: string;
}

export type ModalContent = VideoModalContent | QuizModalContent | TextInfoModalContent;

export interface InteractiveSlide {
  id: string;
  title: string;
  background: {
    type: 'color' | 'image';
    value: string;
  };
  elements: SlideElement[];
}

export interface SlideDeck {
  id: string;
  title: string;
  description: string;
  slides: InteractiveSlide[];
}

export type ResponsiveValue<T> = {
    [key in DeviceType]: T;
};
