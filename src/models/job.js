import mongoose from "mongoose";

// Delete the previous model if it exists
if (mongoose.models.Job) {
  mongoose.deleteModel("Job");
}

const JobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  location: String,
  type: String,
  experience: String,
  description: String,
  skills: String,
  recruiterId: String,
  age: String,
  applicants: [
    {
      name: String,
      email: String,
      userId: String,
      status: String,
    },
  ],
});

const Job = mongoose.model("Job", JobSchema);

export default Job;
