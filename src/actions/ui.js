import { UI } from './action-types';

export const gitRepoSearchHandler = (url) => {
  return {
    type: UI.REPO_URL_HANLDER,
    url
  }
};

export const changePageHandlder = (page) => {
  return {
    type: UI.CHANGE_PAGE_HANDLER,
    page
  }
}

export const issueFilterHandler = (filterType) => {
  return {
    type: UI.ISSUE_FILTER_HANDLER,
    filterType
  }
}

export const uiStateResetHandler = () => {
  return {
    type: UI.STATE_RESET_HANDLER
  }
}

export const errorHandler = (state) => {
  return {
    type: UI.ERROR_HANDLER,
    state
  }
}

export const loadingHandler = (loadingState) => {
  return {
    type: UI.LOADING_HANDLER,
    loadingState
  }
}

export const changePageNumberHandlder = (method) => {
  return {
    type: UI.CHANGE_PAGE_NUMBER_HANDLER,
    method
  }
}