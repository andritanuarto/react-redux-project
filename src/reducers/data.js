
import { DATA } from '../actions/action-types';

const initialState = {
  gitIssues: null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DATA.GIT_ISSUES_DATA_HANDLER: {
      return Object.assign({}, state, {
        gitIssues: action.data
      });
    }

    case DATA.STATE_RESET_HANDLER: {
      return Object.assign({}, state, initialState);
    }

    default: {
      return state;
    }
  }
}