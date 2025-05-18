import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([
    { text: "👋 Welcome to Cognify! I'm here to support you and your child's neurological journey. How can I assist you today?", isBot: true },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("openai/gpt-3.5-turbo");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState(".");
  const [isListening, setIsListening] = useState(false);

  // State/Refs for Voice Output
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false); // For automatic reading
  const [isSpeaking, setIsSpeaking] = useState(false); // Tracks if *any* speech is active
  const synthesisRef = useRef(window.speechSynthesis);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef("");


  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isSpeaking]);

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        setTypingDots((prev) => (prev.length >= 3 ? "." : prev + "."));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  // Effect for setting up Speech Recognition (unchanged)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API is not supported in this browser.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      console.log("Voice recognition started.");
      setIsListening(true);
      finalTranscriptRef.current = "";
      setUserMessage("");
    };

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setUserMessage(finalTranscriptRef.current + interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      let errorMessage = "Speech recognition error. Please try again.";
      if (event.error === 'no-speech') {
        errorMessage = "No speech detected. Please try again.";
      } else if (event.error === 'not-allowed') {
         errorMessage = "Microphone access denied. Please allow microphone permission.";
      } else if (event.error === 'language-not-supported') {
         errorMessage = "Voice language not supported.";
      } else if (event.error === 'audio-capture') {
          errorMessage = "Audio capture failed. Check your microphone.";
      }
       if (!finalTranscriptRef.current) {
           console.warn(errorMessage);
       }
    };

    recognitionRef.current.onend = () => {
      console.log("Voice recognition ended.");
      setIsListening(false);
      if (finalTranscriptRef.current) {
        sendMessage(finalTranscriptRef.current);
        finalTranscriptRef.current = "";
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Effect for loading Speech Synthesis voices
 // Effect for loading Speech Synthesis voices
  useEffect(() => {
      if (!synthesisRef.current) {
          console.warn("Speech Synthesis API is not supported in this browser.");
          return;
      }

      const loadVoices = () => {
          const availableVoices = synthesisRef.current.getVoices();
          setVoices(availableVoices);

          // --- START MODIFICATION FOR DEFAULT VOICE SELECTION ---
          if (!selectedVoice && availableVoices.length > 0) {
              // Try to find a soothing female English voice by looking at names
              // This is not foolproof as voice names vary greatly by system/browser
              const preferredVoice = availableVoices.find(voice =>
                   voice.lang.startsWith('en') && // Look for English voices
                   (voice.name.toLowerCase().includes('female') || // Names containing 'female'
                    voice.name.toLowerCase().includes('woman') ||  // Names containing 'woman'
                    voice.name.toLowerCase().includes('zira') ||   // Common Microsoft female voice name
                    voice.name.toLowerCase().includes('hazel'))    // Another common female name
                   // Add other known female voice names if desired
              );

              // Fallback: find any English voice
              const englishVoice = availableVoices.find(voice => voice.lang.startsWith('en'));

              // Set the default voice: preferred, then any English, then the very first voice available
              setSelectedVoice(preferredVoice || englishVoice || availableVoices[0]);
          }
           // --- END MODIFICATION FOR DEFAULT VOICE SELECTION ---
      };

      // Load voices initially
      loadVoices();

      // Listen for voices changed event (sometimes voices load after the page)
      synthesisRef.current.onvoiceschanged = loadVoices;

      // Cleanup
      return () => {
          if (synthesisRef.current) {
               synthesisRef.current.onvoiceschanged = null; // Remove listener
          }
           // Cancel any ongoing speech if component unmounts
          if (synthesisRef.current && synthesisRef.current.speaking) {
               synthesisRef.current.cancel();
               setIsSpeaking(false);
          }
      };
  }, [selectedVoice]); // Dependency: re-run logic if selectedVoice changes externally (unlikely here, but good practice)

  // Function to speak text - now accepts a flag to ignore the global toggle
  const speakText = useCallback((text, shouldRespectToggle = true) => {
      if (!synthesisRef.current || !selectedVoice || text.trim() === "") {
          return;
      }

      // If respecting the toggle, check if voice is enabled
      if (shouldRespectToggle && !isVoiceEnabled) {
          return;
      }

      // Cancel any current speech before starting a new one
      if (synthesisRef.current.speaking) {
          synthesisRef.current.cancel();
      }


      const utterance = new SpeechSynthesisUtterance(text);

      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;


      utterance.onstart = () => {
          setIsSpeaking(true);
          console.log("Speaking started");
      };

      utterance.onend = () => {
          setIsSpeaking(false);
          console.log("Speaking ended");
      };

      utterance.onerror = (event) => {
          setIsSpeaking(false);
          console.error("Speech synthesis error:", event.error);
      };

      synthesisRef.current.speak(utterance);

  }, [isVoiceEnabled, selectedVoice]); // Dependency on isVoiceEnabled and selectedVoice


  const sendMessage = async (messageTextToSend = userMessage) => {
    const messageText = messageTextToSend.trim();

    if (messageText !== "") {
      // Stop any ongoing speech before adding user message or sending new request
      if (synthesisRef.current && synthesisRef.current.speaking) {
           synthesisRef.current.cancel();
           setIsSpeaking(false);
      }

      const newMessages = [...messages, { text: messageText, isBot: false }];
      setMessages(newMessages);

      setUserMessage("");

      setIsTyping(true);

      try {
        const response = await axios.post("http://localhost:5000/api/chatbot/chat", {
          message: messageText,
          sessionId: Date.now().toString(),
          model: selectedModel,
        });

        const botResponseText = response.data.response;

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponseText, isBot: true },
        ]);

        // Automatically speak the bot's response if voice is enabled
        speakText(botResponseText, true); // Pass true to respect the toggle

      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage = "I'm really sorry, but I'm having trouble understanding right now. Please try again! 💬";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: errorMessage, isBot: true },
        ]);
        // Speak the error message too, respecting the toggle
        speakText(errorMessage, true);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isListening) {
      sendMessage();
    }
  };

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
         if (SpeechRecognition) {
             recognitionRef.current.start();
         } else {
             console.error("Speech Recognition API not available.");
         }
      }
    } else {
        console.error("Speech Recognition not initialized.");
    }
  };

  // Handlers for voice controls
  const handleVoiceToggle = () => {
      const newState = !isVoiceEnabled;
      setIsVoiceEnabled(newState);
       // If disabling voice while speaking, cancel current speech
      if (!newState && synthesisRef.current && synthesisRef.current.speaking) {
          synthesisRef.current.cancel();
          setIsSpeaking(false);
      }
  };

  const handleVoiceChange = (event) => {
      const voiceURI = event.target.value;
      const voice = voices.find(v => v.voiceURI === voiceURI);
      if (voice) {
          setSelectedVoice(voice);
      }
  };

  const isSpeechRecognitionSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const isSpeechSynthesisSupported = !!window.speechSynthesis;

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen p-6">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-5xl p-8 flex flex-col h-[92vh] relative">

        {/* Controls Area (Model, Voice Toggle, Voice Selector) */}
        <div className="absolute top-6 right-8 flex items-center space-x-4 z-10">
             {/* Voice Toggle */}
             {isSpeechSynthesisSupported && (
                 <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 shadow-md">
                     <span className={`mr-2 text-sm font-semibold ${isVoiceEnabled ? 'text-blue-600' : 'text-gray-600'}`}>Voice</span>
                     <label className="relative inline-flex items-center cursor-pointer">
                         <input
                             type="checkbox"
                             value=""
                             className="sr-only peer"
                             checked={isVoiceEnabled}
                             onChange={handleVoiceToggle}
                         />
                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                     </label>
                     {isSpeaking && (
                         <span className="ml-2 text-blue-600 animate-pulse">🔊</span>
                     )}
                 </div>
             )}

             {/* Voice Selector */}
             {isSpeechSynthesisSupported && voices.length > 0 && (
                  <select
                     value={selectedVoice?.voiceURI || ''}
                     onChange={handleVoiceChange}
                     className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white shadow-md"
                     disabled={!isVoiceEnabled && !isSpeaking} // Optional: Disable selector if voice is off and not currently speaking manually
                  >
                     {voices.map(voice => (
                         <option key={voice.voiceURI} value={voice.voiceURI}>
                             {voice.name} ({voice.lang})
                         </option>
                     ))}
                  </select>
             )}


          {/* Model Selector */}
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm bg-white shadow-md"
          >
            <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
            <option value="mistralai/mistral-7b-instruct">Mistral 7B</option>
            <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
            <option value="meta-llama/llama-3-70b-instruct">Llama 3 70B</option>
          </select>
        </div>

        {/* Heading centered */}
        <div className="text-center mb-6 pt-16">
          <h1 className="text-5xl font-extrabold text-blue-600">Cognify Chatbot</h1>
          <p className="text-gray-500 text-lg mt-2">Here to walk with you through every step of your journey 💬</p>
          {!isSpeechRecognitionSupported && (
              <p className="text-red-500 text-sm mt-2">Voice input is not supported in this browser.</p>
          )}
           {!isSpeechSynthesisSupported && (
              <p className="text-red-500 text-sm mt-1">Voice output is not supported in this browser.</p>
          )}
        </div>


        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 space-y-8 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"} animate-fade-in`}
            >
              {/* Added relative positioning here to potentially position the button */}
              <div className={`flex items-start space-x-4 max-w-2xl ${!msg.isBot ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full ${msg.isBot ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 'bg-gradient-to-br from-green-400 to-green-600'} text-white flex items-center justify-center font-bold shadow-md`}>
                  {msg.isBot ? '🤖' : '🧑'}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-5 rounded-2xl shadow-lg text-base leading-relaxed tracking-wide ${
                    msg.isBot
                      ? "bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800"
                      : "bg-green-100 text-black"
                  } flex flex-col`} 
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {/* Read Aloud Button (only for bot messages and if synthesis supported) */}
                  {msg.isBot && isSpeechSynthesisSupported && selectedVoice && (
                       <button
                          onClick={() => speakText(msg.text, false)} // Pass false to ignore isVoiceEnabled
                          className={`self-end mt-2 p-1 rounded-full transition-colors duration-200 ${
                              isSpeaking ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800 focus:outline-none'
                          }`}
                          aria-label="Read message aloud"
                          title="Read message aloud"
                          disabled={isSpeaking} // Disable button if synthesis is busy
                       >
                          {/* Speaker Icon - using a simple SVG for better styling */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M9.375 7.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V7.5ZM12.75 9a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V9ZM16.125 10.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V10.5ZM7.125 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75V12Z" />
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v10.5a5.25 5.25 0 0 0 10.5 0V6.75A5.25 5.25 0 0 0 12 1.5ZM4.875 6.75a7.125 7.125 0 1 1 14.25 0v10.5a7.125 7.125 0 1 1-14.25 0V6.75Z" clipRule="evenodd" />
                            </svg>
                       </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-center space-x-4 max-w-2xl">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                  🤖
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-5 rounded-2xl shadow-lg text-gray-800">
                  Thinking{typingDots}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center">
          {isSpeechRecognitionSupported && (
             <button
               onClick={toggleListening}
               className={`p-4 transition-colors duration-200 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-800'} ${isSpeechRecognitionSupported ? 'rounded-l-2xl' : ''}`}
               aria-label={isListening ? "Stop listening" : "Start voice input"}
               title={isListening ? "Stop listening" : "Start voice input"}
             >
               🎙️
             </button>
          )}


          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Listening..." : "Type your message here..."}
            className={`flex-1 border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base ${isSpeechRecognitionSupported ? 'rounded-none' : 'rounded-l-2xl'} ${isListening ? 'italic text-gray-600' : ''}`}
            disabled={isListening}
          />
          <button
            onClick={() => sendMessage()}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-r-2xl font-semibold transition-all"
             disabled={isListening || userMessage.trim() === "" || isSpeaking} // Also disable Send while speaking
          >
            Send
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease;
        }

        .scrollbar-thin {
            scrollbar-width: thin;
            scrollbar-color: theme('colors.blue.300') theme('colors.blue.100');
        }

        .scrollbar-thin::-webkit-scrollbar {
            width: 8px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
            background: theme('colors.blue.100');
            border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: theme('colors.blue.300');
            border-radius: 10px;
            border: 2px solid theme('colors.blue.100');
        }
         .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
      `}</style>
    </div>
  );
};

export default ChatbotComponent;