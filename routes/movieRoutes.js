const express = require("express");
const router = express.Router();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = "imdb236.p.rapidapi.com";

/* GET /movies/search - render search form */
router.get("/search", (request, response) => {
    response.render("search", { results: null, query: "", error: null });
});

/* POST /movies/search - call IMDB236 API and display results */
router.post("/search", async (request, response) => {
    const { query } = request.body;

    if (!query || query.trim() === "") {
        return response.render("search", {
            results: null,
            query: "",
            error: "Please enter a movie title to search."
        });
    }

    try {
        const apiUrl = `https://${RAPIDAPI_HOST}/api/imdb/search?originalTitle=${encodeURIComponent(query.trim())}&type=movie&rows=10`;

        const apiResponse = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "x-rapidapi-key": RAPIDAPI_KEY,
                "x-rapidapi-host": RAPIDAPI_HOST
            }
        });

        if (!apiResponse.ok) {
            throw new Error(`API responded with status ${apiResponse.status}`);
        }

        const data = await apiResponse.json();

        /* IMDB236 returns an array of results directly, or under a "results" key */
        let results = Array.isArray(data) ? data : (data.results || []);

        /* Limit to 10 results for cleaner display */
        results = results.slice(0, 10);

        response.render("search", { results, query, error: null });
    } catch (error) {
        console.error("IMDB API error:", error);
        response.render("search", {
            results: null,
            query,
            error: "Could not fetch results. Please try again later."
        });
    }
});

module.exports = router;
