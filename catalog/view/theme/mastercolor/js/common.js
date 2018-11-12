function getURLVar(key) {
	var value = [];

	var query = document.location.search.split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}
function getajaxcallbacking(href, id) {
    $.ajax({
        url: 'index.php?',
		type:'get',
		data: href,
		beforeSend: function() {
			$('.load' + id).addClass('load');
		},
		success: function(msg){
			bluring();
			$('body .divshadow').empty();
			setTimeout(function () {
				$('body .divshadow').append(msg);
				$('.load' + id).removeClass('load');
			}, 100);
		}
    });
}
function bluring() {
	$('body .divshadow').remove();
	$('body .modal-bg').remove();
	$('.modal-bg').addClass('show');
	$('body').prepend('<div class="divshadow"></div>');
	$('body').append('<div class="modal-bg"></div>');
	$('body .divshadow').addClass('show');
	$('body .modal-bg').addClass('show');
}
function centering(diving){
	var wsize = windowWorkSize(),
	testElem = $(diving),
	testElemWid =  testElem.outerWidth(),
	testElemHei =  testElem.outerHeight();
			
	testElem.css('top', wsize[1]/2 - testElemHei/2 + (document.body.scrollTop || document.documentElement.scrollTop) + 'px');

	function windowWorkSize(){
	var wwSize = new Array();
		if (window.innerHeight !== undefined) {wwSize= [window.innerWidth,window.innerHeight]} else {
			wwSizeIE = (document.body.clientWidth) ? document.body : document.documentElement; 
			wwSize= [wwSizeIE.clientWidth, wwSizeIE.clientHeight];
		};
		return wwSize;
	};
}
function divcartul(){
	setTimeout(function () {
		$('.divshadow').addClass("show animated bounceIn divcart show open animated bounceIn col-lg-offset-3 col-lg-6 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10 col-xm-12 col-xm-offset-0");
		$('.divcart').empty();
		var divcart = $('body').find('#cart .dropdown-menu').html();
		if (divcart != null) {
			var parentcart = '<ul class="dropdown-menu col-sm-12 col-xs-12">' + divcart + '</ul>';
			$('.divcart').append(parentcart);
			$('.divshadow').prepend('<div class="closecart"><i class="fa fa-times" aria-hidden="true"></i></div>');
		}
		centering('.divcart');
		$('.closecart').click(function() {
			deletedivcartul();
		});
		$(document).keydown(function(e) {
			var containerfind = $('body').find('.divcart.show').html();
			if (containerfind != null && e.keyCode === 27) {
				deletedivcartul();
			}
		});
		$(document).mouseup(function(e) {
			var container = $('body .divcart.show');
			var containerfind = $('body').find('.divcart.show').html();
			if (containerfind != null && container.has(e.target).length === 0) {
				deletedivcartul();
			}
		});
	}, 800);
}
function deletedivcartul(){
	setTimeout(function () {
		$('.divshadow').removeClass();
		$('.modal-bg').removeClass("show");
	}, 0);
}
function updateCart() {
	if ($('button #cart-total').text() == '0') {
		$('#top-links .fa-shopping-cart').after('<span id="cart-total" class="visible-xs-inline-block">&nbsp;&nbsp;(' + $('button #cart-total').text() + ')</span>');
	} else {
		$('#top-links .fa-shopping-cart').after('<span id="cart-total" class="visible-xs-inline-block text-danger">&nbsp;&nbsp;(' + $('button #cart-total').text() + ')</span>');
	}
	if ($('.modal-bg').hasClass('show')) {} else {$('.modal-bg').addClass('show');}
}
function closedivshadow() {
	$('body .divshadow').remove();
	$('.modal-bg').removeClass('show');
}
function generationclosedivshadow() {
	$('button.close').click(function() {
		closedivshadow();
	});
}
function closedivshadowkeymouse() {
	$(document).mouseup(function (e) {
		var container = $('body .divshadow.show');
		var containerfind = $('body').find('.divshadow.show').html();
		if (containerfind != null && container.has(e.target).length === 0) {
			closedivshadow();
		}
	});
	$(document).keydown(function(e) {
		var container = $('body .divshadow.show');
		var containerfind = $('body').find('.divshadow.show').html();
		if (containerfind != null && e.keyCode === 27) {
			closedivshadow();
			return false;
		}
	});
}
function hover_button(clas){
	setTimeout(function () {
		$(clas).removeClass('product-thumb-button');
	}, 100);
	setTimeout(function () {
		$(clas).removeClass('dynamic-shadow');
	}, 1000);
}
function schetInner(clas) {
	setTimeout(function () {
		clastemp = clas.replace(' >', '').replace(' >', '').replace(' >', '');
		var blockwidth = $(clastemp).parent().width() - $('li.header-menu').width();
		var innwidth = 0;
		var schet = 0;
		
		$(clastemp).each(function(){
			innwidth += $(this).width();
			
			if (innwidth > blockwidth) {
				schet += 1;
			}
		});
		
		var indexLast = $(clastemp).length - schet - 1;
		
		
		var array_temp = [];
		
		$(clastemp).each(function(i){
			array_temp[i] = $(this).html();
		});
		
		array_temp.forEach(function(item, i) {
			if (indexLast <= i) {
				$(clastemp + '.more_articles ul').append($(clastemp + '[data-id=\'' + i + '\']'));
				$('.more_articles ul li').removeClass('pull-right');
			} else {
				$(clastemp + '.more_articles').before($(clastemp + '.more_articles ul li[data-id=\'' + i + '\']'));
			}
			
		});
		if ($('.more_articles .dropdown-menu').text() === '') {
			$('.more_articles').hide();
		} else {
			$('.more_articles').show();
		}
	}, 0);
}
function topingnav() {
	var top_content = $(".nav-mastermodule").offset().top - 100;
	$('html, body').animate({scrollTop: top_content}, 1000);
}
closedivshadowkeymouse();
$(document).ready(function() {
	
	
	
	if ($(window).width() > 767) {
		schetInner('.navbar-ex1-collapse ul.navbar-nav > li.pull-right');
		$('#menu .btn-navbar').click(function() {
			$('.header-menu > .dropdown-menu').slideToggle(200);
		});
	}
	if ($(window).width() <= 767) {
		$('.nav.navbar-nav > li').removeClass('pull-right').addClass('dropdown');
		$('.header-menu > .list-group.dropdown-menu li').addClass('visible-xs');
		$('.nav.navbar-nav').prepend($('.header-menu > .list-group.dropdown-menu').html());
		$('#menu .nav > li > a.dropdown-toggle').attr('data-toggle','dropdown');
		
	}
	
	$('#mastermodule a:first').tab('show');
	
	$('button.btn-primary, input.btn-primary, button.btn-contrast, a.btn-primary, a.btn-contrast').addClass('dynamic-shadow');
	$('.product-thumb .button-group button + button').addClass('dynamic-shadow');
	
	$(".btn-primary-border").hover(function() {
		$(this).addClass('dynamic-shadow product-thumb-button');
		hover_button(this);
	}
	);
	
	$('.product-layout').each(function(i) {
		$(this).find('.product-thumb .image a').wrapAll('<div id="images_slide' + i + '" class="owl-carousel images_slide" style="opacity: 1;"></div>');
		$('#images_slide' + i).owlCarousel({
			items: 1,
			singleItem: true,
			navigation: true,
			navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
			pagination: false
		});
	});
	
	$('#cart > button').click(function() {
		divcartul();
		bluring();
	});
	
	
	
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	});

	/* Search */
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header #search input[name=\'search\']').parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});
	
	$('.close-setting').click(function() {
		$(this).parent().toggleClass('show');
	});
	
	$('.element input[name^=module_mastercolor_color_one]').on('change', function(){
		$('.coloring_1').val($(this).attr('data-color'));
		setTimeout(function () {
			$('.coloring_1').focus();
			$('.focus_div').focus();
			$('.coloring_1').focus();
		}, 0);
	});
	$('.element input[name^=module_mastercolor_color_dou]').on('change', function(){
		$('.coloring_2').val($(this).attr('data-color'));
		setTimeout(function () {
			$('.coloring_2').focus();
			$('.focus_div').focus();
			$('.coloring_2').focus();
		}, 0);
	});
	$('.element input[name^=module_mastercolor_color_fri]').on('change', function(){
		$('.coloring_3').val($(this).attr('data-color'));
		setTimeout(function () {
			$('.coloring_3').focus();
			$('.focus_div').focus();
			$('.coloring_3').focus();
		}, 0);
	});
	
	$('.coloring_1').bind('focus', function() {
		generetionStyleOne($(this).val());
		$('.doucolor,.fricolor').removeClass('show');
		$('.onecolor').addClass('show');
	});
	$('.coloring_2').bind('focus', function() {
		generetionStyleDou($(this).val());
		$('.onecolor,.fricolor').removeClass('show');
		$('.doucolor').addClass('show');
	});
	$('.coloring_3').bind('focus', function() {
		generetionStyleFri($(this).val());
		$('.onecolor,.doucolor').removeClass('show');
		$('.fricolor').addClass('show');
	});
	
	$('.coloring_1').on('keydown', function(e) {
		generetionStyleOne($(this).val());
	});
	$('.coloring_2').on('keydown', function(e) {
		generetionStyleDou($(this).val());
	});
	$('.coloring_3').on('keydown', function(e) {
		generetionStyleFri($(this).val());
	});
	
	
	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		
		$('#content .row > .product-list > .product-thumb .image').addClass('col-lg-4');
		$('#content .row > .product-list > .product-thumb .caption').addClass('col-lg-8');
		
		$('.product-list .product-thumb .caption').find('')
		
		$('.product-list .product-thumb').each(function() {
			var html_button = '<div class="button-group text-right">' + $(this).find('.caption .button-group').html() + '</div>';
			$(this).find('.caption .button-group').remove();
			$(this).find('.caption p').after(html_button);
			$(this).find('.caption .button-group button').addClass('pull-right');
			
			
			var atr1 = $(this).find('.image .price').attr('class');
			var atr2 = 'type="' + $(this).find('.image .price').attr('type') + '"' + 'data-toggle="' + $(this).find('.image .price').attr('data-toggle') + '" ' + 'data-original-title="' + $(this).find('.image .price').attr('data-original-title') + '"';
			var html_price = '<div class="' + atr1 +'"' + atr2 + '>' + $(this).find('.image .price').html() + '</div>';
			$(this).find('.image .price').remove();
			if (atr1 != undefined) {
				$(this).find('.caption .button-group').prepend(html_price);
			}
			
			var html_popup_button = '<div class="button-group-hover">' + $(this).find('.image .button-group-hover').html() + '</div>';
			if ($(this).find('.image .button-group-hover').html() != undefined) {
				$(this).find('.caption h4').after(html_popup_button);
			}
			$(this).find('.image .button-group-hover').remove();
		});
		
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');
		
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body',trigger: 'hover'});

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-3 col-sm-6 col-xs-12');
		}
		
		$('.product-grid .product-thumb').each(function() {
			$(this).find('.image').removeClass('col-lg-4');
			$(this).find('.caption').removeClass('col-lg-8');
			
			var atr1 = $(this).find('.button-group .price').attr('class');
			var atr2 = 'type="' + $(this).find('.button-group .price').attr('type') + '"' + 'data-toggle="' + $(this).find('.button-group .price').attr('data-toggle') + '" ' + 'data-original-title="' + $(this).find('.button-group .price').attr('data-original-title') + '"';
			var html_price = '<div class="' + atr1 +'"' + atr2 + '>' + $(this).find('.button-group .price').html() + '</div>';
			$(this).find('.button-group .price').remove();
			
			if (atr1 != undefined) {
				$(this).find('.image').prepend(html_price);
			}
			
			var html_button = '<div class="button-group">' + $(this).find('.caption .button-group').html() + '</div>';
			$(this).find('.caption .button-group').remove();
			
			$(this).find('.caption h4').before(html_button);
			$(this).find('.caption .button-group button').removeClass('pull-right');
			
			var html_popup_button = '<div class="button-group-hover">' + $(this).find('.caption .button-group-hover').html() + '</div>';
			if ($(this).find('.caption .button-group-hover').html() != undefined) {
				$(this).find('.image').append(html_popup_button);
			}
			$(this).find('.caption .button-group-hover').remove();
		});

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');
		
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body',trigger: 'hover'});

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body',trigger: 'hover'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cartopenstore/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.alert, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart > button').html('<i class="fa fa-shopping-cart"></i><span id="cart-total">' + json['total'] + '</span>');
					}, 100);

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
					
					setTimeout(function () {
						$('#cart > button').html('<i class="fa fa-shopping-cart" aria-hidden="true"></i><span id="cart-total">' + json['total'] + '</span>').trigger('click');
					}, 500);
				
				}
				divcartul();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cartopenstore/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<i class="fa fa-shopping-cart"></i><span id="cart-total">' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
				divcartul();
				updateCart();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cartopenstore/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<i class="fa fa-shopping-cart"></i><span id="cart-total">' + json['total'] + '</span>');
				}, 100);
				
				var now_location = String(document.location.pathname);

				if ((now_location == '/cart/') || (now_location == '/checkout/') || (getURLVar('route') == 'checkout/cart') || (getURLVar('route') == 'checkout/checkout')) {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
				divcartul();
				updateCart();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cartopenstore/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
				updateCart();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					bluring();
					$('.divshadow').addClass("col-lg-offset-3 col-lg-6 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10 col-xm-12 col-xm-offset-0");
					$('.divshadow').empty();
					$('.divshadow').prepend('<div class="alert"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close"><i class="fa fa-times" aria-hidden="true"></i></button></div>');
					centering('.divshadow');

					generationclosedivshadow();
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);

			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert').remove();

				if (json['success']) {
					
					bluring();
					$('.divshadow').addClass("col-lg-offset-3 col-lg-6 col-sm-offset-2 col-sm-8 col-xs-offset-1 col-xs-10 col-xm-12 col-xm-offset-0");
					$('.divshadow').empty();
					$('.divshadow').prepend('<div class="alert"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close"><i class="fa fa-times" aria-hidden="true"></i></button></div>');
					centering('.divshadow');
					
					generationclosedivshadow();

					$('#compare-total').html(json['total']);

					
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}
})(window.jQuery);
