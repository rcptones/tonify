package com.notification;

import android.annotation.SuppressLint;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.io.File;
import java.net.URI;
import java.util.Map;
import java.util.Random;
import java.util.UUID;


public class MyMessagingService extends FirebaseMessagingService {

    public static final String TAG = "MyTag";
    private static Random randomObj = new Random();
    public static final String RAW = "raw";
    public static final String DRAWABLE = "drawable";


    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {


        Map<String, String> data = remoteMessage.getData();
        int notificationId = randomObj.nextInt();
        onNotificationReceived(data, notificationId);

       /* super.onMessageReceived(remoteMessage);

        if (remoteMessage.getNotification() != null) {
            String title = remoteMessage.getNotification().getTitle();
            String body = remoteMessage.getNotification().getBody();

            Notification notification = new NotificationCompat.Builder(this, FCM_CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_settings_system_daydream_black_24dp)
                    .setContentTitle(title)
                    .setContentText(body)
                    .setColor(Color.BLUE)
                    .build();

            NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
            manager.notify(1002, notification);
        }

        if (remoteMessage.getData().size() > 0) {
            Log.d(TAG, "onMessageReceived: Data Size: " + remoteMessage.getData().size());

            for (String key : remoteMessage.getData().keySet()) {
                Log.d(TAG, "onMessageReceived Key: " + key + " Data: " + remoteMessage.getData().get(key));
            }

            Log.d(TAG, "onMessageReceived: Data: " + remoteMessage.getData().toString());
        }
*/

    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public AudioAttributes createAudioAttributes() {
       return new AudioAttributes.Builder()
                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                .setUsage(AudioAttributes.USAGE_ALARM)
                .build();
    }


    @RequiresApi(api = Build.VERSION_CODES.O)
    public void onNotificationReceived(Map <String, String> data, int notificationId) {

        Context context = getApplicationContext();

        NotificationManager mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);


        String id = "CHANNEL_ID";
//        if (mNotificationManager.getNotificationChannel(id) != null) {
//            mNotificationManager.deleteNotificationChannel(id);
//            //return;
//        }


//        AudioAttributes audioAttributes = new AudioAttributes.Builder()
//                .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
//                .setUsage(AudioAttributes.USAGE_NOTIFICATION)
//                .build();

        int importance = NotificationManager.IMPORTANCE_DEFAULT;
        NotificationChannel channel  = new NotificationChannel(id, "MyChannel", importance);
        channel.enableLights(true);

//        Uri soundUri = Uri.parse(
//                "android.resource://" +
//                        getApplicationContext().getPackageName() +
//                        "/" +
//                        getRawId(data.get("sound")));
//
//        channel.setSound(soundUri, audioAttributes);

        //channel.setSound(Uri.parse("android.resource://com.notification/" + getRawId(data.get("sound"))), audioAttributes);
        mNotificationManager.createNotificationChannel(channel);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, id);
        builder.setChannelId(channel.getId());


        builder.setSmallIcon(R.drawable.ic_settings_system_daydream_black_24dp)
                .setContentTitle(data.get("title"))
                .setContentText(data.get("body"))
                //.setSound(getNotificationSoundUri(context, data.get("sound")))\
                //.setSound(getNotificationSoundUri(context, data.get("sound")))
                .setColor(Color.BLUE);

        //builder.setSound(Uri.parse("android.resource://com.notification/" + getRawId(data.get("sound"))));
                //.setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM))
                //.setSound(Uri.parse("android.resource://"
                      //  + context.getPackageName() + "/" + R.raw.beep))
                //.build();

       // builder.setSound(getNotificationSoundUri(context, data.get("sound")));
        //builder.setSound(getNotificationSoundUri(context, data.get("sound")), );

        NotificationManager notificationManager = (NotificationManager) context
                .getSystemService(Context.NOTIFICATION_SERVICE);

        //Notification notification = builder.build();

       // notification.sound = getNotificationSoundUri(context, data.get("sound"));
        notificationManager.notify(notificationId, builder.build());


        AudioManager am = (AudioManager)getSystemService(Context.AUDIO_SERVICE);

        switch (am.getRingerMode()) {
            case AudioManager.RINGER_MODE_SILENT:
                Log.i("MyApp","Silent mode");
                break;
            case AudioManager.RINGER_MODE_VIBRATE:
                Log.i("MyApp","Vibrate mode");
                break;
            case AudioManager.RINGER_MODE_NORMAL:
                Log.i("MyApp","Normal mode");
                playMusic(data.get("sound"));
                break;
        }

        /*createNotificationChannel(context);
        Notification notification = new NotificationCompat.Builder(this, context.getString(R.string.default_notification_channel_id))
                .setSmallIcon(R.drawable.ic_settings_system_daydream_black_24dp)
                .setContentTitle(data.get("title"))
                .setContentText(data.get("body"))
                //.setSound(getNotificationSoundUri(context, data.get("sound")))
                .setColor(Color.BLUE)
                .setSound(Uri.parse("android.resource://"
                        + context.getPackageName() + "/" + R.raw.cell1))
                .build();

        //notification.sound = getNotificationSoundUri(context, data.get("sound"));


        notification.sound = Uri.parse("android.resource://"
                + context.getPackageName() + "/" + R.raw.beep);

        NotificationManager manager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        manager.notify(notificationId, notification);*/
    }

    public void  playMusic(String soundFile) {
        final MediaPlayer mediaPlayer = MediaPlayer.create(this, getRawId(soundFile));
        mediaPlayer.start();
    }

    @SuppressLint("NewApi")
    public void createNotificationChannel(@NonNull Context context) {
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            String channelId = context.getString(R.string.default_notification_channel_id);
            String channelName = context.getString(R.string.channel_name);
            NotificationChannel channel = new NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_DEFAULT);

            channel.setSound(getNotificationSoundUri(context, "vibe"), createAudioAttributes());
            channel.enableVibration(true);
            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            notificationManager.createNotificationChannel(channel);
        }
    }


    public Uri getNotificationSoundUri(Context context, String sound) {
        Uri uri = null;

        if (sound == null) {
            uri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        } else if (!(sound.trim().isEmpty())) {
            String soundResourceString = sound;
            try {
                if (soundResourceString.contains(".")) {
                    soundResourceString = soundResourceString.substring(0, soundResourceString.indexOf("."));
                }
                int resourceId = getResourceId(context, RAW, soundResourceString);
                if (resourceId == -1) {
                    //logger.error("MFPPushIntentService:getNotificationSoundUri() - Specified sound file is not found in res/raw");
                }
                uri = Uri.parse("android.resource://com.notification/" + resourceId);
            } catch (Exception e) {
                //logger.error("MFPPushIntentService:getNotificationSoundUri() - Exception while parsing sound file");
            }
        }

        return uri;
    }

    public static int getResourceId(Context context, String resourceCategory, String resourceName) {
        int resourceId = -1;
        try {
            resourceId = context.getResources().getIdentifier(resourceName, RAW, context.getPackageName());
        } catch (Exception e) {
            //logger.error("MFPPushIntentService: getResourceId() - Failed to find resource R." + resourceCategory + "." + resourceName, e);
        }
        return resourceId;
    }

 /*
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

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "CHANNEL_ID")
                .setDefaults(Notification.DEFAULT_ALL)
                .setSmallIcon(R.drawable.ic_settings_system_daydream_black_24dp)
                .setContentTitle("ZAPIER")
                .setContentText("Alert from Zapier")
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setAutoCancel(true);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
        notificationManager.notify(11326, builder.build());

        final MediaPlayer mediaPlayer = MediaPlayer.create(this, getRawId(soundFile));
        mediaPlayer.start();
    }


    @Override
    public void onDeletedMessages() {
        super.onDeletedMessages();
    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }
*/
    public int getRawId(String filename) {
        Uri audioFileUri;
        switch (filename){
            case "beep":
                return R.raw.beep;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.beep);
//                break;
            case "cell":
                return R.raw.cell;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.cell);
//                break;
            case "chime":
                return R.raw.chime;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.chime);
//                break;
            case "digi":
                return R.raw.digi;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.digi);
//                break;
            case "notify":
                return R.raw.notify;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.notify);
//                break;
            case "vibe":
                return R.raw.vibe;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.vibe);
                //break;
            default:
                return R.raw.beep;
//                audioFileUri = Uri.parse("android.resource:///com.notification/" + R.raw.beep);
//                break;
        }
    }
}
