function encrypt() {
    var enc = "";
    var selector = document.querySelector('input[name="encryption"]:checked');
    if(selector) enc = selector.value;

    if(enc == "OTP"){
        var data_in = document.getElementById("data_in").value.toString().toLowerCase();
        var key = document.getElementById("key").value.toString().toLowerCase();

        var output = ""
        if(data_in.length <= key.length){
            for(var i=0; i < data_in.length; i++){
                output += String.fromCharCode((data_in.charCodeAt(i) + key.charCodeAt(i) - 2 * 97) % 26 + 97);
            }
            document.getElementById("output").innerHTML = output;
        }else{
            alert("Key is too short. For OTP Encryption key must be as long or longer than the input text.");
        }
    }else if(enc == "SHA-2_SHA-512"){
        var data_in = document.getElementById("data_in").value.toString();
        document.getElementById("output").innerHTML = window.btoa(sha512(data_in));
    }
}

function decrypt() {
    //readTextFile("database.json"
    var data_in = document.getElementById("data_in").value.toString().toLowerCase();
    var key = document.getElementById("key").value.toString().toLowerCase();

    var enc = "";
    var selector = document.querySelector('input[name="encryption"]:checked');
    if(selector) enc = selector.value;

    if(enc == "OTP"){
        var output = ""
        if(data_in.length <= key.length){
            for(var i=0; i < data_in.length; i++){
                output += String.fromCharCode((data_in.charCodeAt(i) - key.charCodeAt(i) + 26) % 26 + 97);
            }
            document.getElementById("output").innerHTML = output;
        }else{
            alert("Key is too short. For OTP Encryption key must be as long or longer than the input text.");
        }
    }
}