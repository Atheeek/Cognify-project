import React, { useState } from "react"; // No need for useEffect or useRef anymore
import ChatbotComponent from "../pages/ChatbotComponent";

const ChatbotWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  // The state and refs for controlling the temporary popup are no longer needed:
  // const [showMessagePopup, setShowMessagePopup] = useState(false);
  // const popupTimerRef = useRef(null);
  // const hideTimerRef = useRef(null);
  // const hasShownPopupRef = useRef(false);

  const toggleChatbot = () => {
    // No need to clear timers or set showMessagePopup/hasShownPopupRef here
    setIsOpen((prev) => !prev);
  };

  // The useEffect for managing popup timers is no longer needed


  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all"
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? "❌" : "🤖"}
      </button>

      {/* Message Pop-up */}
      {/* Display the popup ONLY if the chat is NOT open */}
      {!isOpen && (
        <div className="fixed bottom-20 right-6 mb-2 p-3 bg-blue-600 text-white text-sm rounded-lg shadow-lg z-50
                      transform transition-all duration-500 ease-in-out /* Basic transition properties */
                      animate-popup-fade-in-up /* Apply our animation */
                      pointer-events-none /* Allows clicks to pass through to the button */
                      w-48 text-center /* Set width and center text */
                      origin-bottom-right /* Set transform origin for potential scaling effects */
                      "
             // Use a style property to control animation details via CSS variable
             style={{ '--translate-distance': '10px' }}>
            Hi there! 👋 How can I help you
            {/* Optional: Add a small triangle pointing down towards the button */}
            <div className="absolute bottom-0 right-4 transform translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-600"></div>
        </div>
      )}

       {/* Add CSS for the animation keyframes */}
       {/* This CSS handles the fade-in animation when the popup div is rendered */}
        <style>{`
            /* Keyframes for a fade-in and slide-up animation */
            @keyframes popup-fade-in-up {
                from {
                    opacity: 0; /* Start invisible */
                    transform: translateY(var(--translate-distance, 10px)); /* Start slightly below final position */
                }
                to {
                    opacity: 1; /* End fully visible */
                    transform: translateY(0); /* End at final position */
                }
            }

            /* Apply the animation */
            .animate-popup-fade-in-up {
                animation: popup-fade-in-up 0.5s ease-out forwards; /* Run animation for 0.5s, keep end state */
            }

             /* Note: When the chat opens (!isOpen becomes false), the popup div is removed from the DOM.
                This means there's no explicit fade-out animation defined in this CSS; it just disappears.
                If you need a smooth exit animation, you'd typically use a library like react-transition-group
                or manage state transitions to keep the element rendered while applying an exit class.
             */
        `}</style>


      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[90vw] max-w-xl h-[75vh] z-50">
          <div className="bg-white rounded-3xl shadow-2xl h-full overflow-hidden">
            <ChatbotComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWrapper;