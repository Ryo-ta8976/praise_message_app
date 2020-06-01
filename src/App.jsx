import React from 'react';
import SelectUser from './SelectUser';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SimpleCard from './SimpleCard';


const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  user: {
    //float: 'left',
    display: 'inline-block',
  },
  userArea: {
    display: 'block',
    backgroundColor: blue[100],
  },
  root: {
    //display: 'block',
  },
  submitArea: {
    //display: 'block',
  },
  messageArea: {
    display: 'inline-block',
  }
}));


export default function App() {
  const classes = useStyles();
  const [validated, setValidated] = React.useState(false);
  const [user, setUser] = React.useState('michel');
  const [target, setTarget] = React.useState('michel');
  let message = ''; 
  //localStorage.removeItem("message"); 

  const handleValidation = (e) => {
    message = e.target.value;
  
    if (message.length < 5) {
      setValidated(false);
    } else {
      setValidated(true);
      return;
    }
  };

  const handleSubmit = () => {
    console.log(message);
    const date = new Date();
    
    //let array = [];
    let obj = {
      [date] : {
        'User': user,
        'Target': target,
        'Message': message,
        'time': date,
        'Applause_Sum': 0,
      }
    };
    //setNum(num+1);
    //array.push(obj);

    //let setjson = JSON.stringify(obj);

    if (localStorage.getItem('message') === undefined || localStorage.getItem('message') === null) {
      let setjson = JSON.stringify(obj);
      localStorage.setItem('message', setjson);
    } else {
      var getjson = localStorage.getItem('message');
      var obj_before = JSON.parse(getjson);
      let setjson = Object.assign(obj, obj_before);

      setjson = JSON.stringify(obj);
      console.log(setjson);
      localStorage.setItem('message', setjson); 
    }
  }

  const button = validated ? (
    <Button onClick={handleSubmit} color="primary">
      投稿
    </Button>
  ) : (
    <Button disabled color="primary">
        投稿
    </Button>
  );

  return (
    <div>
      <div className={classes.userArea}>
        <div className={classes.title}>{"USER"}</div>
        <div>
          <div className={classes.user}>
            <SelectUser value='User' onSet={setUser}/>
          </div>
          <div className={classes.user}>
            <Typography variant="h5" gutterBottom>
              拍手できる：xx  拍手された：xx
            </Typography>
            {user}
            {target}
          </div>
        </div>
      </div>
      
     
      <div className={classes.submitArea}>
        <div className={classes.title}>{"Submit"}</div>
        <div className={classes.user}>
          <SelectUser value='Target' onSet={setTarget}/>
        </div>
        <div className={classes.messageArea}>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              onChange={handleValidation}
            />
            {button}
          </form>
        </div>
      </div>

      <div>
        <div className={classes.title}>{"History"}</div>
        <SimpleCard />
      </div>
    </div>
  );
}