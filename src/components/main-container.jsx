import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchPage from '../containers/search-page';
import ResultsPage from '../containers/results-page';
import axios from 'axios';
import { CONFIG } from '../config';

class MainContainer extends Component {
  static propTypes = {
    ui: PropTypes.object,
    changePageHandlder: PropTypes.func.isRequired,
    gitIssuesDataHandler: PropTypes.func.isRequired,
    errorHandler: PropTypes.func.isRequired,
    loadingHandler: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    const { gitApiRepoUrl, issuePageNumber, issueFilter } = this.props.ui;
    const { GIT_REPO_BASE_URL, GIT_API_BASE_URL, GIT_ISSUE_PER_PAGE } = CONFIG;
    const apiRepoUrl = `${gitApiRepoUrl.replace(GIT_REPO_BASE_URL, GIT_API_BASE_URL)}/issues?state=${issueFilter}&page=${issuePageNumber}&per_page=${GIT_ISSUE_PER_PAGE}`;

    if (gitApiRepoUrl && apiRepoUrl) {
      axios.get(apiRepoUrl)
        .then(response => {
          const issues = response.data.map((datum) => {
            const { state, id, labels, title, pull_request, body } = datum;
            return ({ id, state, labels, title, pull_request, body });
          });
          if (issues) {
            this.props.loadingHandler(false);
            this.props.errorHandler(false);
            this.props.gitIssuesDataHandler(issues);
            this.props.changePageHandlder('resultsPage');
          }
        })
        .catch((error) => {
          this.props.loadingHandler(false);
          this.props.errorHandler(true);
        });
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.ui.gitApiRepoUrl !== nextProps.ui.gitApiRepoUrl ||
      this.props.ui.page !== nextProps.ui.page ||
      this.props.ui.issueFilter !== nextProps.ui.issueFilter ||
      this.props.ui.loadingState !== nextProps.ui.loadingState ||
      this.props.ui.issuePageNumber !== nextProps.ui.issuePageNumber
    );
  }

  render() {
    const { ui } =  this.props;
    return (
      <div className="main-container">
        {ui.page === 'searchPage' ? <SearchPage /> : <ResultsPage />}
      </div>
    );
  }
}

export default MainContainer;
