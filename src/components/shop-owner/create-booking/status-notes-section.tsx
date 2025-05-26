
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StatusNotesSectionProps {
  status: string;
  notes: string;
  onStatusChange: (status: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const StatusNotesSection: React.FC<StatusNotesSectionProps> = ({
  status,
  notes,
  onStatusChange,
  onInputChange
}) => {
  return (
    <>
      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={onInputChange}
          placeholder="Add any special requests or notes here"
          rows={3}
        />
      </div>
    </>
  );
};
