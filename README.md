# Coronavirus app
This is an app made in React Native for SalsaMobi evaluate my skills as a Mobile Engineer

## Requirements

* Yarn or Npm
* Cocoapods to run iOS
* xCode to run iOS
* Android SDK to run Android

## Setup

1. Clone the repo: `git clone https://github.com/matheuschagas/coronavirusAppTest.git`
1. Run `yarn` or `npm i`
1. Run `cd ios && pod install && cd ..`
1. Create a `.env` file. You can just copy `.env.sample` or rename it.
1. Run `yarn android` to run Android or `yarn ios` to run iOS

## Project Structure

* Screens are inside `src/screens`
* Components are inside `src/components`
* Assets are inside `src/assets`
* Services are inside `src/services`
* Navigators are inside `src/navigation`

### Screens

The screen's logic are in files named `Controller` and the view are in files named `Component`

* AddUserScreen: The screen that has a form to add a User
* DetailsScreen: Is basically a MapView with one Marker. The screen can be accessed from map icon on AddUserScreen or selecting a User on UserScreen.
* UserScreen: List all users ordered by Country.

## Future improvements

* Create an icon and splash screen.
* The Google Maps API Key is hardcoded on Android and iOS projects, in future we should put it on an environment variable to be used by CD/CI as Fastlane.tools
