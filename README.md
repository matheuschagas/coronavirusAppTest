# Requisites

* Yarn or Npm
* Cocoapods to run iOS
* xCode to run iOS
* Android SDK to run Android

# Setup

1. run `yarn` or `npm i`
2. run `cd ios && pod install && cd ..`
3. create a `.env` file, you can just copy `.env.sample` or rename it
3. run `yarn android` to run Android or `yarn ios` to run iOS

# Project Structure

* Screens are inside `src/screens`
* Components are inside `src/components`
* Assets are inside `src/assets`
* Services are inside `src/services`
* Navigators are inside `src/navigation`

### Screens

The screen's logic are in files named `Controller` and the view are in files named `Component`
