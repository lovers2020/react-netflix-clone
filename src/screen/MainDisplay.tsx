import { makeImagePath } from "../utils";
import { Banner, Overview, Title } from "../styles/MainDisplayStyle";

interface IMainDisplay {
	bgImagePath?: string;
	title?: string;
	overview?: string;
}

export default function MainDisplay({
	bgImagePath,
	title,
	overview,
}: IMainDisplay) {
	return (
		<>
			<Banner bgphoto={makeImagePath(bgImagePath || "")}>
				<Title>{title}</Title>
				<Overview>{overview}</Overview>
			</Banner>
		</>
	);
}
