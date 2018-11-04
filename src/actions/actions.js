import request from 'request';
import {CLOUD_FUNCTIONS_BASEURL} from "../Constants/constants";

export const fetchDoctors = () => {

    return dispatch => {
        const options = {
            method: 'GET',
            // url: `${CLOUD_FUNCTIONS_BASEURL}/getDoctors`,
            url:'https://us-central1-calis-clinicians-develop.cloudfunctions.net/api/getDoctors',
            headers:
                {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
            json: true
        };

        request(options, function (err, response, body) {
            if (err) {
                console.error('---Error ---', err);
                throw  new Error(err)
            }else{

                console.log('response', response.body);
                dispatch({
                    type:'FETCH_DOCTORS',
                    payload:response.body
                });

                let doctorids = Object.keys(response.body);

                doctorids.forEach(doctorId => {
                    fetchAppointmentByDoctor(doctorId, dispatch);
                })
            }
        });
    }

};

export const fetchAppointmentByDoctor = (doctorId, dispatch) => {

    // return dispatch => {
        const options = {
            method: 'POST',
            // url: `${CLOUD_FUNCTIONS_BASEURL}/getDoctors`,
            url:`https://us-central1-calis-clinicians-develop.cloudfunctions.net/api/fetchAppointmentsByDoctor`,
            headers:
                {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json'
                },
            body:{doctorId},
            json: true,
        };

        request(options, function (err, response, body) {

            if (err) {
                console.error('---Error ---', err);
                throw  new Error(err)
            }else{

                console.log('appointment', response.body);
                let apps = [];
                if(response.body){
                    apps = Object.entries(response.body).map(([key, value]) =>value );
                }
                dispatch({
                    type:'FETCH_APPOINTMENTS',
                    payload:{
                        doctorId,
                        appointments:apps,
                    }
                });
            }
        });
};

