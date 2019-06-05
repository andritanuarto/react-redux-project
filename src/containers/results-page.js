import { connect } from 'react-redux';
import ResultsPage from '../components/results-page';
import { issueFilterHandler, uiStateResetHandler, loadingHandler, changePageNumberHandlder } from '../actions/ui';
import { dataStateResetHandler } from '../actions/data';

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    data: state.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    issueFilterHandler: (filterType) => {
      dispatch(issueFilterHandler(filterType));
    },

    resetHandler: () => {
      dispatch(uiStateResetHandler());
      dispatch(dataStateResetHandler());
    },

    loadingHandler: (loadingState) => {
      dispatch(loadingHandler(loadingState));
    },

    changePageNumberHandlder: (method) => {
      dispatch(changePageNumberHandlder(method));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);