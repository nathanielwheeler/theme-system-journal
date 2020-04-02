import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Question = new Schema(
	{
		id: { type: Number, required: true },
		questionId: { type: Number, required: true },
		answerValue: { type: String, required: true },
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

Question.virtual("question", {
	localField: "questionId",
	ref: "Question",
	foreignField: "id",
	justOne: true
})

export default Question;
