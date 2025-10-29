import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

const Wedding = React.lazy(() => import('wedding/Wedding'));

export default function WeddingRoute() {
  return (
    <div>
      <React.Suspense fallback="loading">
        <Wedding />
      </React.Suspense>
    </div>
  );
}

export const Route = createFileRoute('/wedding/')({
  component: WeddingRoute,
});
