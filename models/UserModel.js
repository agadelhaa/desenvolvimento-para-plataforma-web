import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  userStatus: {
    type: String,
    enum: [
      "acompanhando a leitura",
      "aguardando a próxima leitura",
      "não estou acompanhando a leitura",
    ],
    default: "acompanhando a leitura",
  }
 },{timestamps: true}
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
})

export default mongoose.model('User', UserSchema);