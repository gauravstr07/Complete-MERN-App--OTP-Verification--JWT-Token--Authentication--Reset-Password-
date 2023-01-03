/** Import Modles */
const UserModel = require("../models/User.model");

/** config imports */
const ENV = require("../config");

/** importing dependencies */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/** middleware for verify user */
exports.verifyUser = async (req, res, next) => {
  try {
    const { username } = (req.method = "GET" ? req.query : req.body);

    // check the user existence
    let exist = await UserModel.findOne({ username });
    if (exist) return res.status(404).send({ error: "Can't find User!" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Athentication Error!" });
  }
};

/** Register Con ---> http://localhost:5000/api/register */
exports.register = async (req, res) => {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Please use unique username" });

        resolve();
      });
    });

    // check the existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Please use unique email" });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
              });

              // return and save result as a response
              user
                .save()
                .then((result) => {
                  res.status(201).send({
                    welcome: `New user created ---> ${user.username}`,
                  });
                })
                .catch((error) => {
                  res.status(500).send({ error });
                });
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Enable to hash password",
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

/** Login Con ---> http://localhost:5000/api/login */
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have password" });

            // let's create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(201).send({
              msg: "Login Successfully",
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Password does not match" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "Username not found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

/** Get User Con ---> http://localhost:5000/api/user/user@123 */
exports.getUser = async (req, res) => {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: "Invalid Username" });

    UserModel.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user) return res.status(501).send({ error: "Couldn't find user" });

      const { password, ...rest } = user._doc;

      return res.status(200).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: "Can not find user data" });
  }
};

/** Update User Con ---> http://localhost:5000/api/updateuser */
exports.updateUser = async (req, res) => {
  try {
    //const id = req.query.id;
    const {userId} = req.user

    if (userId) {
      const body = req.body;

      // update the data
      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: "Record Updated!" });
      });
    } else {
      return res.status(401).send({ error: "User not found" });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
};

/** Generate OTP Con ---> http://localhost:5000/api/generateOTP */
exports.generateOTP = async (req, res) => {
  res.json("generateOTP route");
};

/** Verify OTP Con ---> http://localhost:5000/api/verifyOTP */
exports.verifyOTP = async (req, res) => {
  res.json("verifyOTP route");
};

/** Verify OTP Con ---> http://localhost:5000/api/createResetSession */
exports.createResetSession = async (req, res) => {
  res.json("createResetSession route");
};

/** Verify OTP Con ---> http://localhost:5000/api/resetPassword */
exports.resetPassword = async (req, res) => {
  res.json("resetPassword route");
};
