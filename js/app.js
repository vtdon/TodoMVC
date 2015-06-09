(function( window ) {
        'use strict';
})( window );


function createItem(value, item) {
        var div = document.createElement("div");
        div.setAttribute("class", "view");

        var input = document.createElement("input");
        input.setAttribute("class", "toggle");
        input.setAttribute("type", "checkbox");
        input.setAttribute("onclick", "markOne(event)");
        if (value.done)     
                input.setAttribute("checked", "");

        var label = document.createElement("label");
        label.setAttribute("ondblclick", "editTodo(event)");
        label.setAttribute("onkeypress", "return editTodoAdd(event)");
        var text = document.createTextNode(value.title);
        label.appendChild(text);

        var button = document.createElement("button");
        button.setAttribute("class", "destroy");
        button.setAttribute("onclick", "deleteTodo(event)");

        var edit = document.createElement("input");
        edit.setAttribute("class", "edit");
        edit.setAttribute("value", value.title);
        edit.setAttribute("ondblclick", "editTodo(event)");
        edit.setAttribute("onkeypress", "return editTodoAdd(event)");

        div.appendChild(input);
        div.appendChild(label);
        div.appendChild(button);
        item.appendChild(div);
        item.appendChild(edit);
}

function addTodo (event) {
        event = event || window.event;
        if (event.keyCode == 13) {
                var TodoName = document.getElementById("new-todo").value;

                var item = document.createElement("li");
                var div = document.createElement("div");
                div.setAttribute("class", "view");

                var input = document.createElement("input");
                input.setAttribute("class", "toggle");
                input.setAttribute("type", "checkbox");
                input.setAttribute("onclick", "markOne(event)");

                var label = document.createElement("label");
                label.setAttribute("ondblclick", "editTodo(event)");
                label.setAttribute("onkeypress", "return editTodoAdd(event)");
                var text = document.createTextNode(TodoName);
                label.appendChild(text);

                var button = document.createElement("button");
                button.setAttribute("class", "destroy");
                button.setAttribute("onclick", "deleteTodo(event)");

                var edit = document.createElement("input");
                edit.setAttribute("class", "edit");
                edit.setAttribute("value", TodoName);
                edit.setAttribute("ondblclick", "editTodo(event)");
                edit.setAttribute("onkeypress", "return editTodoAdd(event)");

                div.appendChild(input);
                div.appendChild(label);
                div.appendChild(button);
                item.appendChild(div);
                item.appendChild(edit);

                var list = document.getElementById("todo-list");
                list.appendChild(item);

                updateCount();
                return false;
        }
};


function markAll() {
        var listItems = document.getElementById("todo-list").children;
        var toggle = document.getElementsByClassName("toggle");
        var len = toggle.length;
        var count = 0;


        for (var i = 0; i < len; i++) {
                if (listItems[i].className == "completed")      count++;
                else {
                        toggle[i].checked = true;
                        toggle[i].parentNode.parentNode.className = "completed";
                };
        };

        if (count == len) {
                for (var j = 0; j < len; j++) {
                        toggle[j].checked = false;
                        toggle[j].parentNode.parentNode.className = "";
                };
        };
        
        updateCount();
};


function markOne(event) {
        event = event || window.event;
        var t = event.target;

        if (t.parentNode.parentNode.className == null) {
                t.checked = true;
                t.parentNode.parentNode.className = "completed";
        }
        else if (t.parentNode.parentNode.className == "completed") {
                t.checked = false;
                t.parentNode.parentNode.className = "";
        }
        else {
                t.checked = true;
                t.parentNode.parentNode.className = "completed";
        };

        updateCount();
};


function deleteTodo(event) {
        event = event || window.event;
        var todoList = document.getElementById("todo-list");
        var toDelete = event.target.parentNode.parentNode;
        todoList.removeChild(toDelete);
        updateCount();
};

function updateCount() {
        var listItems = document.getElementById("todo-list").children;
        var num = listItems.length;
        var unfinished = 0;
        var finished = 0;

        for (var i = 0; i < num; i++) {
                if (listItems[i].className != "completed")
                        unfinished++;
                else
                        finished++; 
        };

        var countText = "<strong>" + unfinished + "</strong> items left";
        var finishText = "Clear completed (" + finished + ")";
        document.getElementById("todo-count").innerHTML = countText;
        document.getElementById("clear-completed").innerHTML = finishText;
};


function clearCompleted() {
        var list = document.getElementById("todo-list");
        var num = list.children.length;

        for (var i = 0, j=0; i < num; i++, j++) {
                if (list.children[j] && (list.children[j].className == "completed")) {
                        list.removeChild(list.children[j]);
                        j--;
                }
        };

        updateCount();
};

function filterAll() {
        var list = document.getElementById("todo-list");
        var num = list.children.length;

        for (var i = 0; i < num; i++) {
                //list.children[i].style.visibility = "visible";
                list.children[i].style.display = "initial";
        };
};

function filterActive() {
        var list = document.getElementById("todo-list");
        var num = list.children.length;

        for (var i = 0; i < num; i++) {
                if (list.children[i].className != "completed")
                        //list.children[i].style.visibility = "visible";
                        list.children[i].style.display = "initial";
                else
                        //list.children[i].style.visibility = "hidden";
                        list.children[i].style.display = "none";
        };
};

function filterCompleted() {
        var list = document.getElementById("todo-list");
        var num = list.children.length;

        for (var i = 0; i < num; i++) {
                if (list.children[i].className == "completed")
                        //list.children[i].style.visibility = "visible";
                        list.children[i].style.display = "initial";
                else
                        //list.children[i].style.visibility = "hidden";
                        list.children[i].style.display = "none";
        };
};

function editTodo(event) {
        event = event || window.event;
        event.target.parentNode.setAttribute("class", "editing");
        event.target.setAttribute("contenteditable", "true");
        return false;
};

function editTodoAdd(event) {
        event = event || window.event;
        if (event.keyCode == 13) {
                var parent_li = event.target.parentNode.parentNode;
                parent_li.children[1].setAttribute("value", event.target.innerHTML);
                event.target.setAttribute("contenteditable", "false");
                return false;
        };

};

function initFunction() {
        loadJSON('http://localhost:8080/sample.json',
                 function(data) { addFileData(data); /*console.log(data);*/},
                 function(xhr) { console.error(xhr); }
                );
                
        var d = document.getElementById("todo-list").children;
        var len = d.length;
        
        for (var i = 0; i < len; i++) {
                d[i].style.pointerEvents = 'auto';
                //d[i].setAttribute("contenteditable", "true");
        };

};


function addFileData(data) {
        var list = document.getElementById("todo-list");
        var dlen = data.length;

        for (var j = 0; j < dlen; j++) {
                var item = document.createElement("li");
                if (data[j].done)
                        item.setAttribute("class", "completed");
                else
                        item.setAttribute("class", "");

                item.setAttribute("id", data[j].id);
                createItem(data[j], item);
                list.appendChild(item);
        };

        updateCount();
};


function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };

    xhr.open("GET", path, true);
    xhr.send();
}


