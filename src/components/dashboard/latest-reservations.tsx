
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const reservationData = [
  { id: 1, name: 'Michael Johnson', date: 'June 15', time: '19:00', partySize: 4 },
  { id: 2, name: 'Sarah Williams', date: 'June 15', time: '19:45', partySize: 2 },
  { id: 3, name: 'David Brown', date: 'June 15', time: '20:30', partySize: 6 },
  { id: 4, name: 'Emily Davis', date: 'June 16', time: '18:15', partySize: 3 },
];

export function LatestReservations() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Latest Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reservationData.map((reservation) => (
            <div 
              key={reservation.id} 
              className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col">
                <span className="font-medium">{reservation.name}</span>
                <span className="text-xs text-muted-foreground">
                  {reservation.date} • {reservation.time}
                </span>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                <span className="text-xs font-medium">{reservation.partySize}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
