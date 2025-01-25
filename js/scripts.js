WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Projects slider
	const projectsSliders = [],
		projects = document.querySelectorAll('.projects .swiper')

	projects.forEach((el, i) => {
		el.classList.add('projects_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 16,
			slidesPerView: 'auto',
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.project')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.project')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		projectsSliders.push(new Swiper('.projects_s' + i, options))
	})


	// Projects categories slider
	const projectsCategoriesSliders = [],
		projectsCategories = document.querySelectorAll('.projects_list .swiper')

	projectsCategories.forEach((el, i) => {
		el.classList.add('projects_list_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 16,
			slidesPerView: 'auto'
		}

		projectsCategoriesSliders.push(new Swiper('.projects_list_s' + i, options))
	})


	// Services head slider
	const servicesHeadSliders = [],
		servicesHead = document.querySelectorAll('.services_head .advantages .swiper')

	servicesHead.forEach((el, i) => {
		el.classList.add('services_head_s' + i)

		let options = {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			lazy: true,
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		}

		servicesHeadSliders.push(new Swiper('.services_head_s' + i, options))
	})


	// Delivery options slider
	const deliveryOptionsSliders = [],
		deliveryOptions = document.querySelectorAll('.delivery_options .swiper')

	deliveryOptions.forEach((el, i) => {
		el.classList.add('delivery_options_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 0,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.item')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.item')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		}

		deliveryOptionsSliders.push(new Swiper('.delivery_options_s' + i, options))
	})


	// Mob. menu
	$('.mob_header .mob_menu_btn, .overlay, header .mob_close_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').toggleClass('active')
		$('body').toggleClass('menu_open')
		$('header').toggleClass('show')

		$('.mob_header .mob_menu_btn').hasClass('active')
			? $('.overlay').fadeIn(300)
			: $('.overlay').fadeOut(200)
	})


	// Accordion
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		let item = $(this).closest('.accordion_item'),
			accordion = $(this).closest('.accordion')

		if (item.hasClass('active')) {
			item.removeClass('active').find('.data').slideUp(300)
		} else {
			accordion.find('.accordion_item').removeClass('active')
			accordion.find('.data').slideUp(300)

			item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Custom select - Nice select
	const selects = document.querySelectorAll('select')

	if (selects) {
		selects.forEach(el => {
			NiceSelect.bind(el, {
				placeholder: el.getAttribute('data-placeholder')
			})

			el.addEventListener('change', () => el.classList.add('selected'))
		})
	}


	// Routes map
	$('.routes_map .route .map_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$(this).closest('.route').find('.map').slideToggle(300)
	})


	// Projects list
	$('.projects_list .project .spoler_btn').click(function(e) {
		e.preventDefault()

		let project = $(this).closest('.project')

		project.toggleClass('open')
		project.find('.data').slideToggle(300)
	})


	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}

	Fancybox.defaults.tpl = {
		closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg><use xlink:href="images/sprite.svg#ic_close2"></use></svg></button>',

		main: `<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">
			<div class="fancybox__backdrop"></div>
			<div class="fancybox__carousel"></div>
			<div class="fancybox__footer"></div>
		</div>`,
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Zoom images
	Fancybox.bind('.fancy_img', {
		Image: {
			zoom: false
		},
		Thumbs: {
			autoStart: false
		}
	})


	// Questions
	$('.questions .item .head').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$(this).next().slideToggle(300)
	})


	// Animation
	const boxes = document.querySelectorAll('.animate')

	function scrollTracking(entries) {
		for (const entry of entries) {
			if (entry.target.classList.contains('animate')) {
				if (entry.intersectionRatio >= 0.2 && !entry.target.classList.contains('animated')) {
					entry.target.classList.add('animated')
				}
			}
		}
	}

	const observer = new IntersectionObserver(scrollTracking, {
		threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
	})

	boxes.forEach(element => observer.observe(element))


	// Services
	$('.services .tab_content .links.level1 .btn').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let content = $(this).data('level2')

			$('.services .tab_content .links .btn').removeClass('active')
			$('.services .tab_content .links.level2, .services .tab_content .links.level3').hide()

			$(this).addClass('active')

			$('.services .tab_content .links.level2_' + content).fadeIn(300)
		} else {
			$(this).removeClass('active')

			$('.services .tab_content .links.level2, .services .tab_content .links.level3').hide()
		}
	})

	$('.services .tab_content .links.level2 .btn').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let content = $(this).data('level3')

			$('.services .tab_content .links.level2 .btn').removeClass('active')
			$('.services .tab_content .links.level3').hide()

			$(this).addClass('active')

			$('.services .tab_content .links.level3_' + content).fadeIn(300)
		} else {
			$(this).removeClass('active')

			$('.services .tab_content .links.level3').hide()
		}
	})


	if (is_touch_device() && WW > 1023) {
		const subMenus = document.querySelectorAll('header .menu .sub_menu')

		// Submenu on the touch screen
		$('header .menu_item > a.sub_link').addClass('touch_link')

		$('header .menu_item > a.sub_link').click(function (e) {
			const dropdown = $(this).next()

			if (dropdown.css('visibility') === 'hidden') {
				e.preventDefault()

				subMenus.forEach(el => el.classList.remove('show'))
				dropdown.addClass('show')

				BODY.style = 'cursor: pointer;'
			}
		})

		// Close the submenu when clicking outside it
		document.addEventListener('click', e => {
			if ($(e.target).closest('.menu').length === 0) {
				subMenus.forEach(el => el.classList.remove('show'))

				BODY.style = 'cursor: default;'
			}
		})
	}


	// Sub menu - Directions
	$('header .menu .sub_menu .directions a').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let content = $(this).data('level2')

			$('header .menu .sub_menu .directions a').removeClass('active')
			$('header .menu .sub_menu_directions .level2, header .menu .sub_menu_directions .level3, header .menu .sub_menu_directions .level4').hide()

			$(this).addClass('active')

			$('header .menu .sub_menu_directions .level2_' + content).fadeIn(300)
		} else {
			$(this).removeClass('active')

			$('header .menu .sub_menu_directions .level2, header .menu .sub_menu_directions .level3, header .menu .sub_menu_directions .level4').hide()
		}
	})


	$('header .menu .sub_menu .countries_level1 .btn').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let content = $(this).data('level2')

			$('header .menu .sub_menu .countries_level1 .btn').removeClass('active')
			$('header .menu .sub_menu .countries_level2, header .menu .sub_menu .countries_level3').hide()

			$(this).addClass('active')

			$('header .menu .sub_menu .countries_level2_' + content).fadeIn(300)
		} else {
			$(this).removeClass('active')

			$('header .menu .sub_menu .countries_level2, header .menu .sub_menu .countries_level3').hide()
		}
	})

	$('header .menu .sub_menu .countries_level2 .btn').click(function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let content = $(this).data('level3')

			$('header .menu .sub_menu .countries_level2 .btn').removeClass('active')
			$('header .menu .sub_menu .countries_level3').hide()

			$(this).addClass('active')

			$('header .menu .sub_menu .countries_level3_' + content).fadeIn(300)
		} else {
			$(this).removeClass('active')

			$('header .menu .sub_menu .countries_level3').hide()
		}
	})


	// Delivery options
	let currentRegionIndex = 1,
		currentCountryIndex = 1

	$('.delivery_options .region .list > *').mouseenter(function() {
		if(!$(this).find('.btn').hasClass('active')) {
			currentRegionIndex = $(this).index() + 1
			currentCountryIndex = 1

			$('.delivery_options .region .list .btn').removeClass('active')
			$(this).find('.btn').addClass('active')

			$('.delivery_options .country').hide()
			$('.delivery_options .country.region' + currentRegionIndex).fadeIn(300)

			$('.delivery_options .slider').hide()
			$('.delivery_options .region'+ currentRegionIndex +'_country' + currentCountryIndex).fadeIn(300)
		}
	})

	$('.delivery_options .country .list > *').mouseenter(function() {
		if(!$(this).find('.btn').hasClass('active')) {
			currentCountryIndex = $(this).index() + 1

			let parentList = $(this).closest('.country')

			parentList.find('.btn').removeClass('active')
			$(this).find('.btn').addClass('active')

			$('.delivery_options .slider').hide()
			$('.delivery_options .region'+ currentRegionIndex +'_country' + currentCountryIndex).fadeIn(300)
		}
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})