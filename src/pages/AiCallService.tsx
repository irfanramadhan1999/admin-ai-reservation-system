
import React from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { RestaurantInfoCard } from '@/components/ai-call-service/RestaurantInfoCard';
import { CallInterface } from '@/components/ai-call-service/CallInterface';
import { InfoAlert } from '@/components/ai-call-service/InfoAlert';
import { ReservationDetails } from '@/components/ai-call-service/ReservationDetails';
import { useAiCallService } from '@/components/ai-call-service/useAiCallService';

const AiCallService = () => {
  const {
    restaurantData,
    isCallActive,
    callStatus,
    reservationDetails,
    animatePulse,
    startCall,
    endCall,
    handleEditReservation,
    handleCancelReservation
  } = useAiCallService();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DashboardLayout>
      <DashboardHeader 
        title="AI Call Service" 
        subtitle="Handle reservations through voice interaction with AI assistant."
        date={currentDate}
      />

      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        {/* Restaurant Information */}
        <RestaurantInfoCard restaurantData={restaurantData} />

        {/* Information alert for first-time users */}
        <InfoAlert show={callStatus === 'idle' && !reservationDetails} />

        {/* AI Call Interface */}
        <CallInterface
          isCallActive={isCallActive}
          callStatus={callStatus}
          animatePulse={animatePulse}
          reservationDetails={reservationDetails}
          startCall={startCall}
          endCall={endCall}
        />

        {/* Reservation Details */}
        <ReservationDetails
          reservationDetails={reservationDetails}
          onEdit={handleEditReservation}
          onCancel={handleCancelReservation}
        />
      </div>
    </DashboardLayout>
  );
};

export default AiCallService;
