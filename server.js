var express = require('express');
var app = express.createServer();

app.configure(function(){
	app.set('view options', {layout: false});
	app.use(express.static(__dirname + '/public'));	
});

// register a simple html view engine, instead of using a fancy view rendering system
app.register('.html', {
  compile: function(str, options){
    return function(locals){
      return str;
    };
  }
});

// routing
app.get('/', function(req, res){
	res.render('index.html', { title: 'Game Web Services' });
});

app.get('/client', function(req, res){
    res.render('gameclient.html', { title: 'Game Client' });
});

app.get('/averages', function(req, res){
    res.render('averagesclient.html', { title: 'Average Scores Client' });
});

app.get('/rank', function(req, res){
    res.render('rankclient.html', { title: 'Rankings Client' });
});

//app.listen(process.env.PORT, process.env.IP);
app.listen(8080);

//*********************
// Socket.io Functions
//*********************

var io = require('socket.io').listen(app);
var scores = new Array();

// on a 'connection' event
io.sockets.on('connection', function(socket){

    console.log("Connection " + socket.id + " accepted.");
    
	socket.on('score', function(score){
	    // record score
	    console.log("Client " + socket.id + " scored " + score);
		scores[socket.id] = score;
		print_scores();
	});
    
	socket.on('ticker', function(fn){
	    console.log("Sending score average to client " + socket.id);
		var total = 0, ctr = 0;
		for(var score in scores){
		    total += scores[score];
		    ctr++;
		}
		// return score average to client
		var average = total/ctr;
		console.log("Average: " + total + "/" + ctr + " = " + average);
		fn(average);
	});

    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });
    
});

print_scores = function(){
    var total = 0;
	console.log("\nScore:");
    for(var score in scores){
        console.log("\tScores[" + score + "] = " + scores[score]);
    }
	console.log("\n");
}


