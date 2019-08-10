# Jam Search

![Jam Search Link] (https://jaimetyler.github.io/project-x/)

##Developer Team
*Corey Yates
*Jay Groover
*Jaime Tyler
*Bruce Chamblee

## Description
This was our first group project between the four of us where we would need to utilize GIT Branch management and file collaboration. We decided to make a web app that had a polished front end and UI experience along with building in some AJAX calls through YouTube and Bands in Town.  

## Getting Started
This project is designed to be ran in the browser without having to install any programs. We have installed added media queries so the user experience can flow easily on a mobile device.  

## Design
The programing that was used to design this project was:
Javascript/JQuery - Funcationality, AJAX call/API's, and On Click Events
Firebase - Database that stores the users information and email so they can receive updates. We are currently receiving this information but not sending it anywhere as of now. 
HTML - Content, layout, and anchor divs.
CSS/Bootstrap - Color, layout, and some of activities that are triggered by the Javascript.

## Versioning
We have only made one version of this to be deployed. 

## HTML

In the HTML, we have a container that is holding 3 large columns that are hidden on page load and a modal that is displayed until the user selects to close it which triggers the center "search box" to display. 

One the left side, we have a hidden column which appears when the user searches their artist/band in the search field. When the column appears, it shows a table that has upcoming events where the band/artist is playing. It also allows the user to click a "pill" we have that will connect the user to buy tickets. 

The center column is the main operating column of the page. This holds the search field, and displays the Youtube Search results and appends them below the main box. 

We also nested 3 clickable icons. One for Facebook which takes you to our Facebook Jam Search Page, a Bands in Town Icon which also takes you to the artist you searched Web Page, and a link to go to YouTube. 

The thrid column holds the name of the artist and a picture of them returned from the API call to Bands in Town. The artist name will also hold a clickable link to the artist Bands in town Web Page. 

## CSS
In the CSS, we utilized some bootstrap benefits to make the grid layout and do some order changes with media queries. We set the background image and added some typography for the text. We added some pseudo code for a gradient for the page (shout out to Bobby from another group for help on this) and we styled some cursors and buttons. 

## Javascript
For the Javascript, we created numerous variables. 

### API calls
We made 3 AJAX calls:
Bands in Town (2) and Youtube. 
#####Bands in town we are returning the following:

For the table in the left column left
*Event Date 
*Venue Name 
*Venue Location
*Ticket URL - pushing to the pill we added.

For the Column on the right
We are returning a picture of the artist along with adding a clickable link to the bands we page. We also are pushing this link to the Bands in Town Icon which will take you to the band you searched Bands in Town Web Page. 

### YouTube we are returning the following:
We are sending Youtube the name of the artist that you searched and bringing back 5 video results. We initially wanted to embed the video into our page but YouTube doesn't allow some artist to be embeded. So we elected to make a target function which will open the Youtube result on their page. 

### Firebase
In Firebase, we have mapped the user info to they entered on the intial modal that was loaded. We then call back the users name and append it to the search box on the page which welcomes them. 


