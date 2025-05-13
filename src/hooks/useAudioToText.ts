// import { useEffect, useRef, useState } from 'react';

// export const useAudioToText = ({ lang = 'en-US', continuous = true } = {}) => {
//     const [transcript, setTranscript] = useState('');
//     const [isListening, setIsListening] = useState(false);
//     const recognitionRef = useRef(null);

//     useEffect(() => {
//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//         if (!SpeechRecognition) {
//             console.warn('Web Speech API is not supported in this browser.');
//             return;
//         } else {
//             console.log('Records starts');
//         }

//         if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
//             console.warn('Web Speech API is not supported in this browser.');
//             return;
//         }

//         const recognition = new SpeechRecognition();
//         recognition.lang = lang;
//         recognition.continuous = continuous;
//         recognition.interimResults = true;

//         recognition.onresult = (event) => {
//             let finalTranscript = '';
//             let interimTranscript = '';

//             for (let i = event.resultIndex; i < event.results.length; ++i) {
//                 const text = event.results[i][0].transcript;
//                 if (event.results[i].isFinal) {
//                     finalTranscript += text + ' ';
//                 } else {
//                     interimTranscript += text;
//                 }
//             }

//             setTranscript(finalTranscript + interimTranscript);
//         };

//         recognition.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//         };

//         recognition.onend = () => {
//             setIsListening(false);
//         };

//         recognitionRef.current = recognition;

//         return () => {
//             recognition.stop();
//         };
//     }, [isListening, lang, continuous]);

//     const startListening = () => {
//         if (recognitionRef.current) {
//             recognitionRef.current.start();
//             setIsListening(true);
//         }
//     };

//     const stopListening = () => {
//         if (recognitionRef.current) {
//             recognitionRef.current.stop();
//             setIsListening(false);
//         }
//     };

//     const resetTranscript = () => {
//         setTranscript('');
//     };

//     return {
//         transcript,
//         isListening,
//         startListening,
//         stopListening,
//         resetTranscript,
//     };
// };
