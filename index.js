import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "Shubham";
const yourPassword = "passw0rd";
const yourAPIKey = "0dcc24f2-9355-4d0d-b697-d2513bf044b5";
const yourBearerToken = "b16e08a0-f537-4652-a337-a2f2252947f2";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  const response = await axios.get("https://secrets-api.appbrewery.com/random");
  //The data you get back should be sent to the ejs file as "content"
  const myData = JSON.stringify(response.data);
  console.log(response, myData);
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  res.render("index.ejs", { content: myData });
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  const URL = "https://secrets-api.appbrewery.com/all?page=2";
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  const response = await axios.get(URL, {
    auth: {
      username: yourUsername,
      password: yourPassword,
    },
  });
  const myData = JSON.stringify(response.data);
  res.render("index.ejs", { content: myData });
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.

  const response = await axios.get(
    `https://secrets-api.appbrewery.com/filter?score=7&apiKey=${yourAPIKey}`
  );
  const myData = JSON.stringify(response.data);
  res.render("index.ejs", { content: myData });
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  const URL = "https://secrets-api.appbrewery.com/secrets/42";
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  });
  const myData = JSON.stringify(response.data);
  // console.log(response, myData);

  res.render("index.ejs", { content: myData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
