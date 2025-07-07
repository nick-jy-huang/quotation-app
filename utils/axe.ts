import axe from 'axe-core';

export default function runAxeCheck() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('axe-core can only be run in the browser.');
  }
  axe.run().then(results => {
    if (results.violations.length) {
      console.warn('Accessibility issues found:', results.violations);
    } else {
      console.log('No accessibility issues found!');
    }
  }).catch(err => {
    console.error('Something bad happened:', err.message);
  });
}

