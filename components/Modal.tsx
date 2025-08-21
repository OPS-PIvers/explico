import React, { useState, useEffect } from 'react';
import { ModalContent, ModalContentType, QuizQuestion } from '../types';
import CloseIcon from './icons/CloseIcon';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ModalContent | null;
}

const QuizView: React.FC<{ questions: QuizQuestion[] }> = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const question = questions[currentQuestionIndex];

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return;
        setSelectedAnswer(index);
        if (index === question.correctAnswerIndex) {
            setFeedback('Correct!');
            setScore(s => s + 1);
        } else {
            setFeedback(`Incorrect. The correct answer was: ${question.options[question.correctAnswerIndex]}`);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setSelectedAnswer(null);
            setFeedback('');
        } else {
            setQuizFinished(true);
        }
    };

    if (quizFinished) {
        return (
            <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
                <p className="text-xl">Your score: {score} / {questions.length}</p>
            </div>
        );
    }
    
    return (
        <div>
            <p className="font-semibold mb-4 text-lg">{question.question}</p>
            <div className="space-y-2">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full text-left p-3 rounded-md transition-colors ${selectedAnswer === null ? 'bg-[#666666] hover:bg-[#4356a0]' : ''} ${selectedAnswer !== null && index === question.correctAnswerIndex ? 'bg-[#2e8540]' : ''} ${selectedAnswer !== null && selectedAnswer === index && index !== question.correctAnswerIndex ? 'bg-[#ad2122]' : 'bg-[#666666]'}`}
                        disabled={selectedAnswer !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {feedback && <p className="mt-4 text-center">{feedback}</p>}
            {selectedAnswer !== null && (
                <button onClick={handleNext} className="mt-6 w-full bg-[#ad2122] hover:bg-[#c13435] p-3 rounded-md font-bold transition-colors">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
        </div>
    );
};


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen || !content) return null;

  const renderContent = () => {
    switch (content.type) {
      case ModalContentType.Video:
        return (
          <div className="aspect-video w-full">
            <iframe
              src={content.src}
              title={content.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        );
      case ModalContentType.TextInfo:
        return <p className="text-gray-300">{content.text}</p>;
      case ModalContentType.Quiz:
        return <QuizView questions={content.questions} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#1a1a1a] to-[#111111] border-2 border-[#ad2122]/50 rounded-xl shadow-2xl shadow-black/50 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">{content.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;