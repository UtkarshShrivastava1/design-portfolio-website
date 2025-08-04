import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    profilePictureURL: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

// ✅ Fix OverwriteModelError:
const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
