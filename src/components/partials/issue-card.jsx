import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'svg-inline-react';
import { SVG } from '../../svg';
import { isUndefined } from 'lodash';

class IssueCard extends Component {
  static propTypes = {
    issueInfo: PropTypes.object.isRequired,
    filterType: PropTypes.string.isRequired,
  };

  render() {
    const { issueInfo, filterType } = this.props;
    const { state, pull_request } = issueInfo;
    const issueCloseIcon = <li><InlineSVG src={SVG.SVG_ISSUE_CLOSED} raw width="10" height="10" /></li>;
    const pullIcon = <li><InlineSVG src={SVG.SVG_PULL} raw width="10" height="10" /></li>;
    return (
      <div className="issue-card" key={issueInfo.id}>
        <div className="issue-card--content">
          <div className="issue-card--content--inner">
            <ul className="issue-card--content--state">
              {state === 'closed' ? issueCloseIcon : null}
              {!isUndefined(pull_request) || filterType === 'pulls' ?  pullIcon : null}
            </ul>
            <div
              className={
                state === 'closed' || !isUndefined(pull_request) || filterType === 'pulls'
                  ? "issue-card--content--title issue-card--content--title--padding-right"
                  : 'issue-card--content--title'
              }
            >
              <strong>{issueInfo.title}</strong>
            </div>
            <div className={issueInfo.body.length !== 0 ? 'issue-card--content--description' : 'issue-card--content--description issue-card--content--description--no-description'}>
              {
                issueInfo.body.length > 0
                  ? issueInfo.body.replace(/(<([^>]+)>)/ig,"")
                  : 'No description provided'
              }
            </div>
            <div className="issue-card--content--tags">
              {
                issueInfo.labels.map((label) => {
                  return (
                    <span className="issue-card--content--tags--tag" key={label.id}>
                      <span className="issue-card--content--tags--tag-hole"/>
                      <span className="issue-card--content--tags--tag-label">{label.name}</span>
                    </span>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IssueCard;
