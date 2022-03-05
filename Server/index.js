//letting the app know what port to run on
const port = 4200

//requiring packages
const express = require("express");
const cors = require("cors");
const app = express();
const { default: axios } = require("axios");

app.use(express.json())
app.use(cors())

//player class with ways to calculate power
const Player = class {
    constructor(name, age, height, build, gender, power){
        this.name = name;
        this.age = age;
        this.height = height;
        this.build = build;
        this.gender = gender;
        this.power = 0;
    }

    getAge(){
        return this.age
    }

    agePowerCalc(){
        let ap = 0
            if (this.age < 18){
                ap = 25
            } else if (this.age > 17 && this.age < 30){
                ap = 40
            } else if (this.age > 29 && this.age < 40){
                ap = 30
            } else if (this.age > 39 && this.age < 50){
                ap = 25
            } else if (this.age > 49 && this.age < 60){
                ap = 15
            } else {
                ap = 10
            }
          return ap
        }
        buildPowerCalc(){
            let bp = 0
            if (this.build == 'Fit'){
                bp = 50
            } else if (this.build == 'Athletic'){
                bp = 70
            } else if (this.build == 'Dad Bod'){
                bp = 30
            } else if (this.build == 'Sumo'){
                bp = 20
            } else if (this.power == 'Jacked'){
                bp = 85
            } else if (this.build == 'Skin and Bones'){
                bp = 25
            } else if (this.build == 'People think I take steroids'){
                bp = 100
            }
          return bp
        }
        calcPower(){
        let agePower = this.agePowerCalc()
        let buildPower = this.buildPowerCalc()
        let heightPower = this.height * 2
        let totalPower = agePower + heightPower + buildPower;
        this.power = totalPower;
        return totalPower
    }
}

const controllerFunctions = require("./controller")

//importing and destructuring functions from my controller file
const {
    fight,
    seeResults,
    deleteResults,
} = controllerFunctions;

//assigning functions to my endpoints
app.post("/api/info", fight);
app.get("/api/results", seeResults);
app.delete("/api/results/:entry", deleteResults);

//letting me know that the server is up and running on the right port
app.listen(4200, () => console.log('Server running on 4200'))
