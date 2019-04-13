# Jam Search

This was my first Javascript Project where I had to build something that was interactive and dynamic. I decided to go with a Game of Thrones Theme for this.

### Getting Started
This project is designed to be ran in the browser without having to install any programs. I have not added media queries to this so playing this on a mobile device is not recommended. 

### Design
The programing that was used to design this project waas:
Javascript - Funcationality
HTML - Content and layout
CSS/Bootstrap - Colorr, layout, and some of activities that are triggered by the Javascript.

### Versioning
I have only made one version of this. 

### HTML

In the HTML, I have a container that is holding two large columns. 

One the left side, I have 2 images that are set with a CSS Style of None. When the game is played, I have created a Javascript function which will look for the result of the win or lose and based of the result respectively, it will add an image for a win or a less along with a message to "click any key to play again".

On the right side, I have 9 rows which will list some messages to play the game,a list of the total wins, current word, remaining guesses, and guessed letters. 

### CSS
The CSS was very basic. I have a background image that is scaled to the browser width. I have aligned the content to the center of the container. Also, as stated above, I have a couple of items I have set to a display of hidden that will be changed based on the users score. 

### Javascript
For the Javascript, I created numerous variables. 

#### Variables
*Selectable Words - Words for the game
*Max Tries - the amount of incorrect letters a user can select before they lose.
*Guess Letters - This is an empty array that will contain the letters that were guessed.
*Current Word Index - is used in the function to select the random word. 
*Guessing Word - This is an empty array that will container the letters the user guessed correctly.
*Remaining guesses - a countdown of the number of guesses remaining.
*has Finished - is used to start the game. Default is false until a user presses a key.
*wins - Stores how many wins a user has. 

#### Fuctions
resetGame - This function sets the remaining guesses to the max tries, it selects the word at random, it pushes the guess letters into the array and adds the number of "_" for the word chosen, and updates the left container if a user wins or loses when the game is reset to a display of none. 

updateDisplay - This function adds the number of wins to the Total Wins field, adds the letters that were guess and posts them as text to the users screen to be seen. 

Evaluate Guess - This function is the logic of the game. It checks the arrays for the word guess and runs and if/else statement to send the letter to the correct array to be contained. 

Check Win - This function checks to see if the user wins and if so, it adds a number to the win column, it updates the image on the left side container with the win image, and tells the user to press any key to reset.

Check Loss - This function checks to see if the user loses and if so, it updates the image on the left side container with the gameover image, and tells the user to press any key to reset.

make Guess - This function takes the users guess and compares it to remaining guesses left and if there is guesses available, it updates the letter to the function of Evaluate Guess as it has updated the "letter" variable. 

Event Function - This function tells the system if the game is active and the user presses a key, to make sure the letter is an uppercase and run updatedisplay, checkwins, checkloss functions.

This was my first README.md. 