const socket = io()
const form_login = $("#form_login")
const queue = $("#queue")
let users = {
    count: 0,
    step: 0,
    data: []
}
let user = {}
// if(form_login.length){
    
// }
async function addUserQueue(data = []){
    data.forEach(q=>{
        if(users['data'].find(u => u.id == q.id)){
            return false
        }
        users["data"].push(q)
        users.count += 1
        queue.append(`
        <div class="col">
            <p class="text-center py-3 px-3 border shadow ${(q.id == localStorage.getItem("uid")) ? "text-danger" : ""} animate__animated  animate__wobble">
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
    try{
        users.data[users.data.findIndex(u => u.id == localStorage.getItem("uid"))].stage.curStage = 1
        window.location = "/exercise/1/stage/1"
    }catch(err){
        console.log(err)
    }
})