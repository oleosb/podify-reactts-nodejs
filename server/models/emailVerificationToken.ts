//interface (typescript)

import { Model, ObjectId, Schema, model } from "mongoose";

interface EmailVerificationTokenDocument {
  owner: ObjectId;
  token: string;
  createdAt: Date;
}

//expire them after 1 hour

const emailVerificationTokenSchema = new Schema<EmailVerificationTokenDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      requiredPaths: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      expires: 3600,
      default: Date.now(),
    },
  }
);

export default model(
  "emailVerificationTokenSchema",
  emailVerificationTokenSchema
) as Model<EmailVerificationTokenDocument>;
