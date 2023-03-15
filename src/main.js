const URL_DATA = 'https://kodemia-24g-default-rtdb.firebaseio.com/';
const inputs = document.querySelectorAll('input');
const btnCreate = document.querySelector('#btn-create');
const newUser = {};

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    newUser[e.target.name] = e.target.value;
  });
});

//CRUD
//Create
const postUser = async (userObject) => {
  try {
    const response = await fetch(`${URL_DATA}/yizuz/koders/.json`, { method: 'POST', body: JSON.stringify(userObject) });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
btnCreate.addEventListener('click', (e) => {
  postUser({ ...newUser });
  renderList();
  inputs.forEach(input => input.value = '');
});

//Get
const getUsers = async () => {
  const response = await fetch(`${URL_DATA}/yizuz/koders/.json`);
  const data = await response.json();
  return data;
}

//Delete
const hakai = async (id) => {
  const response = await fetch(`${URL_DATA}/yizuz/koders/${id}/.json`, { method: 'DELETE' });
  const data = await response.json();
  renderList();
  return data;
}


//Render list
const renderList = async () => {
  document.querySelectorAll('.koderLi').forEach(koder => koder.remove());
  const dataList = await getUsers();
  Object.keys(dataList).forEach((key) => {
    let li = document.createElement('li');
    let i = document.createElement('i');
    let btn = document.createElement('button');
    btn.addEventListener(('click'), () => {
      hakai(key);
    });
    let iBtn = document.createElement('i');

    li.classList.add('list-group-item', 'bg-dark', 'text-white', 'rounded-pill', 'text-center', 'koderLi');
    li.setAttribute('id', key)
    i.classList.add('fw-bold', 'text-warning', 'ms-2');
    btn.classList.add('btn', 'btn-dark', 'btn-delete');
    iBtn.classList.add('bi', 'bi-x-circle-fill');

    let liTxt = document.createTextNode(`${dataList[key].name} ${dataList[key].lastName}`);
    let iTxt = document.createTextNode(`G${dataList[key].generation}`);
    btn.appendChild(iBtn);

    i.appendChild(iTxt);
    li.append(liTxt, i, btn);

    document.querySelector('#koders-list').append(li);
  })
}
renderList();