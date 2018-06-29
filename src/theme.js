import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import indigo from '@material-ui/core/colors/indigo';
import {createMuiTheme} from '@material-ui/core/styles';

const fontFamily = ['Lato', 'Helvetica', 'sans-serif'].toString();
const fontStyleDisplay = {
  fontFamily: ['"Playfair Display"', 'Georgia', 'serif'].toString(),
  fontWeight: 700
};

const headlineFontSize = '2rem';
export default createMuiTheme({
  overrides: {
    MuiPickersYear: {
      selected: {fontFamily}
    },
    MuiPickersDay: {
      day: {
        fontWeight: 400
      }
    }
  },
  mixins: {
    toolbar: {
      height: 64
    }
  },
  palette: {
    primary: indigo,
    secondary: blue,
    grey: blueGrey
  },
  typography: {
    fontFamily,
    fontWeightMedium: 700,
    display1: {
      ...fontStyleDisplay,
      fontSize: '2.5rem'
    },
    headline: {
      ...fontStyleDisplay,
      fontSize: headlineFontSize
    }
  }
});