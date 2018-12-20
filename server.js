'use strict';

const express              =    require('express');
const bodyParser           =    require('body-parser');
const webpush              =    require('web-push');
const mysql                =    require("mysql");
const ms_connect           =    mysql.createConnection({
                                    host:'localhost',
                                    user:'root',
                                    password:'',
                                    database:'webpush_db'
                                });

const app                 =     express();


// Parse JSON body
app.use(bodyParser.json());

ms_connect.connect(function(err){//On Connection with Database
    if(err) throw err; // If any error in database connection


    app.post('/api/save-end-point',function(req,res){
      console.log(req.body);
      ms_connect.query("INSERT INTO `end_points` VALUES(null,'"+req.body.ep+"','"+req.body.dc+"','"+req.body.cy+"','"+encodeURIComponent(req.body.ad)+"','"+req.body.st+"','"+req.body.tm+"','"+req.body.dt+"','"+req.body.dtt+"') ",function(err){
        if(err){
          res.send(err);
        } else{
          res.send("success");
        }
      })
    })

    app.post('/api/get-endpoints',function(req,res){
        const country = req.body.ctry;
        const device = req.body.dev;
        
        if(country === null && device !== null){
          ms_connect.query("SELECT * FROM `end_points` WHERE  `end_points`.`device_type` LIKE '%"+device+"%' ",function(err,rows,fields){
            if(err) throw err;

            res.send(rows);
          });
        } 
        else if(device === null && country !== null){

          ms_connect.query("SELECT * FROM `end_points` WHERE `end_points`.`user_country` LIKE '%"+country+"%'  ",function(err,rows,fields){
            if(err) throw err;

            res.send(rows);
          });
        } 
        else if(device === null && country === null){

          ms_connect.query("SELECT * FROM `end_points` ",function(err,rows,fields){
            if(err) throw err;

            res.send(rows);
          });
        }
        else if(device !== null && country !== null){

          ms_connect.query("SELECT * FROM `end_points` WHERE `end_points`.`user_country` LIKE '%"+country+"%' AND `end_points`.`device_type` LIKE '%"+device+"%' ",function(err,rows,fields){

            res.send(rows);
          });
        }
    })

    app.post('/api/notify-endpoints',function(req,res){

      function getPushData(){
        return new Promise(function(res,rej){
          ms_connect.query("SELECT * FROM `notification_data` ", function(err,rows,fields){
            if(err) throw err;
            res(rows[rows.length-1]);
          })
        })
      }

      // function getEndPoints(){
      //   return new Promise(function(res,rej){
      //     ms_connect.query("SELECT * FROM `end_points` ", function(err,rows,fields){
      //       if(err) throw err;
      //       res(rows);
      //     })
      //   })
      // }

      var eps = req.body['data'];

      const vapidKeys = webpush.generateVAPIDKeys();
      const publicKey = 'BMVoRmGYOTtbhSoMXpaEstem7UIj5zANRWNhB--Z5J0FOyynUkPNJHT8-kUQxJJvX5_TxCbtfEOaA_9t1qB9pd8';
      const privateKey = 'kDB89PYZJGPH1xOA6jnSzLSZaA2ye5cecYb7Z0bkMkc';
      

      webpush.setGCMAPIKey('AAAAjhXSsSg:APA91bHZdl7Jl-YzQpOlk4-43ewLmOG2oWephT16GEoQrYMYUInm9NedYB_SBVg9Nw9aDvJ8e3H1vEDBMe_Lc6WETLEqYTu9kQFukTBlYGfN9VIffrajs4DXpcNcIeDG6s2VB1keH63i');
      webpush.setVapidDetails(
        'mailto:example@yourdomain.org',
        publicKey,
        privateKey
      );

      getPushData().then(function(data){
          console.log("CALLED");
          notifyRecur(eps, data);
      })

      var i = 0;
      function notifyRecur(endpoints, data){
        if(i== endpoints.length){
          console.log("All Done !");
          return;
        } else{
          console.log("Called ENdpoint");
          webpush.sendNotification(JSON.parse(endpoints[i].end_point), JSON.stringify(data)).then(function(res){
            if(res.statusCode === 201){
              i++;
              notifyRecur(endpoints, data);
            }
          })
        }
      }

    })
    

    app.get("/settings",function(req,res){
      res.sendFile(__dirname+"/static/settings.html");
    })
    

    app.post("/api/update-push",function(req,res){

      var title, desc, icon, img, link;

      for (let i = 0; i < req.body.d.length; i++) {
        const element = req.body.d[i];
        switch(element.name){
          case "push_title" :{ title  = element.value; break;}
          case "push_desc"  :{ desc   = element.value; break;}
          case "push_icon"  :{ icon   = element.value; break;}
          case "push_image" :{ img    = element.value; break;}
          case "push_link"  :{ link   = element.value; break;}
        }
      }

      if( title !== "" && desc !== "" && icon !== "" && img !== "" && link !== "" ){
        ms_connect.query("INSERT INTO `notification_data` VALUES (null,'"+title+"','"+desc+"','"+icon+"','"+img+"','"+link+"','"+req.body.time+"','"+req.body.date+"','"+req.body.dateTxt+"')",function(err,rows,fields){
          if(err) throw err;
  
          res.send("success");
        })
      } else{
        res.send("required");
      }


    })





})    

app.use('/', express.static('static'));


// Start the server
const server = app.listen(process.env.PORT || '8080', () => {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
