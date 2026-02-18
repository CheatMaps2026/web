/*
* Class that holds a variety of export functions.
*   Made as a class instead of function file for the argument of extendability;
*       in the future, this website might allow its users to run reports on the data and modify it
*
* */

import {Observation} from "../model/observations";

class ExportService {
    private observations: Observation[];

    constructor(observations: Observation[]) {
        this.observations = observations;
    }

    toCSV() {
    }

    toGeoJSON() {

    }

    toXLSX() {
    }
}