import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  
  // https://material-ui.com/components/app-bar/#fixed-placement
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));