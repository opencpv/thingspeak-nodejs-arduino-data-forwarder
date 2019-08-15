const SerialPort = require('serialport');
const https = require('https');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM3', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const axios = require('axios')

// Read the port data

const api_write_key = 'RC8EAJ9MD7NEKEIH';

port.on("open", () => {
    console.log('serial port open');
});
parser.on('data', data => {
    console.log(data);
    dataMan(data);
});


const postRequest = (field1, field2, field4) => {
    axios.post('https://api.thingspeak.com/update.json', {
            api_key: api_write_key,
            field1: field1,
            field2: field2,
            field4: field4
        })
        .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch((error) => {
            console.error(error)
        })
}

const dataMan = (data) => {
    var dataArray = data.split(';');
    var field1 = dataArray[0];
    var field2 = dataArray[1];
    var field4 = dataArray[2];
    postRequest(field1, field2, field4);
}