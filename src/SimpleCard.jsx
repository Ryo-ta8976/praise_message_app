import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  messageAvatar: {
    display: 'flex',
  },
  messageArea: {
    display: 'flex',
  },
  time: {
    float: 'right',
  }
});

export default function SimpleCard() {
  const classes = useStyles();
  var getjson = localStorage.getItem('message');
  var object = JSON.parse(getjson);

  const handleClick = (key) => () => {
    console.info("You clicked");
    object[key].Applause_Sum += 1;
    var setjson = JSON.stringify(object);
    localStorage.setItem('message', setjson); 
  };


  if (localStorage.getItem('message') === null) {
    return (
      <div>
        Message nothing.
      </div>
    );
  } else {
    return (
      <div>
        {Object.keys(object).map((key) => {
          var obj = object[key];

          return (
            <Card className={classes.root} key={key}>
              <CardContent>
                <div className={classes.messageArea}>
                  <div className={classes.messageAvatar}>
                    <Avatar alt="Remy Sharp" src={`/static/images/avatar/${obj['User']}.png`} className={classes.large} />
                    ➡︎
                    <Avatar alt="Remy Sharp" src={`/static/images/avatar/${obj['Target']}.png`} className={classes.large} />
                  </div>
                
                  <Typography variant="body2" component="p">
                    {obj['Message']}
                    <br />
                  </Typography>
                </div>
                <div>
                  <Typography className={classes.time}>
                    {new Date(obj['time']).getFullYear() + "年" + (parseInt(new Date(obj['time']).getMonth(), 10) + 1) + "月" + new Date(obj['time']).getDate() + "日" + new Date(obj['time']).getHours() + "時" + new Date(obj['time']).getMinutes() + "分" + new Date(obj['time']).getSeconds() + "秒"}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <input type="image" src="/static/images/other/applause_icon.png" onClick={handleClick(key)}/>
                {obj['Applause_Sum']}
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }

}