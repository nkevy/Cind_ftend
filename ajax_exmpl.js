//how to ajax 
function sendajaxcall(){
var request = new XMLHttPRquest();
//use post for local host backend call
request.open()
request.onreadystatechange=function(){
// 0 unsent
// 1 open 
// 2 headers_received
// 3 loading
// 4 done
	if (this.readyState===4 && this.status===200){
		return this.responseText;
	}
}
request.send()
}//send ajaxcall function can be set to on click method in the ui ex) consider a button
