import mongoose from "mongoose";

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

export default mongoose.model('User', UserSchema);