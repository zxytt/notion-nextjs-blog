import React from 'react';
import Badge from '../ui/badge';

interface PageInfoProps {
  header?: React.ReactNode;
  description?: string;
  footer?: React.ReactNode;
  itemsLength?: number;
  breadcumb?: React.ReactNode;
}
export default function PageInfo({
  breadcumb,
  header,
  description,
  footer,
  itemsLength,
}: PageInfoProps) {
  return (
    <div className="flex flex-col mt-6 mb-6 gap-4 sm:pl-[15px] sm:gap-4 relative z-50">
      {/* {breadcumb} */}
      <div className="flex flex-col gap-8 sm:gap-2 relative z-50">
        <div className="flex gap-2 items-center">
          {header}
          {itemsLength !== undefined && (
            <Badge className="bg-red-100 text-red-500">{itemsLength}</Badge>
          )}
        </div>
        <p className="text-[20px] text-slate-800 leading-tight sm:text-base">
          {description}
        </p>
      </div>
      {footer}
    </div>
  );
}
