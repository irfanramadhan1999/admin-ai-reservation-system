import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { OperatingHour } from '@/hooks/shop-information';

interface OperatingHoursSectionProps {
  is24Hours: boolean;
  setIs24Hours: (value: boolean) => void;
  operatingHours: OperatingHour[];
  handleToggleDay: (index: number) => void;
  handleTimeChange: (index: number, field: 'openTime' | 'closeTime', value: string) => void;
}

export const OperatingHoursSection: React.FC<OperatingHoursSectionProps> = ({
  is24Hours,
  setIs24Hours,
  operatingHours,
  handleToggleDay,
  handleTimeChange
}) => {
  return (
    <Card className="mb-8 rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Operating Hours</h2>
          <div className="flex items-center gap-2">
            <Switch 
              checked={is24Hours} 
              onCheckedChange={setIs24Hours} 
            />
            <span>Open 24/7</span>
          </div>
        </div>
        
        {!is24Hours && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 w-24">Day</th>
                  <th className="text-left py-2 w-20">Open</th>
                  <th className="text-left py-2">Hours</th>
                </tr>
              </thead>
              <tbody>
                {operatingHours.map((hours, index) => (
                  <tr key={hours.day} className="border-b">
                    <td className="py-3">
                      <span className="font-medium">{hours.day}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={hours.isOpen} 
                          onCheckedChange={() => handleToggleDay(index)}
                        />
                      </div>
                    </td>
                    <td className="py-3">
                      {hours.isOpen ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            value={hours.openTime}
                            onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                            className="w-32"
                            disabled={!hours.isOpen}
                          />
                          <span>to</span>
                          <Input
                            type="time"
                            value={hours.closeTime}
                            onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                            className="w-32"
                            disabled={!hours.isOpen}
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
