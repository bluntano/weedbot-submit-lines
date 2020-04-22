const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request'); 
const app = express();

exports.express = () => {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //app.set('views', path.join(__dirname, 'views'));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/views/index.html');
    });

    app.post('/handle_data', function (req, res) {
        let line = req.body.textline;
        let set = req.body.sets;
        let sendToUrl = 'https://bluntano-discord-weedbot.glitch.me/';
        request({
            url: `${sendToUrl}electronjs/api/textline`,
            method: "POST",
            json: true,
            body: {textline: line, sets: set}
        }, function (error, response, body){
            res.send(response.body);
        });
    });
     
    const server = app.listen(3000, function () {
        //var host = server.address().address;
        var port = server.address().port;
        console.log(`App working on http://localhost:${port}`);
    });
};