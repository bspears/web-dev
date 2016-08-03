//dependency
var Mustache = require('mustache');
var projectData = require('./templates/projectData');
var projectTemplate = require('./templates/projectFlyTemplate');

//elements
var aboutLinks = document.getElementsByClassName('flyLink');
var aboutFly = document.getElementById('aboutFly');
var projectFly = document.getElementById('projectFly');
var closeSection = document.getElementById('closeSection');
var closeButton = document.getElementById('closeButton');

//set up flyout data
var flyouts = {
    closed: true,
    about: { 
        el : aboutFly 
    },
    project1: {
        el   : projectFly,
        tmpl : projectData.project1
    },
    project2: {
        el  : projectFly,
        tmpl: projectData.project2
    }
};

closeButton.addEventListener('click', function() {
    closeFlyouts();
});

//add flyout listeners to all flyout buttons
for(var i = 0; i < aboutLinks.length; i++){
    aboutLinks[i].addEventListener('click', function(e){
        var target = e.target;
        var data = target.dataset.fly;
        var thisFly = flyouts[data];

        renderFlyouts(data, thisFly);
    });
}

function closeFlyouts() {
    for(var item in flyouts) {
        if(flyouts[item].el){
            flyouts[item].el.classList.add('flyoutClosed');
            flyouts[item].el.classList.remove('flyout');
            closeSection.classList.remove('closeSectionIn');
            flyouts.closed = true;
        }
    }
}

function renderFlyouts(flyoutType, template) {
    if(flyouts.closed){
        flyouts.closed = false;
        if (flyoutType != "about") {
             var thisTmpl = template.tmpl;

            template.el.innerHTML = Mustache.render(projectTemplate, thisTmpl);
            console.log(template);
        }
        closeSection.classList.add('closeSectionIn');
        template.el.classList.add('flyout');
        template.el.classList.remove('flyoutClosed');
    } else {
        closeFlyouts();
    }
}