$(document).ready( function (){
	

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA98R8sprSz18AzMDFZegPHE5pktcTBRW8",
    authDomain: "timesheetproject-a142c.firebaseapp.com",
    databaseURL: "https://timesheetproject-a142c.firebaseio.com",
    projectId: "timesheetproject-a142c",
    storageBucket: "timesheetproject-a142c.appspot.com",
    messagingSenderId: "210237754739"
  };
  firebase.initializeApp(config);

var database=firebase.database();
var date= new Date();

$('#search').on("click", function(){
		event.preventDefault();
var name=$('#employee-name').val().trim();
var title=$('#role').val().trim();
var startDate=$('#start').val().trim();
var rate=$('#rate').val().trim();
//var monthsWorked=(date.month()); 

  database.ref().push({
  	name,
  	title,
  	startDate,
  	rate
        
     });
});
   database.ref().on("child_added", function(snapshot) {
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().title);
      console.log(snapshot.val().rate);
	var tableRow=$('<tr>');

	var nameData=$('<td>');
	var roleData=$('<td>');
	var startData=$('<td>');
	var monthsData=$('<td>');
	var rateData=$('<td>');
	var billedData=$('<td>');
	
	var date1 = new Date(snapshot.val().startDate);
	var monthsWorked = moment(date).diff(date1, 'month');
	//var monthsWorked=((date.getFullYear()-date1.getUTCFullYear())*12+date.getMonth()-date1.getUTCMonth()-1);

	nameData.text(snapshot.val().name);
	roleData.text(snapshot.val().title);
	startData.text(moment(snapshot.val().startDate).format("MM/DD/YY"));
	monthsData.text(monthsWorked);
	rateData.text(snapshot.val().rate);
	billedData.text(monthsWorked * snapshot.val().rate);


	tableRow.append(nameData);
	tableRow.append(roleData);
	tableRow.append(startData);
	tableRow.append(monthsData);
	tableRow.append(rateData);
	tableRow.append(billedData);

	$("#tableBody").append(tableRow);
      
     
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });






});