
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
      {/* Outer ring with gradient */}
      <div className={`absolute inset-0 rounded-full blur-md ${
        callStatus === 'active' 
          ? 'bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300' 
          : 'bg-gradient-to-r from-gray-200 to-blue-200'
      } opacity-70 transition-all duration-500 ${animatePulse ? 'animate-pulse' : ''}`}></div>
      
      {/* Inner rings */}
      <div className={`absolute rounded-full w-[85%] h-[85%] ${
        callStatus === 'active' 
          ? 'bg-gradient-to-r from-blue-200 to-purple-200' 
          : 'bg-gradient-to-r from-gray-100 to-blue-100'
      } opacity-60 transition-all duration-500`}></div>
      
      <div className={`absolute rounded-full w-[70%] h-[70%] ${
        callStatus === 'active' 
          ? 'bg-gradient-to-r from-blue-100 to-purple-100' 
          : 'bg-gradient-to-r from-gray-50 to-blue-50'
      } opacity-50 transition-all duration-500`}></div>
      
      {/* Main button */}
      <Button 
        variant={isCallActive ? "destructive" : "default"}
        size="lg"
        className={`rounded-full h-28 w-28 flex items-center justify-center z-10 shadow-xl transition-all duration-300 
          ${isCallActive 
            ? 'bg-gradient-to-br from-red-500 to-red-600 hover:shadow-red-200 hover:bg-red-600' 
            : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:shadow-blue-200 hover:bg-blue-600'} 
          ${isCallActive ? '' : 'hover:scale-105'}`}
        onClick={isCallActive ? endCall : startCall}
      >
        {isCallActive ? (
          <MicOff className="h-12 w-12" />
        ) : (
          <Mic className="h-12 w-12" />
        )}
        <span className="sr-only">{isCallActive ? 'End Call' : 'Start Call'}</span>
      </Button>
      
      {/* Status indicator */}
      <div className="absolute -bottom-2 text-center font-medium bg-white bg-opacity-80 backdrop-blur-sm px-6 py-2 rounded-full shadow-md border border-gray-100">
        {callStatus === 'idle' && !reservationDetails && "Start AI Call"}
        {callStatus === 'connecting' && (
          <div className="flex items-center">
            <div className="flex space-x-1 mr-2">
              <span className="block h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
              <span className="block h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="block h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
            Connecting...
          </div>
        )}
        {callStatus === 'active' && (
          <span className="flex items-center">
            <span className="inline-block h-2 w-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Listening...
          </span>
        )}
        {callStatus === 'completed' && (
          <span className="flex items-center">
            <span className="inline-block h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            Call Completed
          </span>
        )}
      </div>
    </div>
  );
};
