import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function CustomizedSelects(props) {
  const classes = useStyles();
  const [avatar, setAvatar] = React.useState('michel');

  // プルダウンメニュー変更時
  const handleChange = (event) => {
    const name = event.target.value;
    setAvatar(name);
    props.onSet(name);

    if (props.value === 'User') {
      var getjson = localStorage.getItem('user');
      var object = JSON.parse(getjson);
      props.setCanApplause(object[name].canApplause);
      props.setApplaused(object[name].applaused); 
    }
  };

  return (
    <div>
      <div className={classes.root}>
        <Avatar alt="Remy Sharp" src={`/static/images/avatar/${avatar}.png`} className={classes.large} />
      </div>
      <div>
        <FormControl className={classes.margin}>
          <InputLabel id="demo-customized-select-label">{props.value}</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={avatar}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value={'michel'}>Michel</MenuItem>
            <MenuItem value={'mike'}>Mike</MenuItem>
            <MenuItem value={'shelly'}>shelly</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
