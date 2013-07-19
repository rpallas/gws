using System;
using UnityEngine;
using System.Collections;
using SocketIOClient;

public class GameClient 
{
	public Client client;
	
	// Use this for initialization
	public GameClient()
	{
		client = new Client("http://localhost:8080");
		
		client.Opened += SocketOpened;
		client.Message += SocketMessage;
		client.SocketConnectionClosed += SocketConnectionClosed;
		client.Message +=SocketError;
		
		client.Connect();
	}
	
	private void SocketOpened(object sender, EventArgs e) 
	{
		Debug.Log("Socket opened");
	}
	
	private void SocketMessage (object sender, MessageEventArgs e) 
	{
	    if ( e!= null && e.Message.Event == "onconnected") 
		{
			Debug.Log("Connected");
	        string msg = e.Message.MessageText;
			Debug.Log ("Message: " + msg);
	    }
	}
	
	private void SocketConnectionClosed (object sender, EventArgs e) 
	{
		Debug.Log("Socket closed");
		client.Close();    
	}
	
	private void SocketError (object sender, EventArgs e) 
	{
		Debug.Log("Socket error");
		// Handle error    
	}
}
