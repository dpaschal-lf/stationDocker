


class StationSim{
	constructor(stationElement){
		this.domElements = {
			station: $(stationElement)
		}
		this.updateTimer = null;
		this.thrustPerInterval = 10;
		this.thrust = {
			x: 0,
			y: 0
		}
		this.motion = {
			x: 0,
			y: 0
		}
		
		this.updateIntervalAmount = 1000;
		this.startUpdater();
		this.setEventListeners();
	}
	setEventListeners(){
		$('body').on('keyup', this.handleKeyUp.bind(this))
		$('body').on('keydown', this.handleKeyDown.bind(this))
	}
	handleKeyUp(){
		switch(event.key){
			case 'ArrowDown':
			case 'ArrowLeft':
			case 'ArrowRight':
			case 'ArrowUp':
				this.thrust.y = 0;
				this.thrust.x = 0;
				break;
		}
	}
	handleKeyDown(event){
		switch(event.key){
			case 'ArrowDown':
				this.thrust.y = 1;
				break;
			case 'ArrowLeft':
				this.thrust.x = -1;
				break;
			case 'ArrowRight':
				this.thrust.x = 1;
				break;
			case 'ArrowUp':
				this.thrust.y = -1;
				break;
		}
	}
	addThrust(){
		this.motion.x += this.thrust.x * this.thrustPerInterval
		this.motion.y += this.thrust.y * this.thrustPerInterval
	}
	move(){
		var position = this.domElements.station.position();
		this.domElements.station.css({
			left: position.left + this.motion.x + 'px',
			top: position.top + this.motion.y + 'px'
		})
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
	processUpdate(){
		this.addThrust();
		this.move();
		console.log(this.motion)
	}


}













