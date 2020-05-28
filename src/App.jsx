import React from 'react';
import ImageAvatar from './ImageAvatar';
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

  const handleValidation = (e) => {
    const val = e.target.value;
  
    if (val.length < 5) {
      setValidated(false);
    } else {
      setValidated(true);
      return;
    }
  };

  const handleSubmit = () => {
    
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
            <ImageAvatar />
            <SelectUser />
          </div>
          <div className={classes.user}>
            <Typography variant="h5" gutterBottom>
              拍手できる：xx  拍手された：xx
            </Typography>
          </div>
        </div>
      </div>
      
     
      <div className={classes.submitArea}>
        <div className={classes.title}>{"Submit"}</div>
        <div className={classes.user}>
            <ImageAvatar />
            <SelectUser />
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