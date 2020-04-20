cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
        
    },

    // use this for initialization
    onLoad: function () {
        // cc.audioEngine.setMaxWebAudioSize(1024*10);
        this.play();
    },
    
    update: function () {
    },
    
    play: function () {
        this.audioSource.play();
    },
    

});
