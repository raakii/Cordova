document.addEventListener("deviceready", function() {
    loadContacts();
    document.getElementById("addContactForm").addEventListener("submit", addContact);
}, false);

function loadContacts() {
    let options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = ["name", "phoneNumbers"];
    navigator.contacts.find(fields, showContacts, handleError, options);
}

function showContacts(contacts) {
    let code = '';
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].name && contacts[i].phoneNumbers) {
            code += `
                <li>
                    <a href="#">
                        <img src="img/avatar.png" alt="profile photo"> <!-- Utilisation de l'avatar par défaut -->
                        <h1>${contacts[i].name.formatted}</h1>
                        <p>${contacts[i].phoneNumbers[0].value}</p>
                    </a>
                </li>
            `;
        }
    }
    document.getElementById("contactList").innerHTML = code;
    $('#contactList').listview('refresh');
}

function handleError(error) {
    console.log(error);
}

function addContact(event) {
    event.preventDefault();
    
    let firstame = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let telephone = document.getElementById("telephone").value;
    
    if (firstame && lastname && telephone) {
        let contact = navigator.contacts.create();
        contact.displayName = `${firstame} ${lastname}`;
        contact.nickname = firstame;

        let name = new ContactName();
        name.givenName = firstame;
        name.familyName = lastname;
        contact.name = name;

        let phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', telephone, true);
        contact.phoneNumbers = phoneNumbers;

        saveContact(contact);
    } else {
        alert("Fill in all the fields");
    }
}

function saveContact(contact) {
    contact.save(function() {
        alert("New Contact added successfully!");
        $.mobile.changePage("#home");
        loadContacts();
    }, function(error) {
        console.log("An error occured while addinf the contact: " + error);
    });
}
