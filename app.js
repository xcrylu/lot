const express = require('express');
const iot = require('alibabacloud-iot-device-sdk');

const app = express();


const port = process.env.PORT || 3000;

//  设置静态文件目录
// app.use(express.static('public'));

// 使用模板
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  // res.sendFile(__dirname + '/public/index.html');
  res.render('index', { title: '我的第一个网页', message: '欢迎来到我的网站！' });
});



let device = iot.device({
  productKey: 'a1whyhoBQQv',
  deviceName: 'uOkbXkWkeyO1AgioKqXG',
  DeviceSecret: 'a2f332475f809b59c4baac91d5aeb916',
});;

// 监听connect事件
device.on('connect', () => {
    //将${productKey}和${deviceName}修改为实际值
    // device.subscribe(`/${productKey}/${deviceName}/user/get`);
    console.log('connect successfully!');
    // device.publish(`/${productKey}/${deviceName}/user/update`, 'hello world!');
    device.publish('/a1whyhoBQQv/uOkbXkWkeyO1AgioKqXG/user/update', 'hello world!');
    //To publish a message with QoS 1
    device.publish('/a1whyhoBQQv/uOkbXkWkeyO1AgioKqXG/user/update', 'hello world!',{qos:1});
    //To publish a Buffer
    device.publish('/a1whyhoBQQv/uOkbXkWkeyO1AgioKqXG/user/update', new Buffer([0,1,2,3,4]));  
});

// 监听message事件
device.on('message', (topic, payload) => {
  console.log(topic, payload.toString());
});        

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'testuser00',
  password:'123456',
  database: 'myiot'
})

// 使用连接池
pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

app.get('/mysqltest-route',(req,res)=>{
  pool.query('SELECT * FROM testtable',(error,results)=>{
    if(error){
      res.status(500).send(error);
    }else{
      res.json(results);
    }
  })
})

//config
const path =require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const { Sequelize } = require('sequelize');
// const {config } = require('dotenv').config();
// 先构造出.env*文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const pathsDotenv = resolveApp(".env");
// 按优先级由高到低的顺序加载.env文件
// dotEnv.config({ path: `${pathsDotenv}.local` })  // 加载.env.local
// dotEnv.config({ path: `${pathsDotenv}.development` })  // 加载.env.development
dotenv.config({ path: `${pathsDotenv}` })  // 加载.env

// 打印一下此时的process.env
console.log(process.env.DB_HOST); // zhangsan
console.log(process.env.DB_NAME); // 20
console.log(process.env.DB_USER); // China
console.log(process.env.DB_PASS); // local



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  //dialect: 'postgres',
  dialect: 'mysql',
});

// 定义模型
const User = sequelize.define('user', {
  // 属性
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  // ...
});


// 创建
// User.create({ username: 'janedoe', email: 'jane@example.com' })
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

//   User.create({ username: 'bell gate', email: 'bell@example.com' })
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

//   User.create({ username: 'macrom', email: 'macrom@example.com' })
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

//   User.create({ username: 'biden', email: 'biden@example.com' })
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

//   User.create({ username: 'trump', email: 'trump@example.com' })
//   .then(user => console.log(user))
//   .catch(err => console.error(err));

// // 读取
// User.findAll()
//   .then(users => console.log(users))
//   .catch(err => console.error(err));

// // 更新
// User.update({ username: 'johndoe' }, { where: { email: 'jane@example.com' } })
//   .then(result => console.log(result))
//   .catch(err => console.error(err));

// // 删除
// User.destroy({ where: { email: 'jane@example.com' } })
//   .then(result => console.log(result))
//   .catch(err => console.error(err));
// // 同步模型到数据库

sequelize.sync().then(() => {
  // 在 Express 路由中使用模型
  app.get('/some-route', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
