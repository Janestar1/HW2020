
let tasks = [];//{title:"123",done:false,vip：}

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");
    //添加操作
    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }

        let newTask = {
            title: inputEl.value,
            done: false

        };
        inputEl.value = "";
        tasks.push(newTask);
        console.log("tasks:", tasks);
        renderTaskItems();
    }
    inputEl.onkeypress = (e) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };

    
}

function renderTaskItems() {
    console.log("render items");
    let itemsEl = document.querySelector(".todo-panel .todo-items");

    //itemsEl.querySelectorAll("*");
    //console.log(itemsEl);
    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        let item = document.createElement("div");
        item.className = "task";

        //状态保存
        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";

        //完成操作
        doneEl.checked = task.done;

        if (task.done) {
            item.classList.add("done");
        }
        else {
            item.classList.remove("done");
        }
        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            //console.log("checkbox:",e);
            if (task.done) {
                item.classList.add("done")
            }
            else {
                item.classList.remove("done");
            }
        }
        item.append(doneEl);

        let labelEl = document.createElement("label");
        labelEl.innerText = task.title;
        item.append(labelEl);

        let ctrlbarEl = renderTaskCtrlBut(tasks, i);

        item.append(ctrlbarEl);
        itemsEl.append(item);
    }
}

function renderTaskCtrlBut(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    //上移按钮
    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "🠕";
    upEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx - 1];
        tasks[taskIdx - 1] = t;
        renderTaskItems();
    };
    ctrlbarEl.append(upEl);

    //下移按钮
    let downEl = document.createElement("button");
    downEl.innerText = "🠗";
    if (taskIdx === tasks.length-1){
        downEl.disabled = true;
    }
    downEl.onclick = () => {
        let t = tasks[taskIdx];
        tasks[taskIdx] = tasks[taskIdx + 1];
        tasks[taskIdx + 1] = t;
        renderTaskItems();
    };
    ctrlbarEl.append(downEl);

    //删除按钮
    let cancelEl = document.createElement("button");
    cancelEl.innerText = "×";

    //delete操作
    cancelEl.onclick = () => {
        let result = confirm("您确定要永久删除这个待办项吗？");
        if (result){
            tasks.splice(taskIdx, 1);
            renderTaskItems();
        }
     };
    ctrlbarEl.append(cancelEl);
    return ctrlbarEl;
}

renderEditor();
renderTaskItems();