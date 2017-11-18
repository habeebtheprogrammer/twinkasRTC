var callBtn = document.getElementById("callbtn");
var localSrc = document.querySelector("video[id='localvideo']");
var remoteSrc = document.querySelector("video[id='remotevideo']");
var pc1,pc2;
$("#callbtn").on("click",start);
var prevRemoteSrc = $(remoteSrc).attr('src')
$(localSrc).hide();
$(remoteSrc).hide();
$('.notification-close').on("click",function(){$(this).parent().parent().parent().addClass("slideOutLeft")})
$("#hangup").hide();
function success(stream)
{
    console.log("getUserMedia was successful");
    window.stream = stream;
    localSrc.src = window.URL.createObjectURL(stream);
    $('.replace-img').hide();
    $(localSrc).show();
    window.pc1 = pc1 = new RTCPeerConnection(null);
        pc1.onicecandidate = function (e) {
        if(e.candidate){
            console.log("new ice candidate")
            pc2.addIceCandidate(
                new RTCIceCandidate(e.candidate)
            )
        }
        console.log(e);
    }

    window.pc2 = pc2 = new RTCPeerConnection(null);
        pc2.onicecandidate = function (e) {
            if(e.candidate){
                console.log("new ice candidate")
                pc1.addIceCandidate(
                    new RTCIceCandidate(e.candidate)
                )
            }
    }
 
    
    pc2.onaddstream = function (e) { console.log(e,"pc2 stream added successfully");
    remoteSrc.src = window.URL.createObjectURL(stream);
    $(callBtn).hide();
    $('#hangup').show();
    $(remoteSrc).show();
    $('.notification').show();
    $('#hangup').on("click", hangup);
    callBtn.disabled = false;
}
    pc1.addStream(stream); console.log("added local stream")
    
    var offerOptions = { offerToReceiveAudio: true, offerToReceiveVideo: true }
    pc1.createOffer(offerOptions).then(function (desc) { pc1.setLocalDescription(desc); pc2.setRemoteDescription(desc);
        pc2.createAnswer().then(function (desc) {pc2.setLocalDescription(desc); pc1.setRemoteDescription(desc)});
    });
    
}

function failed(err) {  console.log(err)}


 function start() {
    $('.notification').removeClass("slideOutLeft")
    
    var constraint = { audio: true, video: true }
    callBtn.disabled = true
    $(callBtn).html("Calling...");

    navigator.getUserMedia(constraint, success,failed)
}
function hangup(){console.log(pc1);
    $('.notification').addClass("slideOutRIght")
    pc1.close(); pc2.close();
    pc1 = pc2 = null;   
    $("#hangup").hide();
    $(remoteSrc).hide();
    $(callBtn).show().html("Call");
    $('.replace-img').show();
    $('#localvideo').hide();
    remoteSrc.src = prevRemoteSrc;
}


if(window.location.pathname === "/chat"){
    $('#chat').addClass('active')
};
if (window.location.pathname === "/videocall") {
    $('#videocall').addClass('active')
};