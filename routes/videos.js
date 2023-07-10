const express = require("express");
const router = express.Router();

const videos = require("../data/videos.json");

router.route("/").get((req, res) => {
	const filteredVideos = videos.map((video) => {
		const { id, title, channel, image } = video;
		return { id, title, channel, image };
	});

	res.json(filteredVideos);
});

router.route("/:id").get((req, res) => {
	const videoId = req.params.id;

	const foundVideo = videos.find((video) => video.id === videoId);

	if (foundVideo) {

		const {
			id,
			title,
			channel,
			image,
			description,
			views,
			likes,
			video,
			timestamp,
			comments,
		} = foundVideo;

		
		const videoData = {
			id,
			title,
			channel,
			image,
			description,
			views,
			likes,
			video,
			timestamp,
			comments: comments.map((comment) => ({
				id: comment.id,
				name: comment.name,
				comment: comment.comment,
				likes: comment.likes,
				timestamp: comment.timestamp,
			})),
		};

		
		res.json(videoData);
	} else {
		
		res.status(404).json({ error: "Video not found" });
	}
});

module.exports = router;
