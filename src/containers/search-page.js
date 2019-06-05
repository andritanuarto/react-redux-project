import { connect } from 'react-redux';
import SearchPage from '../components/search-page';
import { gitRepoSearchHandler, loadingHandler } from '../actions/ui';

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

    loadingHandler: (loadingState) => {
      dispatch(loadingHandler(loadingState));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);