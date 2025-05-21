
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for peak times
const peakTimeData = [
  { time: "08:00", bookings: 2 },
  { time: "09:00", bookings: 3 },
  { time: "10:00", bookings: 4 },
  { time: "11:00", bookings: 6 },
  { time: "12:00", bookings: 14 },
  { time: "13:00", bookings: 16 },
  { time: "14:00", bookings: 11 },
  { time: "15:00", bookings: 5 },
  { time: "16:00", bookings: 4 },
  { time: "17:00", bookings: 7 },
  { time: "18:00", bookings: 15 },
  { time: "19:00", bookings: 18 },
  { time: "20:00", bookings: 13 },
  { time: "21:00", bookings: 9 },
  { time: "22:00", bookings: 4 },
];

const chartConfig = {
  bookings: {
    label: "Bookings",
    theme: {
      light: "#0066FF",
      dark: "#2563eb",
    },
  },
};

export function ReservationTrend() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-lg font-medium">Today's Peak Times & Traffic</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={peakTimeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(time) => time}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="var(--color-bookings)"
                  strokeWidth={2}
                  fill="url(#colorBookings)"
                  activeDot={{ r: 6 }}
                  name="bookings"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div className="mt-4 flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">12:00, 19:00</span>
            <span className="text-sm text-muted-foreground">Peak Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-semibold">147</span>
            <span className="text-sm text-muted-foreground">Total Traffic Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
