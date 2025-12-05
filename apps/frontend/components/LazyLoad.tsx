import React, { Suspense, lazy } from 'react';

// Lazy load heavy components
export const LazyHeroSlider = lazy(() => import('./HeroSlider'));
export const LazyService3DCard = lazy(() => import('./Service3DCard'));
export const LazyCircuitBackground = lazy(() => import('./CircuitBackground'));
export const LazyTaxCalculator = lazy(() => import('./TaxCalculator'));
export const LazyFAQ = lazy(() => import('./FAQ'));

// Loading fallback
export const ComponentLoader: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <div className="border-ultra-accent h-12 w-12 animate-spin rounded-full border-b-2"></div>
  </div>
);

// Wrapper for lazy components
export const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
  return (props: any) => (
    <Suspense fallback={<ComponentLoader />}>
      <Component {...props} />
    </Suspense>
  );
};
