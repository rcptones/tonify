//
//  NotificationActivity.swift
//  notification
//
//  Created by Ankit Baid on 25/02/20.
//  Copyright © 2020 Facebook. All rights reserved.
//

import Foundation

@objc(NotificationActivity)

class NotificationActivity: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String! {
    return "NotificationActivity"
  }
  
  
  @objc
  func generateToken() -> Void {
    print("#### Token Will be generated here.")
  }
  
}
