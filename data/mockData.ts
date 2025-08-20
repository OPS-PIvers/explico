import { SlideDeck, SlideElementType, ElementActionType, ModalContentType } from '../types';

export const mockSlideDeck: SlideDeck = {
  id: 'deck-1',
  title: 'AED Defibrillator Training',
  description: 'An interactive guide on how to use an Automated External Defibrillator (AED).',
  slides: [
    {
      id: 'slide-1',
      title: 'Introduction',
      background: { type: 'image', value: 'https://picsum.photos/seed/aedbackground/1600/900' },
      elements: [
        {
          id: 's1-title',
          type: SlideElementType.Text,
          initiallyVisible: true,
          position: {
            desktop: { top: '35%', left: '10%', width: '80%', height: 'auto' },
            tablet: { top: '35%', left: '10%', width: '80%', height: 'auto' },
            mobile: { top: '30%', left: '5%', width: '90%', height: 'auto' },
          },
          content: {
            text: 'AED Defibrillator Training',
            fontSize: { desktop: '4rem', tablet: '3rem', mobile: '2rem' },
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        {
          id: 's1-subtitle',
          type: SlideElementType.Text,
          initiallyVisible: true,
          position: {
            desktop: { top: '50%', left: '10%', width: '80%', height: 'auto' },
            tablet: { top: '50%', left: '10%', width: '80%', height: 'auto' },
            mobile: { top: '45%', left: '5%', width: '90%', height: 'auto' },
          },
          content: {
            text: 'Interactive Guide',
            fontSize: { desktop: '2rem', tablet: '1.5rem', mobile: '1.2rem' },
            textAlign: 'center',
          },
        },
      ],
    },
    {
      id: 'slide-2',
      title: 'Device Overview',
      background: { type: 'color', value: '#1d2a5d' },
      elements: [
        {
          id: 's2-aed-image',
          type: SlideElementType.Image,
          initiallyVisible: true,
          position: {
            desktop: { top: '10%', left: '20%', width: '60%', height: '80%' },
            tablet: { top: '15%', left: '10%', width: '80%', height: '70%' },
            mobile: { top: '20%', left: '5%', width: '90%', height: '60%' },
          },
          content: {
            src: 'https://storage.googleapis.com/proud-core-34Proud-core-340212/aed-device.png',
            alt: 'AED Defibrillator Device',
          },
        },
        {
          id: 's2-hotspot-power',
          type: SlideElementType.Hotspot,
          initiallyVisible: true,
          position: {
            desktop: { top: '32%', left: '34%', width: '5%', height: '8%' },
            tablet: { top: '35%', left: '26%', width: '7%', height: '10%' },
            mobile: { top: '38%', left: '22%', width: '10%', height: '12%' },
          },
          content: {},
          interaction: {
            trigger: 'onClick',
            action: {
              type: ElementActionType.PanZoom,
              payload: {
                elementId: 's2-hotspot-power',
                zoom: 2.5,
                banner: {
                  text: 'Press this green button to turn the AED on. It will then provide voice prompts to guide you.',
                  position: 'bottom'
                }
              },
            },
          },
        },
        {
          id: 's2-hotspot-pads',
          type: SlideElementType.Hotspot,
          initiallyVisible: true,
          position: {
            desktop: { top: '55%', left: '33%', width: '10%', height: '15%' },
            tablet: { top: '55%', left: '25%', width: '12%', height: '18%' },
            mobile: { top: '58%', left: '20%', width: '15%', height: '20%' },
          },
          content: { pulseColor: '#4356a0' }, // Accent Color 1: Blue Light
          interaction: {
            trigger: 'onClick',
            action: {
              type: ElementActionType.PanZoom,
              payload: {
                elementId: 's2-hotspot-pads',
                zoom: 2,
                banner: {
                  text: 'These pads are applied to the patient\'s bare chest. The packaging shows diagrams for correct placement.',
                  position: 'top'
                }
              },
            },
          },
        },
        {
          id: 's2-hotspot-shock',
          type: SlideElementType.Hotspot,
          initiallyVisible: true,
          position: {
            desktop: { top: '32%', left: '61%', width: '5%', height: '8%' },
            tablet: { top: '35%', left: '67%', width: '7%', height: '10%' },
            mobile: { top: '38%', left: '68%', width: '10%', height: '12%' },
          },
          content: { pulseColor: '#c13435' }, // Accent Color 2: Red Light
          interaction: {
            trigger: 'onClick',
            action: {
              type: ElementActionType.PanZoom,
              payload: {
                elementId: 's2-hotspot-shock',
                zoom: 2.5,
                banner: {
                  text: 'Only press this button when the AED instructs you to. Ensure nobody is touching the patient.',
                  position: 'bottom'
                }
              },
            },
          },
        },
      ],
    },
    {
      id: 'slide-3',
      title: 'Watch a Demo',
      background: { type: 'color', value: '#1d2a5d' },
      elements: [
        {
          id: 's3-title',
          type: SlideElementType.Text,
          initiallyVisible: true,
          position: {
            desktop: { top: '20%', left: '10%', width: '80%', height: 'auto' },
            tablet: { top: '20%', left: '10%', width: '80%', height: 'auto' },
            mobile: { top: '15%', left: '5%', width: '90%', height: 'auto' },
          },
          content: {
            text: 'How to Use an AED',
            fontSize: { desktop: '3rem', tablet: '2.5rem', mobile: '1.8rem' },
            fontWeight: 'bold',
            textAlign: 'center',
          },
        },
        {
          id: 's3-button',
          type: SlideElementType.Button,
          initiallyVisible: true,
          position: {
            desktop: { top: '45%', left: '40%', width: '20%', height: '10%' },
            tablet: { top: '45%', left: '35%', width: '30%', height: '10%' },
            mobile: { top: '45%', left: '25%', width: '50%', height: '10%' },
          },
          content: { text: 'Watch Video' },
          interaction: {
            trigger: 'onClick',
            action: {
              type: ElementActionType.OpenModal,
              payload: {
                content: {
                  type: ModalContentType.Video,
                  title: 'AED Demonstration',
                  src: 'https://www.youtube.com/embed/UFvL7wTFzlI',
                }
              }
            }
          }
        }
      ]
    },
    {
        id: 'slide-4',
        title: 'Knowledge Check',
        background: { type: 'image', value: 'https://picsum.photos/seed/quizbg/1600/900' },
        elements: [
            {
                id: 's4-title',
                type: SlideElementType.Text,
                initiallyVisible: true,
                position: {
                  desktop: { top: '25%', left: '10%', width: '80%', height: 'auto' },
                  tablet: { top: '25%', left: '10%', width: '80%', height: 'auto' },
                  mobile: { top: '20%', left: '5%', width: '90%', height: 'auto' },
                },
                content: {
                  text: 'Knowledge Check',
                  fontSize: { desktop: '3rem', tablet: '2.5rem', mobile: '2rem' },
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
            },
            {
                id: 's4-quiz-button',
                type: SlideElementType.Button,
                initiallyVisible: true,
                position: {
                    desktop: { top: '50%', left: '40%', width: '20%', height: '10%' },
                    tablet: { top: '50%', left: '35%', width: '30%', height: '10%' },
                    mobile: { top: '50%', left: '30%', width: '40%', height: '10%' },
                },
                content: {
                    text: 'Start Quiz'
                },
                interaction: {
                    trigger: 'onClick',
                    action: {
                        type: ElementActionType.OpenModal,
                        payload: {
                            content: {
                                type: ModalContentType.Quiz,
                                title: 'AED Quiz',
                                questions: [
                                    {
                                        question: 'What is the first step when using an AED?',
                                        options: ['Apply the pads', 'Press the shock button', 'Turn the device on', 'Check for a pulse'],
                                        correctAnswerIndex: 2
                                    },
                                    {
                                        question: 'Before pressing the shock button, you should:',
                                        options: ['Shout "Clear!" and ensure no one is touching the patient', 'Check the patient\'s breathing', 'Give two rescue breaths', 'Start chest compressions'],
                                        correctAnswerIndex: 0
                                    }
                                ]
                            }
                        }
                    }
                }
            }
        ]
    },
    {
      id: 'slide-5',
      title: 'Spotlight Demo',
      background: { type: 'image', value: 'https://picsum.photos/seed/features/1600/900' },
      elements: [
          {
              id: 's5-title',
              type: SlideElementType.Text,
              initiallyVisible: true,
              position: {
                desktop: { top: '10%', left: '10%', width: '80%', height: 'auto' },
                tablet: { top: '10%', left: '10%', width: '80%', height: 'auto' },
                mobile: { top: '10%', left: '5%', width: '90%', height: 'auto' },
              },
              content: {
                text: 'Spotlight Feature',
                fontSize: { desktop: '3rem', tablet: '2.5rem', mobile: '2rem' },
                fontWeight: 'bold',
                textAlign: 'center',
              },
          },
          {
              id: 's5-spotlight-button',
              type: SlideElementType.Button,
              initiallyVisible: true,
              position: {
                  desktop: { top: '70%', left: '37.5%', width: '25%', height: '10%' },
                  tablet: { top: '70%', left: '35%', width: '30%', height: '10%' },
                  mobile: { top: '70%', left: '30%', width: '40%', height: '10%' },
              },
              content: {
                  text: 'Activate Spotlight'
              },
              interaction: {
                  trigger: 'onClick',
                  action: {
                      type: ElementActionType.Spotlight,
                      payload: {
                          position: {
                            desktop: { top: '30%', left: '35%', width: '30%', height: '40%' },
                            tablet: { top: '30%', left: '30%', width: '40%', height: '40%' },
                            mobile: { top: '25%', left: '20%', width: '60%', height: '40%' },
                        },
                      }
                  }
              }
          }
      ]
  }
  ],
};