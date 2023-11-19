import {
	motion,
	useAnimation,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	Circle,
	Col,
	IForm,
	Input,
	Item,
	Items,
	Logo,
	Nav,
	navVariants,
	Search,
} from "../styles/HeaderStyle";

export default function Header() {
	const [searchOpen, setSearchOpen] = useState(false);
	const homeMatch = useMatch("/");
	const tvMatch = useMatch("tv");
	// const inputAnimation = useAnimation();
	const navAnimation = useAnimation();
	const { scrollY } = useScroll();

	const toggleSearch = () => {
		setSearchOpen((prev) => !prev);
		// if (searchOpen) {
		// 	inputAnimation.start({
		// 		scaleX: 0,
		// 	});
		// } else {
		// 	inputAnimation.start({
		// 		scaleX: 1,
		// 	});
		// }
	};
	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 80) {
			navAnimation.start("scroll");
		} else {
			navAnimation.start("top");
		}
	});
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm<IForm>();
	const onValid = (data: IForm) => {
		navigate(`/search?keyword=${data.keyword}`);
	};
	return (
		<>
			<Nav variants={navVariants} initial={"top"} animate={navAnimation}>
				<Col>
					<Link to="/">
						<Logo
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 1024 276.742"
						>
							<motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
						</Logo>
					</Link>
					<Items>
						<Item>
							<Link to="/">
								Home
								{homeMatch && <Circle layoutId="circle" />}
							</Link>
						</Item>
						<Item>
							<Link to="tv">
								Tv Shows
								{tvMatch && <Circle layoutId="circle" />}
							</Link>
						</Item>
					</Items>
				</Col>
				<Col>
					<Search onSubmit={handleSubmit(onValid)}>
						<motion.svg
							style={{ marginRight: "15px", cursor: "pointer" }}
							onClick={toggleSearch}
							animate={{ x: searchOpen ? -200 : 0 }}
							transition={{ type: "linear" }}
							fill="currentColor"
							viewBox="0 0 16 16"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
						</motion.svg>
						<Input
							{...register("keyword", {
								required: true,
								minLength: 2,
							})}
							id="searchBox"
							animate={{ scaleX: searchOpen ? 1 : 0 }}
							initial={{ scaleX: 0 }}
							transition={{ type: "linear" }}
							placeholder="Title, people, genres"
						/>
					</Search>
				</Col>
			</Nav>
		</>
	);
}
