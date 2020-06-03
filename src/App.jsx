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
    display: 'inline-block',
    margin: '20px',
  },
  userArea: {
    display: 'block',
    backgroundColor: blue[100],
  },
  submitArea: {
    display: 'block',
  },
  messageArea: {
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '10px',
  },
}));


export default function App() {
  // localStorageにユーザーデータがない場合に登録
  if (localStorage.getItem('user')===null) {
  let obj = {
    'michel' : {
      'canApplause': 100,
      'applaused': 0,
    },
    'mike': {
      'canApplause': 100,
      'applaused': 0,
    },
    'shelly': {
      'canApplause': 100,
      'applaused': 0,
    },
  };

  let setjson = JSON.stringify(obj);
  localStorage.setItem('user', setjson); 
  }

  const classes = useStyles();
  // バリデーションstate
  const [validated, setValidated] = React.useState(false);
  // ユーザーstate
  const [user, setUser] = React.useState('michel');
  // 対象state
  const [target, setTarget] = React.useState('michel');

  // ユーザー情報の取り出し
  var getjson = localStorage.getItem('user');
  var object = JSON.parse(getjson);
  // 拍手できる回数state
  const [canApplause, setCanApplause] = React.useState(object[user].canApplause);
  // 拍手された回数state
  const [applaused, setApplaused] = React.useState(object[user].applaused);
  // テキストメッセージstate
  const [message, setMessage] = React.useState(''); 

  // localStorageデータの削除
  //localStorage.removeItem("message"); 
  //localStorage.removeItem("user");

  // テキストのバリデーション
  const handleValidation = (e) => {
    setMessage(e.target.value);
  
    if (e.target.value.length < 5 || user===target) {
      setValidated(false);
    } else {
      setValidated(true);
      return;
    }
  };

  // 投稿ボタンクリック時
  const handleSubmit = () => {
    console.log(message);
    const date = new Date();
    
    // jsonデータの生成
    let obj = {
      [date] : {
        'User': user,
        'Target': target,
        'Message': message,
        'Time': date,
        'ApplauseSum': 0,
        'ApplausePerUser': {
          'michel': 0,
          'mike': 0,
          'shelly': 0,
        }
      }
    };

    // localStorageに既存のデータがあるかどうか
    if (localStorage.getItem('message') === undefined || localStorage.getItem('message') === null) {
      let setjson = JSON.stringify(obj);
      localStorage.setItem('message', setjson);
    } else {
      var getjson = localStorage.getItem('message');
      var obj_before = JSON.parse(getjson);
      let setjson = Object.assign(obj, obj_before);

      setjson = JSON.stringify(obj);
      localStorage.setItem('message', setjson); 
    }
    setMessage('');
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
            <SelectUser value='User' onSet={setUser} setCanApplause={setCanApplause} setApplaused={setApplaused}/>
          </div>
          <div className={classes.user}>
            <Typography variant="h5" gutterBottom>
              拍手できる：{canApplause} / 拍手された：{applaused}
            </Typography>
          </div>
        </div>
      </div>
      
     
      <div className={classes.submitArea}>
        <div className={classes.title}>{"Submit"}</div>
        <div className={classes.user}>
          <SelectUser value='Target' onSet={setTarget}/>
        </div>
        <div className={classes.messageArea}>
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            onChange={handleValidation}
            value={message}
            fullWidth
            />
          {button}
        </div>
      </div>

      <div>
        <div className={classes.title}>{"History"}</div>
        <SimpleCard value={user} setCanApplause={setCanApplause}/>
      </div>
    </div>
  );
}