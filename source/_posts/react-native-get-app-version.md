---
title: React Native 获取App版本号
date: 2019-10-30 11:57:23
tags: [转载,React Native]
---
> 在使用React Native开发过程中，或多或少需要涉及到与原生交互，例如获取App版本号，这里以Android为例。


#### 我们首先需要在Android/app/src/main/java/com文件夹下或者你自己的包名下新建一个reactnative文件夹，并在该文件夹下创建RNBridgeManager.java文件和RNReactPackage.java文件，文件名字可以自定义，也可以起别的文件名，建议见名知意，具体代码如下：

##### RNBridgeManager.java 中的代码
```java
package com.reactnative;//注意包名

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class RNBridgeManager extends ReactContextBaseJavaModule {

    public RNBridgeManager(ReactApplicationContext reactContext) {

        super(reactContext);

    }

    //重写getName方法声明Module类名称,在RN调用时用到
    @Override
    public String getName() {
        return "BridgeManager";
    }

    //声明的方法，外界调用
    @ReactMethod
    public void getAppVersion(Callback successCallback) {
        try {
            PackageInfo info = getPackageInfo();
            if (info != null) {
                successCallback.invoke(info.versionName);
            } else {
                successCallback.invoke("");
            }
        } catch (IllegalViewOperationException e) {

        }
    }

    //获取 APP 信息
    private PackageInfo getPackageInfo() {
        PackageManager manager = getReactApplicationContext().getPackageManager();
        PackageInfo info = null;
        try {
            info = manager.getPackageInfo(getReactApplicationContext().getPackageName(), 0);
            return info;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

            return info;
        }
    }
}

```
##### RNReactPackage.java 中的代码
```java
package com.reactnative;//注意包名

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class RNReactPackage implements ReactPackage {


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

    //添加一个安卓原生的activity模块
        modules.add(new RNBridgeManager(reactContext));

        return modules;
    }

}
```
#### 然后在MainApplication.java中添加刚注册过的包名

```java
@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
		  ……
          new RNReactPackage()
      );
    }

```
#### 最后，在RN中调用
```js
import React, { Component } from 'react';
import { NativeModules } from 'react-native';

export default class Me extends Component {
    constructor(props) {
        super(props);

        this.state = {
            version: '',
        }
        this.getVerSion();
    }

	// 获取版本号
	getVerSion(){
         NativeModules.BridgeManager.getAppVersion((event) =>{
            this.setState({
                version:event
            })
         });
     }
	
```
### 参考来源：[https://juejin.im/post/5bff973ef265da616f6faf0c](https://juejin.im/post/5bff973ef265da616f6faf0c)