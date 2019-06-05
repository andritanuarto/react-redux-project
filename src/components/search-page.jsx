import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import { SVG } from '../svg';
import Loading from '../components/partials/loading';

class SearchPage extends Component {
  static propTypes = {
    gitRepoSearchHandler: PropTypes.func.isRequired,
    loadingHandler: PropTypes.func.isRequired,
    ui: PropTypes.object.isRequired
  };

  handleGitRepoSearch = (e) => {
    if (e.key === 'Enter') {
      this.props.loadingHandler(true);
      this.props.gitRepoSearchHandler(e.target.value, 'all');
    }
  }

  render() {
    const { ui } = this.props;

    return (
      <section className="page page--issue-search">
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
            {ui.loadingState ? <Loading /> : null}
            <div className="container container-search">
              <h1>Github Issue Viewer</h1>
              <div className="container-search--input-container">
                <InlineSVG src={SVG.SVG_SEARCH} raw width="22" height="22" />
                <input
                  type="text"
                  className="container-search--input"
                  placeholder="Paste a link to a Github repo!"
                  onKeyDown={this.handleGitRepoSearch}
                />
                <div className="error-message">
                  {ui.errorInput ? <span>Cannot find your GitHub repo. Please try again.</span> : null}
                </div>
              </div>
            </div>
        </ReactCSSTransitionGroup>
      </section>
    );
  }
}

export default SearchPage;
