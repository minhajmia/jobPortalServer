const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.json());

// connect with mongoDB
const uri = `mongodb+srv://jobPortalUser:o8PpdHf0fHHMQx58@cluster0.dftbcru.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const jobCollection = client.db("jobPortalDB").collection("jobs");
    // api for get all jobs
    app.get("/jobs", async (req, res) => {
      const query = {};
      const result = await jobCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Job Portal is running");
});
app.listen(port, () => {
  console.log("Job Portal is listening on port ", port);
});
