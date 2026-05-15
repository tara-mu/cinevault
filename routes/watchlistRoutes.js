const express = require("express");
const router = express.Router();
const WatchlistItem = require("../models/WatchlistItem");

/* GET /watchlist - display all saved movies */
router.get("/", async (request, response) => {
    try {
        const items = await WatchlistItem.find({});
        response.render("watchlist", { items, message: null });
    } catch (error) {
        console.error(error);
        response.render("watchlist", { items: [], message: "Error loading watchlist." });
    }
});

/* POST /watchlist/add - save a movie from search results to MongoDB */
router.post("/add", async (request, response) => {
    const { imdbId, title, year, rating, genres, posterUrl, userNote } = request.body;

    try {
        /* Check if already in watchlist */
        const existing = await WatchlistItem.findOne({ imdbId });

        if (existing) {
            const items = await WatchlistItem.find({});
            return response.render("watchlist", {
                items,
                message: `"${title}" is already in your watchlist.`
            });
        }

        const newItem = new WatchlistItem({ imdbId, title, year, rating, genres, posterUrl, userNote });
        await newItem.save();

        const items = await WatchlistItem.find({});
        response.render("watchlist", {
            items,
            message: `"${title}" was added to your watchlist!`
        });
    } catch (error) {
        console.error(error);
        const items = await WatchlistItem.find({});
        response.render("watchlist", { items, message: "Error adding movie. Please try again." });
    }
});

/* POST /watchlist/remove - remove a movie from MongoDB by imdbId */
router.post("/remove", async (request, response) => {
    const { imdbId } = request.body;

    try {
        const result = await WatchlistItem.deleteOne({ imdbId });
        const items = await WatchlistItem.find({});
        const message = result.deletedCount > 0
            ? "Movie removed from your watchlist."
            : "Movie not found in watchlist.";
        response.render("watchlist", { items, message });
    } catch (error) {
        console.error(error);
        const items = await WatchlistItem.find({});
        response.render("watchlist", { items, message: "Error removing movie." });
    }
});

module.exports = router;
