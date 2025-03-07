let inviteEmails = [];

if (document.getElementById("addmail")) {
    document.getElementById("addmail").addEventListener("click", function () {
        let inviteMailInput = document.getElementById("invitemail");
        let inviteMail = inviteMailInput.value;
        

        if (inviteMail === "") {
            alert("Please enter an email before adding.");
            return;
        }

        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(inviteMail)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (inviteEmails.includes(inviteMail)) {
            alert("This email has already been added.");
            return;
        }

        inviteEmails.push(inviteMail);
        displayInviteMail(inviteMail);
        inviteMailInput.value = "";

    });

}

function displayInviteMail(inviteMail) {
    let emailList = document.getElementById("emailList");
    let emailListContent = document.createElement("li");
    emailListContent.textContent = inviteMail;

    let icon = document.createElement("i");
    icon.className = 'fas fa-trash-alt';
    icon.style.cursor = 'pointer';
    icon.style.color = 'red';
    icon.style.marginLeft = '10px';
    icon.style.display = "none";

    emailListContent.addEventListener('mouseenter', () => {
        icon.style.display = "inline";
    });

    emailListContent.addEventListener('mouseleave', () => {
        icon.style.display = "none";
    });

    icon.addEventListener("click", () => {
        emailListContent.remove();
        inviteEmails = inviteEmails.filter(email => email !== inviteMail);
    });

    emailListContent.appendChild(icon);
    emailList.appendChild(emailListContent);
}
let userform = document.querySelector(".userform");
let inputFields = document.getElementsByTagName("input");

if (document.getElementById("submit")) {
    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();

        function validation() {
            let names = document.getElementById("name");
            let age = document.getElementById("age");
            let pass = document.getElementById("password");
            let dateOfBirth = document.getElementById("dob");
            let inputmail=document.getElementById("mail");
        
            document.getElementById("name-error").textContent = "";
            document.getElementById("dob-error").textContent = "";
            document.getElementById("age-error").textContent = "";
            document.getElementById("password-error").textContent = "";
            document.getElementById("mail-error").textContent = "";
            document.getElementById("name").style.border = "2px solid #ccc";
            document.getElementById("dob").style.border = "2px solid #ccc";
            document.getElementById("age").style.border = "2px solid #ccc";
            document.getElementById("password").style.border = "2px solid #ccc";
            document.getElementById("mail").style.border = "2px solid #ccc";
            let isValid = true;  
        
            
            let nameRegex = /^[A-Za-z\s]{1,30}$/;
            if (!nameRegex.test(names.value.trim())) {
                document.getElementById("name-error").textContent = 
                    "Name must be 1-30 letters and contain only alphabets.";
                    document.getElementById("name").style.border="2px solid red";
                isValid = false;
            }

            let validmail=/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
            if(!validmail.test(inputmail.value.trim())){
                document.getElementById("mail-error").textContent = 
                "Please enter a valid mail";
                document.getElementById("mail").style.border="2px solid red";
                isValid =false;
            }
        
            let validAge = /^[1-9][0-9]?$/; 
            if (!validAge.test(age.value.trim())) { 
                document.getElementById("age-error").textContent =
                    "Please enter a valid age (1-99).";
                    document.getElementById("age").style.border="2px solid red";
                isValid = false;
            }
        
            let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
            if (!passRegex.test(pass.value.trim())) {
                document.getElementById("password-error").textContent =
                    "Password must have 8+ chars, 1 uppercase, 1 number, 1 special char.";
                    document.getElementById("password").style.border="2px solid red";
                isValid = false;
            }
        
            let today = new Date();
            let bDate = new Date(dateOfBirth.value);
            let ageDate = today.getFullYear() - bDate.getFullYear();
            let monthDiff = today.getMonth() - bDate.getMonth();
            let dayDiff = today.getDate() - bDate.getDate();
            
            if (ageDate < 18 || (ageDate === 18 && monthDiff < 0) || (ageDate === 18 && monthDiff === 0 && dayDiff < 0)) {
                document.getElementById("dob-error").textContent = 
                    "You must be at least 18 years old.";
                    document.getElementById("dob").style.border="2px solid red";
                isValid = false;
            }
        
            return isValid;  
        }
       
        if (validation()) {
            alert("Form submitted successfully!");
        }
        else{
            return;
        }

        let userName = document.getElementById("name");
        let userMail = document.getElementById("mail");
        let userAge = document.getElementById("age");
        let userPassword = document.getElementById("password");
        let userRole = document.getElementById("role");
        let userDob = document.getElementById("dob");
        let userCountry = document.getElementById("country");
        let mails = inviteEmails.join(",");

        let arrayData = JSON.parse(localStorage.getItem("userData") || "[]");
        arrayData.push({
            name: userName.value,
            mail: userMail.value,
            age: userAge.value,
            password: userPassword.value,
            role: userRole.value,
            dateofbirth: userDob.value,
            country: userCountry.value,
            invitemail: mails
        });

        localStorage.setItem("userData", JSON.stringify(arrayData));
        // alert("User data saved successfully!");

        userform.reset(); 
        emailList.innerHTML = '';
    });
}

function database() {
    let userDataArray = JSON.parse(localStorage.getItem("userData")) || [];
    let bodylist = document.getElementById("bodylist");
    if (!bodylist) {
        return;
    }
    bodylist.innerHTML = "";

    userDataArray.forEach((userData) => {
        let row = document.createElement("tr");

        let fields = [
            userData.name,
            userData.mail,
            userData.age,
            userData.password,
            userData.role,
            userData.dateofbirth,
            userData.country,
            userData.invitemail

        ];

        fields.forEach(field => {
            let cell = document.createElement("td");
            cell.textContent = field;
            row.appendChild(cell);

        });
        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            let index = userDataArray.findIndex(c => {
                return c.name == userData.name
            })
            row.remove();
            userDataArray = JSON.parse(localStorage.getItem("userData")) || [];
            userDataArray.splice(index, 1);
            localStorage.setItem("userData", JSON.stringify(userDataArray));
        })

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
        bodylist.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", database);




