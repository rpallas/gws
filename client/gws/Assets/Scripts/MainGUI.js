#pragma strict


// Use this for initialization
function Start () 
{

}

function Update () {

}

// JavaScript
function OnGUI () {
	// Make a background box
	GUI.Box (Rect (18,10,160,140), "Menu");

	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (28,40,140,20), "Find match")) {
		Application.LoadLevel (1);
	}

	// Make the second button.
	if (GUI.Button (Rect (28,70,140,20), "Level 2")) {
		Application.LoadLevel (2);
	}
}