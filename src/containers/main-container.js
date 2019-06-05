import { connect } from 'react-redux';
import MainContainer from '../components/main-container';
import { gitRepoSearchHandler, changePageHandlder, errorHandler, loadingHandler } from '../actions/ui';
import { gitIssuesDataHandler } from '../actions/data';

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    gitRepoSearchHandler: (repoUrl) => {
      dispatch(gitRepoSearchHandler(repoUrl));
    },

    gitIssuesDataHandler: (data) => {
      dispatch(gitIssuesDataHandler(data));
    },

    changePageHandlder: (page) => {
      dispatch(changePageHandlder(page));
    },

    errorHandler: (state) => {
      dispatch(errorHandler(state));
    },

    loadingHandler: (loadingState) => {
      dispatch(loadingHandler(loadingState));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);