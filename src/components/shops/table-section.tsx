
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { TableItem } from './table-item';
import { TableData } from './table-types';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TableSectionProps {
  typeId: string;
  typeName: string;
  tables: TableData[];
  currentPage: number;
  totalPages: number;
  onSelectTable: (table: TableData) => void;
  onAddTable: (typeId: string) => void;
  onPageChange: (typeId: string, page: number) => void;
}

export function TableSection({
  typeId,
  typeName,
  tables,
  currentPage,
  totalPages,
  onSelectTable,
  onAddTable,
  onPageChange
}: TableSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{typeName} Section</h3>
        <Button 
          size="sm" 
          onClick={() => onAddTable(typeId)}
          className="h-8"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Table
        </Button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((table) => (
          <TableItem
            key={table.id}
            table={table}
            onSelectTable={onSelectTable}
          />
        ))}
      </div>
      
      {/* Pagination for each table type */}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              {/* Previous button */}
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange(typeId, Math.max(1, currentPage - 1))}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {/* Numbered pages */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                // Show first page, current page, last page and one page on each side of current page
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  Math.abs(pageNumber - currentPage) <= 1
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={pageNumber === currentPage}
                        onClick={() => onPageChange(typeId, pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  pageNumber === 2 && currentPage > 3 ||
                  pageNumber === totalPages - 1 && currentPage < totalPages - 2
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}
              
              {/* Next button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(typeId, Math.min(totalPages, currentPage + 1))}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
