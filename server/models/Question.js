import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Question = new Schema(
	{
		id: { type: Number, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },
		answerType: { type: String, required: true},
		creatorEmail: { type: String, required: true }
	},
	{ timestamps: true, toJSON: { virtuals: true } }
);

Question.virtual("creator", {
	localField: "creatorEmail",
	ref: "Profile",
	foreignField: "email",
	justOne: true
});

export default Question;
