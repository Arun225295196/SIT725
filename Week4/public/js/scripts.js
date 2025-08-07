// Dynamic card data
const cardList = [
    {
        title: "Kitten 2",
        image: "images/kitten-2.jpg",
        link: "About Kitten 2",
        desciption: "Demo description about kitten 2 - This adorable kitten loves to play with yarn balls!"
    },
    {
        title: "Kitten 3", 
        image: "images/kitten-3.jpg",
        link: "About Kitten 3",
        desciption: "Demo description about kitten 3 - This playful kitten enjoys sunny afternoons by the window."
    },
    {
        title: "Puppy 1",
        image: "images/puppy-1.jpg",
        link: "About Puppy 1",
        desciption: "Meet our friendly puppies who loves fetch and long walks in the park!"
    },
    {
        title: "Puppy 2",
        image: "images/puppy-2.jpg",
        link: "About Puppy 2",
        desciption: "This energetic beagle puppy is always ready for adventure and treats!"
    },
    {
        title: "Rabbit 1",
        image: "images/rabbit-1.jpg",
        link: "About Rabbit 1",
        desciption: "Our fluffy bunny friend loves fresh carrots and hopping around the garden."
    },
    {
        title: "Bird 1",
        image: "images/bird-1.jpg",
        link: "About Bird 1",
        desciption: "Avoid loud noises, protect habitats, limit human interference, and prevent pollution to safeguard these majestic birds' survival and natural behaviors."
    }
];

// Function to show alert when click me button is pressed (original behavior)
const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
}

// Function to handle form submission
const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    
    console.log("Form Data Submitted: ", formData);
    
    // Show success message
    M.toast({html: 'Form submitted successfully! Check console for data.'});
    
    // Clear form fields
    $('#first_name').val('');
    $('#last_name').val('');
    $('#password').val('');
    $('#email').val('');
    
    // Update labels (Materialize requirement)
    M.updateTextFields();
}

// Function to dynamically add cards
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">'+
            '<div class="card medium">'+
                '<div class="card-image waves-effect waves-block waves-light">'+
                    '<img class="activator" src="'+item.image+'" alt="'+item.title+'">'+
                '</div>'+
                '<div class="card-content">'+
                    '<span class="card-title activator grey-text text-darken-4">'+
                        item.title+'<i class="material-icons right">more_vert</i>'+
                    '</span>'+
                    '<p><a href="#">'+item.link+'</a></p>'+
                '</div>'+
                '<div class="card-reveal">'+
                    '<span class="card-title grey-text text-darken-4">'+
                        item.title+'<i class="material-icons right">close</i>'+
                    '</span>'+
                    '<p class="card-text">'+item.desciption+'</p>'+
                '</div>'+
            '</div>'+
        '</div>';
        $("#card-section").append(itemToAppend);
    });
}

// Document ready function
$(document).ready(function(){
    // Initialize Materialize components
    $('.materialboxed').materialbox();
    $('.modal').modal();
    
    // Event handlers - Click Me button shows alert (as in workshop)
    $('#clickMeButton').click(() => {
        clickMe();
    });
    
    // Form submit handler
    $('#formSubmit').click(() => {
        submitForm();
    });
    
    // Add dynamic cards
    addCards(cardList);
    
    console.log("SIT 725 Week 4 App initialized successfully!");
    console.log("Added " + cardList.length + " dynamic cards");
});