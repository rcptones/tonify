//
//  NotificationActivity.swift
//  notification
//
//  Created by Ankit Baid on 25/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation
import Firebase

@objc(NotificationActivity)

class NotificationActivity: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String! {
    return "NotificationActivity"
    
  }
  
  @objc
  func generateToken() -> Void {
    InstanceID.instanceID().instanceID { (result, error) in
      if let error = error {
        print("### Error fetching remote instance ID: \(error)")
      } else if let result = result {
        print("### Remote instance ID token: \(result.token)")
        //        self.instanceIDTokenMessage.text  = "Remote InstanceID token: \(result.token)"
      }
    }
    print("#### Token Will be generated here.")
  }
  
}
