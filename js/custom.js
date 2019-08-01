  $('#subscribeform').bootstrapValidator({
  	message: 'This value is not valid',
  	fields: {
  		subscribe: {
  			validators: {
  				notEmpty: {
  					message: ' '
  				},
  				emailAddress: {
  					message: 'Invalid email address'
  				}
  			}
  		}
  	}
  }).on('success.form.bv', function(e, data) {
  	e.preventDefault();
  	formIsValid = true;
  	$('.form-group', $(this)).each(function() {
  		formIsValid = formIsValid && $(this).hasClass('has-success');
  	});
  	if (formIsValid) {
  		$('#btn-subscribe', $(this)).attr('disabled', false);
  		var $form = $(e.target);
  		var bv = $form.data('bootstrapValidator');
  		$('.subscribe-message').html('');
  		data = new Object;
  		data['email'] = $('#subscribe').val();
  		email = $('#subscribe').val();
  		$.ajax({
  			method: "POST",
  			url: "https://hofeto.com/server/subscribe.php/addsubscription",
  			data: data,
  			success: function(resp) {
  				console.log("resp" + resp);
  				//alert('Thank You for subscribing to our newsletter');
  				sendnewslettermail(email);
  				$('.subscribe-message').html(
  					'<h6>Thank You for subscribing to our newsletter</h6>');
  			},
  			error: function(resp) {
  				console.log("resp1" + resp);
  				sendnewslettermail(email);
  				$('.subscribe-message').html(
  					'<h6>Thank You for subscribing to our newsletter</h6>');
  			}
  		});
  	} else {
  		$('#btn-subscribe', $(this)).attr('disabled', true);
  	}
  });
  // $('#btn-subscribe').click(function(){
  //  $('.subscribe-message').html('');
  //  data = new Object;
  //  data['email'] = $('#subscribe').val();
  //  email = $('#subscribe').val();
  //  $.ajax({
  //    method:"POST",
  //    url:"https://hofeto.com/server/subscribe.php/addsubscription",
  //    data:data,
  //    success:function(resp){
  //      console.log("resp"+ resp);
  //      //alert('Thank You for subscribing to our newsletter');
  //      sendnewslettermail(email);
  //      $('.subscribe-message').html('<h6>Thank You for subscribing to our newsletter</h6>');
  //    },
  //    error:function(resp){
  //      console.log("resp1"+ resp);
  //      sendnewslettermail(email);
  //      $('.subscribe-message').html('<h5 style="color:red">'+resp.responseText+'</h5>');
  //    }
  //  });
  // });
  $('#contactform').bootstrapValidator({
  	message: 'This value is not valid',
  	fields: {
  		txtname: {
  			message: 'Name is not valid',
  			validators: {
  				notEmpty: {
  					message: 'Name is required and can\'t be empty'
  				},
  				stringLength: {
  					min: 3,
  					max: 20,
  					message: 'Name must be more than 3 and less than 20 characters long'
  				},
  				regexp: {
  					regexp: /^[a-zA-Z0-9\. ]+$/,
  					message: 'Name can only consist of alphabetical, number, dot'
  				}
  			}
  		},
  		txtemail: {
  			validators: {
  				notEmpty: {
  					message: 'The email address is required and can\'t be empty'
  				},
  				emailAddress: {
  					message: 'The input is not a valid email address'
  				}
  			}
  		},
  		txtphone: {
  			validators: {
  				notEmpty: {
  					message: 'A phone number is required and can\'t be empty'
  				},
  				regexp: {
  					regexp: /^[0-9]+$/,
  					message: 'Phone Number can only consist of numeric value'
  				},
  				stringLength: {
  					min: 10,
  					max: 12,
  					message: 'Phone Number must be more than 10 and less than 12 numbers long'
  				}
  			}
  		},
  		txtmsg: {
  			message: 'message is not valid',
  			validators: {
  				notEmpty: {
  					message: 'Message is required and can\'t be empty'
  				},
  				stringLength: {
  					min: 3,
  					max: 200,
  					message: 'Message must be more than 3 and less than 200 characters long'
  				}
  			}
  		}
  	}
  }).on('success.form.bv', function(e, data) {
  	e.preventDefault();
  	formIsValid = true;
  	$('.form-group', $(this)).each(function() {
  		formIsValid = formIsValid && $(this).hasClass('has-success');
  	});
  	if (formIsValid) {
  		var $form = $(e.target);
  		var bv = $form.data('bootstrapValidator');
  		$('#send', $(this)).attr('disabled', false);
  		$('#loader').show();
  		$('#contactform').hide();
  		$('.contact-message').html('');
  		data = new Object;
  		data['name'] = $('#txtname').val();
  		data['email'] = $('#txtemail').val();
  		data['phone'] = $('#txtphone').val();
  		data['msg'] = $('#txtmsg').val();
  		$.ajax({
  			type: "POST",
  			url: "https://hofeto.com/mail/mailconfig.php/contactform",
  			data: data,
  			success: function(data) {
  				console.log(data);
  				$('#loader').hide();
  				$('#contactform').show();
  				$('#thankyoumodal').modal('show');
  			},
  			error: function(data) {
  				////$('.contact-message').html('<h5 style="color:red">'+data.responseText+'</h5>');
  				$('#thankyoumodal').modal('show');
  				$('#loader').hide();
  				$('#contactform').show();
  			}
  		});
  	} else {
  		$('#send', $(this)).attr('disabled', true);
  	}
  	//  $('#send').click(function(){
  	//  console.log("test");
  	//  $('#loader').show();
  	//  $('#contactform').hide();
  	//  $('.contact-message').html('');
  	//  data = new Object;
  	//  data['name'] = $('#txtname').val();
  	//  data['email'] = $('#txtemail').val();
  	//  data['phone'] = $('#txtphone').val();
  	//  data['msg'] = $('#txtmsg').val();
  	//  console.log("data", data);
  });

  function sendnewslettermail(email) {
  	data = new Object;
  	data['email'] = email;
  	$.ajax({
  		type: "POST",
  		url: "https://hofeto.com/mail/mailconfig.php/newsletter",
  		data: data,
  		xhrFields: {
  			withCredentials: true
  		},
  		success: function(res) {
  			console.log("data" + res);
  		},
  		error: function(res) {
  			console.log("data1" + res);
  		}
  	});
  }
  var Tawk_API = Tawk_API || {},
  	Tawk_LoadStart = new Date();
  (function() {
  	var s1 = document.createElement("script"),
  		s0 = document.getElementsByTagName("script")[0];
  	s1.async = true;
  	s1.src = 'https://embed.tawk.to/5b7a82c8afc2c34e96e7b8f1/default';
  	s1.charset = 'UTF-8';
  	s1.setAttribute('crossorigin', '*');
  	s0.parentNode.insertBefore(s1, s0);
  })();

  $("#tile-1 .nav-tabs a").click(function() {
  	var position = $(this).parent().position();
  	var width = $(this).parent().width();
  	$("#tile-1 .slider").css({
  		"left": +position.left,
  		"width": width
  	});
  });
  var actWidth = $("#tile-1 .nav-tabs").find(".active").parent().width();
  var actPosition = $("#tile-1 .nav-tabs .active").position();
  $("#tile-1 .slider").css({
  	"left": +actPosition.left,
  	"width": actWidth
  });
  $('#overview-tab').addClass('active');
  $('.tab-pane').addClass('active  show');
  $('[data-toggle="tab"]').parent().removeClass('active');
  $('#overview-tab').on('click', function() {

  	$('.tab-pane').addClass('active  show');
  	$('[data-toggle="tab"]').removeClass('active');
  	$('#overview-tab').addClass('active');
  });
  $('#home-tab').on('click', function() {
  	$('.tab-pane').removeClass('active');
  	$('#home-tab').addClass('active');
  	$('[data-toggle="tab"]').removeClass('active');
  });

  function goBack() {
  	url = window.location.href;
  	url = url.substr(0, url.lastIndexOf("%2"));
  	//window.history.back();
  	window.location.href = url;
  }