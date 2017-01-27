Speak = {
    fullString: "",
    status: false,
    time: 500,
    Start: function () {
        var check = setInterval(function () {
            chrome.tts.isSpeaking(function (speaking) {
                if (speaking == false && Speak.fullString.length > 0) {
                    Speak.ReadText(Speak.fullString);
                }
            });
        }, this.time);

        chrome.contextMenus.removeAll(function () { });
        chrome.contextMenus.create({
            'type': 'normal',
            'title': 'ОЗВУЧИТЬ ТЕКСТ',
            'contexts': ['selection'],
            'onclick': function (info, tab) {
                Speak.ReadText(info.selectionText);
            }
        });
    },
    ReadText: function (text) {
        var res = text.split(" ");
        if (res.length > 20) {
            Speak.fullString = res.slice(20).join(' ');
            this.time = 0;
        } else {
            Speak.fullString = 0;
            this.time = 1000;
        }
        chrome.tts.speak(res.slice(0, 20).join(' '), {'rate': 0.8});
    }
}

  window.onload = function() {
    Speak.Start();
  };


