/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import { ImYoutube2 } from "react-icons/im";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import {
	FooterContainer,
	FooterIcons,
	FooterTitles,
	ServiceCode,
	SiteInfo,
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
					<a href="javascript:void(0);">Audio Description</a>
					<a href="javascript:void(0);">Help Center</a>
					<a href="javascript:void(0);">Gift Cards</a>
					<a href="javascript:void(0);">Media Center</a>
					<a href="javascript:void(0);">Investor Relations</a>
					<a href="javascript:void(0);">Jobs</a>
					<a href="javascript:void(0);">Terms of Use</a>
					<a href="javascript:void(0);">Privacy</a>
					<a href="javascript:void(0);">Legal Notices</a>
					<a href="javascript:void(0);">Cookie Perferences</a>
					<a href="javascript:void(0);">Corporate Information</a>
					<a href="javascript:void(0);">Contact Us</a>
				</FooterTitles>
				<ServiceCode>Service Code</ServiceCode>
				<SiteInfo>
					<p>
						Netflix Services Korea Ltd. E-Commerce Registration
						Number: Je 2018-Seoul Jong-ro-0426 Ho.
					</p>
					<p>Representative: Reginald Shawn Thompson</p>
					<p>Email: korea@netflix.com</p>
					<p>
						Address: 20F, Tower A, Centropolis Building 26,
						Ujeongguk-ro, Jongno-gu, Seoul, 03161 Republic of Korea
					</p>
					<p>Business registration number: 165-87-00119</p>
					<p> Hosted by: Amazon Web Services Inc.</p>
					<p>KFTC website</p>
				</SiteInfo>
			</FooterContainer>
		</>
	);
}
