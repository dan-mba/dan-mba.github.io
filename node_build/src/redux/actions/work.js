/*
 * redux/actions/work.js
 *
 * store actions for the WorkTab component
 */

export const toggleJob = (index) => (
  { type: 'work/TOGGLE_EXPANDED', index }
);

export const resetJobs = () => (
  { type: 'work/RESET_EXPANDED' }
);
