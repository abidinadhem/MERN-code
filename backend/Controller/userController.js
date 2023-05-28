const UserSchema = require("../Models/UserSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const PAGE_SIZE = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * PAGE_SIZE;
    delete req.query.page
    delete req.query.pageSize
    const filters = Object.keys(req.query).reduce((memo,elem) =>{
      memo = {
        [elem]:new RegExp(req.query[elem], 'i')
      }
      return memo
    },{})
    console.log(filters)
    UserSchema
    .find({...filters})
    .skip(skip)
    .limit(PAGE_SIZE)
    .exec()
    .then(async (data) => {
      const count = await UserSchema.countDocuments();
      const totalPages = Math.ceil(count / PAGE_SIZE);
      res.json({
        data,
        page: Number(page),
        totalPages,
      });

    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });


    // res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Somethig went wrong ⛔");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserSchema.findById(id);

    //If cannot find user will return error message , esle will return the user object
    user
      ? res.status(200).send(user)
      : res.status(400).send("cannot find user ⚠️");
  } catch (error) {
    console.log(error);
    res.status(500).send("cannot get ");
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(user.password, salt);
    const newUser = await new UserSchema(user);
    newUser.password = hashPassword;

    newUser.save();
    res.status(200).send("added Successfully");
  } catch (err) {
    res.status(500).send("something went Wrong ⛔");
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const newuser = req.body;

    await UserSchema.findByIdAndUpdate({_id : id},newuser );

    res.status(200).send("User has been edited ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot edit ");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await UserSchema.findByIdAndRemove(id);
    res.status(200).send("User has been deleted ✅");
  } catch (error) {
    console.log(error);
    res.status(200).send("cannot delete user ");
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    //----- Checking if user already in the databse -------
    const dbResponse = await UserSchema.findOne({ email });
    if (dbResponse) {
      return res.status(400).send("Email already exist !");
    }
    //-----------------------------------------------------

    //------ Password hashing ( coding ) ---------
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);
    //--------------------------------------------

    //----- Saving the new user o database-------
    const user = await new UserSchema(req.body);
    user.password = hashPassword;
    user.save();
    //-------------------------------------------

    //---- Response if  the register works ------
    res.status(200).json({ success: true });
    //-------------------------------------------
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const dbResponse = await UserSchema.findOne({ email });
    console.log(dbResponse)
    if (!dbResponse) {
      return res.status(400).send("try to register ! ");
    }
    const passwordMatch = await bcrypt.compare(password, dbResponse.password);

    if (!passwordMatch) {
      return res.status(400).send("Wrong password");
    }
    //Creation of web token
    // Set the payload and options for the JWT
    const payload = {
      id: dbResponse._id,
    };
    //option for jwt code , exmple : time of expiring if the code
    const options = {
      expiresIn: "1h",
      algorithm: "HS256",
      issuer: "FarmersApp",
    };

    // Generate the JWT using the payload, secret key, and options
    const secretKey = "blackcats";
    const token = jwt.sign(payload, secretKey, options);
    const userEmail = dbResponse.email;
    return res.status(200).send({ userEmail, token });
  } catch (error) {
    console.log(error);
   return res.status(500).send("Unexpected error");
  }
};
