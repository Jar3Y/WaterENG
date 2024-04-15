
// function addDropdown() {
//     var dropdownContainer = document.getElementById("dropdownContainer");
//     var dropdownCount = dropdownContainer.querySelectorAll("select").length;
//     if (dropdownCount < 4) {
//     var newDropdown = document.createElement("div");
//     newDropdown.classList.add("form-group");
//     newDropdown.innerHTML = `
//       <label for="dropdown${dropdownCount + 1}">Pipe ${dropdownCount + 1}:</label>
//       <select id="dropdown${dropdownCount + 1}" name="dropdown${dropdownCount + 1}">
//           <option value="Carrots">Carrots</option>
//           <option value="Eggplant">Eggplant</option>
//           <option value="Potato">Potato</option>
//           <option value="Garlic">Garlic</option>
//       </select>`;
//     dropdownContainer.appendChild(newDropdown);
//     if (dropdownCount > 0) { 
//         var removeButton = document.createElement("button");
//         removeButton.type = "red";
//         removeButton.textContent = "Remove";
//         removeButton.onclick = function() {
//           dropdownContainer.removeChild(newDropdown);
//           dropdownCount--;
//           updateDropdownLabels();
//         };
//         newDropdown.appendChild(removeButton);
//       }
//       updateDropdownLabels();
//     } else {
//       alert("Maximum of Pipes reached.");
//     }
  
//   }
  
  function submitForm() {
    var dropdownValues = [];
    var dropdowns = document.querySelectorAll("select");
    dropdowns.forEach(function(dropdown) {
      dropdownValues.push(dropdown.value);
    });
    
    console.log("Selected options:", dropdownValues); 
  }

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