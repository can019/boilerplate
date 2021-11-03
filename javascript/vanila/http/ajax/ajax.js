export default function requestAjax(url, method='GET', data, type=undefined){
    const httpRequest = new XMLHttpRequest();
    
    if(!httpRequest){
        return false;
    }
    httpRequest.onreadystatechange = alertContents;

    httpRequest.open(method, url);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('userName=' + encodeURIComponent(userName));

    function alertContents(){
        try {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
              if (httpRequest.status === 200) {
                return httpRequest.responseText;
              } else {
                alert('There was a problem with the request.');
              }
            }
          }
          catch( e ) {
            alert('Caught Exception: ' + e.description);
          }
    }
}