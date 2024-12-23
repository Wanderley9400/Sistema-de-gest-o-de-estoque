import React from 'react';
import { ProductAlert } from '../types/product';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface AlertListProps {
  alerts: ProductAlert[];
}

export function AlertList({ alerts }: AlertListProps) {
  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert, index) => (
        <div
          key={`${alert.productId}-${index}`}
          className={`p-4 rounded-md ${
            alert.severity === 'danger' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {alert.severity === 'danger' ? (
            <AlertCircle className="inline-block w-5 h-5 mr-2" />
          ) : (
            <AlertTriangle className="inline-block w-5 h-5 mr-2" />
          )}
          {alert.message}
        </div>
      ))}
    </div>
  );
}