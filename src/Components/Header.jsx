import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import { currentUserContext } from '../Context API/ContexShare';
import profileImage from '../assets/profileimage.jpg'
import { SERVER_URL } from '../../Services/serverUrl';
import { tokenAuthenticationContext } from '../Context API/TokenAuth'
import { useContext } from 'react';


const pages = ['Home', 'About', 'My Dishes'];
const navLinks = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/aboutpage' },
  { title: 'My Dishes', path: '/userdishespage' },
];
const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {currentUser,setCurrentUser} = React.useContext(currentUserContext)
  const [searchTerm,setSearchTerm] = React.useState('')
  console.log(currentUser);
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthenticationContext)



  React.useEffect(() => {
    const currentUserDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    if (currentUserDetails) {
      setCurrentUser(currentUserDetails); 
    }
  }, []);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignIn = () => {
    navigate ('/sign-in')
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:'grey'
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const handleLogOut = () => {
    sessionStorage.removeItem('userDetails')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('username')
    setIsAuthorized(false)
    setCurrentUser(null)
    navigate('sign-in')
  }

  const handleProfile = () => { 
    navigate('/dashboard?tab=profile')
  }
  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
      setSearchTerm('');
  };

  
  
  console.log('sterm',searchTerm);
  return (
   <>
    <AppBar position="fixed" style={{ backgroundColor: '#fafafa',boxShadow:'none'}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <Link className='newfont' style={{ textDecoration: 'none',fontWeight:'550' }} to={'/'}>
              <span><i className="fa-solid fa-d fa-bounce fa-md"></i></span>ish <span><i  className="fa-solid fa-d fa-bounce fa-md"></i></span>elight
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
     {navLinks.map((link) => (
      <MenuItem
        key={link.title}
        component={Link}  
        to={link.path}    
        onClick={handleCloseNavMenu}
      >
        <Typography sx={{ textAlign: 'center' }}>{link.title}</Typography>
      </MenuItem>
    ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'black',
              textDecoration: 'none',
            }}
          >
            <Link style={{ color: '#90503A', textDecoration: 'none' }} to={'/'}>
              <span><i className="fa-solid fa-d fa-bounce fa-sm"></i></span>ish <span><i className="fa-solid fa-d fa-bounce fa-sm"></i></span>elight
            </Link>
          </Typography>
           <form onSubmit={handleSearch} style={{marginLeft:'190px'}}>
          
            <input
            type="text"
            placeholder="Search..."
            className="hidden lg:inline searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          
            />
        </form>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'}, justifyContent: 'flex-end' }}>
  {navLinks.map((link) => (
    <Button className='navbutton'
      key={link.title}
      sx={{ my: 2, color: '#965641', display: 'block', fontSize: '15px', fontFamily: 'sans-serif', textTransform: 'none' }}
      component={Link} 
      to={link.path} 
      onClick={handleCloseNavMenu} 
    >
      {link.title}
    </Button>
  ))}
</Box>
         {currentUser?(
 <Box sx={{ flexGrow: 0 }}>
 <Tooltip title="Open settings">
   <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    {currentUser.profile? currentUser.profile.startsWith('http')? <Avatar alt="profile" src={currentUser.profile} />:      <Avatar alt="profile" src={`${SERVER_URL}/uploads/${currentUser.profile}`} />:

     <Avatar alt="profile" src={profileImage} />
  }
    
     

   </IconButton>
 </Tooltip>
 <Menu
   sx={{ mt: '45px' }}
   id="menu-appbar"
   anchorEl={anchorElUser}
   anchorOrigin={{
     vertical: 'top',
     horizontal: 'right',
   }}
   keepMounted
   transformOrigin={{
     vertical: 'top',
     horizontal: 'right',
   }}
   open={Boolean(anchorElUser)}
   onClose={handleCloseUserMenu}
 >
   {settings.map((setting) => (
     <MenuItem key={setting} 
     onClick={()=>{
      handleCloseUserMenu();
      if(setting ==='Logout') handleLogOut()
        if(setting === 'Profile') handleProfile()
     }
     }>
       <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
     </MenuItem>
   ))}
 </Menu>
</Box>
         ):(
          <Button style={{backgroundColor:'#965641', color: 'white',fontSize:'15px', minWidth: '100px', fontFamily:'sans-serif',textTransform: 'none' , width: 'auto',border:'none'  }} variant="outlined" size="medium" onClick={handleSignIn} >
          Sign In
        </Button>
         )}
    
         
        </Toolbar>
     
      </Container>
    </AppBar>
    <Box sx={{ pt: 8 }}> 
      </Box>
   </>
   
  );
}
export default ResponsiveAppBar;

