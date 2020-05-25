import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b',
      dark: '#004c40',
      light: '#009688',
      contrastText: '#f8f9fa',
    },
    secondary: {
      main: '#80cbc4',
      dark: '#006978',
      light: '#56c8d8',
      contrastText: '#a3cfca',
    },
    type: 'dark',
  },
});

export default responsiveFontSizes(theme);
