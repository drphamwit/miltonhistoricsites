# Milton Historic Sites
Mobile app for Milton historic sites  
Website: http://miltonhistoricsites.org/

## Introduction

The Milton Historic Commission is working to expand the city's commitment to historic preservation by identifying, researching, and requesting historic district designation for several areas. Their main goal is to generate public enthusiasm about Milton's history. We would like to develop a mobile application that allows users to create geolocated entries for various historical sites and allows the importation of documents, images, videos, and other media. We aim to offer a low cost of maintenance solution for cities and make it accessible to everyone. This model, if successful, could be replicated to other cities for people to learn and appreciate the deep and fascinating history of those cities around the US.

## Getting started
### Environment setup
Before you attempt to clone the project, it is important to get your react native development environment ready. Instructions for different operating systems can be found in the following link: https://reactnative.dev/docs/environment-setup this project uses react-native cli so make sure to navigate to the react-native cli tab in the provided link (expo is selected by default, the project will not run with expo). Follow the instructions carefully. Once this is complete we can proceed with cloning the project.

Open a terminal session. If you are on windows I would reccomend using git bash as some commands we will be using are not compatible with windows cmd

Clone the repository by running the following command: 

```console
~/Dev$ git clone https://github.com/drphamwit/miltonhistoricsites.git
```

Navigate to the MiltonHistoricApp folder: 

```console
~/Dev$ cd miltonhistoricsites
```

Navigate to the MiltonHistoricApp folder: 

```console
~/Dev/miltonhistoricsites$ cd MiltonHistoricApp
```

To install dependencies run:

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp$ npm install
```
### How to run
#### Android Instructions
Make sure that you only have one device connected. You can verify this by running: 

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp$ adb devices
```

If you would like to run on android use:

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp$ npx react-native run-android
```

The result should look like the following:

<img src="/Images/Android-Run-Example.png" height="439" width="245">

And a terminal process should open that looks like this:

<img src="/Images/Terminal-Run-Example.jpeg" height="182" width="293">
 
#### IOS Instructions
If you would like to run on IOS, ensure that you are using MacOS, this is the only way to run the IOS version of the app. 

Navigate to ios folder:

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp$ cd ios
```

Make sure you have CocoaPods Installed, running the following command will take care of this (if you already have it, cocoapods will be updated to the latest version):

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp/ios$ sudo gem install cocoapods
```

Install dependencies:

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp/ios$ pod install
```

Navigate back to the react native project:

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp/ios$ cd ..
```

Finally run: 

```console
~/Dev/miltonhistoricsites/MiltonHistoricApp$ npx react-native run-ios
```

The result should look like the following:

<img src="/Images/IOS-Run-Example.jpeg" height="488" width="238">

And the corresponding terminal window:

<img src="/Images/Terminal-Run-Example.jpeg" height="182" width="293">

## Site Info
### Login
http://miltonhistoricsites.org/admin/users/login  
Username: MiltonHistoric
### Domain management
https://portal.reclaimhosting.com/clientarea.php  
Email: miltonhistoricsites@gmail.com

## Omeka REST APIs
https://omeka.readthedocs.io/en/latest/Reference/api/  
Examples:  
Javascript: https://github.com/jimsafley/omeka-client-js  
Python: https://github.com/wcaleb/omekadd

## Getting data in JSON format
?output=mobile-json

## Map Integration
[Documentation](mapintegration.md)

## References
https://github.com/CPHDH/Curatescape  
https://github.com/CPHDH/Curatescape/wiki/Configuring-omeka-for-curatescape  
https://forum.curatescape.org/t/installation-documentation/258  
https://play.google.com/store/apps/details?id=org.curatescape.dchistoric  
