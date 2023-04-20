const Stage = {
    status: 0,
    curStage: 1,
    maxStage: 5,
    ttUsers: 0,
    data: [
        {
            "topic": "",
            "users":[]
        }
    ],
    next: function() {
        this.curStage += 1
        return this.curStage
    },
    start: function(){
        this.status = 1
        return this.curStage
    },
    finish: function(){
        this.status = 2
        return this.curStage
    },
    getCurStage: function(){
        return this.data[this.curStage-1]
    },
    appendUser: function(user , cStage=this.curStage){
        this.data[cStage - 1]["users"].push(user)
    }
}

module.exports = Stage