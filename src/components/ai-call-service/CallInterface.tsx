
import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CallInterfaceProps {
  isCallActive: boolean;
  callStatus: 'idle' | 'connecting' | 'active' | 'completed';
  animatePulse: boolean;
  reservationDetails: any;
  startCall: () => void;
  endCall: () => void;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({
  isCallActive,
  callStatus,
  animatePulse,
  reservationDetails,
  startCall,
  endCall,
}) => {
  return (
    <div className="relative w-full aspect-square max-w-md mb-8 flex items-center justify-center">
      <div className={`absolute inset-0 rounded-full ${
        callStatus === 'active' 
          ? 'bg-gradient-to-r from-purple-200 via-blue-200 to-purple-200' 
          : 'bg-gradient-to-r from-gray-100 to-blue-100'
      } opacity-70 transition-all duration-500 ${animatePulse ? 'animate-pulse' : ''}`}></div>
      
      <div className={`absolute rounded-full w-3/4 h-3/4 ${
        callStatus === 'active' 
          ? 'bg-gradient-to-r from-blue-100 to-purple-100' 
          : 'bg-gradient-to-r from-gray-50 to-blue-50'
      } opacity-50 transition-all duration-500`}></div>
      
      <Button 
        variant={isCallActive ? "destructive" : "default"}
        size="lg"
        className={`rounded-full h-24 w-24 flex items-center justify-center z-10 shadow-lg transition-transform duration-300 ${isCallActive ? 'hover:bg-red-600' : 'hover:bg-blue-600'} ${
          isCallActive ? '' : 'hover:scale-105'
        }`}
        onClick={isCallActive ? endCall : startCall}
      >
        {isCallActive ? (
          <MicOff className="h-10 w-10" />
        ) : (
          <Mic className="h-10 w-10" />
        )}
      </Button>
      
      <div className="absolute bottom-2 text-center font-medium bg-white/60 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
        {callStatus === 'idle' && !reservationDetails && "Start AI Call"}
        {callStatus === 'connecting' && "Connecting..."}
        {callStatus === 'active' && (
          <span className="flex items-center">
            <span className="inline-block h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Listening...
          </span>
        )}
        {callStatus === 'completed' && "Call Completed"}
      </div>
    </div>
  );
};
