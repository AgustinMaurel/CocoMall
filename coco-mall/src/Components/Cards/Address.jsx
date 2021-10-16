import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../../Scripts/constants.js';
import InputMaps from '../Inputs/InputMaps';

function Address({ address }) {
    console.log(address.address);
    return (
        <div>
            <h3>Elegi tu direccion</h3>
            {address.map((direc)=>{
                return (
                    <div className="flex">
                        <input type="radio"/>
                        <h3>{direc.address}</h3>
                    </div>
                )
            })}
            <h3>Agregar direccion</h3>
        </div>
    );
}

export default Address;
