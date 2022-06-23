import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	media: {
		height: 260,
	},
	cardContent: {
		display: "flex",
		justifyContent: "space-between",
	},
	cartActions: {
		justifyContent: "space-between",
	},
	buttons: {
		display: "flex",
		alignItems: "center",
	},
	responsiveFont: {
		[theme.breakpoints.down("md")]: {
			fontSize: "24px",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: "19px",
		},
	},
}));
