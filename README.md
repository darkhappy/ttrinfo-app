# Toontown Information Dashboard

A modern electron application which shows you the current status of [Toontown Rewritten](https://toon.town).

![TTR Info Dashboard Preview](https://files.catbox.moe/bzi86a.png)

---

## Features

- **Clean UI:** The UI was built with simplicity and ease of use in mind. All the essential information is available to the user with beautiful visual cues thanks to [react-chartjs-2](https://github.com/jerairrest/react-chartjs-2) and [rc-progress](https://github.com/react-component/progress), with tooltips to give extra detail on certain aspects.
- **Invasions List:** A list of all active invasions, with an accurate ETA thanks to [Toon Plus](https://toon.plus/invasions).
- **Population Chart:** View the current population of each district with a nice pie chart. Labels are toggleable by simply clicking on their label in the legend.
- **Silly Meter Status:** View the progress of the Silly Meter, along with the current/winning/future teams and the time until the next update/expiration of the boost/start of the next cycle.

## Planned features

- **Icons:** Minimal icons for invasions (cog type) and silly meter (teams) as well as an icon for the app itself (currently using the default electron one).
- **Notifications:** Notifications for new invasions.
- **Customization:** Customize the auto-refresh time, dark mode, etc.

## Built with

- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [electron](https://github.com/electron/electron)

## License

This project is licensed under the GNU License - see the [LICENSE.md](https://github.com/darkhappy/ttrinfo-app/blob/master/LICENSE) file for details.
