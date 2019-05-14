import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSelectedEntry } from '../../actions';
import { fetchSelectedEntryPageId } from '../../actions';
import Spinner from '../../components/spinner';


class EntryList extends Component {

  
  render() {

    if (this.props.entryBox.length && this.props.posts.length){
      if(this.props.entryBox[0]){
        return this.props.entryBox[0].map((entry) => {
          if (this.props.entryBox.lastId == entry.id) {
            return (
              <div key={entry.id} className="donation-box-container col-12 col-sm-12 col-md-12 col-lg-12 last-item">
                <div className="donation-mini-box-container">
                  <p className="big-number">${entry.price}</p>
                  <h4 className="one-predet-text">donation</h4>
                  <p>{entry.description}</p>
                  <div className="donate-button">
                    <Link
                      id={entry.id}
                      to={{
                        pathname: '/donation',
                        state: { entry },
                        search: `?ent=${entry.id}&exp=${this.props.expId ? this.props.expId : this.props.posts[0].id }`,
                      }}
                      price={entry.price}
                      onClick={() => { this.props.fetchSelectedEntry(entry) }}
                    >
                      DONATE ${entry.price}
                    </Link>
                  </div>
                </div>
                <div className="boder-left"></div><div className="boder-right"></div>
              </div>
            )
          }
          return (
              <div key={entry.id} className="donation-box-container col-12 col-sm-12 col-md-4 col-lg-4">
                  <div className="donation-mini-box-container">
                      <p className="number">${entry.price}</p>
                      <h4 className="one-predet-text">donation</h4>
                      <p>{entry.description}</p>
                      <div className="donate-button">
                          <Link 
                          id={entry.id}
                          to={{
                            pathname: '/donation',
                            state: { entry },
                            search: `?ent=${entry.id}&exp=${this.props.expId ? this.props.expId : this.props.posts[0].id }`,
                          }}
                          price={entry.price}
                          onClick={() => {this.props.fetchSelectedEntry(entry)}}
                          >
                          DONATE ${entry.price}
                          </Link>
                      </div>
                  </div>
              </div>
          )
        });
      }
    }

    return <Spinner/>;
    
  }
}

const mapStateToProps = state => {

  const urlParams = new URLSearchParams(state.router.location.search);
  const expId = urlParams.get('exp');

  return {
    entryBox: state.entryBox,
    entry: state.fetchSelectedEntry,
    selectedpageid: state.fetchSelectedEntryPageId,
    posts: state.posts,
    expId: expId
  }
}

export default connect(mapStateToProps, { fetchSelectedEntry, fetchSelectedEntryPageId })(EntryList);
