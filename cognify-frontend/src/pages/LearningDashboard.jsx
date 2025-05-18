import React, { useState, useEffect, useRef } from 'react';

// --- Data Definitions ---
const alphabets = [
    { letter: 'A FOR APPLE', audio: '/audio/A.wav', word: 'Apple', imageUrl: 'apple.jpg' },
    { letter: 'B FOR BALL', audio: '/audio/B.wav', word: 'Ball', imageUrl: 'ball.jpg' },
    { letter: 'C FOR CAT', audio: '/audio/C.wav', word: 'Cat', imageUrl: 'cat.jpg' },
    { letter: 'D FOR DOG', audio: '/audio/D.wav', word: 'Dog', imageUrl: 'dog.jpg' },
    { letter: 'E FOR ELEPHANT', audio: '/audio/E.wav', word: 'Elephant', imageUrl: 'elephant.jpg' },
    { letter: 'F FOR FISH', audio: '/audio/F.wav', word: 'Fish', imageUrl: 'fish.jpg' },
    { letter: 'G FOR GOAT', audio: '/audio/G.wav', word: 'Goat', imageUrl: 'goat.jpg' },
    { letter: 'H FOR HEN', audio: '/audio/H.wav', word: 'Hen', imageUrl: 'hen.jpg' },
    { letter: 'I FOR ICECREAM', audio: '/audio/I.wav', word: 'Icecream', imageUrl: 'icecream.jpg' },
    { letter: 'J FOR JUG', audio: '/audio/J.wav', word: 'Jug', imageUrl: 'jug.jpg' },
    { letter: 'K FOR KITE', audio: '/audio/K.wav', word: 'Kite', imageUrl: 'kite.jpg' },
    { letter: 'L FOR LION', audio: '/audio/L.wav', word: 'Lion', imageUrl: 'lion.jpg' },
    { letter: 'M FOR MONKEY', audio: '/audio/M.wav', word: 'Monkey', imageUrl: 'monkey.jpg' },
    { letter: 'N FOR NEST', audio: '/audio/N.wav', word: 'Nest', imageUrl: 'nest.jpg' },
    { letter: 'O FOR ORANGE', audio: '/audio/O.wav', word: 'Orange', imageUrl: 'orange.jpg' },
    { letter: 'P FOR PARROT', audio: '/audio/P.wav', word: 'Parrot', imageUrl: 'parrot.jpg' },
    { letter: 'Q FOR QUEEN', audio: '/audio/Q.wav', word: 'Queen', imageUrl: 'queen.png' },
    { letter: 'R FOR RABBIT', audio: '/audio/R.wav', word: 'Rabbit', imageUrl: 'rabit.jpg' },
    { letter: 'S FOR SUN', audio: '/audio/S.wav', word: 'Sun', imageUrl: 'sun.jpg' },
    { letter: 'T FOR TIGER', audio: '/audio/T.wav', word: 'Tiger', imageUrl: 'tiger.jpg' },
    { letter: 'U FOR UMBRELLA', audio: '/audio/U.wav', word: 'Umbrella', imageUrl: 'umbrella.jpg' },
    { letter: 'V FOR VAN', audio: '/audio/V.wav', word: 'Van', imageUrl: 'van.jpg' },
    { letter: 'W FOR WATCH', audio: '/audio/W.wav', word: 'Watch', imageUrl: 'watch.jpg' },
    { letter: 'X FOR XYLOPHONE', audio: '/audio/X.wav', word: 'Xylophone', imageUrl: 'xylophone.jpg' },
    { letter: 'Y FOR YAK', audio: '/audio/Y.wav', word: 'Yak', imageUrl: 'yak.jpg' },
    { letter: 'Z FOR ZEBRA', audio: '/audio/Z.wav', word: 'Zebra', imageUrl: 'zebra.jpg' },
];

const numbers = [
    { digit: 1, audio: '/audio/1.mp3' }, { digit: 2, audio: '/audio/2.mp3' },
    { digit: 3, audio: '/audio/3.mp3' }, { digit: 4, audio: '/audio/4.mp3' },
    { digit: 5, audio: '/audio/5.mp3' }, { digit: 6, audio: '/audio/6.mp3' },
    { digit: 7, audio: '/audio/7.mp3' }, { digit: 8, audio: '/audio/8.mp3' },
    { digit: 9, audio: '/audio/9.mp3' }, { digit: 10, audio: '/audio/10.mp3' },
];

const phoneticMap = {
    "A": "A FOR APPLE", "A FOR APPLE": "A FOR APPLE",
    "B": "B FOR BALL", "B FOR BALL": "B FOR BALL",
    "C": "C FOR CAT", "C FOR CAT": "C FOR CAT",
    "D": "D FOR DOG", "D FOR DOG": "D FOR DOG",
    "E": "E FOR ELEPHANT", "E FOR ELEPHANT": "E FOR ELEPHANT",
    "F": "F FOR FISH", "F FOR FISH": "F FOR FISH",
    "G": "G FOR GOAT", "G FOR GOAT": "G FOR GOAT",
    "H": "H FOR HEN", "H FOR HEN": "H FOR HEN",
    "I": "I FOR ICECREAM", "I FOR ICECREAM": "I FOR ICECREAM",
    "J": "J FOR JUG", "J FOR JUG": "J FOR JUG",
    "K": "K FOR KITE", "K FOR KITE": "K FOR KITE",
    "L": "L FOR LION", "L FOR LION": "L FOR LION",
    "M": "M FOR MONKEY", "M FOR MONKEY": "M FOR MONKEY",
    "N": "N FOR NEST", "N FOR NEST": "N FOR NEST",
    "O": "O FOR ORANGE", "O FOR ORANGE": "O FOR ORANGE",
    "P": "P FOR PARROT", "P FOR PARROT": "P FOR PARROT",
    "Q": "Q FOR QUEEN", "Q FOR QUEEN": "Q FOR QUEEN",
    "R": "R FOR RABBIT", "R FOR RABBIT": "R FOR RABBIT",
    "S": "S FOR SUN", "S FOR SUN": "S FOR SUN",
    "T": "T FOR TIGER", "T FOR TIGER": "T FOR TIGER",
    "U": "U FOR UMBRELLA", "U FOR UMBRELLA": "U FOR UMBRELLA",
    "V": "V FOR VAN", "V FOR VAN": "V FOR VAN",
    "W": "W FOR WATCH", "W FOR WATCH": "W FOR WATCH",
    "X": "X FOR XYLOPHONE", "X FOR XYLOPHONE": "X FOR XYLOPHONE",
    "Y": "Y FOR YAK", "Y FOR YAK": "Y FOR YAK",
    "Z": "Z FOR ZEBRA", "Z FOR ZEBRA": "Z FOR ZEBRA",
    "ONE": "1",   "1": "1",     // If transcript is "ONE" or "1", map to "1"
    "TWO": "2",   "2": "2",
    "THREE": "3", "3": "3",
    "FOUR": "4",  "4": "4",
    "FIVE": "5",  "5": "5",
    "SIX": "6",   "6": "6",
    "SEVEN": "7", "7": "7",
    "EIGHT": "8", "8": "8",
    "NINE": "9",  "9": "9",
    "TEN": "10",  "10": "10"
};

// --- LearningGrid Component (Enhanced Version) ---
function LearningGrid({ tab, items, learnedItems, playAudio, startRecognition, isListening, getItemKey, currentItemKey }) {
    const dataToDisplay = items;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 px-4 py-6">
            {dataToDisplay.map((item) => {
                const itemKey = getItemKey(item);
                const isLearned = learnedItems.includes(itemKey);

                const cardBaseBg = tab === 'alphabets' ? 'bg-sky-50 hover:ring-sky-300' : 'bg-fuchsia-50 hover:ring-fuchsia-300';
                const learnedBorder = tab === 'alphabets' ? 'border-green-500 ring-green-400' : 'border-teal-500 ring-teal-400';
                const unlearnedBorder = 'border-gray-300';

                const listenButtonBg = tab === 'alphabets' ? 'bg-sky-500 hover:bg-sky-600' : 'bg-indigo-500 hover:bg-indigo-600';
                
                let speakButtonBg = tab === 'alphabets' ? 'bg-green-500 hover:bg-green-600' : 'bg-purple-500 hover:bg-purple-600';
                let speakButtonContent;

                if (isListening) {
                    if (currentItemKey === itemKey) {
                        speakButtonBg = tab === 'alphabets' ? 'bg-orange-400 animate-pulse' : 'bg-pink-400 animate-pulse';
                        speakButtonContent = (
                            <>
                                <span role="img" aria-label="listening" className="text-xl">🎙️</span>
                                <span className="animate-ping-slow">...</span> {/* Ensure animate-ping-slow is defined in Tailwind config or CSS */}
                            </>
                        );
                    } else {
                        speakButtonBg = 'bg-gray-400 cursor-not-allowed';
                        speakButtonContent = (
                            <>
                                <span role="img" aria-label="speak" className="text-xl">🎙️</span>
                                <span>Say it!</span>
                            </>
                        );
                    }
                } else {
                    speakButtonContent = (
                        <>
                            <span role="img" aria-label="speak" className="text-xl">🎙️</span>
                            <span>Say it!</span>
                        </>
                    );
                }

                return (
                    <div
                        key={itemKey}
                        className={`
                            ${cardBaseBg}
                            shadow-lg rounded-3xl p-5 md:p-6 text-center text-gray-800 
                            transition-all duration-300 ease-in-out
                            hover:shadow-xl hover:ring-4 transform hover:-translate-y-2
                            flex flex-col justify-between items-center relative
                            ${isLearned ? `${learnedBorder} border-4` : `${unlearnedBorder} border-2`}
                        `}
                    >
                        {isLearned && (
                            <div className={`absolute top-3 right-3 ${tab === 'alphabets' ? 'bg-green-500' : 'bg-teal-500'} text-white rounded-full p-1.5 shadow-md`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        <div className="flex flex-col items-center justify-center mb-4 min-h-[120px] md:min-h-[160px]">
                            {tab === 'alphabets' && item.imageUrl ? (
                                <img
                                    src={`/${item.imageUrl}`} // Assumes images are in public folder root
                                    alt={item.word || item.letter}
                                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 object-contain rounded-xl shadow-sm"
                                />
                            ) : (
                                <p className={`
                                    text-6xl sm:text-7xl md:text-8xl font-extrabold
                                    ${tab === 'alphabets' ? 'text-sky-700' : 'text-fuchsia-700'}
                                `}>
                                    {/* For alphabets, show only the first letter; for numbers, show the digit */}
                                    {tab === 'alphabets' ? item.letter.split(' ')[0] : item.digit}
                                </p>
                            )}
                        </div>
                        {tab === 'alphabets' && (
                            <div className="mb-4 space-y-1 text-gray-700 min-h-[60px] md:min-h-[70px]">
                                <p className="text-lg sm:text-xl font-semibold text-slate-800">{item.letter}</p>
                                {item.word && (
                                    <p className="text-xl sm:text-2xl font-bold text-slate-900">{item.word}</p>
                                )}
                            </div>
                        )}
                        {tab === 'numbers' && <div className="mb-4 min-h-[60px] md:min-h-[70px]"></div>} {/* Placeholder for consistent height */}
                        <div className="mt-auto space-y-3 w-full">
                            <button
                                onClick={() => playAudio(item.audio)}
                                className={`
                                    w-full py-3 px-4 rounded-xl text-white font-bold shadow-md
                                    hover:opacity-90 transform hover:scale-105 transition-all duration-200
                                    text-base sm:text-lg flex items-center justify-center space-x-2
                                    ${listenButtonBg}
                                `}
                            >
                                <span role="img" aria-label="listen" className="text-xl">🔊</span>
                                <span>Listen</span>
                            </button>
                            <button
                                onClick={() => startRecognition(itemKey)}
                                disabled={isListening && currentItemKey !== itemKey}
                                className={`
                                    w-full py-3 px-4 rounded-xl text-white font-bold shadow-md
                                    hover:opacity-90 transform hover:scale-105 transition-all duration-200
                                    text-base sm:text-lg flex items-center justify-center space-x-2
                                    ${speakButtonBg}
                                `}
                            >
                                {speakButtonContent}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


// --- LearningDashboard Component (Main Component) ---
const LearningDashboard = ({ userId }) => {
    const [tab, setTab] = useState('alphabets');
    const [stars, setStars] = useState(0);
    const [xp, setXp] = useState(0);
    const [learnedItems, setLearnedItems] = useState([]);
    const [showReward, setShowReward] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('✨ Welcome! Click "Say it!" on an item to start. ✨');
    const [feedbackType, setFeedbackType] = useState('info');
    const [isListening, setIsListening] = useState(false);
    const [currentItemKeyForRecognition, setCurrentItemKeyForRecognition] = useState(null); // New state

    const recognitionRef = useRef(null);
    const hasProcessedResultOrError = useRef(false);
    const userManuallyStopped = useRef(false);

    const xpToNextLevel = 50;
    const level = Math.floor(xp / xpToNextLevel);
    const xpProgress = xp % xpToNextLevel;

    useEffect(() => {
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            setFeedbackMessage("Sorry, your browser doesn't support Speech Recognition. Try using Chrome or Edge.");
            setFeedbackType('error');
            console.error("Speech Recognition API not found.");
        }
    }, []);

    useEffect(() => {
        if (userId) {
            console.log(`Workspaceing progress for userId: ${userId}`);
            fetch(`/api/progress/${userId}`)
                .then(async (res) => {
                    if (!res.ok) {
                        const errorText = await res.text().catch(() => "Server returned an unreadable error");
                        console.error(`Failed to fetch progress: ${res.status} ${res.statusText}. Server response: ${errorText}`);
                        throw new Error(`Failed to fetch progress: ${res.status} ${res.statusText}. Server response: ${errorText.substring(0, 100)}...`);
                    }
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        return res.json();
                    } else {
                        const nonJsonText = await res.text();
                        console.error(`Server response was not JSON. Received: ${nonJsonText}`);
                        throw new Error(`Server response was not JSON. Received: ${nonJsonText.substring(0, 100)}...`);
                    }
                })
                .then((data) => {
                    console.log("Progress data fetched:", data);
                    setLearnedItems(data.learnedItems ? data.learnedItems.map(String) : []);
                    setStars(data.stars || 0);
                    setXp(data.xp || 0);
                    if (!isListening && !userManuallyStopped.current && !hasProcessedResultOrError.current && !currentItemKeyForRecognition) {
                        setFeedbackMessage('Progress loaded! Let\'s learn something new.');
                        setFeedbackType('info');
                    }
                })
                .catch(err => {
                    console.error("Failed to fetch or parse progress:", err);
                    if (err.message.includes("not JSON")) {
                        setFeedbackMessage(`Failed to parse server response. Please check the API at /api/progress/${userId}. Details in console.`);
                    } else if (err.message.includes("Failed to fetch")) {
                        setFeedbackMessage("Could not connect to the server to load your progress. Please check your internet connection and console.");
                    } else {
                        setFeedbackMessage(`Error loading progress: ${err.message}. Check console for details.`);
                    }
                    setFeedbackType('error');
                });
        } else {
            console.warn("User ID not provided. Cannot save or load progress.");
            if (feedbackMessage === '✨ Welcome! Click "Say it!" on an item to start. ✨') {
                setFeedbackMessage("User ID not provided. Progress cannot be saved or loaded.");
                setFeedbackType('error');
            }
        }
    }, [userId]);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                console.log("Component unmounting, aborting recognition.");
                recognitionRef.current.abort();
                recognitionRef.current = null;
            }
        };
    }, []);

    const playAudio = (src) => {
        console.log("Playing audio:", src);
        if (!src) {
            console.warn("No audio source provided.");
            setFeedbackMessage("No sound available for this item.");
            setFeedbackType('info');
            return;
        }
        try {
            const audio = new Audio(src);
            audio.play().catch(e => {
                console.error("Error playing audio:", e);
                setFeedbackMessage("Could not play the sound. Browser might have blocked it or path is incorrect.");
                setFeedbackType('error');
            });
        } catch (error) {
            console.error("Error creating audio object:", error);
            setFeedbackMessage("Oops! We couldn't prepare the sound. Check audio paths.");
            setFeedbackType('error');
        }
    };

    const playRewardSound = () => {
        const rewardAudio = new Audio('/audio/awesome.mp3');
        rewardAudio.play().catch(e => {
            console.error("Error playing reward sound:", e);
        });
    };

    const startRecognition = (itemKeyToRecognize) => { // Parameter is the specific item's key
        console.log(`Starting recognition for: ${itemKeyToRecognize}`);
        if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
            setFeedbackMessage("Speech recognition is not supported. Try Chrome or Edge!");
            setFeedbackType('error');
            return;
        }

        if (recognitionRef.current) {
            try {
                recognitionRef.current.abort();
            } catch (e) { console.error("Error aborting previous recognition instance:", e); }
        }
        
        setCurrentItemKeyForRecognition(itemKeyToRecognize); // Set which item we are listening for
        hasProcessedResultOrError.current = false;
        userManuallyStopped.current = false;

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognitionAPI();
        recognitionRef.current = recognition;

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log("Speech recognition started (onstart event).");
            setIsListening(true);
            setFeedbackMessage('🎤 Listening carefully...');
            setFeedbackType('info');
        };

        recognition.onresult = async (event) => {
            console.log("Speech recognition result received (onresult event):", event);
            hasProcessedResultOrError.current = true;

            if (!event.results || !event.results[0] || !event.results[0][0] || typeof event.results[0][0].transcript === 'undefined') {
                console.error("Unexpected speech recognition result structure:", event.results);
                setFeedbackMessage("🤔 Oops! We received something, but couldn't process the words. Try again?");
                setFeedbackType('error');
                return;
            }

            let transcript = event.results[0][0].transcript.trim().toUpperCase();
            const expectedStr = itemKeyToRecognize.toString().toUpperCase();

            console.log(`Expected: "${expectedStr}", Raw Recognized: "${transcript}"`);
            const correctedTranscript = phoneticMap[transcript] || transcript;
            console.log(`Corrected transcript: "${correctedTranscript}"`);

            const success = correctedTranscript === expectedStr;

            if (success) {
                setFeedbackMessage(`🎉 Hooray! You said: "${correctedTranscript}" - That's right!`);
                setFeedbackType('success');
                setStars((prev) => prev + 1);
                setXp((prev) => prev + 10);
                setShowReward(true);
                playRewardSound();
                setTimeout(() => setShowReward(false), 2000);

                setLearnedItems((prev) => {
                    if (prev.includes(expectedStr)) return prev;
                    const newLearnedItems = [...prev, expectedStr];
                    console.log("Learned items updated:", newLearnedItems);
                    if (userId) {
                        fetch('/api/progress/update', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ userId, item: expectedStr, stars: 1, xp: 10 }),
                        })
                        .then(response => {
                            if (!response.ok) console.error("Failed to update progress on server:", response.status, response.statusText);
                            else console.log("Progress updated on server successfully.");
                        })
                        .catch(error => console.error("Error updating progress on server:", error));
                    } else {
                        console.warn("No userId, cannot update progress on server.");
                    }
                    return newLearnedItems;
                });
            } else {
                setFeedbackMessage(`🤔 Hmm, you said: "${transcript}". We were expecting "${expectedStr}". Give it another go!`);
                setFeedbackType('error');
            }
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error (onerror event):", event.error, event.message);
            hasProcessedResultOrError.current = true;
            if (event.error === 'no-speech') setFeedbackMessage('🔇 We didn\'t hear anything. Make sure your microphone is ready and try speaking clearly!');
            else if (event.error === 'audio-capture') setFeedbackMessage('🎤 Uh oh! There\'s a problem with your microphone. Please check it and browser permissions.');
            else if (event.error === 'not-allowed') setFeedbackMessage('🎤 Microphone access is needed! Please allow it in your browser settings to use this feature.');
            else if (event.error === 'aborted') {
                if (!userManuallyStopped.current) setFeedbackMessage('🛑 Recording aborted unexpectedly. Click "Say it!" to try again.');
                else console.log("Recognition aborted by user.");
            } else if (event.error === 'language-not-supported') setFeedbackMessage('🌎 Speech recognition language not supported.');
            else setFeedbackMessage(`🎤 Oops! A speech recognition error occurred: ${event.error}. Check the console.`);
            
            setFeedbackType('error');
            setIsListening(false);
            setCurrentItemKeyForRecognition(null); // Clear active item on error
            recognitionRef.current = null;
        };

        recognition.onend = () => {
            console.log("Speech recognition ended (onend event).");
            setIsListening(false);
            setCurrentItemKeyForRecognition(null); // Clear active item on end

            if (!userManuallyStopped.current && !hasProcessedResultOrError.current) {
                setFeedbackMessage('🏁 Listening session ended. Ready for another try.');
                setFeedbackType('info');
            }
            recognitionRef.current = null;
            console.log("recognitionRef.current set to null in onend.");
        };

        try {
            console.log("Attempting to call recognition.start()");
            recognition.start();
            console.log("recognition.start() called successfully.");
        } catch (e) {
            console.error("Error calling recognition.start():", e);
            setIsListening(false);
            setCurrentItemKeyForRecognition(null); // Clear active item on start error
            setFeedbackMessage('🎤 Could not start voice recognition. Is another app using your microphone, or permission denied? Check console.');
            setFeedbackType('error');
            if (recognitionRef.current) { recognitionRef.current = null; }
            hasProcessedResultOrError.current = true;
        }
    };

    const stopRecognition = () => {
        console.log("stopRecognition called.");
        if (recognitionRef.current && isListening) {
            console.log("Attempting to call recognition.stop()");
            userManuallyStopped.current = true;
            setFeedbackMessage('🛑 Recording stopped by user. Ready for another try.');
            setFeedbackType('info');
            try {
                recognitionRef.current.stop();
                // onend will fire, which now also clears currentItemKeyForRecognition and sets isListening to false.
            } catch (e) {
                console.error("Error calling recognition.stop():", e);
                setIsListening(false);
                setCurrentItemKeyForRecognition(null);
                recognitionRef.current = null;
                setFeedbackMessage('🛑 Recording stopped, but encountered an error during stop. Ready for another try.');
                setFeedbackType('error');
            }
        } else {
            console.log("stopRecognition called, but no active recognition or not listening.");
            if (!isListening) {
                setFeedbackMessage('Already stopped. Click "Say it!" to start again.');
                setFeedbackType('info');
            }
        }
    };

    const getFeedbackMessageStyle = () => {
        switch (feedbackType) {
            case 'success': return 'text-green-700 bg-green-100 border-green-500';
            case 'error': return 'text-red-700 bg-red-100 border-red-500';
            default: return 'text-blue-700 bg-blue-100 border-blue-500';
        }
    };

    const getItemKey = (item) => {
        return tab === 'alphabets' ? item.letter : item.digit.toString();
    };

    return (
        <div className="p-4 md:p-8 bg-gradient-to-br from-gray-700 via-gray-900 to-black min-h-screen font-sans antialiased text-white">
            <style>{`
                @keyframes pop-in-reward {
                    0% { transform: scale(0.5) translateY(20px); opacity: 0; }
                    60% { transform: scale(1.2) translateY(-10px); opacity: 1; }
                    80% { transform: scale(1.1) translateY(5px); }
                    100% { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-pop-in-reward { animation: pop-in-reward 0.6s ease-out forwards; }
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
                .font-poppins { font-family: 'Poppins', sans-serif; }

                /* For animate-ping-slow if not in Tailwind config */
                @keyframes ping-slow {
                    75%, 100% {
                        transform: scale(1.5); /* Adjust scale for desired "ping" size */
                        opacity: 0;
                    }
                }
                .animate-ping-slow {
                    animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>

            <header className="text-center mb-6 md:mb-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-purple-700 drop-shadow-lg font-poppins tracking-wide leading-tight">
                    🌈✨ Fun Learning Zone! ✨🧸
                </h1>
            </header>

            {showReward && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
                    <div className="text-5xl sm:text-6xl md:text-7xl text-yellow-400 p-6 sm:p-10 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl shadow-xl text-center animate-pop-in-reward">
                        <span role="img" aria-label="star trophy star" className="block text-7xl sm:text-8xl animate-fade-in">🌟🏆🌟</span>
                        <p className="mt-4 text-2xl font-semibold text-white">Awesome!</p>
                    </div>
                </div>
            )}

            <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl mx-auto mb-6 md:mb-10">
                <div className="text-center mb-4 md:mb-6">
                    <p className="text-xl sm:text-2xl font-bold text-pink-600">Level: {level}</p>
                    <p className="text-base sm:text-lg text-amber-700 my-1">Stars: {stars} <span role="img" aria-label="star">⭐</span> | XP: {xp}</p>
                    <div className="w-full bg-gray-200 rounded-full h-4 md:h-5 mt-2 mx-auto max-w-lg shadow-inner overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-400 to-lime-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-center text-white font-semibold text-xs sm:text-sm"
                            style={{ width: `${xpToNextLevel > 0 ? (xpProgress / xpToNextLevel) * 100 : 0}%` }}
                            title={`${xpProgress}/${xpToNextLevel} XP`}
                        >
                            {xpToNextLevel > 0 ? `${Math.round((xpProgress / xpToNextLevel) * 100)}%` : '0%'}
                        </div>
                    </div>
                    <p className="text-xs sm:text-sm mt-1 text-gray-600">{xpProgress}/{xpToNextLevel} XP to next level</p>
                </div>

                {feedbackMessage && (
                    <div className={`p-3 my-4 rounded-xl border-2 text-center text-md sm:text-lg font-semibold ${getFeedbackMessageStyle()} shadow-md break-words`}>
                        {feedbackMessage}
                    </div>
                )}

                {isListening && (
                    <div className="text-center my-4">
                        <button
                            onClick={stopRecognition}
                            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform text-md sm:text-lg"
                            disabled={!isListening} // Technically, `isListening` state should suffice here
                        >
                            <span role="img" aria-label="stop">🛑</span> Stop Recording
                        </button>
                    </div>
                )}
            </div>

            <div className="flex justify-center mb-6 md:mb-8 space-x-2 sm:space-x-4">
                {['alphabets', 'numbers'].map((section) => (
                    <button
                        key={section}
                        onClick={() => setTab(section)}
                        className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-md sm:text-lg shadow-md transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4
                            ${tab === section
                                ? 'bg-orange-500 text-white ring-orange-300'
                                : 'bg-white text-orange-600 hover:bg-orange-100 ring-orange-200 hover:ring-orange-300'
                            }`}
                    >
                        {section === 'alphabets' ? '🔤 Alphabets' : '🔢 Numbers'}
                    </button>
                ))}
            </div>
            
            {/* --- INTEGRATED LearningGrid --- */}
            <LearningGrid
                tab={tab}
                items={tab === 'alphabets' ? alphabets : numbers}
                learnedItems={learnedItems}
                playAudio={playAudio}
                startRecognition={startRecognition}
                isListening={isListening}
                getItemKey={getItemKey}
                currentItemKey={currentItemKeyForRecognition}
            />

            <footer className="text-center mt-10 py-6 text-gray-400"> {/* Adjusted footer text color for dark bg */}
                <p>&copy; {new Date().getFullYear()} Kid's Learning App. Keep Shining! ✨</p>
            </footer>
        </div>
    );
};

export default LearningDashboard;