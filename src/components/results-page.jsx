import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import IssueCard from './partials/issue-card';
import InlineSVG from 'svg-inline-react';
import { SVG } from '../svg';
import Loading from '../components/partials/loading';
import { CONFIG } from '../config';

class ResultsPage extends Component {
  static propTypes = {
    data: PropTypes.object,
    ui: PropTypes.object,
    issueFilterHandler: PropTypes.func.isRequired,
    resetHandler: PropTypes.func.isRequired,
    loadingHandler: PropTypes.func.isRequired,
    changePageNumberHandlder: PropTypes.func.isRequired
  };

  handleIssueFilter = (type) => {
    this.props.loadingHandler(true);
    this.props.issueFilterHandler(type);
  }

  handleResetState = () => {
    this.props.resetHandler();
  }

  handleChangePage = (method) => {
    this.props.loadingHandler(true);
    this.props.changePageNumberHandlder(method);
  }

  componentDidUpdate() {
    let myDiv = document.getElementById('issues-container');
    myDiv.scrollTop = 0;
  }

  render() {
    const { data, ui } =  this.props;
    const buttonFilters = [
      {type: 'all', label: 'All Issues'},
      {type: 'open', label: 'Open Issues'},
      {type: 'closed', label: 'Closed Issues'},
      {type: 'pulls', label: 'Pull Issues'}
    ];

    const pageNum = ui.issuePageNumber;

    const buttonPrev = (
      pageNum > 1
        ? <button onClick={() => this.handleChangePage('decrement')}>Prev</button>
        : null
    );

    const buttonNext = (
      data.gitIssues.length === CONFIG.GIT_ISSUE_PER_PAGE
        ? <button onClick={() => this.handleChangePage('increment')}>Next</button>
        : null
    );

    return (
      <section className="page page--issue-results">
        {ui.loadingState ? <Loading theme="white" /> : null}
        <header>
          <h2 onClick={this.handleResetState}>Github Issue Viewer</h2>
          <span>{ui.gitRepoUrl}</span>
        </header>
        <section className="issues-filters">
          <ul>
            {buttonFilters.map((buttonFilter) => {
              return (
                <li key={buttonFilter.type}>
                  <button
                    onClick={() => this.handleIssueFilter(buttonFilter.type)}
                    className={ui.issueFilter === buttonFilter.type ? 'active' : ''}
                  >
                    {buttonFilter.label}
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            onClick={this.handleResetState}
            className="issues-filters--close">
              <InlineSVG src={SVG.SVG_CLOSE} raw width="15" height="15" />
          </button>
        </section>
        <section className="issues-container" id="issues-container">
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
              {
                data.gitIssues.length > 0
                  ?
                    data.gitIssues.map((issue) => {
                      return ( <IssueCard key={issue.id} issueInfo={issue} filterType={ui.issueFilter} /> );
                    })
                  :
                    <span className="issues-container--no-result">
                      No result for <span>{ui.issueFilter === 'pulls' ? 'pull' : ui.issueFilter}</span> issues
                    </span>
              }
          </ReactCSSTransitionGroup>
          <div className="issues-container--page-buttons">
            {buttonPrev}
            {buttonNext}
          </div>
        </section>
      </section>
    );
  }
}

export default ResultsPage;
