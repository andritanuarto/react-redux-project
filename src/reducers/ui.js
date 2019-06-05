import { UI } from '../actions/action-types';
import { CONFIG } from '../config';

const initialState = {
  page: 'searchPage',
  gitRepoUrl: '',
  gitApiRepoUrl: '',
  issuePageNumber: 1,
  issueFilter: null,
  errorInput: false,
  loadingState: false
};

export default (state = initialState, action = {}) => {
  const { GIT_REPO_BASE_URL, GIT_API_BASE_URL, GIT_ISSUE_PER_PAGE } = CONFIG;
  switch (action.type) {
    case UI.REPO_URL_HANLDER: {
      const apiRepoUrl = `
        ${action.url.replace(GIT_REPO_BASE_URL, GIT_API_BASE_URL)}/issues?state=all&page=${state.issuePageNumber}&per_page=${GIT_ISSUE_PER_PAGE}
      `;

      return Object.assign({}, state, {
        gitRepoUrl: action.url,
        gitApiRepoUrl: apiRepoUrl,
        issueFilter: 'all'
      });
    }

    case UI.CHANGE_PAGE_HANDLER: {
      return Object.assign({}, state, {
        page: action.page,
      });
    }

    case UI.CHANGE_PAGE_NUMBER_HANDLER: {
      let pageNumber = state.issuePageNumber;

      if (action.method === 'increment') {
        pageNumber = state.issuePageNumber + 1;
      } else {
        pageNumber = state.issuePageNumber - 1;
      }

      return Object.assign({}, state, {
        issuePageNumber: pageNumber
      });
    }

    case UI.ISSUE_FILTER_HANDLER: {
      let apiRepoUrl;

      if (action.filterType !== 'pulls') {
        apiRepoUrl = `
          ${state.gitRepoUrl.replace(GIT_REPO_BASE_URL, GIT_API_BASE_URL)}/issues?state=${action.filterType}&page=${state.issuePageNumber}&per_page=${GIT_ISSUE_PER_PAGE}
        `;
      } else {
        apiRepoUrl = `
          ${state.gitRepoUrl.replace(GIT_REPO_BASE_URL, GIT_API_BASE_URL)}/${action.filterType}?page=${state.issuePageNumber}&per_page=${GIT_ISSUE_PER_PAGE}
        `;
      }

      return Object.assign({}, state, {
        issueFilter: action.filterType,
        gitApiRepoUrl: apiRepoUrl
      });
    }

    case UI.STATE_RESET_HANDLER: {
      return Object.assign({}, state, initialState);
    }

    case UI.ERROR_HANDLER: {
      return Object.assign({}, state, {
        errorInput: action.state
      });
    }

    case UI.LOADING_HANDLER: {
      return Object.assign({}, state, {
        loadingState: action.loadingState
      });
    }

    default: {
      return state;
    }
  }
}