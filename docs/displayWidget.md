# how to create a widget

*note: "< nameOfWidget > ", " < NameOfWidget >"  are placeholders not types!!*

## create the UI

### step 1: create the type for the widget

go to utillity/types/ts and create a type for the widget. This should look something like this

```tsx
// utility/types/ts 

type <NameOfWidget>Widget = {
	owner: string // required field, for the widget header should be the owner's uid
	// all the values here are things you need in your widget.
	// I suggest that you are concious of how you may need to access these values later
	// for example a lot of times it may be easier to use a map or a set instead of 
	// an array to make updates easier in the hook
}
```

### step 2: start working on the UI

working on the UI first is easiest, because you can see if you need to make any changes to your type before creating the hook! You can create your widget in Dashboard/Widgets/<NameOfWidget>.tsx

Also, be sure to use temporary data here of the type of your widget. You can return this component temporarily in trip/[[…params]].tsx.So you can see the UI while working on it. 

```tsx
// components/Dashboard/Widgets/<widgetName>.tsx
export default function NameOfWidget({<nameOfWidget>: <NameOfWidget>Widget }){
	// put your UI here!
	return (
	)
}
```

```tsx
// pages/trip/[[…params]].tsx
export default function Trip(){
	const tempData : <NameOfWidget> {
		// fill out the object!
	}
	// existing code

	return (<>
		<NameOfWidget nameOfWidget={tempData}/>
		{/* more existing code */}
	</>)
}
```

now that you are done with this make a **pull request** and work on getting it merged in! and make a **new branch to continue** working on the hook for it. 

Also, I suggest looking at how the suggestions or polls are being done here if you get stuck.

## connecting the backend

### step 3: start creating the hook/ connect to the backend

```tsx
// utility/hooks/<widgetName>.tsx

export default function use<WidgetName>({<nameOfWidget>: <NameOfWidget>Widget }){
	const [<nameOfWidget>, set<NameOfWidget>] = React.useState<u<NameOfWidget>>{
		...nameOfWidget,
		// add any aditional values you may want here value: { defaultValue}
		// also if you need to handle popups you can add a boolean to help handle
		// whether it is seen or not here
	}

	// For each value in the widget ( besides the owner ) 
	// I suggest you create a function for updating that value
	// for example if you had a value called title.
	
	function updateTitle(string:title) {
		set<NameOfWidget>(
	}

	// Once you have all of your functions return the values and all of your functions
	
	return {
		<nameOfWidget>,
		updateTitle,
		// ... any other functions you had to create
	}
}
```

### step 4: allow your widget data to be read from the database

[senior-design/trip.tsx at main · ucf-senior-design/senior-design](https://github.com/ucf-senior-design/senior-design/blob/main/utility/hooks/trip.tsx)

- [ ]  add a type for storing the widget data in the tripUseState
- [ ]  add a default value for storing the widget in the trip value
- [ ]  create a function for a fetch method to read the data from the database
- [ ]  read in the data in initlizeTrip()
- [ ]  add map for the widgets in the TripUseState

```tsx
// utility/hooks/trip.tsx

// add a value for the value to stored in the existing TripUseState
interface TripUseState extends Trip {
	// ... extending usse state 
	<nameOfWidget> : Map<string, <NameOfWidget>>
}

// add a default value in the existing trip value.This should just be an empty map
const [trip, setTrip] = React.useState<TripUseState>({
	// .. existing code
	<nameOfWidget> : new Map<string, <NameOfWidget>>
})

// create a function to read the data from the database 
function get<nameOfWidget>Data(){
	
}

// set the data in the existing initilizeTrip function
async function initializeTrip(){
	// .. existing code
	setTrip({
     // ... existng code
		<nameOfWidget> : get<nameOfWidget>Data()
    })
}
```

## render the widget

[senior-design/trip.ts at main · ucf-senior-design/senior-design](https://github.com/ucf-senior-design/senior-design/blob/main/utility/types/trip.ts)

[senior-design/resizable.tsx at main · ucf-senior-design/senior-design](https://github.com/ucf-senior-design/senior-design/blob/main/utility/hooks/resizable.tsx)

### step 5: allow your widget to be rendered

- [ ]  add nameOfWidget to widgetType in utillity/types/trip.ts
    - [ ]  Allow the widget UI to be created in the widget hook in utillity/hooks/widget.ts

```tsx
// utillity/hooks/widget.tsx

// Add into the if statement of getWidgetUI() to return the widget.
// splitKey[0] = widgetType
// splitKey[1] = the widgetUID

function getWidgetUI(): React.ReactNode {
if (splitKey=[0] === "<nameOfWidget>){
		// return the UI for the widget here
	}
}
```

Now: If you want to see your widget go to the trip you are looking at in the database and add the widget into the layout array!

**At this point please commit all your code for connecting the backend and rendering the widget!**
