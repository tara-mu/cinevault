const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const movieRoutes = require("./routes/movieRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");

if (process.argv.length != 3) {
    process.stdout.write("Usage: node server.js <port>\n");
    process.exit(1);
}

const PORT = process.argv[2];
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

/* Routes */
app.use("/movies", movieRoutes);
app.use("/watchlist", watchlistRoutes);

app.get("/", (request, response) => {
    response.render("index");
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("Connected to MongoDB");

        app.listen(PORT);
        console.log(`Web server started and running at http://localhost:${PORT}`);

        process.stdin.setEncoding("utf8");
        process.stdout.write("Stop to shutdown the server: ");

        process.stdin.on("readable", function () {
            const dataInput = process.stdin.read();
            if (dataInput != null) {
                const command = dataInput.trim();
                if (command === "stop" || command === "Stop") {
                    process.stdout.write("Shutting down the server\n");
                    mongoose.disconnect();
                    process.exit(0);
                } else {
                    process.stdout.write(`Invalid command: ${command}\n`);
                }
                process.stdout.write("Stop to shutdown the server: ");
                process.stdin.resume();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

main();
