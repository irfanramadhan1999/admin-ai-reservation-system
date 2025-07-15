import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { CalendarDays, DollarSign, TrendingUp } from 'lucide-react';

// Mock data for current month
const currentMonthData = [
  { date: '01', tokens: 12500, day: 'May 1' },
  { date: '02', tokens: 15200, day: 'May 2' },
  { date: '03', tokens: 18900, day: 'May 3' },
  { date: '04', tokens: 14300, day: 'May 4' },
  { date: '05', tokens: 22100, day: 'May 5' },
  { date: '06', tokens: 19800, day: 'May 6' },
  { date: '07', tokens: 16700, day: 'May 7' },
  { date: '08', tokens: 21400, day: 'May 8' },
  { date: '09', tokens: 18600, day: 'May 9' },
  { date: '10', tokens: 25300, day: 'May 10' },
  { date: '11', tokens: 20900, day: 'May 11' },
  { date: '12', tokens: 17800, day: 'May 12' },
  { date: '13', tokens: 23500, day: 'May 13' },
  { date: '14', tokens: 19200, day: 'May 14' },
  { date: '15', tokens: 26100, day: 'May 15' },
  { date: '16', tokens: 22800, day: 'May 16' },
  { date: '17', tokens: 20400, day: 'May 17' },
  { date: '18', tokens: 24700, day: 'May 18' },
  { date: '19', tokens: 21600, day: 'May 19' },
  { date: '20', tokens: 28900, day: 'May 20' },
  { date: '21', tokens: 25400, day: 'May 21' },
  { date: '22', tokens: 23100, day: 'May 22' },
  { date: '23', tokens: 27600, day: 'May 23' },
  { date: '24', tokens: 24800, day: 'May 24' },
  { date: '25', tokens: 26500, day: 'May 25' },
  { date: '26', tokens: 29100, day: 'May 26' },
  { date: '27', tokens: 31200, day: 'May 27' },
  { date: '28', tokens: 28700, day: 'May 28' },
  { date: '29', tokens: 30400, day: 'May 29' },
  { date: '30', tokens: 33100, day: 'May 30' },
];

// Mock data for previous month
const previousMonthData = [
  { date: '01', tokens: 8500, day: 'Apr 1' },
  { date: '02', tokens: 11200, day: 'Apr 2' },
  { date: '03', tokens: 13900, day: 'Apr 3' },
  { date: '04', tokens: 10300, day: 'Apr 4' },
  { date: '05', tokens: 16100, day: 'Apr 5' },
  { date: '06', tokens: 14800, day: 'Apr 6' },
  { date: '07', tokens: 12700, day: 'Apr 7' },
  { date: '08', tokens: 17400, day: 'Apr 8' },
  { date: '09', tokens: 15600, day: 'Apr 9' },
  { date: '10', tokens: 19300, day: 'Apr 10' },
  { date: '11', tokens: 16900, day: 'Apr 11' },
  { date: '12', tokens: 13800, day: 'Apr 12' },
  { date: '13', tokens: 18500, day: 'Apr 13' },
  { date: '14', tokens: 15200, day: 'Apr 14' },
  { date: '15', tokens: 21100, day: 'Apr 15' },
  { date: '16', tokens: 18800, day: 'Apr 16' },
  { date: '17', tokens: 16400, day: 'Apr 17' },
  { date: '18', tokens: 20700, day: 'Apr 18' },
  { date: '19', tokens: 17600, day: 'Apr 19' },
  { date: '20', tokens: 22900, day: 'Apr 20' },
  { date: '21', tokens: 19400, day: 'Apr 21' },
  { date: '22', tokens: 17100, day: 'Apr 22' },
  { date: '23', tokens: 21600, day: 'Apr 23' },
  { date: '24', tokens: 18800, day: 'Apr 24' },
  { date: '25', tokens: 20500, day: 'Apr 25' },
  { date: '26', tokens: 23100, day: 'Apr 26' },
  { date: '27', tokens: 25200, day: 'Apr 27' },
  { date: '28', tokens: 22700, day: 'Apr 28' },
  { date: '29', tokens: 24400, day: 'Apr 29' },
  { date: '30', tokens: 27100, day: 'Apr 30' },
];

const chartConfig = {
  tokens: {
    label: 'Tokens',
    color: 'hsl(220, 70%, 70%)', // Soft blue color
  },
};

export const TokenUsageChart = () => {
  const [selectedMonth, setSelectedMonth] = useState<'current' | 'previous'>('current');

  const data = selectedMonth === 'current' ? currentMonthData : previousMonthData;
  const monthLabel = selectedMonth === 'current' ? 'May 2025' : 'April 2025';
  
  // Calculate totals
  const totalTokens = data.reduce((sum, day) => sum + day.tokens, 0);
  const averageDaily = Math.round(totalTokens / data.length);
  
  // Token pricing: $0.002 per 1,000 tokens (example pricing)
  const pricePerThousandTokens = 0.002;
  const totalCost = (totalTokens / 1000) * pricePerThousandTokens;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Token Usage Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Daily token consumption and cost analysis
        </p>
      </div>

      {/* Chart with embedded stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daily Token Usage - {monthLabel}</CardTitle>
              <CardDescription>
                Token consumption by day showing usage patterns and trends
              </CardDescription>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>Daily Average</span>
                </div>
                <div className="text-lg font-semibold">{averageDaily.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Total Cost</span>
                </div>
                <div className="text-lg font-semibold">${totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 'dataMax + 5000']}
                  ticks={[0, 5000, 10000, 15000, 20000, 25000, 30000, 35000]}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => {
                    if (value === 0) return '0';
                    return `${(value / 1000)}k`;
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [
                        `${(value as number).toLocaleString()} tokens`,
                        'Usage'
                      ]}
                      labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                          return payload[0].payload.day;
                        }
                        return label;
                      }}
                    />
                  }
                />
                <Bar 
                  dataKey="tokens" 
                  fill="var(--color-tokens)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Month Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMonth('previous')}
              disabled={selectedMonth === 'previous'}
            >
              ← Previous Month
            </Button>
            <span className="text-sm text-muted-foreground min-w-[100px] text-center">
              {monthLabel}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedMonth('current')}
              disabled={selectedMonth === 'current'}
            >
              Next Month →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};