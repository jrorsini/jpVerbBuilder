import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const getXML = url => {
	const x = new XMLHttpRequest();
	x.open('GET', url, true);
	x.onreadystatechange = function() {
		if (x.readyState == 4 && x.status == 200) {
			console.log(x);
		}
	};
	x.send(null);
};

getXML('https://www.youtube.com/api/timedtext?v=Y7S5zMvn3HE&lang=ja');

const Video = props => {
	const videoId = props.match.params.video;
	return (
		<div className="container">
			<p className="videoPlayer__header">
				<NavLink to={`/video/${videoId - 1}`}>
					{'<'} episode {videoId - 1}
				</NavLink>
				episode {videoId}
				<NavLink to={`/video/${JSON.parse(videoId) + 1}`}>
					episode {JSON.parse(videoId) + 1} >
				</NavLink>
			</p>
			<video
				className="videoPlayer"
				src={`http://165.227.213.125/orange-days-${videoId}.mp4`}
				controls
			/>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Video);
