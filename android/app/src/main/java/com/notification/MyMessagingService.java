package com.notification;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.MediaPlayer;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.io.File;
import java.net.URI;

public class MyMessagingService extends FirebaseMessagingService {

    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {

        super.onMessageReceived(remoteMessage);

        if(remoteMessage.getNotification() != null){
            Log.d("###", "getData" + remoteMessage.getNotification().toString());
            String title = remoteMessage.getNotification().getTitle();
            String body = remoteMessage.getNotification().getBody();

            Notification notification = new NotificationCompat.Builder(this, "FCM_CHANNEL_ID")
                .setSmallIcon(R.drawable.ic_settings_system_daydream_black_24dp)
                .setContentTitle(title)
                .setContentText(body)
                .setColor(Color.DKGRAY)
                .build();

            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            manager.notify(1002, notification);
        }

        if(remoteMessage.getData().size() > 0){
            String soundFile = null;
            for(String key: remoteMessage.getData().keySet()){
                if(key.equals("sound")){
                    soundFile = remoteMessage.getData().get(key);
                }
                Log.d("### ", "onMessageReceived Key: " + key + " Data: " + remoteMessage.getData().get(key));
            }

            if(soundFile != null){
                displayNotification(soundFile);
            }else{
                displayNotification("beep.mp3");
            }

            Log.d("###", "getData" + remoteMessage.getData().toString());
        }
    }



    public void displayNotification(String soundFile){

        Uri audioFileUri = Uri.parse("android.resource://com.notification/raw/" + "beep.mp3");

//        File file = new File(audioFileUri.getPath());
//        if (file.exists()) {
//            Log.i("FILEEXISTS", audioFileUri + " exists");
//        } else {
//            Log.i("FILEEXISTS", audioFileUri + " doesn't exists");
//        }

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "CHANNEL_ID")
                .setSmallIcon(R.drawable.ic_settings_system_daydream_black_24dp)
                .setContentTitle("ZAPIER")
                .setContentText("Alert from Zapier")
//                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true)
                .setSound(audioFileUri);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        notificationManager.notify(11326, builder.build());

    }


    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }
}
