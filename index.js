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

const deleteFromList = (postId) => {
  const indexOfData = dataArray.findIndex((item) => item.id === postId);
  if (indexOfData > -1) {
    dataArray.splice(indexOfData, 1);
    updateList(dataArray);
  }
};

const editFromList = (json) => {
  dataArray = dataArray.map((item) => {
    if (item.id === json.id) {
      return json;
    }
    return item;
  });
  updateList(dataArray);
};

const deleteComment = (postId) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  })
    .then(() => {
      deleteFromList(postId);
    })
    .catch((error) => console.log(error));
};

const editComment = () => {
  const postID = document.getElementById("postId").value;
  const edittingTitle = document.getElementById("editting-title").value;
  const findItem = dataArray.find((item) => {
    console.log("h", item);

    // curly braces if not shorthand for 1 statement (i.e. ends with ;)
    return item.id.toString() === postID;
  });

  if (findItem) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: edittingTitle,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => editFromList(json));
  } else if (!findItem) {
    console.log("There is no such post id.");
  }
};

const updateList = (jsonData) => {
  let inner = "";
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
    inner += `
    <div class="list-item">
        <div class="component userID">${item.userId}</div>
        <div class="component id">${item.id}</div>
        <div class="component title">${item.title}</div>
        <div class="component body">${item.body}</div>
        <button class="delete" onclick="deleteComment(${item.id})">Delete</button>
    </div>
    `;
  });
  list.innerHTML = inner;
};

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((json) => loadList(json))
  .catch((error) => console.log(error));

const addComment = () => {
  const yourID = document.getElementById("add-name").value;
  const yourTitle = document.getElementById("add-title").value;
  const yourBody = document.getElementById("add-body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: yourTitle,
      body: yourBody,
      userId: yourID.toString(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => addToList(json));
};
