#pragma strict

private var ray : Ray;
private var hit : RaycastHit;

function Start () {
//	rigidbody.velocity.z = 15;
}

function Update () {

	// Move the sphere
//	if (rigidbody.velocity.z > 0) {
// 		rigidbody.velocity.z -= 0.1;
//	} else {
// 		rigidbody.velocity.z = 0;
//	}
	
	// Check for input
	if(Input.GetMouseButtonDown(0)){
    var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    if(Physics.Raycast(ray, hit)){
      if(hit.transform.name == "OptionAnswerOne"){
      	Application.LoadLevel("match_result");
      }
      if(hit.transform.name == "OptionAnswerTwo"){
        Application.LoadLevel("match_result");
      }
      
    }
  }
}

function Jump() {

}