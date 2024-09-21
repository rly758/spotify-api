const express = require("express");
const jwt = require("jsonwebtoken");
const sha256 = require("js-sha256");

//authorization code with pkce flow
//code verifier
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64); //necessary later for access token request
const data = new TextEncoder().encode(codeVerifier); //encode string into a Uint8Array

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const router = express.Router();

//request user authorization
router.get("/login", async (req, res) => {
  //hash the code verifier
  const hashed = await crypto.subtle.digest("SHA-256", data);
  //get the code challenge from the hashed code verifier
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const params = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    //scope, //optional param, manage authorization scope here
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();

  res.redirect(authUrl.toString());
});

//request an access token
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(tokenUrl, payload);
  const response = await body.json(); //response contains access token and refresh token

  const sessionJWTObject = {
    token: response,
  };

  req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY);
  res.redirect("/");
});

//verify jwt and send access token
router.get("/current-session", (req, res) => {
  jwt.verify(
    req.session.jwt,
    process.env.JWT_SECRET_KEY,
    (err, decodedToken) => {
      if (err || !decodedToken) {
        res.send(false);
      } else {
        res.send(decodedToken);
      }
    }
  );
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
