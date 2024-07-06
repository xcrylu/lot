const iot = require('alibabacloud-iot-device-sdk');
// const params = {
//   productKey: 'a1whyhoBQQv',
//   deviceName: 'uOkbXkWkeyO1AgioKqXG',
//   DeviceSecret: 'a2f332475f809b59c4baac91d5aeb916',
//  // ReginId: 'cn-shanghai-f',
// //   brokerUrl: 'mqtt://a1whyhoBQQv.iot-as-mqtt.cn-shanghai.aliyuncs.com:1883/',
// //   brokerUrl: `mqtt://a1whyhoBQQv.iot-as-mqtt.cn-shanghai.aliyuncs.com:1883`,
// };
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