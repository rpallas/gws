#pragma strict

private var ray : Ray;
private var hit : RaycastHit;

function Start () {

}

function Update () {

  // Handle input
  if(Input.GetMouseButtonDown(0)){
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    if(Physics.Raycast(ray, hit)){
      if(hit.transform.name == "OptionMatch"){
      	Application.LoadLevel("match");
      }
      if(hit.transform.name == "OptionQuit"){
      	Application.Quit();
      }
    }
  }

}