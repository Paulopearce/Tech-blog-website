

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

axios.get('/api/posts', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
  .then(({ data: posts }) => {
    posts.forEach(({ id, title, body, u: { username } }) => {
      let d = new Date()
      const postElem = document.createElement('li')
      postElem.className = 'd-flex justify-content-between align-tems-start mb-2 listItem'
      postElem.innerHTML = `
        <div class = "ms-2 me-auto">
          <div class = "fw-bold">${title}</div>
          ${body}
        </div>
        <span class="badge bg-primary rounded-pill">${username}</span>
        <span class=" badge bg-secondary rounded-pill ">${d.getMonth()+1}-${d.getDate()}</span>
      `
      document.getElementById('posts').append(postElem)
    })
  })
  .catch(err => {
    console.log(err)
    window.location = '/auth.html'
  })
