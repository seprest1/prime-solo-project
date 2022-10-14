import { combineReducers } from 'redux';

const plants = (state = [], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
            return action.payload;
        default:
            return state;
    };
};

const selectedPlants = (state = [], action) => {
    switch(action.type){
        case 'ADD_PLANT':
            return [{id: action.payload.id, name: action.payload.name, sunlight: action.payload.sunlight, color: action.payload.color, subvariety: null}, ...state];
        case 'REMOVE_PLANT':
            return state.filter((plant, i) => i !== action.payload);
        case 'SET_SUBVARIETY':
            return state.map((plant, i) => i === action.payload.index ? 
                                {...plant, subvariety: action.payload.subvariety} 
                                : plant);
        case 'CLEAR_PLANTS':
            return [];
        default: 
            return state;
    };
};

const month = (state = 'Month', action) => {
    switch(action.type){
        case 'SET_MONTH':
            return action.payload;
        case 'CLEAR_MONTH':
            return 'Month';
        default:
            return state;
    };
};

//creates an array with location already set                                
const initialPlot = [...Array(48)].map((div, i) => ({location: i, plant_id: null, shade: null, subvariety: null, name: null, color: null}));
const plot = (state = initialPlot, action) => {
    switch(action.type) {
        case 'SET_SHADE': 
            console.log(state);
            const shadedDiv = action.payload;          //maps through plot and changes only shade value
            return state.map(oldDiv => 
                oldDiv.location === shadedDiv.location ? 
                    {...oldDiv, shade: shadedDiv.shade} 
                    : oldDiv);  
        case 'SET_PLANT':
            console.log(state);        
            const plantDiv = action.payload;    //maps through plot and changes only plant ID & plant name
            return state.map(oldDiv => oldDiv.location === plantDiv.location ? 
                    {...oldDiv, plant_id: plantDiv.plant_id, name: plantDiv.name, subvariety: plantDiv.subvariety} 
                    : oldDiv);  
        case 'CLEAR_PLOT':
            return initialPlot; 
        default: 
            return state;
    };
};

const sunKey = (state = '', action) => {
    switch (action.type) {
        case 'SET_SUNLIGHT':
            return action.payload;
        default: 
            return state;
    };
};

const plantKey = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PLANT_TYPE':
            return action.payload;
        default: 
            return state;
    };
};


const garden = combineReducers({
    plants,
    sunKey,
    plantKey,
    plot,
    month,
    selectedPlants,
  });

export default garden;