### Build apk ###

*Para gerar o apk*

$ _ionic build android_


*Nesta pasta você encontra o apk*

$ _cd platforms\android\build\outputs\apk_

*Para gerar o chave de registro*

$ _keytool -genkey -v -keystore cv_vendor.keystore -alias cv_vendor -keyalg RSA -keysize 2048 -validity 10000_

*Para gerar assinatura *

$ _jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cv_vendor.keystore android-debug.apk cv_vendor_

*Para fazer o alinhamento e compactamento do apk*

$ _zipalign -v 4 android-debug-unaligned.apk cv_vendor.apk_

Obs: os comandos foram retirados deste site: http://ionicframework.com/docs/guide/publishing.html