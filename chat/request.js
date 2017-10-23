$(document).ready(function() {

    var texts = ['Xin chào!','Hi 🙋🏻','Huyền My sẵn sàng trả lời bạn!'];
    //  setResponse("............");

    var text = texts[Math.floor(Math.random() * texts.length)];
    document.getElementById('bot').innerHTML = "<div class='calloutbig'><img src='chatbot.png' width='50px' height='50px' class='circular--square' style='float: left;' /><div class='calloutright'>" + text + "</div><div class='message-from message-from-bot'>"+ new Date().toLocaleTimeString() +"</div></div>";
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $('.send_message').click(function (e) {
            send();
    });

});



function mybutton() {
    var mytext = document.getElementById('button').value;
//    alert(mytext)
    send(mytext)
}

function send(mytext) {
    if (typeof mytext !='undefined'){
        var text = mytext
//        alert(mytext)
    } else {
        var text = $("#input").val();
    }

    var doc = document.getElementById('bot').innerHTML;
    document.getElementById('bot').innerHTML = doc + "<div class='calloutbig'> <img src='user.png' width='32px' height='32px' class='circular--square' style='float: right;' /><div class='calloutleft'>" + text + "</div><div class='message-from message-from-me'>"+ new Date().toLocaleTimeString() +"</div></div>";
//    alert(val);
    var objDiv = document.getElementById("bot");
    objDiv.scrollTop = objDiv.scrollHeight;
    $.ajax({
    //    alert(val);
        type: "POST",

        //  setResponse("............");

        url: "https://api.api.ai/v1/query?v=20150910",
        //    alert(val);//    alert(val);
        //  setResponse("............");
        contentType: "application/json; charset=utf-8",//    alert();
        dataType: "json",
        headers: {"Authorization": "Bearer 1491fc0d408c4bfbb6d4e53773a14940"},
        //  setResponse("............");

        data: JSON.stringify({ query: text, sessionId: "1491fc0d408" }),
        success: function(data) {
            setResponse(JSON.stringify(data));
        },
        //    alert(val);
        error: function() {
            setResponse("Không thể kết nối ...");
        }
        //    alert();
    });

    $('#input').val("");
}

function setResponse(val) {
    speech = $.parseJSON(val);
    var replies = speech.result.fulfillment.messages;
    nb_reply = replies.length
    for (i = 0; i < nb_reply; i++) {

//        var html = replies[i]["speech"];
//        var div = document.createElement("div");
//        div.innerHTML = html;
//            alert(div.innerHTML);

        var delayMillis = 500;


            $.ajax({
                type: "POST",
                url: "http://api.openfpt.vn/text2speech/v4",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                headers: {
                        "api_key": "b7891e7b46764220b73911ed479f3c7f",
                        "speed": 2,
                        "voice": "female",
                        "prosody": 1,
                        },
                data: "Xin chào các bạn",
                success: function(data) {setSound(JSON.stringify(data));},
            });

            var doc = document.getElementById('bot').innerHTML;
            setTimeout(function() {
                document.getElementById('bot').innerHTML = doc + "<div class='calloutbig' id='callout'><img src='chatbot.png' width='50px' height='50px' class='circular--square' style='float: left;' /><div class='calloutright'>" + replies[i]["speech"] + "</div><div class='message-from message-from-bot'>"+ new Date().toLocaleTimeString() +"</div></div>";
            }, delayMillis);
            setTimeout()
            var doc = document.getElementById('bot').lastElementChild.innerHTML;
            var objDiv = document.getElementById("bot");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
}

function setSound(val)
{
    speech = $.parseJSON(val);
    var url = speech.async;
    alert(url);
    var audio = new Audio(url);
    audio.play();

}