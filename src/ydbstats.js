const slowFunction = () => {
	  let counter = 5;
	  return counter;
}

process.on('message', (message) => {
	  if (message == 'START') {
		      console.log('Child process received START message');
		      let slowResult = slowFunction();
		      let message = `${slowResult}`;
		      process.send(message);
		    }
});
