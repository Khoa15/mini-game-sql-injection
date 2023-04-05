const socket = io()
const form_login = $("#form_login")
const queue = $("#queue")
let users = {
    count: 0,
    step: 0,
    data: []
}
if(form_login.length){
    form_login.on("submit", function(e){
        const username = $("input[name='username']").val()
        const room_id = $("input[name='room_id']").val()
        socket.emit("user:login", {id: socket.id, name: username, room_id: room_id})
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
    socket.emit("update:user:room")
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