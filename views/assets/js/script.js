const socket = io()
const form_login = $("#form_login")
const queue = $("#queue")
let users = {
    count: 0,
    step: 0,
    data: []
}
let user = {}
if(form_login.length){
    $(document).ready(function(){
        $("form").submit(function(e){
            e.preventDefault()
            axios.post("/api/v1/login", {username: $("#username").val()}).then(function(res){
                const username = $("input[name='username']").val()
                const token = res.data.accessToken
                socket.emit("user:login", {id: token, name: username, room_id: null})
                localStorage.setItem("accessToken", token)
            })
        })
    })
}
async function addUserQueue(data = []){
    console.log(data)
    data.forEach(q => console.log(q))
    data.forEach(q=>{
        users["data"].push(q)
        users.count += 1
        queue.append(`
        <div class="col">
            <p class="text-center py-3 px-3 border ${ q["status"] == 0 ? "text-secondary" :"shadow" } animate__animated  animate__wobble">
                ${q["name"]}
            </p>
        </div>`)
    })
    $("#counter-user").html(users.count)
}
if(queue.length){
    socket.emit("user:update:room", socket.id)
    socket.on("user:list", (res=[])=>{
        if(users.step === 0 )addUserQueue(res)
        users.step += 1
    })
}
socket.on("user:get", (res)=>{
    if(queue.length){
        addUserQueue(res)
    }
})
socket.on("admin:start", ()=>{
    users.data[users.data.findIndex(u => u.id == localStorage.getItem("accessToken"))].stage.cur = 1
    window.location = "/exercise/1/stage/1"
})