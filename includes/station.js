


class StationSim{
	constructor(stationElement){
		this.domElements = {
			station: $(stationElement)
		}
		this.updateTimer = null;
		this.thrustPerSecond = .1;
		this.zThrustModifier = .01;
		this.originalCenter = null;
		this.winPercentAdjustment = .05
		this.thrust = {
			x: 0,
			y: 0,
			z: 1
		}
		this.motion = {
			x: 0,
			y: 0,
			z: 0
		}
		this.currentScale = 1;
		this.position = null;
		this.move = this.initialMove;
		
		this.updateIntervalAmount = 30;
		this.updatesPerSecond = 1000 / this.updateIntervalAmount;
		this.thrustPerInterval = this.thrustPerSecond / this.updatesPerSecond;
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
			case 'w':
				this.thrust.z = -1;
				break;
			case 's':
				this.thrust.z = 1;
				break;
		}
	}
	addThrust(){
		this.motion.x += this.thrust.x * this.thrustPerInterval
		this.motion.y += this.thrust.y * this.thrustPerInterval
		this.motion.z += this.thrust.z * (this.thrustPerInterval * this.zThrustModifier);
	}
	initialMove(){
		this.position = {
			left: 300*Math.random(),
			top: 300+Math.random()
		};
		this.move = this.subsequentMove;
		this.originalCenter = {
			x: this.position.left + this.domElements.station.width(),
			y: this.position.top + this.domElements.station.height(),
		}
	}
	subsequentMove(){
		var scale = this.currentScale += this.motion.z;
		this.checkEnd(scale);
		this.domElements.station.css({
			left: (this.position.left += this.motion.x) + 'px',
			top: (this.position.top += this.motion.y) + 'px',
			transform: `scale3d(${scale}, ${scale}, 1)`
		})
	}
	checkEnd( currentScale ){
		if(currentScale>=3.5){
			this.stopUpdater();
			this.checkWin(currentScale);
		}

	}
	checkWin(scale){
		var center = {
			x: this.position.left + this.domElements.station.width()/scale ,
			y: this.position.top + this.domElements.station.height()/scale,
		}
		var adjustedCenter = {
			x: this.originalCenter.x/center.x,
			y: this.originalCenter.y/center.y
		}
		var low = (1-this.winPercentAdjustment);
		var high = (1+this.winPercentAdjustment)
		if(adjustedCenter.x>=low && adjustedCenter.x<=high && adjustedCenter.y>=low && adjustedCenter.y<high){
			alert('you win');
		} else {
			alert('you lose')
		}
		console.log(adjustedCenter)
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
	}


}













