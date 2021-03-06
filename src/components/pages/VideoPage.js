import React from 'react';
import { xml2json, parseXml } from '../../utilities/xml_json';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

//xml2json
const getXML = url => {
	const x = new XMLHttpRequest();
	x.open('GET', url, true);
	x.onreadystatechange = function() {
		if (x.readyState == 4 && x.status == 200) {
			const xml = x.responseText;
			const dom = parseXml(xml);
			const json = xml2json(dom);
			// console.log(json.slice(31, json.length - 1));
			// console.log(JSON.parse(json.slice(32, json.length - 3)));
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
				{videoId > 1 && (
					<NavLink
						to={`/video/${videoId - 1}`}
						className="videoPlayer__navLink"
					>
						<i className="material-icons">chevron_left</i>
						episode {videoId - 1}
					</NavLink>
				)}
				episode {videoId}
				{videoId < 11 && (
					<NavLink
						to={`/video/${JSON.parse(videoId) + 1}`}
						className="videoPlayer__navLink"
					>
						episode {JSON.parse(videoId) + 1}
						<i className="material-icons">chevron_right</i>
					</NavLink>
				)}
			</p>
			<video
				className="videoPlayer"
				src={`http://165.227.213.125/videos/orange-days-${videoId}.mp4`}
				controls
			/>
		</div>
	);
};

const mapStateToProps = state => {
	return state;
};

export default connect(mapStateToProps)(Video);
