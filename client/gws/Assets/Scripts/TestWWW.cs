using UnityEngine;
using System.Collections;

public class TestWWW : MonoBehaviour {
	
	private string _result = "";
	
    IEnumerator Start() 
	{
		WWWForm form = new WWWForm();
    	
        form.AddField("navigationVersion", "311");
		form.AddField("challengeNavigationVersion", "58");
		form.AddField("communicationVersion", "3.0");
		form.AddField("username", "robbiepallas");
		form.AddField("password", "b842bd6f3deccc463a5a15ec9f94f998");
		form.AddField("questionCacheVersion", "10217");
		form.AddField("messageVersion", "3");
		form.AddField("challengesVersion", "-1");
		form.AddField("notificationVersion", "0");
		form.AddField("predictionVersion", "12");
        
		Hashtable headers = form.headers;
		headers["Authorization"] = "Basic " + System.Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes("Client:ueie4u3x"));		
        			
        byte[] rawData = form.data;
    	string url = "https://bbdev.futuresthegame.com/Server/index.php";
		WWW www = new WWW(url, rawData, headers);
		
		yield return www;
		_result = www.text;		
    }
	
	// Update is called once per frame
	void OnGUI () 
	{
		if(!string.IsNullOrEmpty(_result))
		{
			// Make a group on the center of the screen
			GUI.BeginGroup (new Rect (Screen.width / 2 - 100, 300, 200, 200));
			// All rectangles are now adjusted to the group. (0,0) is the topleft corner of the group.		
							
				GUI.TextArea(new Rect(20,50,160,100), _result);
			
			GUI.EndGroup();
		}
	}
}
