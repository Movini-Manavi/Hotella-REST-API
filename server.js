const express = require('express');
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5003;

app.get('/api/bookings', (req, res) => {
    res.json({ message: "List of all hotel bookings" });
});

app.listen(PORT, () => {
    console.log(`Booking service running on port ${PORT}`);
});