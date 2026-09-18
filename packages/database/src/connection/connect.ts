import mongoose from "mongoose";

export class ConnectDB {
  public async init(uri: string) {
    try {
      await mongoose.connect(uri);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
