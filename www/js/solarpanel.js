/* ----------------------------------------------------------------------------------------------------- //
	app.core (extend)
	app.user
	
	@Author lemarchand jérome			
	2018, lemarchand Jerome, tous droits reservés
	@Version 1.0
	
// ----------------------------------------------------------------------------------------------------- */
app.loader.init();

var currentPanel = "pannelHome";

var panels = ["pannelHome",
	  "panelInstallation",
	  "panelNbPannels",
	  "panelOrientation",
	  "panelCalcul",
	  "panelSettings",
	  "panelAbout"];

var labelsInstall = ["Particulier", "Professionnel"];
var installPro = "";

var labelsInstallType = ["Intégré au bâti", "Intégré simplifié", "Au sol"];
var installType = ""; 

var currentBtnOrientation = "orientationS";
var currentBtnInclinaison = "inclin45";
var currentBtnIrradiation = "irradiation1000";
var currentBtnMask = "mask065";

var checkedSrc= "";
var uncheckedSrc = "";
var refMade = false;


app.extend('core', ({ init: function(){ app.isDomLoaded(function(){ app.core.main(); }); },
/* ----------------------------------------------------------------------------------------------------- 

	Routine Principale

/* ----------------------------------------------------------------------------------------------------- */
main: function(){
	
		/*
		 * 	Bouttons de Menu 
		 *  -------------------------------------------------------------------------------------
		 */
		app.event.addEvent("btnHome", "click", (function(){ app.user.switchPanel("btnHome", "pannelHome") }));
		app.event.addEvent("btnSettings", "click", (function(){ app.user.switchPanel("btnSettings", "panelSettings") }));
		app.event.addEvent("btnAbout", "click",	(function(){ app.user.switchPanel("btnAbout", "panelAbout") }));
		
		
		/*
		 *  Panel : Home 
		 *  -------------------------------------------------------------------------------------
		 */	
		// client Particulier :
		app.event.addEvent("installParticulier", "click", (function(){
			app.simulation.setClientParticulier();	
			app.user.switchPanel("", "panelInstallation");
		}));
		
		// client Pro :
		app.event.addEvent("installPro", "click", (function(){
			app.simulation.setClientProfessionnel();
			app.user.switchPanel("", "panelInstallation")
		}));
		
			
			
		/*
		 *  Panel : panelInstallation
		 *  -------------------------------------------------------------------------------------
		 */
		// menu avec retour arriere :
		app.event.addEvent("btnMenuInstallType", "click", (function(){ app.user.switchPanel("", "pannelHome") }));
		
		// Intégré
		app.event.addEvent("installTypeIntegrated", "click", (function(){
			app.simulation.setTypeInstallation("Intégré au bâti");
			app.user.switchPanel("", "panelNbPannels");
		}));
		
		// Intégré simplifié
		app.event.addEvent("installTypeSimple", "click", (function(){
			app.simulation.setTypeInstallation("Intégré simplifié");
			app.user.switchPanel("", "panelNbPannels");
		}));
		
		// Au sol
		app.event.addEvent("installTypeGrounded", "click", (function(){
			app.simulation.setTypeInstallation("Au sol");
			app.user.switchPanel("", "panelNbPannels");
		}));
		
		
		/*
		 *  Panel : panelNbPannels
		 *  -------------------------------------------------------------------------------------
		 */
		// menu avec retour arriere :
		app.event.addEvent("btnMenuPannelsNumber", "click", (function(){ app.user.switchPanel("", "panelInstallation"); }));

		// Bouton d'ajout de panneaux
		app.event.addEvent("nbPannelDecrease", "click", (function(){
			if (app.simulation.getNombrePanneaux() > 1) {  
				app.simulation.decreaseNombrePanneaux();
			} 
			document.getElementById("nbPannels").innerHTML  = app.simulation.getNombrePanneaux();
		}));

		// Bouton de retrait de panneaux			
		app.event.addEvent("nbPannelIncrease", "click", (function(){
			if (app.simulation.getNombrePanneaux() < 9) {  
				app.simulation.increaseNombrePanneaux();
			} 
			document.getElementById("nbPannels").innerHTML  = app.simulation.getNombrePanneaux();
		 }));
		 
		// bouton de validation
		app.event.addEvent("nbPannelValidate", "click", (function(){ app.user.switchPanel("", "panelOrientation"); }));
		
		
		/*
		 *  Panel : panelOrientation
		 *  -------------------------------------------------------------------------------------
		 */
		// menu avec retour arriere :
		app.event.addEvent("btnMenuOrientation", "click", (function(){ app.user.switchPanel("", "panelNbPannels"); }));	
		
		// orientations : 
		// --------------
		app.event.addEvent("orientationS", "click", (function(){
			app.simulation.setOrientation("Sud");
			app.user.switchOrientation("orientationS", "Sud");
		}));

		app.event.addEvent("orientationSE", "click", (function(){
			app.simulation.setOrientation("Sud-Est");
			app.user.switchOrientation("orientationSE", "orientation");
		}));

		app.event.addEvent("orientationSO", "click", (function(){
			app.simulation.setOrientation("Sud-Ouest");
			app.user.switchOrientation("orientationSO", "orientation");
		}));

		app.event.addEvent("orientationE", "click", (function(){
			app.simulation.setOrientation("Est");
			app.user.switchOrientation("orientationE", "orientation");
		}));

		app.event.addEvent("orientation0", "click", (function(){
			app.simulation.setOrientation("Ouest");
			app.user.switchOrientation("orientation0", "orientation");
		}));

		// inclinaisons : 
		// --------------
		app.event.addEvent("inclin0", "click", (function(){
			app.simulation.setInclinaison(0); 
			app.user.switchInclinaison("inclin0", 0);
		}));
		
		app.event.addEvent("inclin15", "click", (function(){
			app.simulation.setInclinaison(15);
			app.user.switchInclinaison("inclin15", 15);
		}));
		
		app.event.addEvent("inclin25", "click", (function(){
			app.simulation.setInclinaison(25);
			app.user.switchInclinaison("inclin25", 25);
		}));
		
		app.event.addEvent("inclin45", "click", (function(){
			app.simulation.setInclinaison(45);
			app.user.switchInclinaison("inclin45", 45);
		}));
		
		app.event.addEvent("inclin50", "click",(function(){
			app.simulation.setInclinaison(50);
			app.user.switchInclinaison("inclin50", 50);
		}));
		
		app.event.addEvent("inclin70", "click", (function(){
			app.simulation.setInclinaison(70);
			app.user.switchInclinaison("inclin70", 70);
		}));
		
		app.event.addEvent("inclin90", "click", (function(){
			app.simulation.setInclinaison(90);
			app.user.switchInclinaison("inclin90", 90);
		}));



		/*
		 *  Panel : panelSettings
		 *  -------------------------------------------------------------------------------------
		 */
 		// menu avec retour arriere :
		app.event.addEvent("btnMenuSettings", "click", (function(){ app.user.switchPanel("", "panelHome"); }));	
		
		// Irradiation
		// --------------
		app.event.addEvent("irradiation1000", "click", (function(){
			app.simulation.setIrradiation(1000);
			app.user.switchIrradiation("irradiation1000", 1000);
		}));
		
		app.event.addEvent("irradiation1300", "click", (function(){
			app.simulation.setIrradiation(1300);
			app.user.switchIrradiation("irradiation1300", 1300);
		}));
		
		app.event.addEvent("irradiation1500", "click", (function(){
			app.simulation.setIrradiation(1500);
			app.user.switchIrradiation("irradiation1500", 1500);
		}));
		
		app.event.addEvent("irradiation1700", "click", (function(){
			app.simulation.setIrradiation(1700);
			app.user.switchIrradiation("irradiation1700", 1700);
		}));
		
		// Masque Solaire
		// --------------
		app.event.addEvent("mask055", "click", (function(){
			app.simulation.setMasqueSolaire(0.55);
			app.user.switchMask("mask055", 0.55);
		}));
		
		app.event.addEvent("mask065", "click", (function(){
			app.simulation.setMasqueSolaire(0.65);
			app.user.switchMask("mask065", 0.65);
		}));
		
		app.event.addEvent("mask075", "click", (function(){
			app.simulation.setMasqueSolaire(0.75);
			app.user.switchMask("mask075", 0.75);
		}));

		app.event.addEvent("mask085", "click", (function(){
			app.simulation.setMasqueSolaire(0.55);
			app.user.switchMask("mask085", 0.85);
		}));
		
		// validation
		app.event.addEvent("orientationValidate", "click", (function(){ app.user.showSimulation(); }));	


		/*
		 *  Panel : 
		 *  -------------------------------------------------------------------------------------
		 */
		app.event.addEvent("btnMenuCalcul", "click", (function(){ app.user.switchPanel("", "panelOrientation"); }));	
		app.event.addEvent("calculNew", "click", (function(){ app.user.switchPanel("", "pannelHome"); }));	

	
	},

})); 


app.extend('user', ({ init: function(){ },
/* ----------------------------------------------------------------------------------------------------- 

	Fonctions utilisateur

/* ----------------------------------------------------------------------------------------------------- */

	/*
	 *	makeSimulation: calcul
	 */
	showSimulation: function(){
		app.simulation.lancerSimulation();
		app.user.switchPanel("", "panelCalcul");
	
		document.getElementById("valueHabitation").innerHTML = app.simulation.getTypeClient();
	   	document.getElementById("valueInstallation").innerHTML = app.simulation.getTypeInstallation();
		document.getElementById("valueSuperficie").innerHTML = app.simulation.getNombrePanneaux();
		document.getElementById("valueOrientation").innerHTML = app.simulation.getOrientation();
		document.getElementById("valueInclinaison").innerHTML = app.simulation.getInclinaison() + " °";

		var prod = app.simulation.getProduction();
		prod = Math.round(prod*100);
	  	document.getElementById("valueProductionKwC").innerHTML = prod/100 +" KwC";
		
		var jour = app.simulation.getRevenuJour();
		jour = Math.round(jour*100);
		document.getElementById("valueProductionDay").innerHTML =  jour/100 + " €";
		
		var an = app.simulation.getRevenuAn();
		an = Math.round(an*100);
		document.getElementById("valueRevenue").innerHTML = an/100 + " €";
		
	},
	
    /*
	 *	hideAllPanels : Masque tous les panneaux
	 */
	hideAllPanels: function(){
		for(var a =0; a <7; a++){
			var t= panels[a]
			document.getElementById(t).style.display = "none";	
		}		
	},
	
	/*
	 *	uncheckButtons : reinitialise les boutons
	 */
	uncheckButtons: function(){
		document.getElementById("btnHome").className = "";	
		document.getElementById("btnSettings").className = "";
		document.getElementById("btnAbout").className = "";	
	},
	
	
	
 	/*
	 *	switchPanel : change le panneau en cour
	 *  et l'image du bouton de menu si besoin
	 */
	switchPanel: function(caller, newPanel){
		// cache tous les panneaux
		app.user.hideAllPanels();
		// affiche le nouveau
		currentPanel = newPanel;
		document.getElementById(currentPanel).style.display = "block";
		
		// met à jour les boutons
		if (caller != ""){
			app.user.uncheckButtons();
			document.getElementById(caller).className = "btnSelected";
		}
		
		// recupère les src checked et unchecked
		if (!refMade){
			checkedSrc = document.getElementById("orientationS").getElementsByTagName("img")[0].src;
			uncheckedSrc = document.getElementById("orientationSE").getElementsByTagName("img")[0].src;
			refMade = true;
		}
	},
	
	
	/*
	 *	switchOrientation
	 */
	switchOrientation: function(caller, value){
		var previous = currentBtnOrientation;
		document.getElementById(caller).getElementsByTagName("img")[0].src = checkedSrc;
		document.getElementById(currentBtnOrientation).getElementsByTagName("img")[0].src = uncheckedSrc;
		currentBtnOrientation = caller;
	},
	
	/*
	 *	switchInclinaison 
	 */
	switchInclinaison: function(caller, value){
		var previous = currentBtnInclinaison;
		document.getElementById(caller).getElementsByTagName("img")[0].src = checkedSrc;
		document.getElementById(currentBtnInclinaison).getElementsByTagName("img")[0].src = uncheckedSrc;
		currentBtnInclinaison = caller;
	},
	
	/*
	 *	switchIrradiation
	 */
	switchIrradiation: function(caller, value){
		var previous = currentBtnIrradiation;
		document.getElementById(caller).getElementsByTagName("img")[0].src = checkedSrc;
		document.getElementById(currentBtnIrradiation).getElementsByTagName("img")[0].src = uncheckedSrc;
		currentBtnIrradiation = caller;
		irradiation = value;
	}, 

	/*
	 *	switchMask
	 */
	switchMask: function(caller, value){
		var previous = currentBtnMask;
		document.getElementById(caller).getElementsByTagName("img")[0].src = checkedSrc;
		document.getElementById(currentBtnMask).getElementsByTagName("img")[0].src = uncheckedSrc;
		currentBtnMask = caller;
		masqueSolaire = value;
	},

})); 