const stage = {
    element: $("#l-user-st-1"),
    re: $("#list-rank"),
    users: [],
    mail: [],
    reel: (u) => `<li>${u.name} - ${Math.round(u.timing / 10 / 60) / 100}</li>`,
    append: function (user) {
        if (this.users.findIndex(u => u.id == user.id) == -1) {
            this.users.push(user)
            return true
        }
        return false
    },
    start: function () {
        socket.emit("admin:start", 1)
    },
    updateBoard: function () {
        stage.element.html("")
        listUserOnStage()
    },
    pushMail: function (mail, uid) {
        const uindex = this.mail.findIndex(m => m.uid == uid)
        if (uindex != -1) {
            this.mail[uindex].content = mail
            return
        }
        this.mail.push({ content: mail, uid: uid })
    },
    deleteMail: function (uid) {
        this.mail = this.mail.filter(m => m.uid != uid)
    }
}

socket.emit("admin:user:list", "admin")
socket.on("user:list", (res = []) => {
    res.forEach(user => appendUser(user))
})
socket.on("user:get", (res) => {
    try {
        appendUser(res[0])
    } catch (err) {
        console.log(err)
    }
})

function appendUser(user) {
    user = {
        "id": user["id"],
        "name": user["name"],
        "timing": user.timing,
        "status": user.status,
        "submit": []
    }
    if (stage.append(user)) {
        appendUserOnStage(user)
    }
}

function appendUserOnStage(user, cStage = 1) {
    const Pill = (type = "text-light") => {
        return `
        <div class="spinner-grow spinner-grow-sm ${type}" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>`
    }

    const successPill = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>`
    const html = `
    <span class="badge d-flex align-items-center p-2 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
        <span id="b-username">${user["name"]}</span>
        <span class="vr mx-2"></span>
        <a href="#">
            ${user.status == 3 ? successPill : user.status == 2 ? Pill("text-success") : Pill()
        }
        </a>
    </span>
    `
    stage.element.append(html)
}

function listUserOnStage() {
    stage.users.forEach(u => {
        appendUserOnStage(u)
    })
}

$(document).ready(function () {
    $("#btn-start-stage").click(function () {
        $("#btn-view-current-stage").text("Fighting")
        stage.start()
        stage.users.forEach(u => u.status != 3 ? u.status = 2 : null)
        stage.updateBoard()
    })
    $("#btn-md-mailbox").click(function () {
        const modal = $("#mailbox .modal-body")
        modal.empty()
        stage.mail.forEach(m => {
            const user = stage.users.find(u => u.id == m.uid)
            if (user === undefined){
                return
            }
            modal.append(`
            <div class="col-sm-3 mb-2">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <p class="card-text">${m.content}</p>
                    </div>
                </div>
            </div>
            `)
        })
    })
})

socket.on("user:submit", ({ info, uid }) => {
    console.log(info, uid)
    const uindex = stage.users.findIndex(u => u.id == uid)
    if (uindex == -1) {
        return false
    }
    if (info.stage == 5) {
        stage.users[uindex].status = 3
        stage.updateBoard()
        return
    }
    stage.users[uindex].submit.push({
        "stage": info.stage,
        "info": info.submit,
    })
    stage.users[uindex].timing = info.timing
})

socket.on("admin:receive:mail", (mail) => {
    stage.pushMail(mail.content, mail.uid)
})

function sort(users = []) {
    users.sort(a, b => a.timing - b.timing)
    return users
}

function printList(users = []) {
    const l = stage.re
    l.empty()
    for (let i = 0; i < users.length; i++) {
        l.append(stage.reel(users[i]))
    }
}