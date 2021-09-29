document.getElementById("register").addEventListener("click", (event) => {
  event.preventDefault();
  axios
    .post("/api/users/register", {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    })
    .then(() => {
      axios
        .post("/api/users/login", {
          username: document.getElementById("username").value,
          password: document.getElementById("password").value,
        })
        .then(({ data: token }) => {
          if (token) {
            localStorage.setItem("token", token);
            window.location = "/";
          } else {
            alert("Invalid username or password.");
          }
        })
        .catch((err) => console.log(err));
      alert("User registered.");
    })
    .catch((err) => console.log(err));
});

document.getElementById("login").addEventListener("click", (event) => {
  event.preventDefault();
  axios
    .post("/api/users/login", {
      username: document.getElementById("lusername").value,
      password: document.getElementById("lpassword").value,
    })
    .then(({ data: token }) => {
      if (token) {
        localStorage.setItem("token", token);
        window.location = "/";
      } else {
        alert("Invalid username or password.");
      }
    })
    .catch((err) => console.log(err));
});

document.getElementById('goHome').addEventListener('click', () => {
  window.location = '/'
})

document.getElementById("goProfile").addEventListener("click", () => {
  alert("Sign up or sign in");
});
