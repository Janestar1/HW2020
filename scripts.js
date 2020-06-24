
let tasks = [];//{title:"123",done:false,vip：false}
let vipitems = 0;
function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");
    //添加操作
    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }

        let newTask = {
            title: inputEl.value,
            done: false,
            vip: false
        };
        inputEl.value = "";
        tasks.push(newTask);
     // console.log("tasks:", tasks);
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

        let ctrlbarEl = renderTaskCtrlBut(task,item, i);

        item.append(ctrlbarEl);
        itemsEl.append(item);
    }
}

function renderTaskCtrlBut(task,item, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    //上移按钮
    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "🠕";
    //上移操作
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
    //下移操作
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

    //重要性按钮
    let vipEl = document.createElement("input");
    vipEl.innerText = "☺";
    vipEl.type = "checkbox";
    vipEl.checked = task.vip;
    if (task.vip)
    {
        item.classList.add("vip");
    }
    else{
        item.classList.remove("vip");
    }
    
    //重要性操作
    vipEl.onchange = (e) => {
        task.vip = e.target.checked;
        if (task.vip) {
            item.classList.add("vip");
            let t = task;
            for (let j = taskIdx; j > 0; j--) {
                tasks[j] = tasks[j - 1];
            }
            tasks[0] = t;
            vipitems++;
        }
        else {
            item.classList.remove("vip");
            let t = task;
            for (let j = taskIdx; j <tasks.length-1; j++) {
                tasks[j] = tasks[j+1];
            }
            tasks[tasks.length-1] = t;
            vipitems--;
        }
        renderTaskItems();
    };
    ctrlbarEl.append(vipEl);
    return ctrlbarEl;
}

renderEditor();
renderTaskItems();