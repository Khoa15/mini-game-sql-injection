const socket = io()
const startStage = Date.now()
const user ={
    currStage: Number(window.location.pathname[18]),
    stage: [
        {
            topic: "Error",
            title: "",
            goal: "",
            hint: [],
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
    getCurStage: function(){
        return this.stage[this.currStage]
    },
    submit: []
}
$(document).ready(function(){
    if(user.getCurStage().status == 1){
        $("#box_disabled_stage").addClass("d-none")
    }
    $("#title").text(user.getCurStage()["topic"]+": "+user.getCurStage()["goal"])
    $("form#form_login_st1").submit(function(e){
        e.preventDefault()
        var formData = {
            "username": $("input[name='username']").val(),
            "password": $("input[name='password']").val(),
        }
        $("#box-your-data-form").html(JSON.stringify(formData, null, 4))
        user["submit"].push(formData)
        if(user['submit'].length > 3){
            user['submit'].shift()
        }
        sendRequest(formData)
    })
    $("#btn-bf-th").click(async function(){
        var formData = {
            "username": $("input[name='username']").val(),
            "password": $("input[name='password']").val(),
        }
        user["submit"].push(formData)
        const letters = $("#bf-th-letters").val()
        const minL = Number($("#bf-th-min").val())
        const maxL = Number($("#bf-th-max").val())
        //Brute Force
        let found = ""
        let username = formData["username"]
        for(let m = 0; m < maxL; m++){
            for(let i = 0; i < letters.length; i++){
                formData["username"] = username.replace("$$", letters[i]).replace("$range$", m+1)
                const startTime = Date.now()
                const res = await axios.post("/exercise/1/stage/<%= data.stage %>", formData)//sendRequest(formData)
                res["data"]["timing"] = Date.now() - startTime
                if(res["data"]["timing"]){
                    $("#list-response tbody").append(`
                    <tr>
                        <td>${res["data"]["timing"]}</td>
                        <td>${letters[i]}</td>
                    </tr>
                    `)
                    // break
                }
            }
        }
    })
    $("#btn-next-stage").click(function(){
        console.log(user, localStorage.getItem("accessToken"))
        socket.emit("user:next-stage", {info: { stage: user.currStage, submit: user.submit, timing: Date.now()-startStage}, accessToken: localStorage.getItem("accessToken")})
        // window.location = $(this).attr("href")
    })
})

function sendRequest(formData){
    const startTime = Date.now()
    axios.post(`/exercise/1/stage/${user.currStage}`, formData).then((res) => {
        res["data"]["timing"] = Date.now() - startTime
        $("#box-res-api").html(JSON.stringify(res["data"], null, 4))
        return res
    }).catch((err)=>{
        $("#box-res-api").html(JSON.stringify(err.response.data, null, 4))
        return 0
    })
}