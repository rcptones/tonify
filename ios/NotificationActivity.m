//
//  NotificationActivity.m
//  notification
//
//  Created by Ankit Baid on 25/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NotificationActivity, NSObject)

//RCT_EXTERN_METHOD(generateToken)
//RCT_EXTERN_METHOD(generateToken: (RCTPromiseResolveBlock)resolve (RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(generateToken: (RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(playSound: (NSString *)fileName)

@end
