import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Ink Project is running on port ${port}`);
});