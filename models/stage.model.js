// const stage_schema = {
//     topic: "",
//     title: "",
//     goal: "",
//     hint: [],
//     status: 1,
//     submit: []
// }
const Stage = {
    status: 0,
    maxStage: 5,
    ttUsers: 0,
    users: [],
    info: [
        {
            topic: "Error",
            title: "",
            goal: "",
            hint: [
                "'",
            ],
            status: 1,
        },
        {
            topic: "Union",
            title: "",
            goal: "",
            hint: [
                "' UNION SELECT NULL, username, password FROM users--"
            ],
            status: 1,
        },
        {
            topic: "Boolean",
            title: "",
            goal: "Response from server is true or false",
            hint: [],
            status: 1,
        },
        {
            topic: "Time",
            title: "",
            goal: "Response from server is about 10000ms",
            hint: [
                "'; WAITFOR DELAY '0:0:10';--",
                "'; IF (SELECT COUNT(username) FROM users WHERE username = 'alice' AND SUBSTRING(password, $range$, 1) = '$$') = 1 WAITFOR DELAY '0:0:5'--"],
                status: 1,
        },
        {
            topic: "Out of band",
            title: "",
            goal: "Try access to C driver",
            hint: [],
            status: 0,
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
    getStage: function(cStage){
        return this.info[cStage - 1]
    },
    appendUser: function(user , cStage=this.curStage){
        this.users.push(user)
    },
    updateUser: function(user){
        
    }
}

module.exports = Stage