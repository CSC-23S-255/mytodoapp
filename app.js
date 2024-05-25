  

 
 const firebaseConfig = {
   apiKey: "AIzaSyDczEnQBDxCRM8W9IBOoeHGjypEWIh4qh4",
   authDomain: "todo-with-database-8cf4c.firebaseapp.com",
   databaseURL: "https://todo-with-database-8cf4c-default-rtdb.firebaseio.com",
   projectId: "todo-with-database-8cf4c",
   storageBucket: "todo-with-database-8cf4c.appspot.com",
   messagingSenderId: "898712115524",
   appId: "1:898712115524:web:b02fe6dff4b7e9594cdf11"
 };

 // Initialize Firebase
 const app = firebase.initializeApp(firebaseConfig);

  
 firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    // console.log(data.val().key);
    // console.log(data.val().todoValue);

    var list = document.getElementById("list");

    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().todoValue);

    liElement.appendChild(liText);

    var list = document.getElementById("list");

    list.appendChild(liElement);

    

    var delBtnELement = document.createElement("button");

    var delBtnText = document.createTextNode("delete");

    delBtnELement.appendChild(delBtnText);

    liElement.appendChild(delBtnELement);

    delBtnELement.style.backgroundColor = "blue";
    delBtnELement.style.color = "white";

    delBtnELement.setAttribute("onclick", "deleteItem(this)");

    delBtnELement.setAttribute("id", data.val().key);
    //   Edit button creation

    var EditBtnELement = document.createElement("button");

    var EditBtnText = document.createTextNode("edit");

    EditBtnELement.appendChild(EditBtnText);

    liElement.appendChild(EditBtnELement);

    EditBtnELement.setAttribute("class", "editBtn");

    EditBtnELement.setAttribute("id", data.val().key);

    EditBtnELement.setAttribute("onclick", "editItem(this)");

    
  });

function addTodo() {
  var input = document.getElementById("todoInput");

  var id = Date.now().toString(31);

  var obj = {
    key: id,
    todoValue: input.value,
  };

  console.log(obj);

  firebase
    .database()
    .ref("todos/" + id)
    .set(obj);
}

function delteAll() {
  firebase.database().ref("todos").remove();
  var list = document.getElementById("list");
  list.innerHTML = "";
}

function deleteItem(e) {
  firebase
    .database()
    .ref("todos/" + e.id)
    .remove();
  e.parentNode.remove();
}

function editItem(e) {
  
  var updateValue = prompt("Enter updated value..");

  firebase
    .database()
    .ref("todos/" + e.id)
    .set({
      key: e.id,
      todoValue: updateValue,
    });

  e.parentNode.firstChild.nodeValue = updateValue;
}