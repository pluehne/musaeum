function showNavigation(event)
{
	$("body").addClass("navigation-visible");
}

function hideNavigation(event)
{
	$("body").removeClass("navigation-visible");
}

function toggleNavigation(event)
{
	if ($("body").hasClass("navigation-visible"))
		$("body").removeClass("navigation-visible");
	else
		$("body").addClass("navigation-visible");
}

$(
	function()
	{
		$(".toggle-navigation").on("click",
			function(event)
			{
				toggleNavigation(event);

				event.preventDefault();

				return false;
			});

		$(".column-main").on("click",
			function(event)
			{
				if (!$("body").hasClass("navigation-visible"))
					return true;

				hideNavigation();
				return false;
			});

		$(document).on("keyup",
			function(event)
			{
				// Hide navigation with escape key
				if (event.keyCode === 27)
					hideNavigation();
				// Toggle navigation with “m” key
				else if (event.keyCode === 77)
					toggleNavigation();
			});
	}
);
