import { ImYoutube2 } from "react-icons/im";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import {
	FooterContainer,
	FooterIcons,
	FooterTitles,
} from "../styles/FooterStyle";

export default function Footer() {
	return (
		<>
			<FooterContainer>
				<FooterIcons>
					<a href="https://www.facebook.com/NetflixKR" target="blank">
						<CgFacebook style={{ fontSize: "28px" }} />
					</a>
					<a
						href="https://www.instagram.com/netflixkr/"
						target="blank"
					>
						<BsInstagram style={{ fontSize: "26px" }} />
					</a>
					<a href="https://twitter.com/netflixkr" target="blank">
						<AiOutlineTwitter style={{ fontSize: "28px" }} />
					</a>
					<a
						href="https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured"
						target="blank"
					>
						<ImYoutube2 style={{ fontSize: "38px" }} />
					</a>
				</FooterIcons>
				<FooterTitles>
					<a>AudioDescription</a>
					<a>AudioDescription</a>
					<a>AudioDescription</a>
					<a>AudioDescription</a>
					<a>AudioDescription</a>
				</FooterTitles>
			</FooterContainer>
		</>
	);
}
