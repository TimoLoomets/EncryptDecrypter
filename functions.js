function request (method, url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function decryptMD5(hash) {
    request('GET',`https://md5.ovh/index.php?md5=${hash}&result=json`)
        .then(data=>{
            console.log(data);
        }).catch(error => {
        console.error("Shit!")
    });
}

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
        document.getElementById("output").innerHTML = sha512(data_in);
    }
}

function decrypt() {
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
    }else if(enc == "MD5"){
        var data_in = document.getElementById("data_in").value.toString();
        document.getElementById("output").innerHTML = decryptMD5(data_in);
    }
}