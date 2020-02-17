package com.notification;

import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

public class NotificationActivity extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    NotificationActivity(ReactApplicationContext context){
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void generateToken(Callback success) {
        Log.d("### MyTag", " generateToken called");
        FirebaseInstanceId.getInstance().getInstanceId()
                .addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                    @Override
                    public void onComplete(@NonNull Task<InstanceIdResult> task) {
                        if(task.isSuccessful()){
                            String token = task.getResult().getToken();
                            Log.d("### MyTag", "new Token \n\n " + token);
                            System.out.println("token" + token);
                            success.invoke(token);
                        }
                    }
                });
    }

    @NonNull
    @Override
    public String getName() {
        return "NotificationActivity";
    }
}
