import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    ProfilePicture: {
      type: String,
      required: true,
    },
    channels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      default: []
    }
  ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {

  if(!this.isModified("password")){
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.IsPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id : this._id,
    username : this.username,
    tags : this.tags,    
  }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  })
}

userSchema.methods.generateRefreshToken = function () {

  return jwt.sign({
    _id : this._id,
  }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  })  
}

export const User = mongoose.model("User", userSchema);
