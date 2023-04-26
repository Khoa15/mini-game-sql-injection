const socket = io()
const startStage = Date.now()
const user = {
    currStage: Number(window.location.pathname[18]),
    stage: [
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
            hint: [
                "' or 1=1--"
            ],
            status: 1,
        },
        {
            topic: "Time",
            title: "",
            goal: "Response from server is about 10000ms",
            hint: [
                "'; WAITFOR DELAY '0:0:10';--",
                "'; IF (SELECT COUNT(username) FROM users WHERE username = 'alice' AND SUBSTRING(password, $range$, 1) = '$$') = 1 WAITFOR DELAY '0:0:5'--"
            ],
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
    submit: [],
    getCurStage: function () {
        return this.stage[this.currStage-1]
    },
    pushSubmit: function(data= {form: "", response: ""}){
        this.submit.push(data)
        if(this.submit.length > 3)
        {
            this.submit.shift()
        }
    },
    setDefault: function(){
        $("#user_st1").val(this.getCurStage().hint[0])
        $("#pass_st1").val("123")
    },
    virtualBattle: function(){
        // {
        //     "stage": 1,
        //     "submit": [
        //         {
        //             "form": {
        //                 "username": "'",
        //                 "password": "123"
        //             }
        //         },
        //         {
        //             "form": {
        //                 "username": "'",
        //                 "password": "123"
        //             },
        //             "response": {
        //                 "sts": 0,
        //                 "data": [],
        //                 "message": "Unclosed quotation mark after the character string ''.",
        //                 "timing": 190
        //             }
        //         }
        //     ],
        //     "timing": 2816
        // }
    }
}
window.onload = user.setDefault()
$(document).ready(function () {
    if (user.getCurStage().status == 1) {
        $("#box_disabled_stage").addClass("d-none")
    }
    $("#title").text(user.getCurStage()["topic"] + ": " + user.getCurStage()["goal"])
    $("form#form_login_st1").submit(function (e) {
        e.preventDefault()
        var formData = {
            "username": $("input[name='username']").val(),
            "password": $("input[name='password']").val(),
        }
        $("#box-your-data-form").html(JSON.stringify(formData, null, 4))
        user.pushSubmit({form: formData})
        sendRequest(formData)
    })
    $("#btn-bf-th").click(async function () {
        var formData = {
            "username": $("input[name='username']").val(),
            "password": $("input[name='password']").val(),
        }
        const letters = $("#bf-th-letters").val()
        const minL = Number($("#bf-th-min").val())
        const maxL = Number($("#bf-th-max").val())
        let found = ""
        let username = formData["username"]
        const response = []
        for (let m = 0; m < maxL; m++) {
            for (let i = 0; i < letters.length; i++) {
                formData["username"] = username.replace("$$", letters[i]).replace("$range$", m + 1)
                const startTime = Date.now()
                const res = await axios.post("/exercise/1/stage/"+user.currStage, formData)//sendRequest(formData)
                res["data"]["timing"] = Date.now() - startTime
                if (res["data"]["timing"]) {
                    $("#list-response tbody").append(`
                    <tr>
                    <td>${res["data"]["timing"]}</td>
                    <td>${letters[i]}</td>
                    </tr>
                    `)
                    if(res["data"]["timing"]>10000){
                        response.push({timing: res["data"]["timing"], letter: letters[i]})
                    }
                }
            }
        }
        user.pushSubmit({form: formData, response: response})
    })
    $("#btn-next-stage").click(async function () {
        socket.emit("user:next-stage", { info: { stage: user.currStage, submit: user.submit, timing: Date.now() - startStage }, uid: localStorage.getItem("uid") })
        window.location = $(this).attr("href")
    })
})

function sendRequest(formData) {
    const startTime = Date.now()
    axios.post(`/exercise/1/stage/${user.currStage}`, formData).then((res) => {
        user.pushSubmit({form: formData, response: res["data"]})
        res["data"]["timing"] = Date.now() - startTime
        $("#box-res-api").html(JSON.stringify(res["data"], null, 4))
        return res
    }).catch((err) => {
        $("#box-res-api").html(JSON.stringify(err.response.data, null, 4))
        return 0
    })
}