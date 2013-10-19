var model = {
    setNames : function(names) { // sets names
    },
    getNames : function() { // returns names
    },
    setTypes : function(types) { // sets player type
    },
    getTypes : function() { // gets player type
    },
};

var Model = function() {
    var name = null, type = null;
    
    this.setNamesPrivate = function(names){
	name = names;
    };
    
    this.getNamesPrivate = function(){
	return name;
    };
    
    this.setTypesPrivate = function(types){
	type = types;
    };
    
    this.getTypesPrivate = function(){
	return type;
    };
};

Model.prototype = Object.create(model);

Model.prototype.setNames = function(names) {
    this.setNamesPrivate(names);
};

Model.prototype.getNames = function() {
   return this.getNamesPrivate();
};

Model.prototype.setTypes = function(types) {
    this.setTypesPrivate(types);
};

Model.prototype.getTypes = function() {
    return this.getTypesPrivate();
};