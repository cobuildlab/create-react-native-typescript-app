# create-react-native-typescript-app

## 1. Install

yarn install or npm install 

## 2. Configure Auth0

1. Copy the `app/auth0-configuration.js.example` in this sample to `app/auth0-configuration.js`.
2. Open your [Applications in the Auth0 dashboard](https://manage.auth0.com/#/applications).
3. Select your existing Application from the list or click **Create Application** at the top to create a new Application of type **Native**.
4. On the **Settings** tab for the Application, copy the "Client ID" and "Domain" values and paste them into the `app/auth0-configuration.js` file created above.
5. In the **Allowed Callback URLs** field, paste in the text below and replace `YOUR_DOMAIN` with the **Domain** from above. These URLs are required for the authentication result to be redirected from the browser to the app:

```
com.auth0samples://YOUR_DOMAIN/ios/com.auth0samples/callback,
com.auth0samples://YOUR_DOMAIN/android/com.auth0samples/callback
```

6. Add the same values to the **Allowed Logout URLs** field as well. These are required for the browser to redirect back to the app after the user logs out.
7. Scroll down and click **Save Changes**.

## 3. Run The App

Run your app on an emulator, simulator, or your own connected device.

- To run the app on iOS run `yarn run ios` or `npm run ios`.
- To run the app on Android run `yarn run android` or `npm run android`.