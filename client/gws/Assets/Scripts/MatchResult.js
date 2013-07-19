#pragma strict

private var ray : Ray;
private var hit : RaycastHit;

function Start () {

}

function Update () {

  if(Input.GetMouseButtonDown(0)){
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    if(Physics.Raycast(ray, hit)){
      if(hit.transform.name == "MatchText"){
      	Application.LoadLevel("match");
      }      
    }
  }

}