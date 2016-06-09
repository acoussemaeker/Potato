class Exception {
	constructor (message, additionalMessage, innerException) {
		this.message = message;
		this.additionalMessage = additionalMessage;
		this.innerException = innerException;
	}
}