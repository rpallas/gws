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
app.get('/test', function(req, res){
	res.send('Hello, World!');
});

app.get('/client', function(req, res){
    res.render('gameclient.html', { title: 'Game Client' });
});

app.get('/game', function(req, res){
    res.render('livechartclient.html', { title: 'Live Chart Client' });
});

app.get('/rank', function(req, res){
    res.render('rankclient.html', { title: 'Rankings Client' });
});

app.listen(process.env.PORT, process.env.IP);
//app.listen(8080);

//*********************
// Socket.io Functions
//*********************

var io = require('socket.io').listen(app);
var votes = new Array();

// on a 'connection' event
io.sockets.on('connection', function(socket){

    console.log("Connection " + socket.id + " accepted.");
    
	socket.on('vote', function(vote){
	    // record vote
	    console.log("Client " + socket.id + " voted " + vote);
		votes[socket.id] = vote;
		print_votes();
	});
    
	socket.on('ticker', function(fn){
	    console.log("Sending vote average to client " + socket.id);
		var total = 0, ctr = 0;
		for(var v in votes){
		    total += votes[v];
		    ctr++;
		}
		// return vote average to client
		var average = total/ctr;
		console.log("Average: " + total + "/" + ctr + " = " + average);
		fn(average);
	});

    socket.on('disconnect', function(){
        console.log("Connection " + socket.id + " terminated.");
    });
    
});

print_votes = function(){
    var total = 0;
	console.log("\nVotes:");
    for(var v in votes){
        console.log("\tvotes[" + v + "] = " + votes[v]);
    }
	console.log("\n");
}


