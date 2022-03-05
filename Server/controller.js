const req = require("express/lib/request")

//an array to store my fight results in
let outcomes = []

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

//functions to send to my server
module.exports = {
    fight: (req, res) => {
        let {name, age, height, build, gender, power} = req.body;
        let challenger = new Player(name, age, height, build, gender, power);
        challenger.calcPower();
        let initialResults = challenger.power / 10;
        let finalResults = Math.trunc(initialResults);
        outcomes.push(`${challenger.name} was able to take down ${finalResults} toddlers!`);
        res.status(200).send({finalResults});
    },
    seeResults: (req, res) => {
        res.status(200).send(outcomes)
    },
    deleteResults: (req, res) => {
        res.status(200).send("Leaderboard entry deleted")
    }
}
