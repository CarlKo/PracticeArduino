var Cylon = require('cylon');

var TrafficLight = function(my) {
  var currentState = new Green(my, this);
  
  this.change = function(state) {    
    currentState = state;
    currentState.go();
  }
  
  this.start = function() {
    currentState.go();
  }
}

var Green = function(my, light) {
  this.light = light;
  
  this.go = function() {
    my.red.turnOff();
    my.yellow.turnOff();
    my.green.turnOn();

    after((6).seconds(), function() {
      light.change(new Yellow(my, light));
    });
  }
};

var Yellow = function(my, light) {
  this.light = light;
  
  this.go = function() {
    my.red.turnOff();
    my.yellow.turnOn();
    my.green.turnOff();

    after((1).seconds(), function() {
      light.change(new Red(my, light));
    });
  }
};

var Red = function(my, light) {
  this.light = light;
  
  this.go = function() {
    my.red.turnOn();
    my.yellow.turnOff();
    my.green.turnOff();

    after((6).seconds(), function() {
      light.change(new Green(my, light));
    });
  }
};

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: 'COM4' }
  },

  devices: {
    red: { driver: 'led', pin: 12 },
    yellow: { driver: 'led', pin: 10 },
    green: { driver: 'led', pin: 8 }
  },
  
  work: function(my) {
    var light = new TrafficLight(my);
    light.start()

    every((13).seconds(), function() {
      light = new TrafficLight(my);
      light.start()
    });
  }
}).start();
