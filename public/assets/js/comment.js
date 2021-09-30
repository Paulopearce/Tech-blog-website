
axios.get('/api/posts/', {
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