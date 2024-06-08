import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import InfoIcon from '@mui/icons-material/Info';
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from 'react-router-dom';
import './Navbar.css'

function SideNav() {
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link className='link' style={{textDecoration: "none", color: "#333"}} to={'/'}>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary={"Home"}/>
            </ListItemButton>
        </ListItem>
        </Link>
        <Divider />
        <Link className='link' style={{textDecoration: "none", color: "#333"}} to={'/profile'}>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Person2Icon/>
                </ListItemIcon>
                <ListItemText primary={"Profile"}/>
            </ListItemButton>
        </ListItem>
        </Link>
        <Divider />
        <Link className='link' style={{textDecoration: "none", color: "#333"}} to={'/gallery'}>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary={"Photo Gallery"}/>
            </ListItemButton>
        </ListItem>
        </Link>
        <Divider/>
        <Link className='link' style={{textDecoration: "none", color: "#333"}} to={'/about'}>
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"About"}/>
            </ListItemButton>
        </ListItem>
        </Link>
        <Divider/>
      </List>
      
    </Box>
  );

  return (
    <div>
        <React.Fragment>
            <MenuIcon className='menu' fontSize='large' onClick={toggleDrawer("left", true)}/>
            <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default SideNav;