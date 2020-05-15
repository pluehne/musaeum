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
		const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const localDateFormatter = new Intl.DateTimeFormat("en-us",
			{
				year: "numeric",
				month: "long",
				day: "numeric"
			});
		const localDayPeriodFormatter = new Intl.DateTimeFormat("en-us",
			{
				hour: "numeric",
				hour12: true,
				dayPeriod: "short"
			});

		$("time-range").each(
			function(index, timeRange)
			{
				const timeStamps = $("local-time", timeRange);

				if (timeStamps.length != 2)
					return;

				try
				{
					const fromTimeStamp = $(timeStamps[0]).attr("datetime");
					const toTimeStamp = $(timeStamps[1]).attr("datetime");
					const fromDateTime = Date.parse(fromTimeStamp);
					const toDateTime = Date.parse(toTimeStamp);
					const localFromDate = localDateFormatter.format(fromDateTime);
					const localToDate = localDateFormatter.format(toDateTime);
					const localFromDayPeriod = localDayPeriodFormatter.format(fromDateTime).slice(-2);
					const localToDayPeriod = localDayPeriodFormatter.format(toDateTime).slice(-2);

					let fromTimeFormat =
					{
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
						hour12: true,
						dayPeriod: "short"
					};

					let toTimeFormat =
					{
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "numeric",
						minute: "numeric",
						hour12: true,
						dayPeriod: "short"
					};

					if (localFromDate == localToDate)
					{
						delete toTimeFormat.year;
						delete toTimeFormat.month;
						delete toTimeFormat.day;
					}

					const localFromDateTimeFormatter = new Intl.DateTimeFormat("en-us", fromTimeFormat);
					const localToDateTimeFormatter = new Intl.DateTimeFormat("en-us", toTimeFormat);

					let localFromDateTime = localFromDateTimeFormatter.format(fromDateTime);
					let localToDateTime = localToDateTimeFormatter.format(toDateTime);

					if (localFromDate == localToDate && localFromDayPeriod == localToDayPeriod)
					{
						localFromDateTime = localFromDateTime.slice(0, -3);
					}

					localFromDateTime = localFromDateTime.replace(" AM", " a.m.").replace(" PM", " p.m.");
					localToDateTime = localToDateTime.replace(" AM", " a.m.").replace(" PM", " p.m.");

					$(timeStamps[0]).html(localFromDateTime)
					$(timeStamps[1]).html(localToDateTime + " <tag>" + localTimeZone + "</tag>")
				}
				catch (error)
				{
					console.warn(error);
				}
			});

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
