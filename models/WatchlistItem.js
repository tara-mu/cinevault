const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
    imdbId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        default: "N/A"
    },
    rating: {
        type: String,
        default: "N/A"
    },
    genres: {
        type: String,
        default: "N/A"
    },
    posterUrl: {
        type: String,
        default: ""
    },
    userNote: {
        type: String,
        default: ""
    },
    addedOn: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
});

const WatchlistItem = mongoose.model("WatchlistItem", watchlistSchema);

module.exports = WatchlistItem;
