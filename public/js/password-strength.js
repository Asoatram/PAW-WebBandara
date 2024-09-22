function checkpasswordstrength(){
    const password = document.getElementById("password").value;
    const strengthBar = document.getElementById("password-strength");
    const strengthBarPassword = document.getElementById("password-strength-bar");

    strengthBarPassword.className = "";

    let strength = 0;

    if (password.length >= 1) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    switch (strength) {
        case 0:
            strengthBar.classList.remove("progress");
            break;
        case 1:
            strengthBar.classList.add("progress");
            strengthBarPassword.classList.add("progress-bar");
            strengthBarPassword.classList.add("bg-danger");
            strengthBarPassword.style.width = "33%";

            break;
        case 2:
            strengthBar.classList.add('progress');
            strengthBarPassword.classList.add("progress-bar");
            strengthBarPassword.classList.add("bg-warning");
            strengthBarPassword.style.width = "67%";
            break;
        case 3:
            strengthBar.classList.add('progress');
            strengthBarPassword.classList.add("progress-bar");
            strengthBarPassword.classList.add("bg-success");
            strengthBarPassword.style.width = "100%";
            break;

    }
    if(password.length == 0){
        strengthBar.classList.remove("progress");
    }

}

function checkconfirmpassword(){
    const password = document.getElementById("password").value;
}