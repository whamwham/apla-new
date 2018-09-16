jQuery(document).ready(function() {
	$('.header__menu_icon').click(function(event) {
		$(this).closest('.header__menu').toggleClass('_open');
		$('html').toggleClass('_menu-open');
	});

	$('.simple__form input').on('keyup', function() {
		if (!$(this).closest('form').valid()) {
			$(this).siblings('label.dup,label.ok').remove();
			$(this).removeClass('dup,ok');
		}
	});

	$('.simple__form').submit(function() {
		var input = $(this).find('input[name=email]');

		$(this).validate({
			rules: {
				email: {
					required: true,
					email: true,
				}
			},
			messages: {
				email: {
					'required': 'Required field',
					'email': "Incorrect email",
				}
			}
		});

		if ($(this).valid()) {
			$.post('https://apla.io/subscribe', {
				email: input.val(),
			},
			function(data) {
				if (data === "OK") {
					input.removeClass('dup').addClass('ok');

					if (input.siblings('label.ok').length === 0) {
						$('<label class="ok">Thank you!</label>').insertAfter(input);
					}
				}

				if (data === "DUP") {
					input.removeClass('ok').addClass('dup');

					if (input.siblings('label.dup').length === 0) {
						$('<label class="dup">You are already subscribed to newsletter!</label>').insertAfter(input);
					}
				}
			});
		} else {
			input.siblings('label.dup,label.ok').remove();
			input.removeClass('dup,ok');
		}

		return false;
	});
});
