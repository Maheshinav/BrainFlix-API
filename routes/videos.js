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

	// Find the video with the matching ID
	const foundVideo = videos.find((video) => video.id === videoId);

	if (foundVideo) {
		// Retrieve specific properties from the video object
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

		// Create a new object with the desired properties including comments
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

		// Return the videoData object as a JSON response
		res.json(videoData);
	} else {
		// Return an error message if the video is not found
		res.status(404).json({ error: "Video not found" });
	}
});

module.exports = router;
