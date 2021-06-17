const authorizationsRouter = require('express').Router()

const authJwt = require('../utils/auth/authJWT')


const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const managerBoard = (req, res) => {
  res.status(200).send("Manager Content.");
};


authorizationsRouter.get('/all', allAccess)
authorizationsRouter.get('/user', [authJwt.verifyToken], userBoard)
authorizationsRouter.get('/mod', [authJwt.verifyToken, authJwt.isManager], managerBoard)
authorizationsRouter.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard)


module.exports = authorizationsRouter
