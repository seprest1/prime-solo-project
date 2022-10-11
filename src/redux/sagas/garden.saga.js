import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* gardenSaga() {
    yield takeLatest('FETCH_PLANTS', fetchPlants);
    yield takeLatest('SEND_PLOT', addPlot);
  }
  
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

function* addPlot(action){
    try{
        console.log('Plot being added', action.payload, action.month);
        const plot = yield axios({
            method: 'POST',
            url: '/garden/add_plot', 
            data: {plot: action.payload, month: action.month}
        });
        yield PUT({ type: 'CLEAR_PLOT' });
    }
    catch(error){
        console.log('addPlot failed,', error);
    };
};


export default gardenSaga;