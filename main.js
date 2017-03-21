function sendMsg(mob,msg){
			$.ajax({
				type: "POST",
				url: 'http://7topics.com/subdomain/sms2/sendtxt.php',
				data:{
                                        		submit:"sent",
					mob_no:mob,
					msg:msg
				},
				success: function(data){
					alert(data);
					// $("#res").html(data);
				}
			}).done(function(data){
				console.log("send message log "+ data);
			}).fail(function(){
				console.log("sending failed log ");
			});
			return true;
	}

	// function base64ToJSON(bytes) {
	//        var jsonString = Crypto.charenc.UTF8.bytesToString(Crypto.util.base64ToBytes(bytes));
	//        return jsonString.evalJSON();
	//    };



 $(document).ready(function(){
 	$.ajaxPrefilter( function (options) {
 	  if (options.crossDomain && jQuery.support.cors) {
 	    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
 	    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
 	    //options.url = "http://cors.corsproxy.io/url=" + options.url;
 	  }
 	});



var c1 = 1;
	var getHofAndFamilyDetails = function(_url){
		// alert(_url);
		if(c1)
		{
			$.ajax({
				type:'GET',
				url:_url,
				data:{},
				dataType:'json',
				success:function(response)
				{

					var text = response;
					// alert(text);
					// console.log($.makeArray(text));
					var arr =$.makeArray(text);

					// $('#title2').text(arr[0].__proto__);
					$('#hofTitle').html("<h2>Hof Details</h2>");
					$.each(arr[0].hof_Details,function(key,value){
						$('#hofDetails').append("<tr>"+"<td>"+key+"</td>"+"<td>"+value+"</td>"+"</tr>");
					});
					console.log('successfully parsed hof details -> '+arr[0].hof_Details);

					// $('#title1').text(text.MOBILE_NO);
					var mobile_no = arr[0].hof_Details.MOBILE_NO;
					mobile_no = parseInt(mobile_no);
					// alert(typeof mobile_no);
					// var msg = "HEllO..!"+arr[0].hof_Details.NAME_ENG+"\n"+"you are eligible for newly launched scheme and so on...";
					// alert(mobile_no+"\n"+msg);
					var msg = 'CONGRATULATION '+arr[0].hof_Details.NAME_ENG+' you are the winner of Smart India Hackathon as your idea is best just like you. Happy Coding . love you bhai.';
					// if(confirm('want to send message to '+arr[0].hof_Details.NAME_ENG +' on - +91 - '+mobile_no))
					// {
					// 	if(sendMsg(mobile_no,msg))
					// 	{console.log('message send successfully');}
					// 	else{
					// 		console.log('message sending failed try again. Reload the page');
					// 	}
					// }else {
					// 	console.log('Message sending request refused by user');
					// }



					$('#familyTitle').html("<h2>family details</h2>");
					// console.log(arr[0].family_Details);
					var family = arr[0].family_Details;
					$.each(family,function(keys,values){
						// console.log(keys);
						var table = "<table id='familyDetails"+keys+"'>\
									<caption id='familyTitle"+keys+"'></caption>\
									<tr>\
									<th>KEY</th>\
									<th>VALUE</th>\
									</tr>\
								      </table>";
						$(table).appendTo('#tableContainer');
						$('#familyTitle'+keys+'').html('<h2>family details '+(keys+1)+'</h2>');
						$.each(values,function(key,value){
							// console.log(keys);
							$('#familyDetails'+keys+'').append('<tr><td>'+key+'</td><td>'+value+'</td></tr>');
						});
						mobile_no = arr[0].family_Details[keys].MOBILE;
						mobile_no = parseInt(mobile_no);
						var name = arr[0].family_Details[keys].NAME_ENG;
						msg = 'CONGRATULATION..! ' + name + '. you are the winner of rajasthan hackathon. ';
						console.log(msg);
						console.log(mobile_no +' > '+name);
						// if(confirm('want to send message to '+name+' on - +91- '+mobile_no + ' -- '+typeof(mobile_no)))
						// {
						// 	if(sendMsg(mobile_no,msg))
						// 		{console.log('message send successfully');}
						// 	else{
						// 		console.log('message sending failed try again. Reload the page');
						// 	      }
						// }else {
						// 	console.log('Message sending request refused by user');
						// }

						console.log('successfully parsed family details -> '+arr[0].family_Details[keys]);
					});
				}
			}).done(function(){
				console.log("Successfull.");
			}).fail(function(){
				console.log("request failed.");
			}).always(function(){
				console.log("request completed.");
			});
			c1=0;
		}
		}

// });



var getAccountDetails = function(_url)
{
	$.ajax({
		type:'GET',
		url:_url,
		dataType:'json',
		success:function(response)
		{
			console.log(response);
			var text = response;

			for(var i=0;i<text.length;i++)
			{	var table = "<table id='accountDetails"+i+"'>\
						<caption id='accountTitle"+i+"'></caption>\
						<tr>\
						<th>KEY</th>\
						<th>VALUE</th>\
						</tr>\
					      </table>";
				$('#accountTableContainer').html(table);
				$('#accountTitle'+i+'').html('<h2>Account details '+(i+1)+'</h2>');
				$.each(text[i],function(key,value){
					$('#accountDetails'+i+'').append('<tr><td>'+key+'</td><td>'+value+'</td></tr>');
				});
			}
		}
	}).done(function(){
		console.log('api fetched succesffully.');
	}).fail(function(){
		console.log('error in fetching api details.');
	}).always(function(){
		console.log('All query executes successfully.');
	});
}



var getBhmshvrfyBCAccnt = function(_url)
{
	$.ajax({
		type:'GET',
			url:_url,
			dataType:'json',
			success:function(response)
			{
				var text=response;
				// console.log(text);
				var accountExist=text.isExist;
				// console.log(text.account_holders_details.length);
				for(var i=0;i<text.account_holders_details.length;i++)
				{	var table = "<table id='getBhmshvrfyBCAccntTable"+i+"'>\
						<caption id='getBhmshvrfyBCAccntTitle"+i+"'></caption>\
						<tr>\
						<th>KEY</th>\
						<th>VALUE</th>\
						</tr>\
					      </table>";
					     $('#bhmAccountVryContainer').html(table);
					     $('#getBhmshvrfyBCAccntTitle'+i+'').html('<h2>Bhamashah verify BC Account UA '+(i+1)+'</h2>');
					$.each(text.account_holders_details[i],function(key,value){
						// console.log(key+" - "+value);
						$('#getBhmshvrfyBCAccntTable'+i+'').append('<tr><td>'+key+'</td><td>'+value+'</td></tr>');
					});
				}
			}

	}).done(function(){
		console.log('api fetched successfully. ');
	}).fail(function(){
		console.log('error in fetching api detials. ');
	}).always(function(){
		console.log('All query executes successfully.');
	});
}




var checkNewFeed = function(response){
	$.ajax({
		type:'GET',
		url: 'https://pear-to-pear.000webhostapp.com/ajax/service_scheme.json',
		dataType:'json',
		success:function(response)
		{
			console.log(response.length);
			return  response.length;
		}
	}).done(function(){
		console.log('getting json data...');
	}).fail(function(){
		console.log('failed to parsed api for feed.');
	});
	return response.length;
}

var _Eligibility_Criteria = new Array(2);
var _launched_on;
var _scheme_name;
var _scheme_desc;
var _scheme_id;


$(document).ready(function(){
	var d = new Date();
	$.ajax({
		type:'GET',
		url: "https://pear-to-pear.000webhostapp.com/ajax/service_scheme.json",
		dataType:'json',
		success:function(response){
			var text = response;
			var iniLen = response.length;
			var timeInterval = setInterval(function(){
				var len = checkNewFeed(response);
				if(len > iniLen)
				{
					var breakPoint  = len - iniLen;
					for(var j = len - breakPoint; j<=len;j++)
					{
						_Eligibility_Criteria[0]=text[j].Eligibility_Criteria.min_limit;
						_Eligibility_Criteria[1]=text[j].Eligibility_Criteria.max_limit;
						_launched_on = text[j].launched_on;
						_scheme_desc = text[j].desc;
						_scheme_id = text[j].scheme_id;
						_scheme_name= text[j].scheme_name;

						$.ajax({
							url:'https://apitest.sewadwaar.rajasthan.gov.in/app/live/Service/hofAndMember/ForApp/WDYYYGG?client_id=ad7288a4-7764-436d-a727-783a977f1fe1',
							type:'GET',
							dataType:'json',
							success:function(response)
							{
								// alert(response.hof_Details.DOB);
								var hofDOB = response.hof_Details.DOB;
								var hofGender = response.hof_Details.GENDER;
								var schemeGender = _scheme_id.slice(0,1);
								// alert(hofGender+'<br>'+hofDOB+'<br>'+schemeGender);
								var currYear = d.getFullYear();
								var bornYear = hofDOB.slice(hofDOB.lastIndexOf('/')+1,hofDOB.lastIndexOf('/')+5);
								var currAge = currYear - bornYear;
								if(schemeGender == 'S')
								{
									if(_Eligibility_Criteria[0]<=currAge<=_Eligibility_Criteria[1])
										{
											if(confirm('Hello..! '+text[0].NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU'))
												sendMsg(Number(8699199935),'Hello..! '+text[0].NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU');
										}
								}else if(schemeGender == 'F')
								{
									if(_Eligibility_Criteria[0]<=currAge<=_Eligibility_Criteria[1])
									{
										if(confirm('Hello..! '+text[0].NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU'))
											sendMsg(Number(8699199935),'Hello..! '+text[0].NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU');
									}
								}
								//else {
								// 	if(_Eligibility_Criteria[0]<=currAge<=_Eligibility_Criteria[1])
								// 	{sendMsg(Number(8699199935,'Hello..! '+text[0].NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU'));}
								// }


								// alert(_Eligibility_Criteria[0]+' '+currAge+' '+_Eligibility_Criteria[1]);
								$.each(response.family_Details,function(keys,values){

										var fDOB = values.DOB;
										var fGender = values.GENDER;
										var bornYear = fDOB.slice(fDOB.lastIndexOf('/')+1,fDOB.lastIndexOf('/')+5);
										var currAge = currYear - bornYear;
										// alert(_Eligibility_Criteria[0]+' '+currAge+' '+_Eligibility_Criteria[1]);
										if(schemeGender == 'S')
										{
											if(_Eligibility_Criteria[0]<=currAge<=_Eligibility_Criteria[1])
												{
													if(confirm('Hello..! '+values.NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU'))
														sendMsg(Number(8699199935),'Hello..! '+values.NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU');
												}
										}else if(schemeGender == 'F')
										{
											if(_Eligibility_Criteria[0]<=currAge<=_Eligibility_Criteria[1])
											{
												if(confirm('Hello..! '+values.NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU'))
													sendMsg(Number(8699199935),'Hello..! '+values.NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU');
											}
										}else {
											if(_Eligibility_Criteria[0]<=currAge<=_Eligibility_Criteria[1])
											{
												if(confirm('Hello..! '+values.NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU'))
													sendMsg(Number(8699199935),'Hello..! '+values.NAME_ENG+' you are eligible for '+_scheme_name+' newly launched schemed. for furthor information kindly call us on our tool free number : 1800 1800 10 or visit us at: rajasthan.bhamashah.gov.in. THANK YOU');
											}
										}
								});
							}
						});
					}
				}

			},5000);
		}
	}).done(function(){
		console.log('api fetch successfully.');
	}).fail(function(){
		console.log('error in fetching api.');
	}).always(function(){
		console.log('All query executes successfulyy.')
	});
});