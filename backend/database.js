const mongoose = require('mongoose');
const connection = "mongodb+srv://dbUser:r1bHEHA9ylmAbAR8@cluster0-0teld.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));