async function qcWebsocet_prototype(element, json){

	const host = window.location.host;
	const protocol = window.location.protocol;
	const uri=`${protocol}//${host}/rdap/test2`;
	//const uri = "http://192.168.154.51:8140/rdap/test2"
	let websocket;
	function connect() {
    	if (!websocket) {
        	websocket = new SockJS(uri);
			element.setAttribute("state","ready")
    	}
	}
	connect();
	
	websocket.onopen = function(){
		
		const sampleData ={
			data1:"asdf",
			data2:"accccc"
		}
		const stringfied = JSON.stringify(json)
		console.log(`stringfied " ${stringfied}"`)
		websocket.send(stringfied);
		element.setAttribute("state","streaming")

	};
	websocket.onmessage = function(event){
		console.log(event.data);
		const response = JSON.parse(event.data);
		console.log(response);
		console.log(response.qc)
		activateQcResultButton(element, response.qc, response.result);
		
	};
	websocket.onclose = function(event){
		console.log(event)	
		if(element.getAttribute('state')!="done"){
			console.log("debug",element.getAttribute('state'))
			element.setAttribute("state","wrong_close")
		} else{
			element.setAttribute("state","close")
		}
		
	};
	websocket.onerror = function(error){
		console.log(error);
		element.setAttribute("state","error")
	};
}
