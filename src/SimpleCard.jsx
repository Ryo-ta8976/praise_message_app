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

export default function SimpleCard(props) {
  const classes = useStyles();
  var getjson = localStorage.getItem('message');
  var object = JSON.parse(getjson);

  const handleClick = (key) => () => {
    console.info("You clicked");
    // var obj = object[key];
    // var applausePerUser = obj['ApplausePerUser'];
    object[key].ApplausePerUser[props.value] += 1;
    object[key].ApplauseSum += 1;
    // applausePerUser[props.value] += 1;
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
          var applausePerUser = obj['ApplausePerUser'];

          const button = obj['User'] === props.value || obj['Target'] === props.value || applausePerUser[props.value] === 15 ? (
            <input type="image" src="/static/images/other/applause_icon.png" disabled/>
          ) : (
            <input type="image" src="/static/images/other/applause_icon.png" onClick={handleClick(key)}/>
          );

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
                    {new Date(obj['Time']).getFullYear() + "年" + (parseInt(new Date(obj['Time']).getMonth(), 10) + 1) + "月" + new Date(obj['Time']).getDate() + "日" + new Date(obj['Time']).getHours() + "時" + new Date(obj['Time']).getMinutes() + "分" + new Date(obj['Time']).getSeconds() + "秒"}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                {button}
                {obj['ApplauseSum']}
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }

}