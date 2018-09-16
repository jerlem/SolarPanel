/* ----------------------------------------------------------------------------------------------------- //
	app.core
	app.loader
	app.event
	
	@Author lemarchand jérome			
	2018, lemarchand Jerome, tous droits reservés
	@Version 1.0
	
// ----------------------------------------------------------------------------------------------------- */
var app = {}; app = (function(){
	var self = this; var public = this; // aliases self et publique
	// emulation des variables privées:
	
	// mutateur et assesseur
	public.set = function(k, v){ self.private[k].value = v; }
	public.get = function(k){ return self.private[k].value; }
	
	public.arr = function(arr){ return arr.join(''); }
	
	// ajoute une sous-classe et la surcharge en interne: 
	public.extend = function(subClass, proto){
		var addon = function(){ this.init(); }
		self[subClass] = {};
		addon.prototype = proto;
		self[subClass] = new addon();
		
		self[subClass].parent = public; // reference au parent
		self[subClass].object = []; // pile d'objets
	}
	
	// attend que le DOM soit chargé
	self.isDomLoaded = function(callBack){
		if(document.addEventListener) { document.addEventListener("DOMContentLoaded", callBack, false);
		} else {
			if(document.body && document.body.lastChild){ callBack; }
			else { return setTimeout(argument.callee, 0); }
		}
	}
	
	find = function(child, id){
		with(self[child]){ //selection contextuelle
			for(var a=0; a<object.lenght; a++){
				if ( object[a].name = id) {return a}; 	
			}
			return a;
		}
	}
		
});
var app = new app();

/* ----------------------------------------------------------------------------------------------------- 

	app.loader
		onDeviceReady
		receivedEvent
		
	app.event
		delegate
		addEvent

/* ----------------------------------------------------------------------------------------------------- */
app.extend('loader', ({ 

    // Application Constructor
    init: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
}));

app.extend('event', ({ init: function(){},
	
	evtList : Array,
	eventCall: {},

	delegate: function(evtType){ // TODO rajouter les evtType
	
		this._body = document.body; // référence a la racine du DOM
		this._body.addEventListener(evtType, function(evt){
			evt = evt || window.event;
			cs.eventCall(evt.target.id);
		}, false);
	},
	
	addEvent: function(target, evt, pcode){
		var d = document.getElementById(target);
		try {
		d.addEventListener(evt, pcode, false);
		} catch(e){
			alert("DOMERROR :"+target);
		}
	}
		
}));