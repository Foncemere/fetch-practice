const list = document.querySelector(".list");
let dataArray = [];

const loadList = (entry) => {
  dataArray = [...dataArray, ...entry];
  updateList(dataArray);
};

const addToList = (addedJsonData) => {
  dataArray.push(addedJsonData);
  updateList(dataArray);
};

const deleteFromList = (deletedJsonData) => {
  const indexOfData = dataArray.indexOf(deletedJsonData);
  if (indexOfData > -1) {
    dataArray.splice(indexOfData, 1);
  }
  updateList(dataArray);
};

const deleteComment = (postId) => {
  for (i = 0; i < dataArray.length; i++) {
    if (postId === dataArray[i].id) {
      deleteFromList(dataArray[i]);
    }
  }

  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  })
    .then(() => {
      deleteFromList(dataArray[i]);
    })
    .catch((error) => console.log(error));
};

const editComment = (postID) => {
  const findItem = dataArray.find((item) => item.id === postID);
  if (findItem) {
    console.log("tada", findItem);
  }
};

const updateList = (jsonData) => {
  list.innerHTML = "";
  // for (i = jsonData.length - 1; i >= 0; i--) {
  //   console.log(jsonData[i]);
  //   list.innerHTML += `
  //   <div class="list-item">
  //       <div class="component userID">${jsonData[i].userId}</div>
  //       <div class="component id">${jsonData[i].id}</div>
  //       <div class="component title">${jsonData[i].title}</div>
  //       <div class="component body">${jsonData[i].body}</div>
  //       <button class="delete" onclick="deleteComment(${jsonData[i].id})">Delete</button>
  //       <button class="edit" onclick="editComment(${jsonData[i].id})">Edit</button>
  //   </div>
  //   `;
  // }

  jsonData.forEach((item) => {
    list.innerHTML += `
    <div class="list-item">
        <div class="component userID">${item.userId}</div>
        <div class="component id">${jitem.id}</div>
        <div class="component title">${item.title}</div>
        <div class="component body">${item.body}</div>
        <button class="delete" onclick="deleteComment(${item.id})">Delete</button>
        <button class="edit" onclick="editComment(${item.id})">Edit</button>
    </div>
    `;
  });
};

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => loadList(json))
  .catch((error) => console.log(error));

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  body: JSON.stringify({
    title: "foo",
    body: "bar",
    userId: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((json) => addToList(json));
