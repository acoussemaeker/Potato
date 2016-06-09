var logger = new LoggerObserver();

var neurone = new Neurone();

neurone.weights = [1,-5,42];

neurone.transfert = input => input < 0.5 ? -1 : 1;
neurone.observer = logger;

var neuroneResult;

try {
	neuroneResult = neurone.execute([5,9,4]);
}
catch (exception) {
	logger.notify(exception);
}