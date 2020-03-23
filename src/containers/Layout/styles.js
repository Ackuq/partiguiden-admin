const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    justifyContent: 'space-between',
    width: drawerWidth,
  },

  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

  toolbar: { [theme.breakpoints.down('xs')]: theme.mixins.toolbar },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

export default styles;
