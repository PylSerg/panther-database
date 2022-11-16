import createDate from "./date-creator";
import createTime from "./time-creator";

export default function formData(data) {
	const formData = new FormData();

	formData.append("date", createDate());
	formData.append("time", createTime());
	formData.append("responsible", data.responsible);
	formData.append("objects", data.objects.join("|"));
	formData.append("stages", data.stages.join("|"));
	formData.append("materials", data.materials.join("|"));
	formData.append("quantity", data.quantity.join("|"));
	formData.append("prices", data.prices.join("|"));
	formData.append("sums", data.sums.join("|"));
	formData.append("comments", data.comments.join("|"));

	return formData;
}
