import { toggleJob, resetJobs } from './work';

describe('actions', () => {
  it('should create an action to toggle index', () => {
    const index = 2;
    const expectedAction = {
      type: 'work/TOGGLE_EXPANDED',
      index,
    };
    expect(toggleJob(index)).toEqual(expectedAction);
  });

  it('should create an action to reset toggles', () => {
    const expectedAction = {
      type: 'work/RESET_EXPANDED',
    };
    expect(resetJobs()).toEqual(expectedAction);
  });
});
