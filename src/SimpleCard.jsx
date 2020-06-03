import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';


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
  },
  message: {
    padding: '15px',
  }
});


const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);


export default function SimpleCard(props) {
  const classes = useStyles();

  // メッセージJSON
  var getMessageJson = localStorage.getItem('message');
  var objectMessage = JSON.parse(getMessageJson);

  // ユーザーJSON
  var getUserJson = localStorage.getItem('user');
  var objectUser = JSON.parse(getUserJson);


  // 拍手ボタンクリック時
  const handleClick = (key) => () => {
    console.info("You clicked");
    
    // ユーザー別拍手回数カウント
    objectMessage[key].ApplausePerUser[props.value] += 1;
    // 拍手総回数カウント
    objectMessage[key].ApplauseSum += 1;
    
    var setjson = JSON.stringify(objectMessage);
    localStorage.setItem('message', setjson); 

    // ユーザー情報更新
    objectUser[props.value].canApplause -= 2;
    props.setCanApplause(objectUser[props.value].canApplause);
    objectUser[objectMessage[key].User].applaused += 1;

    setjson = JSON.stringify(objectUser);
    localStorage.setItem('user', setjson); 
  };

  // 拍手回数一覧取得
  const getList = (applausePerUser) => {
    let name = [];
    let num = [];

    Object.keys(applausePerUser).forEach((key) => {
      
      if (num[num.length - 1] < applausePerUser[key]) {
        var i = 0;

        while (applausePerUser[key] < num[i]) {
          i++;
        }

        name.splice(i, 0, key);
        num.splice(i, 0, applausePerUser[key]);
      } else {
        name.push(key);
        num.push(applausePerUser[key]); 
      }
    }, applausePerUser)
    
    let list='[拍手一覧]\n';

    for (var i = 0; i < num.length; i++){
      list = list + name[i] + ':' + num[i] + '\n';
    }

    return list;
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
        {Object.keys(objectMessage).map((key) => {
          var obj = objectMessage[key];
          var applausePerUser = obj['ApplausePerUser'];
          
          const tip = getList(applausePerUser);

          const button = obj['User'] === props.value || obj['Target'] === props.value || applausePerUser[props.value] === 15 || objectUser[props.value].canApplause === 0 ? (
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
                
                  <div className={classes.message}>
                    <Typography variant="h6" component="p">
                      {obj['Message']}
                      <br />
                    </Typography>
                  </div>
                </div>
                <div>
                  <Typography className={classes.time}>
                    {new Date(obj['Time']).getFullYear() + "年" + (parseInt(new Date(obj['Time']).getMonth(), 10) + 1) + "月" + new Date(obj['Time']).getDate() + "日" + new Date(obj['Time']).getHours() + "時" + new Date(obj['Time']).getMinutes() + "分" + new Date(obj['Time']).getSeconds() + "秒"}
                  </Typography>
                </div>
              </CardContent>
              <CardActions>
                <LightTooltip title={tip}>
                  {button}
                </LightTooltip>
                {obj['ApplauseSum']}
              </CardActions>
            </Card>
          );
        })}
      </div>
    );
  }

}