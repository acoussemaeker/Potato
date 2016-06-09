class Neurone {
	constructor(weights = [], transfert = v => -1, observer = undefined) {
		this._weights = weights;
		this._transfert = transfert;
		this._observer = observer;
	}

	// Public methods

	execute(inputs) {
		if (this._transfert === null || this._transfert === undefined || typeof this._transfert !== "function") {
			throw new Exception("Internal neurone error: no transfert function", `Neurone has no transfert function`);
		}

		var composedInput = this._composition(inputs);

		var result = this._transfert(composedInput);

		this._notify(`composed: ${composedInput}, result: ${result}`);

		return result;
	}

	// Private methods

	_composition(inputs) {
		var combinedValue = 0;

		if (inputs.length !== this._weights.length) {
			throw new Exception("Bad parameter: inputs", `Argument inputs must be a ${this._weights.length}-values array, ${inputs.length}-values array given instead`);
		}

		for (var i = 0; i < this._weights.length; i++) {
			if (typeof inputs[i] !== "number") {
				throw new Exception("Bad parameter: inputs", `Argument index ${i}: ${inputs[i]} is not a number`);
			}

			combinedValue += inputs[i] * this._weights[i];
		}

		return combinedValue;
	}

	_notify(dataToNotify) {
		if (this._observer !== null && this._observer !== undefined && this._observer instanceof BaseObserver) {
			this._observer.notify(dataToNotify);
		}
	}

	// Accessors

	set weights(value) { this._weights = value; }
	get weights() { return this._weights; }

	get transfert() { return this._transfert; }
	set transfert(value) { this._transfert = value; }

	get observer() { return this._observer; }
	set observer(value) { this._observer = value; }	

	get argumentsCount() { return this._weights.length; }
}