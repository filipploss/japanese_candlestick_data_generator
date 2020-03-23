const prompt = require("prompt");

function generator() {
  let quantity, minimum, maximum, gaps;

  let schema = {
    properties: {
      quantity: {
        description: "Enter a quantity of candles",
        pattern: /^[1-9]$|^[1-9][0-9]$|^(100)$/,
        message: "Enter quantity of candles (numbers from 1 to 100)",
        required: true
      },
      minimum: {
        description: "Enter a minimum border (0.001 to 999.999)",
        pattern: /^[0-9]\.\d\d\d|^[0-9]\.\d\d|^[0-9]\.\d$|^[1-9]$|^[1-9]\d$|^[1-9]\d\d$|^[1-9]\d\.\d$|^[1-9]\d\.\d{2}$|^[1-9]\d\.\d{3}$|^[1-9]\d\d\.\d{3}$|^[1-9]\d\d\.\d{2}$|^[1-9]\d\d\.\d$/,
        message: "Should be an number from 0.001 to 999.999",
        required: true
      },
      maximum: {
        description: "Enter a maximum border (0.001 to 999.999)",
        pattern: /^[0-9]\.\d\d\d|^[0-9]\.\d\d|^[0-9]\.\d$|^[1-9]$|^[1-9]\d$|^[1-9]\d\d$|^[1-9]\d\.\d$|^[1-9]\d\.\d{2}$|^[1-9]\d\.\d{3}$|^[1-9]\d\d\.\d{3}$|^[1-9]\d\d\.\d{2}$|^[1-9]\d\d\.\d$/,
        message: "Should be an number from 0.001 to 999.999",
        required: true
      },
      gaps: {
        message: "Allow gaps? Type yes or no",
        required: true,
        name: "yesno",
        validator: /y[es]*|n[o]?/,
        default: "no"
      }
    }
  };

  let promptFunc = async () => {
    let promise = new Promise((resolve, reject) => {
      prompt.start();
      prompt.get(schema, function(err, result) {
        console.log("Command-line input received:");
        console.log("  Quantity: " + result.quantity);
        console.log("  Minimum: " + result.minimum);
        console.log("  Maximum: " + result.maximum);
        console.log("  Allow gaps: " + result.gaps);
        resolve(result);
      });
    });
    let result = await promise;
    return result;
  };

  promptFunc().then(res => {
    quantity = res.quantity;
    minimum = res.minimum;
    maximum = res.maximum;
    gaps = res.gaps;
    let candles = [];
    for (let i = 0; i < quantity; i++) {
      let candleOpen;
      if ((gaps === "no" || gaps === "n") && i > 0) {
        candleOpen = parseFloat(String(candles[i - 1][1]));
      } else {
        candleOpen = parseFloat(
          Math.random() * (maximum - minimum + 1) + minimum
        );
      }
      let candleClose = parseFloat(
        Math.random() * (maximum - minimum + 1) + minimum
      );
      let candleMinShadowMaximum;
      let candleMinShadowMinimum = parseFloat(minimum);
      let candleMaxShadowMaximum = parseFloat(maximum);
      let candleMaxShadowMinimum;
      let type;

      if (candleOpen < candleClose) {
        candleMinShadowMaximum = candleOpen;
        candleMaxShadowMinimum = candleClose;
        type = "bull";
      } else {
        candleMinShadowMaximum = candleClose;
        candleMaxShadowMinimum = candleOpen;
        type = "bear";
      }

      let candleMinShadow =
        Math.random() * (candleMinShadowMaximum - candleMinShadowMinimum) +
        candleMinShadowMinimum;
      let candleMaxShadow =
        Math.random() * (candleMaxShadowMaximum - candleMaxShadowMinimum) +
        candleMaxShadowMinimum;

      candles.push([
        candleOpen.toFixed(3),
        candleClose.toFixed(3),
        candleMinShadow.toFixed(3),
        candleMaxShadow.toFixed(3),
        type
      ]);
    }
    console.log(candles);
  });
}
generator();
