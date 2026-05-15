# CineVault

Submitted by: [Your Name] ([your-directory-id])

Group Members: [Your Name] ([your-directory-id])

App Description: A movie watchlist application where users can search for movies using the IMDB database, view details, and save favorites to a personal MongoDB-backed watchlist.

YouTube Video Link: [Add your YouTube demo link here]

APIs: [IMDB236 API](https://rapidapi.com/rapidapi-org1-rapidapi-org-default/api/imdb236) — provides movie search, ratings, genres, and poster images.

Contact Email: [your-email@umd.edu]

Deployed App Link: [Add your Render or deployment link here]

AI Use: Claude (claude.ai)

---

## Setup Instructions

1. Run `npm install` to install dependencies.
2. Copy `.env.example` to `.env` and fill in your credentials:
   - `MONGO_CONNECTION_STRING`: Your MongoDB Atlas connection string (create a new database user)
   - `RAPIDAPI_KEY`: Your RapidAPI key (subscribe to the IMDB236 API at the link above — free tier available)
3. Start the server: `node server.js 3000`
4. Open [http://localhost:3000](http://localhost:3000)

## Features

- **Search Movies**: Enter any movie title to search the IMDB database via the IMDB236 API. Results show title, year, rating, genre, and poster image.
- **Add to Watchlist**: Save any search result to your personal watchlist with an optional personal note.
- **View Watchlist**: Browse all saved movies stored in MongoDB, with date added.
- **Remove Movies**: Delete any movie from your watchlist.

## Project Structure

```
cinevault/
├── server.js           # Main Express server
├── routes/
│   ├── movieRoutes.js     # /movies routes (express.Router)
│   └── watchlistRoutes.js # /watchlist routes (express.Router)
├── models/
│   └── WatchlistItem.js   # Mongoose schema & model
├── views/
│   ├── index.ejs       # Home page
│   ├── search.ejs      # Search form + results
│   └── watchlist.ejs   # Watchlist display
├── public/
│   └── style.css       # CSS (Google font, colors, font-size)
├── package.json
├── .env.example
└── README.md
```
