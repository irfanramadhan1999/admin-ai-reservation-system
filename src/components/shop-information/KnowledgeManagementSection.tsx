import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FileText, Eye, Trash2 } from 'lucide-react';
import { Document } from '@/hooks/shop-information';

interface KnowledgeManagementSectionProps {
  shopKnowledge: string;
  setShopKnowledge: (value: string) => void;
  documents: Document[];
  handleDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDocumentDelete: (index: number) => void;
}

export const KnowledgeManagementSection: React.FC<KnowledgeManagementSectionProps> = ({
  shopKnowledge,
  setShopKnowledge,
  documents,
  handleDocumentUpload,
  handleDocumentDelete
}) => {
  return (
    <Card className="mb-8 rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Knowledge Management</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="shopKnowledge">Knowledge for AI</Label>
            <Textarea
              id="shopKnowledge"
              value={shopKnowledge}
              onChange={(e) => setShopKnowledge(e.target.value)}
              className="mt-1 min-h-[150px]"
              placeholder="Enter knowledge information about the shop that the AI can use..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              This information will be used by the AI assistant when interacting with customers.
            </p>
          </div>

          <div>
            <Label className="block mb-2">Documents (PDF)</Label>
            
            {/* Display current documents */}
            {documents.length > 0 ? (
              <div className="space-y-3 mb-4">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      <span>{doc.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDocumentDelete(index)} 
                        className="text-destructive border-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">No documents uploaded yet.</p>
            )}
            
            {/* Document upload button */}
            <div>
              <input
                id="documentUpload"
                type="file"
                accept=".pdf"
                onChange={handleDocumentUpload}
                className="hidden"
              />
              <label htmlFor="documentUpload">
                <Button type="button" variant="outline" className="cursor-pointer">
                  Upload New Document
                </Button>
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Upload PDF documents containing additional information about your shop.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
