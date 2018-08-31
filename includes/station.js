


class StationSim{
	constructor(stationElement){
		this.domElements = {
			station: $(stationElement)
		}
		this.updateTimer = null;
		this.startUpdater();
		this.updateIntervalAmount = 1000;
	}

	startUpdater(){
		if(this.updateTimer!==null){
			this.stopUpdater();
		}
		this.updateTimer = setInterval( this.processUpdate.bind(this), this.updateIntervalAmount);
	}
	stopUpdater(){
		clearInterval(this.updateTimer);
		this.updateTimer = null;
	}


}

