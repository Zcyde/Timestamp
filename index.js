// index.js
// where your node app starts

var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // for FCC tests

// serve static files
app.use(express.static('public'));

// root route
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// hello endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// ✅ TIMESTAMP API
app.get("/api/:date?", (req, res) => {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // No date provided → current date
    date = new Date();
  } else if (/^\d+$/.test(dateParam)) {
    // If all digits → parse as milliseconds
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise parse as date string
    date = new Date(dateParam);
  }

  // Check if date is invalid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// start server
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
