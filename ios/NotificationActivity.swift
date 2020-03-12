//
//  NotificationActivity.swift
//  notification
//
//  Created by Ankit Baid on 25/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Firebase
import AVFoundation

@objc(NotificationActivity)
class NotificationActivity: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String! {
    return "NotificationActivity"
    
  }
  
//  @objc
//  func generateToken(_ resolve: @escaping RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) -> Void {
//    InstanceID.instanceID().instanceID { (result, error) in
//      if let error = error {
//        print("### Error fetching remote instance ID: \(error)")
//
//      } else if let result = result {
//        print("### Remote instance ID token: \(result.token)")
//        resolve(result.token)
//        //        self.instanceIDTokenMessage.text  = "Remote InstanceID token: \(result.token)"
//      }
//    }
//    print("#### Token Will be generated here.")
//  }
  
  @objc
  func generateToken(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
  
    InstanceID.instanceID().instanceID { (result, error) in
      if let error = error {
        print("Some error \(error)")
      } else if let result = result {
        print("### Remote instance ID token: \(result.token)")
        resolve(result.token);
      }
    }
  }

  @objc
  func playSound(_ fileName: String) -> Void {

    let soundFile = NSURL(fileURLWithPath: Bundle.main.path(forResource: fileName, ofType: "mp3")!)
    var audioPlayer = AVAudioPlayer()
    
    do{
      audioPlayer = try AVAudioPlayer(contentsOf: soundFile as URL)
    } catch let error {
      print("\(error)")
    }
    audioPlayer.prepareToPlay()

    audioPlayer.play() 
  }
  
}
