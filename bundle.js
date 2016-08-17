System.register("app.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Controller, Model, View;
    /*
     * Factory function. Returns a default first app.
     */
    function defaultGreeter(view) {
        return new Controller("Hello", view);
    }
    exports_1("defaultGreeter", defaultGreeter);
    return {
        setters: [],
        execute: function () {
            /**
             * Instance is an App controller. Automatically creates
             * model. Creates view if none given.
             */
            Controller = function () {
                function Controller(greeting, view) {
                    this.model = new Model(greeting);
                    this.view = view || new View();
                }
                Controller.prototype.greet = function () {
                    this.view.display(this.model.getGreeting());
                };
                return Controller;
            }();
            exports_1("Controller", Controller);
            /**
             * Private class. Instance represents a greeting to the world.
             */
            Model = function () {
                function Model(greeting) {
                    this.greeting = greeting;
                }
                Model.prototype.getGreeting = function () {
                    return this.greeting + ", world!";
                };
                return Model;
            }();
            /**
             * Instance is a message logger; outputs messages to console.
             */
            View = function () {
                function View() {}
                View.prototype.display = function (msg) {
                    console.log(msg);
                };
                return View;
            }();
            exports_1("View", View);
        }
    };
});
System.register("index.js", ["./app"], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var App;
    var greeter;
    return {
        setters: [function (App_1) {
            App = App_1;
        }],
        execute: function () {
            greeter = new App.Controller("Whatup");
            greeter.greet();
        }
    };
});