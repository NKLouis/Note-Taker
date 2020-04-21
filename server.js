var express = require("express");


var app = express();
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

require("./routes/apiRoute")(app);
require("./routes/htmlRoute")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });


  