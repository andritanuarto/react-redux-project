import { DATA } from './action-types';

export const gitIssuesDataHandler = (data) => {
  return {
    type: DATA.GIT_ISSUES_DATA_HANDLER,
    data
  }
};

export const dataStateResetHandler = () => {
  return {
    type: DATA.STATE_RESET_HANDLER,
  }
};
