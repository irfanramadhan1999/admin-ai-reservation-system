
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const seatData = [
  { type: 'Indoor Tables', used: 12, total: 15, className: 'bg-blue-500' },
  { type: 'Outdoor Tables', used: 6, total: 8, className: 'bg-purple-400' },
  { type: 'Counter Seats', used: 8, total: 10, className: 'bg-emerald-400' },
  { type: 'Private Room', used: 0, total: 1, className: 'bg-gray-300' },
];

export function SeatAvailability() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Seat Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {seatData.map((seat) => (
            <div key={seat.type} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{seat.type}</span>
                <span className="text-sm text-muted-foreground">
                  {seat.used}/{seat.total}
                </span>
              </div>
              <Progress 
                value={(seat.used / seat.total) * 100} 
                className={seat.className}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
