
const mongoose = require('mongoose');

const url = "mongodb+srv://rohitramchandanistm1996:0PjcLOLxxCQgJcFC@devtinder.5r7n2iz.mongodb.net/devTinder";

const connectDB = async () => {
    await mongoose.connect(url);
}

module.exports = {
    connectDB,
}
