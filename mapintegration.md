# Map Integration

## Library of Choice

### react-native-maps

This project uses [react-native-community/react-native-maps](https://github.com/react-native-community/react-native-maps) with
the Google Maps API for IOS and Android.

The criteria that needed to be met for this app was the following:

* Mark Locations from latitude and longitude points
* Cross-platform (android and ios capabilities)
* Interactive Markers for each location

react-native-maps met all of this criteria, and while it took some time to set-
up (we will walk through this later, it is very simple to use and integrates 
quite well with the Google Maps API

The following components are of interest, but the library has a lot of others to offer:

* [MapView](https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md): this will be used for the actual map display 
* [Marker](https://github.com/react-native-community/react-native-maps/blob/master/docs/marker.md): this will be used to mark locations
* [Callout](https://github.com/react-native-community/react-native-maps/blob/master/docs/callout.md): this will be used to give a description when the pin is selected

### geolocation

After going through the process of integrating react-native-maps, I realized getting
location of the user directly in react-native had been deprecated. This is discussed
in the [react-native documentation](https://reactnative.dev/docs/geolocation.html)

This library used to be a part of the react-native project and is simply used to get
the users current latitude and longitude. Which meets the only criteria we had not
fulfilled with react-native-maps.

This library is quite easy to setup, therefore I will not give it an entire section. Just go
to the apps root directory and run:

```npm install react-native-community/geolocation ```

## react-native-maps Setup

### Prerequisite
Go to [Google Cloud Platform](https://cloud.google.com/) and create an account.
You may need to enter billing information but you will not be charged.

Navigate to the projects MiltonHistoricProject directory and run:
```
npm install react-native-maps
```

### Android Setup
Follow the instructions [here](https://developers.google.com/maps/documentation/android-sdk/get-api-key) to setup the API for Android
For the purposes of this project you only need to follow the documentation
up until you've added the API key to your app.

There are some additional steps to getting this working. These instructions (especially
command line navigation) are to be followed with the pre-requisite that the starting directory is the MiltonHistoricApp folder of the git repository.

Navigate to the android app:

```
cd android
```

Open the build.gradle file with a text editor of your choice:

```
vim build.gradle
```

Add the lines highlighted in green into the buildscript:

  ```
  buildscript {
    ext {
        buildToolsVersion = "28.0.3"
        minSdkVersion = 16
        compileSdkVersion = 28
        targetSdkVersion = 28
        //  Copy and paste the following three lines into your project
        supportLibVersion = "28.0.0"
        googlePlayServicesVersion = "17.0.0"
        androidMapsUtilsVersion = "0.6.2"
    }
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:3.5.2")

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}
```

Open setting.gradle with a text editor of your choice:

```
vim setting.gradle
```

Add the following to the file under the existing text:

```
include ':react-native-maps'
project(':react-native-maps').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-maps/lib/android')
```
You should now be all set to start using the react-native-maps library in your project
### iOS Setup
Follow the instructions [here](https://developers.google.com/maps/documentation/android-sdk/get-api-key) to setup the API key for iOS
For the purposes of this project you only need to follow the instructions
up until you've added the API key to your app.

Navigate to the ios folder of the project:

```
cd ios/MiltonHistoricApp
```

Open the AppDelegate.m file:

```
vim AppDelegate.m
```

Add the following line in the import statements:

```
#import <GoogleMaps/GoogleMaps.h>
```

And add the following line with your api key generated above:

```
[GMSServices provideAPIKey:@"YOUR-API-KEY"];
```

Now navigate back a directory:

```
cd ..
```

And open the Podfile:

```
vim Podfile
```

Add the following lines to the podfile:

```
  rn_maps_path = '../node_modules/react-native-maps'
  pod 'react-native-google-maps', :path => rn_maps_path
  pod 'GoogleMaps'
  pod 'Google-Maps-iOS-Utils'
```

Close the file and run:

```
pod install
```

You should now be able to start using react-native-maps in your project!
