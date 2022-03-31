# chrome-bigquery-cost-estimator

A Chrome extension that adds query cost to the BigQuery web UI.

## Note

This is designed to work with the new tabbed UI. It probably doesn't work with the old UI.

## Installation

- Clone this repository to your filesystem somewhere
- In Chrome, copy `chrome://extensions` into your location bar and hit enter.
- Turn on the "Developer Mode" toggle in the upper right
- Click the "Load Unpacked" button in the upper left
- Select the place where you checked out this repository
- You should now see "BigQuery Cost Estimator"
- Feel free to turn off Developer Mode

## Updating

- Navigate to wherever you checked out the repository and do `git pull`
- Head over to `chrome://extensions`
- Click the little "refresh" button next to on/off toggle in the BigQuery Cost Estimator

## Developing

- Run `npm i` in the project directory
- Ensure "Developer Mode" is on for Chrome
- Make changes
- Click the "refresh" button for the extension on the  the extension page, `chrome://extensions`
- Refresh the BigQuery UI page and make sure things work as expected
