import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { hash, compare } = bcrypt;
const { isEmail } = validator;

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter valid email"],
  },
  phone: {
    type: Number,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Minimum password length is 6 characters"],
    maxlength: [10, "Maximum password length is 10 characters"],
  },
  isAdmin: { type: Boolean, default: false },
  createdOn: {
    type: Date,
    default: new Date(),
  },
});

// hash password
userSchema.pre("save", async function (next) {
  this.password = await hash(this.password, 10);
  next();
});

// static function to login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

// Static function to fetch users
userSchema.statics.fetch_user = async function (email) {
  const user = await this.findOne({ email });

  if (user) {
    return user;
  }
  throw Error("Incorrect email");
};

userSchema.statics.fetch_users = async function () {
  const user = await this.find();

  if (user) {
    return user;
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

export default User;
