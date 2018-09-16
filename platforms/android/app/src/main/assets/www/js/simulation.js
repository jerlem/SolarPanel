/* ----------------------------------------------------------------------------------------------------- //
	app.simulation
	
	@Author lemarchand jérome			
	2018, lemarchand Jerome, tous droits reservés
	@Version 1.0
	
// ----------------------------------------------------------------------------------------------------- */
app.extend('simulation', ({ init: function(){ },

	/*
	 * Caractéristiques du panneau Solaire
	 */
	panneauSolaire : {
		nom: "solarMax3000s",
		rendement: 0.15,
		indicePerformance: 0.9,
		largeur: 1580,
		longueur: 808,
		puissanceCrete: 185,
		cellules: 16,
		superficieUtile: 0.79 
	},
	
	/*
	 * Valeur d'exposition
	 */
	exposition : { 
		S :	 [0.88, 0.96, 0.99, 1.00, 0.98, 0.87, 0.68],
		SE : [0.88, 0.93, 0.85, 0.95, 0.92, 0.91, 0.64],
		SO : [0.88, 0.93, 0.85, 0.95, 0.92, 0.91, 0.64],
		E :  [0.88, 0.87, 0.85, 0.83, 0.77, 0.65, 0.50], 
		O :  [0.88, 0.87, 0.85, 0.83, 0.77, 0.65, 0.50]
	},
	

	/*
	 *	Paramètres de la simulation 
	 */
	clientProfessionnel: true,	
	typeInstallation: "Intégré au bâti",
	orientation : "Sud",
	inclinaison: 45,
	irradiation: 1000,
	masqueSolaire: 0.65,
	nombrePanneaux: 1,
	
	// pour le calcul de la simulation	
	rendementPositionnement: 0.00,
	production: 0.00,
	revenuJour: 0.00,
	revenuAn: 0.00,
	
	
	/*
	 *	Setters
	 */
	setOrientation : function(chain){ this.orientation = chain; },
	setInclinaison: function(number){ this.inclinaison = number; },
	
	setIrradiation: function(number){ this.irradiation = number; },
	setMasqueSolaire: function(number) { this.masqueSolaire = number; },
	
	increaseNombrePanneaux: function() { this.nombrePanneaux++; },
	decreaseNombrePanneaux: function() { this.nombrePanneaux--; },
	
	setClientParticulier: function() {this.clientProfessionnel = false; },
	setClientProfessionnel: function() { this.clientProfessionnel = true; },
	setTypeInstallation: function(chain) { this.typeInstallation = chain; },
	
	/*
	 *	Getters
	 */	
	getOrientation : function(){ return this.orientation; },
	getInclinaison : function(){ return this.inclinaison; },
	getIrradiation : function(){ return this.irradiation; },
	getMasqueSolaire : function() { return this.masqueSolaire; },
	getNombrePanneaux : function() { return this.nombrePanneaux; },
	getTypeInstallation : function() { return this.typeInstallation; },
	
	getTypeClient : function() { 
		if (!this.clientProfessionnel){
			return "Particulier";
		} else {
			return "Professionnel";
		}
	},
	
	getProduction : function(){ return this.production; },
	getRevenuJour: function(){ return this.revenuJour; },
	getRevenuAn: function(){ return this.revenuAn; },
	
	/*
	 *	energieProduite
	 *
	 *  Calcul d'énergie produite :
	 *	Epv = ( Ir/2 x Rm x Rp ) x (Pe x Ps)
	 *	
     *   Epv : Energie produite 
	 *  
	 *	Ir : irradiation en Wc (1000 Wc pour la région)
	 *	Rm : Relevé de masque
	 *	Rp : Rendement de positionnement - Inclinaison , Orientation
	 *	
	 *	Pe : Performance de rendement
	 *	Ps : Perte système
	 *	par ex.
	 */
	lancerSimulation: function(){

		var Rp = app.simulation.facteurDeCorrection(this.orientation, this.inclinaison);
		var Ps = this.panneauSolaire.rendement * this.panneauSolaire.indicePerformance;

		this.production = (this.irradiation /2 * Rp * this.masqueSolaire ) * Ps * this.nombrePanneaux;
		
		this.appliquerTarif();
	},
		
	/*
	 *	facteurDeCorrection:
	 *	donne un coeficient en fonction de l'orientation
	 *  et de l'inclinaison des panneaux solaires.
	 */
	facteurDeCorrection: function(ori, inc){
		var angleExpo = [];
		// récupère les valeur en fonction de l'orientation:
		switch (ori){
			case "Sud": 	  angleExpo = this.exposition.S;	break;
			case "Sud-Est":	  angleExpo = this.exposition.SE; 	break;
			case "Sud-Ouest": angleExpo = this.exposition.SO;	break;
			case "Est":		  angleExpo = this.exposition.E;	break;
			case "Ouest":	  angleExpo = this.exposition.O;	break;
		}
		
		// et le facteur de correction en fonction de l'angle :
		switch(inc){
			case 0:		return  angleExpo[0];	break;
			case 15:	return  angleExpo[1];	break;
			case 25:	return  angleExpo[2];	break;
			case 45:	return  angleExpo[3];	break;
			case 50:	return  angleExpo[4];	break;
			case 70:	return  angleExpo[5];	break;
			case 90:	return  angleExpo[6];	break;
		}
	},
	
		
	/*
	 *	appliquerTarif
	 *
	 * 	 revenu par jour et par an en fonction de la production et du profil:
	 */
	appliquerTarif: function(){
		var arr= [];
		
		// revenus
		var coef= 0.314;
		if (this.typeInstallation == "Intégré au bâti"){
			if (this.clientProfessionnel == true){
				coef = 0.58;
			} else {
				coef = 0.5;
			}
		} else if (this.typeInstallation == "Intégré simplifié"){
			coef = 0.42;
		}
		

		/*alert( "coef "+ coef
				+"\nrevenuJour"+ (this.production * coef) / 1000 
				+"\nrevenuAn"+ (this.production * coef) / 1000 * 365 );*/
				
		this.revenuJour = this.production * coef /10;
		// et la valeur Annuelle
		this.revenuAn = this.revenuJour * 364;
	},
	
	
	
// ----------------------------------------------------------------------------------------------------- //
})); 