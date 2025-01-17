import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Tooltip } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useDispatch, useSelector } from 'react-redux';
import { locale } from './redux/user/userSlice';
import TranslateIcon from '@mui/icons-material/Translate';
import { Box } from '@mui/system';


export default function Language() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [Locale,setLocale] = React.useState(localStorage.getItem('locale')||'en')
  const dispatch = useDispatch()
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const handleChangeLanguage = (value:any) => {
  console.log(value)
   localStorage.setItem('locale',value) 
   dispatch(locale(value))
   setLocale(value)
    handleClose()
}

// console.log(Locale)


  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{'&:hover':{background:'lightgray',borderRadius:1}}}
      >
      <Tooltip title='Translation' ><TranslateIcon  sx={{fontWeight:'bolder'}}  fontSize='medium' /></Tooltip>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        
      >
        <MenuItem  selected={Locale === 'en'}   onClick={()=>handleChangeLanguage('en')}>English</MenuItem>
        <MenuItem  selected={Locale === 'fr'}   onClick={()=>handleChangeLanguage('fr')}  >French</MenuItem>
      </Menu>
    </div>
  );
}

