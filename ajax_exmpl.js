//how to ajax 
function sendajaxcall(){
var request = new XMLHttPRquest();
//use post for local host backend call
request.open()
request.onreadystatechange=function(){
//
// 0 unsent
// 1 open 
// 2 headers_received
// 3 loading
// 4 done
//
// 200 ok
// 404 not found
// 503 unavailable (no connection)
//
	if (this.readyState===4 && this.status===200){
		// here add to state redux store
		// dispatch an action with formatted text as responce
		var resp = this.responseText;
		// is a json format 
		// parse with JSON.parse('json',function(key,value){
			if (key=="sucsess"){
				return Boolean(value)
			}else{
				return value
			}
		})
		if (resp.succsess){
			//dispatch action with error code
		}else{
			//dispatch action with payload
		}
	}
}
request.send()
}//send ajaxcall function can be set to on click method in the ui ex) consider a button
