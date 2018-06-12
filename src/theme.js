import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: blue,
    grey: blueGrey
  },
  typography: {
    fontFamily: ['Lato', 'Helvetica', 'sans-serif'].toString(),
    fontWeightMedium: 700
  }
});
