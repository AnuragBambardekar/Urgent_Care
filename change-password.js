import { updatePasswordReq, logoutRequest } from "./APIManager.js";

const submitForm = document.getElementById("changePass");
const saveButton = document.getElementById("save");

var getUser = sessionStorage.getItem("userDetails");
var user = JSON.parse(getUser);

document.getElementById("name").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientName").innerHTML = user.patient_name.toUpperCase();
document.getElementById("patientImage11").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage10").src = sessionStorage.getItem("userImage");
document.getElementById("patientImage12").src = sessionStorage.getItem("userImage");

saveButton.addEventListener("click", (e) => {
    // Prevent the default submission of the form
    e.preventDefault();
    // Get the values input by the user in the form fields
    const newPass = submitForm.newPass.value;
    const confirmPass = submitForm.confirmPass.value;
  
    if (newPass === "" || confirmPass === "") {
      alert("Please enter valid password")
    } else {
    updatePasswordReq(newPass, confirmPass)
      .then((result) => {
        if (result.success === 1) {
            alert(result.message);
            window.location = "patient-dashboard.html";
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
    }
  });

  document.getElementById("logout1").addEventListener("click", (e) => {
    logoutRequest().then((result) => {
      if (result.success === 1) {
        alert("You have been logged out. To access the portal please log in again.")
        sessionStorage.clear()
        window.location = "login.html"
      } else {
          alert(result.message);
      }
      })
      .catch((error) => {
        alert(error);
      });
  });