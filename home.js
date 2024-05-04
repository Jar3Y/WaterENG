

  let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
  let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

  const Users = document.getElementById('users');
  const Email = document.getElementById('emaildp')
  const LogoutBtn = document.getElementById('logout');
  
  const Signout = () => {
        sessionStorage.removeItem("user-creds");
        sessionStorage.removeItem("user-info");
        window.location.href = 'login.html'
  }

  const CheckCred = () => {
        if (!sessionStorage.getItem("user-creds"))
            window.location.href = 'login.html'

        else {
          var element = document.getElementById("users");
          element.innerText = UserInfo.Name;
          var element = document.getElementById("emaildp");
          element.innerText = UserCreds.email;
        }
  }

  window.addEventListener('load', CheckCred);
  LogoutBtn.addEventListener('click', Signout);