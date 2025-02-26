let inviteEmails = []; 

if(document.getElementById("addmail")){
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

let userform=document.querySelector(".userform");
let inputFields = document.getElementsByTagName("input");

if(document.getElementById("submit")){
    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault();

        for (let input of inputFields) {
            if (input.hasAttribute("required") && input.value === "") {
                alert("Please fill in all required fields.");
                return;
            }
        }
       
        let userData = {
            userName: document.getElementById("name").value || "",
            userMail: document.getElementById("mail").value || "",
            userAge: document.getElementById("age").value|| "",
            userPassword: document.getElementById("password").value || "",
            userRole: document.getElementById("role").value|| "",
            userGender: document.querySelector('input[name="Gender"]:checked').value || "",
            userSkill: Array.from(document.querySelectorAll('input[name="Skill"]:checked') || [])
                .map(skill => skill.nextSibling?.textContent || ""),
            userDob: document.getElementById("dob").value || "",
            userCountry: document.getElementById("country").value || "",
            userInviteMail: [...inviteEmails] 
        };
        let arrayData=JSON.parse(localStorage.getItem("userData")) || [];
        if(!Array.isArray(arrayData)){
            arrayData=[];
        }

        arrayData.push(userData);
        localStorage.setItem("userData", JSON.stringify(arrayData));
        console.log("User data saved:", arrayData);
    
        alert("User data saved successfully!");
        
        database();
        emailList.innerHTML = '';
        userform.reset();        
        
    });
    
}

function database() {
    let userDataArray = JSON.parse(localStorage.getItem("userData")) || [];
    let bodylist=document.getElementById("bodylist");
    if(!bodylist){
        return;
    }
    bodylist.innerHTML="";

userDataArray.forEach(userData => {
    let row = document.createElement("tr");
    

    let fields = [
        userData.userName,
        userData.userMail,
        userData.userAge,
        userData.userPassword,
        userData.userRole,
        userData.userDob,
        userData.userCountry,
        Array.isArray(userData.userInviteMail) ? userData.userInviteMail.join(", ") : "",
        
    ];

    fields.forEach(field => {
        let cell = document.createElement("td");
        cell.textContent = field;
        row.appendChild(cell);

    });
        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        
        deleteButton.addEventListener("click",(index)=>{
            row.remove();
            let userDataArray = JSON.parse(localStorage.getItem("userData")) || [];
            userDataArray.splice(index, 1);
            localStorage.setItem("userData", JSON.stringify(userDataArray));
        })
    
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);
    bodylist.appendChild(row);
});
}

document.addEventListener("DOMContentLoaded", database);




