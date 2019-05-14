import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Article from './main/article';
import Empty from './main/empty';
import PageNav from '../containers/parts/page-nav';

class Main extends Component {
	componentWillUpdate() {
		window.scrollTo(0, 0);
	}

	isSingle() {
		return 1 === this.props.posts.length;
	}

	renderPosts(posts) {
		if (posts.length) {
			return posts.map(post => {
				return (<Article key={post.id}
				                 post={post}
				                 isSingle={this.isSingle()}/>);
			});
		} else {
			const counter = [...Array(20)];
			return counter.map((val, i) => {
				return (<Empty key={i}/>);
			});
		}
	}

	getClasses() {
		return this.isSingle() ? '' : 'card-columns';
	}

	render() {
		return (
			<div className="">
				<div className="row blog-main-container">
					<div className="col-12 col-sm-12 col-md-8 col-lg-8 blog-list">
						<main id="postsContainer">
							<ReactCSSTransitionGroup
								transitionName="fade"
								transitionEnterTimeout={500}
								transitionLeaveTimeout={1}>
								{this.renderPosts(this.props.posts)}
							</ReactCSSTransitionGroup>
						</main>
						<PageNav shouldRender={10 === this.props.posts.length}/>
					</div>
					<div className="col-12 col-sm-12 col-md-4 col-lg-4">
						<main id="postsContainer">
							<ReactCSSTransitionGroup
								transitionName="fade"
								transitionEnterTimeout={500}
								transitionLeaveTimeout={1}>
								{this.renderPosts(this.props.posts)}
							</ReactCSSTransitionGroup>
						</main>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps({posts}) {
	return {posts};
}

export default connect(mapStateToProps)(Main)
