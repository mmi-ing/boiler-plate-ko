const express = require('express')
const app = express()
const port = 8000
const bodyParser = require('body-parser');
const User = require("./models/User"); //User.js 한거 쓰려면 이렇게!
module.exports={ User }
const config = require('./config/key');

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {

  //회원 가입 할 때 필요한 정보들을  client 에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body) //bodyPerser로 클라이언트의 정보를 받아온다

  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen (port, () => console.log(`Example app listening on port ${port}`))