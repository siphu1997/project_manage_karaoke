import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Button, withStyles } from "@material-ui/core";
import { Backspace } from "@material-ui/icons";
import { ListItemAvatar, Avatar } from "@material-ui/core";
import { linkstaff, linkadmin } from "../../configureRoutes";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
const drawerWidth = 240;

const StyledDivider = withStyles(theme => ({
  root: {
    backgroundColor: "rgba(225,225,225,0.5)"
  }
}))(Divider);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& .MuiSkeleton-root": {
      backgroundColor: "white"
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  editPaper: {
    padding: theme.spacing(1),
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: "white",
    "& .MuiListItemIcon-root": {
      color: `${theme.palette.secondary.main} !important`
    }
  },
  editLink: {
    textDecoration: "none",
    color: "inherit",
    "& .MuiListItem-root": {
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.55)"
      },
      "&.Mui-selected": {
        backgroundColor: theme.palette.secondary.main,
        "& .MuiListItemIcon-root": {
          color: `${theme.palette.primary.main} !important`
        }
      }
    }
  }
}));

export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const {
    selectedIndex,
    handleListItemClick,
    isLoading,
    isAdmin,
    userName
  } = props;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color="secondary"
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Quản lý Karaoke
          </Typography>
          <Button
            variant="outlined"
            onClick={() => {
              props.handleLogout();
            }}
            style={{ color: theme.palette.primary.contrastText }}
          >
            Logout <Backspace style={{ marginLeft: theme.spacing(1) }} />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx(classes.editPaper, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose} color="secondary">
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <List>
          <Link to="/staff-info" className={classes.editLink}>
            <ListItem
              selected={selectedIndex === "info"}
              onClick={() => handleListItemClick("info")}
            >
              <ListItemAvatar>
                <Avatar
                  style={{ width: "24px", height: "24px", fontSize: "1rem" }}
                >
                  {/* <FolderIcon /> */}
                  {userName[0]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  isLoading ? <Skeleton height={6} width="80%" /> : userName
                }
              />
            </ListItem>
          </Link>
        </List>
        <StyledDivider />
        <List>
          {linkstaff.map((item, index) => (
            <Link
              key={`staff_link_${index}`}
              to={`${item.url}`}
              className={classes.editLink}
            >
              <ListItem
                button
                key={item.label}
                selected={selectedIndex === item.url}
                onClick={() => handleListItemClick(item.url)}
              >
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        {isAdmin && (
          <>
            <StyledDivider />
            <List>
              {linkadmin.map((item, index) => (
                <Link
                  key={`admin_link_${index}`}
                  to={`${item.url}`}
                  className={classes.editLink}
                >
                  <ListItem
                    button
                    key={item.label}
                    selected={selectedIndex === item.url}
                    onClick={() => handleListItemClick(item.url)}
                  >
                    <ListItemIcon>
                      <Icon>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </>
        )}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{props.children}</div>
      </main>
    </div>
  );
}
