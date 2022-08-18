import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  email: string;
  password: string;
  comparePassword: any;
}
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10); // metodo cifrado de contraseña
  const hash = await bcrypt.hash(user.password, salt); //contraeña cifrada
  user.password = hash;
  next();
});

// compara las password === password

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password); // boolean
};

export default model<IUser>("User", userSchema);
