import { useState, useRef, useCallback } from 'react';
import axios from 'axios';

interface UseVoiceGenieProps {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onSilence?: () => void;
  onLoading?: (status: { status: string; file: string; progress: number }) => void;
  language?: string;
}

export const useVoiceGenie = ({
  onResult,
  onError,
  onSilence,
  onLoading,
  language = 'en-US',
}: UseVoiceGenieProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false); // No local model

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Silence Timer Helpers ---
  const startSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
    //   if (onSilence && isListening) onSilence(); // Logic changed: we stop on silence
      stopListening();
    }, 2500); 
  };

  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
  };

  // --- Audio Capture ---
  const startListening = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        
        if (audioBlob.size > 0) {
           await uploadAudio(audioBlob);
        }
      };

      mediaRecorder.start();
      setIsListening(true);
      
      // We can't detect silence easily with MediaRecorder without analyzing audio context.
      // For now, reliance is on User manual stop or we re-introduce AudioContext just for silence detection?
      // Simpler approach: Manual stop for MVP or add a separate silence detector if needed.
      // The user prompt implied standard "Record -> Stop -> Transcribe" flow.
      // However, if we want auto-stop, we can use `monitorSilence` using AudioContext.
      // Let's stick to manual stop + optional timeout for safety?
      // Or just Manual stop.
      
    } catch (err: any) {
      console.error("Mic Error:", err);
      setError("Microphone access denied or not available");
      if (onError) onError("Microphone access denied");
    }
  }, [onError]);

  const uploadAudio = async (blob: Blob) => {
      try {
        if (onLoading) onLoading({ status: 'transcribing', file: 'audio', progress: 0 });
        
        const formData = new FormData();
        formData.append('audio', blob, 'voice.webm');
        // 'language' prop is passed to useVoiceGenie, default is 'en-US'
        // If the VoiceFlow has a way to change languages dynamically, it should update this prop.
        // For now, we use the prop passed to the hook.
        // NOTE: The `useVoiceGenie` hook accepts a `language` property in props (line 12/17).
        // However, it is not currently destructured from props in the function arguments?
        // Wait, line 12: export const useVoiceGenie = ({ onResult, onError, onSilence, onLoading }: UseVoiceGenieProps) => {
        // 'language' is missing from destructuring!
        formData.append('language', language || 'en-US');

        // Adjust URL as needed. Assuming Vite proxy or same-domain if production.
        // If dev, backend is 5000. Frontend is 5173.
        const apiUrl = 'http://localhost:5000/api/stt/transcribe'; 

        const res = await axios.post(apiUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        const text = res.data.text;
        if (text) {
            onResult(text, true);
        }

      } catch (err: any) {
          console.error("Transcription Failed:", err);
          setError("Transcription failed");
          if (onError) onError("Transcription failed");
      } finally {
        if (onLoading) onLoading({ status: 'idle', file: '', progress: 100 });
      }
  };

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsListening(false);
    clearSilenceTimer();
  }, []);

  const abortListening = useCallback(() => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
         // Stop without triggering upload?
         // mediaRecorder.onstop calls upload. 
         // We can clear chunks or remove handler.
         mediaRecorderRef.current.onstop = null;
         mediaRecorderRef.current.stop();
      }
      setIsListening(false);
      clearSilenceTimer();
  }, []);


  // --- TTS ---
  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // utterance.lang = 'en-US'; // Optional: Enforce English if desired, or let browser default
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }, []);

  const cancelSpeech = useCallback(() => {
      if(window.speechSynthesis) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
      }
  }, []);

  // --- Structure Data ---
  const structureProfile = useCallback(async (context: any) => {
      try {
          // Adjust URL as needed
          const apiUrl = 'http://localhost:5000/api/structure/structure'; 
          const res = await axios.post(apiUrl, { context });
          return res.data;
      } catch (err) {
          console.error("Structuring Failed:", err);
          return null;
      }
  }, []);

  return {
    isListening,
    isSpeaking,
    isModelLoading, // Always false now
    error,
    startListening,
    stopListening,
    abortListening,
    speak,
    cancelSpeech,
    structureProfile,
    isSupported: true 
  };
};
