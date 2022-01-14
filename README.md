[x] Add a title to the index.html
[x] Import and add fonts
[x] Create Mapbox account
[X] Grab public token and save to .env
[x] npm install react-map-gl
[x] add the map to App.js or create a seperate component
[x] add mapboxAccessToken
[x] import marker and add to the compnent
[x] add location icon
[x] gps icon size and color adjustment style = {{ fontSize: viewport.zoom * 7, color: "blue" }}
[x] account > mapbox studio to create own map
[x] passing mapStyle prop to ReactMapGL component
[x] import pop up and add popup component
[x] style pop up compnent accordingly
[x] add div withing the popup component to display information
[x] div contains title, review label, description/review, rating in form of stars (icons), iformation label, person to post and time posted
[x] make sure proxy is added in package.json
[x] in useEffect add fetch function of all pins on initial load
[x] useState stores all the pins fetched
[x] use map function that returns one Marker component for each pin
[x] install, import and use timeago.js to show the posting time
[x] use useState and onClick (on pin) function to show only current pin pop up
[x] add animation
[x] add onClose event listener on the popup component and close current popup component
[x] useState for current user
[x] set pin color depending on the current user
[x] useState for new pin / new place with null initial value
[x] add onDblClick event listener on map component
[x] get lat and long by array destructuring and set them as a object to new pin
[x] add a second conditional popup that only appears on double click
[x] to close the new place popup set new place back to null using onClose event
[x] create and style form for new pin
[x] sent post reqeust successfully
[x] save new pin and close popup and show new pin on map
[x] change Marker component offsets to center the pin

[] add login logout and register buttons
[] style the buttons
[] with condtional logic toggle between logout button and the register + login button
[] create login and register componenets
[] style them as well and display in the center;
[] add success and error useStates to show response messages
[] send registration request using axios
[] use the success and error states here for the prompt. In the try block setError to false first to make sure no previous errors are there
[] add a close button to the register form
[] can use useStates for showRegister and showLogin to toggle their views

[] add and username field to users
[] add delete and edit capabilities to form depending on authrization
[] try adding search element
