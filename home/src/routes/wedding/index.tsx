import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import Loader from '../../components/Loader';

const Wedding = React.lazy(() => import('wedding/Wedding'));

export default function WeddingRoute() {
  return (
    <div>
      <React.Suspense fallback={<Loader />}>
        <Wedding />
      </React.Suspense>
    </div>
  );
}

export const Route = createFileRoute('/wedding/')({
  component: WeddingRoute,
});
