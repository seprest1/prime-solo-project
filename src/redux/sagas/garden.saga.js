import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* gardenSaga() {
    yield takeEvery('FETCH_PLANTS', fetchPlants);
    yield takeEvery('SEND_PLOT', addPlot);
    yield takeEvery('FETCH_PLOT', fetchPlot);
  }

//fetch list of available plants from DB
function* fetchPlants(){
    try{
        const plants = yield axios.get('/garden/plants');
        console.log('Get plants:', plants.data);
        yield put({ type: 'SET_PLANTS', payload: plants.data });
    }                       //set plant reducer to list of plants
    catch(error){
        console.log('fetchPlants failed', error);
    };
};

//add plot with all the divs to DB
function* addPlot(action){
    try{
        console.log('Plot being added', action.payload);
        const plot = yield axios({
            method: 'POST',
            url: '/garden/add_plot', 
            data: action.payload
        });
        yield put({ type: 'CLEAR_PLOT' });
    }
    catch(error){
        console.log('addPlot failed,', error);
    };
};

//fetch user's plot from DB
function* fetchPlot(action){
    try{
        console.log(action.payload);
        const userId = action.payload;
        const userPlot = yield axios.get(`/garden/${userId}/plot/`);
        const response = userPlot.data;
        console.log(response);

        const plot = response.map(obj => ({ //Pulls only needed values from DB
            plant_id: obj.plant_id, 
            location: obj.location, 
            name: obj.name, 
            subvariety: obj.subvariety, 
            shade: obj.shade,
            color: obj.color}));
        const plotId = response[0].plot_id; //TO BE USED LATER?
        
        console.log(plot);
        console.log(plotId);

        yield put({ type: 'SET_PLOT', payload: plot });
        yield put({ type: 'SET_MONTH', payload: response[0].month });

    }               
    catch(error){
        console.log('fetchPlot failed', error);
    };
}

export default gardenSaga;