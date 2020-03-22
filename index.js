const prompt = require('prompt');

function generator() {
  function promptQuantity() {
    var schema = {
      properties: {
        quantity: {
          description: 'Enter a quantity of candles',
          pattern: /^[1-9]$|^[1-9][0-9]$|^(100)$/,
          message: "Enter quantity of candles (numbers from 1 to 100)",
          required: true
        },
        minimum: {
          description: 'Enter a minimum border',
          // TODO: fix regex
          pattern: /^[1-9]$|^[1-9][0-9]$|^(100)$/,
          // warning: 'Should be an integer from 1 to 100',
          message: "Should be an integer from 1 to 100",
          required: true
        },
        maximum: {
          description: 'Enter a maximum border',
          // TODO: fix regex
          pattern: /^[1-9]$|^[1-9][0-9]$|^(100)$/,
          // warning: 'Should be an integer from 1 to 100',
          message: "Should be an integer from 1 to 100",
          required: true
        },
        gaps: {
          message: "Allow gaps? Type yes or no",
          required: true,
          name: 'yesno',
          validator: /y[es]*|n[o]?/,
          default: 'no'
        },
      }
    };

    //
    // Start the prompt
    //
    prompt.start();

    //
    // Get two properties from the user: email, password
    //
    prompt.get(schema, function(err, result) {
      //
      // Log the results.
      //
      console.log("Command-line input received:");
      console.log("  Quantity: " + result.quantity);
      console.log("  Minimum: " + result.minimum);
      console.log("  Maximum: " + result.maximum);
      console.log("  Allow gaps: " + result.gaps);
    });
  }
  promptQuantity();
}

generator();
