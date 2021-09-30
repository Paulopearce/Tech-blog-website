document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById('goProfile').addEventListener('click', () => {
  window.location = '/profile.html'
})

document.getElementById('logOut').addEventListener('click', () =>{
  localStorage.removeItem('token')
  window.location = '/auth.html'
})

document.getElementById('createPost').addEventListener('click', event => {
  event.preventDefault()
  axios.post('/api/posts', {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

    .then(({ data: { id, title, body, date, u: { username } } }) => {
      let d = new Date()
      const postElem = document.createElement('li')
      postElem.className = 'd-flex justify-content-between align-tems-start mb-2 listItem'
      postElem.innerHTML = `
        <div class = "ms-2 me-auto">
          <div class = "fw-bold">${title}</div>
          ${body}
        </div>
        <span class="badge bg-primary rounded-pill">${username}</span>
        <span data-id="${id}" class="deletePost badge bg-danger rounded-pill ">x</span>
        <span class=" badge bg-secondary rounded-pill ">${date}</span>
      `
      document.getElementById('posts').append(postElem)
    })
    .catch(err => console.log(err))
})

document.addEventListener('click', event => {
  if(event.target.classList.contains('deletePost')) {
    axios.delete(`/api/posts/${event.target.dataset.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => event.target.parentNode.remove())
      .catch(err => console.error(err))
  }
})

axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(({ data: { username, posts} }) => {
    posts.forEach(({ id, title, body, date }) => {
      const postElem = document.createElement('li')
      postElem.className = 'd-flex justify-content-between align-tems-start mb-2 listItem'
      postElem.innerHTML = `
      
        <div class = "ms-2 me-auto">
          <div class = "fw-bold">${title}</div>
          ${body}
        </div>
        <span class="badge bg-primary rounded-pill infoPill">${username}</span>
        <span data-id="${id}" class="deletePost badge bg-danger rounded-pill ">x</span>
        <span class=" badge bg-secondary rounded-pill ">${date}</span>
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => console.error(err))

setTimeout(function(){
  localStorage.removeItem('token')
  window.location ='/auth.html'
}, 1200000);