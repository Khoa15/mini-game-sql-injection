const stage = {
    cStage: 1,
    data: [
        {
            "stage": 1,
            "element": $("#l-user-st-1"),
            "topic": "",
            "status": {
                "i": 0,
                "data": ["Queue", "Fighting", "End"],
            },
            "users": []
        },
        {
            "stage": 2,
            "element": $("#l-user-st-2"),
            "topic": "",
            "status": ["Queue", "Fighting", "End"],
            "users": []
        },
        {
            "stage": 3,
            "element": $("#l-user-st-3"),
            "topic": "",
            "status": ["Queue", "Fighting", "End"],
            "users": []
        },
    ],
    append: function(user){
        this.data[currStage.cStage - 1]["users"].push(user)
    },
    getElementHTML: function(stage){
        return this.data[stage-1]["element"]
    },
    start: function(){
        socket.emit("admin:start", (cStage))
        
    },
}

socket.on("user:get", (res)=>{
    try{
        let user = res[0]
        user = {
            "name": user["name"],
            "score": 0,
            "time": 0,
            "isSuccess": false
        }
        stage.append(user)
        appendUserOnStage(user, currStage.cStage)
    }catch(err){
        console.log(err)
    }
})

function appendUserOnStage(user, cStage){
    const errorPill = `
    <div class="spinner-grow spinner-grow-sm text-light" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`
    const successPill = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>`
    const html = `
    <span class="badge d-flex align-items-center p-2 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
        <span id="b-username">${user["name"]}</span>
        <span class="vr mx-2"></span>
        <a href="#">
            ${user["isSuccess"] ? successPill : errorPill}
        </a>
    </span>
    `
    stage.getElementHTML(cStage).append(html)
}