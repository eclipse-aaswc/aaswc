/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

export class AASWebStorageHandler {
   aasStorageSet: string;
   submodelStorageSet: string;
   aasRegistryStorageSet: string;
   submodelRegistryStorageSet: string;
   currentAAS: string;
   currentSubmodel: string;
   currentAASRegistry: string;
   currentSubmodelRegistry: string;

   aasMap: any;
   submodelMap: any;
   aasRegistryMap: any;
   submodelRegistryMap: any;

   constructor() {
      this.setCurrentAAS = this.setCurrentAAS.bind(this);
      this.setCurrentSubmodel = this.setCurrentSubmodel.bind(this);
      this.setCurrentAASRegistry = this.setCurrentAASRegistry.bind(this);
      this.setCurrentSubmodelRegistry =
         this.setCurrentSubmodelRegistry.bind(this);
      this.getCurrentAAS = this.getCurrentAAS.bind(this);
      this.getCurrentSubmodel = this.getCurrentSubmodel.bind(this);
      this.getCurrentAASRegistry = this.getCurrentAASRegistry.bind(this);
      this.getCurrentSubmodelRegistry = this.getCurrentSubmodelRegistry.bind(this);
      this.addAASURL = this.addAASURL.bind(this);
      this.addSubmodelURL = this.addSubmodelURL.bind(this);
      this.addAASRegistryURL = this.addAASRegistryURL.bind(this);
      this.addSubmodelRegistryURL = this.addSubmodelRegistryURL.bind(this);
      this.addURLToMap = this.addURLToMap.bind(this);
      this.removeAASURL = this.removeAASURL.bind(this);
      this.removeSubmodelURL = this.removeSubmodelURL.bind(this);
      this.removeAASRegistryURL = this.removeAASRegistryURL.bind(this);
      this.removeSubmodelRegistryURL = this.removeSubmodelRegistryURL.bind(this);
      this.removeURLFromMap = this.removeURLFromMap.bind(this);
      this.removeAASHost = this.removeAASHost.bind(this);
      this.removeSubmodelHost = this.removeSubmodelHost.bind(this);
      this.removeAASRegistryHost = this.removeAASRegistryHost.bind(this);
      this.removeSubmodelRegistryHost =
         this.removeSubmodelRegistryHost.bind(this);
      this.removeHostFromMap = this.removeHostFromMap.bind(this);
      this.AASHostExists = this.AASHostExists.bind(this);
      this.SubmodelHostExists = this.SubmodelHostExists.bind(this);
      this.aasRegistryHostExists = this.aasRegistryHostExists.bind(this);
      this.submodelRegistryHostExists =
         this.submodelRegistryHostExists.bind(this);
      this.hostExists = this.hostExists.bind(this);
      this.getAASMap = this.getAASMap.bind(this);
      this.getSubmodelMap = this.getSubmodelMap.bind(this);
      this.getAASRegistryMap = this.getAASRegistryMap.bind(this);
      this.getSubmodelRegistryMap = this.getSubmodelRegistryMap.bind(this);
      this.readMapFromStorage = this.readMapFromStorage.bind(this);
      this.writeAASMap = this.writeAASMap.bind(this);
      this.writeSubmodelMap = this.writeSubmodelMap.bind(this);
      this.writeAASRegistryMap = this.writeAASRegistryMap.bind(this);
      this.writeSubmodelRegistryMap = this.writeSubmodelRegistryMap.bind(this);
      this.writeMap = this.writeMap.bind(this);

      this.aasStorageSet = "aasMap";
      this.submodelStorageSet = "submodelMap";
      this.aasRegistryStorageSet = "aasRegistryMap";
      this.submodelRegistryStorageSet = "submodelRegistryMap";
      this.currentAAS = "currentAAS";
      this.currentSubmodel = "currentSubmodel";
      this.currentAASRegistry = "currentAASRegistry";
      this.currentSubmodelRegistry = "currentSubmodelRegistry";

      this.aasMap = null;
      this.submodelMap = null;
      this.aasRegistryMap = null;
      this.submodelRegistryMap = null;
      
      this.getAASMap();
      this.getSubmodelMap();
      this.getAASRegistryMap();
      this.getSubmodelRegistryMap();
   }

   setCurrentAAS(aasURL) {
      window.localStorage.setItem(this.currentAAS, aasURL);
      this.addAASURL(aasURL);
   }

   setCurrentSubmodel(smURL) {
      window.localStorage.setItem(this.currentSubmodel, smURL);
      this.addSubmodelURL(smURL);
   }

   setCurrentAASRegistry(registryURL) {
      window.localStorage.setItem(this.currentAASRegistry, registryURL);
      this.addAASRegistryURL(registryURL);
   }

   setCurrentSubmodelRegistry(registryURL) {
      window.localStorage.setItem(this.currentSubmodelRegistry, registryURL);
      this.addSubmodelRegistryURL(registryURL);
   }

   getCurrentAAS() {
      var storageData = window.localStorage.getItem(this.currentAAS);
      if (storageData)
         return storageData;
      return null;
   }

   getCurrentSubmodel() {
      var storageData = window.localStorage.getItem(this.currentSubmodel);
      if (storageData)
         return storageData;
      return null;
   }

   getCurrentAASRegistry() {
      var storageData = window.localStorage.getItem(this.currentAASRegistry);
      if (storageData)
         return storageData;
      return null;
   }

   getCurrentSubmodelRegistry() {
      var storageData = window.localStorage.getItem(this.currentSubmodelRegistry);
      if (storageData)
         return storageData;
      return null;
   }

   addAASURL(aasURL, skipCommit = false) {
      var ret = this.addURLToMap(aasURL, this.aasMap);
      if (ret)
         this.aasMap = ret;
      if (!skipCommit)
         this.writeAASMap();
      if (ret)
         return true;
      return false;
   }

   addSubmodelURL(smURL, skipCommit = false) {
      var ret = this.addURLToMap(smURL, this.submodelMap);
      if (ret)
         this.submodelMap = ret;
      if (!skipCommit)
         this.writeSubmodelMap();
      if (ret)
         return true;
      return false;
   }

   addAASRegistryURL(aasRegistryURL, skipCommit = false) {
      var ret = this.addURLToMap(aasRegistryURL, this.aasRegistryMap);
      if (ret)
         this.aasRegistryMap = ret;
      if (!skipCommit)
         this.writeAASRegistryMap();
      if (ret)
         return true;
      return false;
   }

   addSubmodelRegistryURL(smRegistryURL, skipCommit = false) {
      var ret = this.addURLToMap(smRegistryURL, this.submodelRegistryMap);
      if (ret)
         this.submodelRegistryMap = ret;
      if (!skipCommit)
         this.writeSubmodelRegistryMap();
      if (ret)
         return true;
      return false;
   }

   addURLToMap(URL_, map) {
      var url = new URL(URL_);
      var hostMap = null;
      if (this.hostExists(url.origin, map)) {
         hostMap = map.get(url.origin);
      }
      else {
         hostMap = new Map();
         map.set(url.origin, hostMap);
         var sortArr: Array<any> = Array.from(map);
         sortArr.sort();
         map = new Map(sortArr);
      }

      if (hostMap.has(url.pathname))
         return null;

      hostMap.set(url.pathname, url.href);
      var sortArr: Array<any> = Array.from(hostMap);
      sortArr.sort();
      hostMap = new Map(sortArr);

      map.set(url.origin, hostMap);
      return map;
   }

   removeAASURL(aasURL, skipCommit = false) {
      var ret = this.removeURLFromMap(aasURL, this.aasMap);
      if (ret)
         this.aasMap = ret;
      if (!skipCommit)
         this.writeAASMap();
      if (ret)
         return true;
      return false;
   }

   removeSubmodelURL(smURL, skipCommit = false) {
      var ret = this.removeURLFromMap(smURL, this.submodelMap);
      if (ret)
         this.submodelMap = ret;
      if (!skipCommit)
         this.writeSubmodelMap();
      if (ret)
         return true;
      return false;
   }

   removeAASRegistryURL(aasRegistryURL, skipCommit = false) {
      var ret = this.removeURLFromMap(aasRegistryURL, this.aasRegistryMap);
      if (ret)
         this.aasRegistryMap = ret;
      if (!skipCommit)
         this.writeAASRegistryMap();
      if (ret)
         return true;
      return false;
   }

   removeSubmodelRegistryURL(smRegistryURL, skipCommit = false) {
      var ret = this.removeURLFromMap(smRegistryURL, this.submodelRegistryMap);
      if (ret)
         this.submodelRegistryMap = ret;
      if (!skipCommit)
         this.writeSubmodelRegistryMap();
      if (ret)
         return true;
      return false;
   }

   removeURLFromMap(URL_, map) {
      var url = new URL(URL_);
      var hostMap = null;
      if (!this.hostExists(url.origin, map))
         return null;
      hostMap = map.get(url.origin);
      if (!hostMap.has(url.pathname))
         return null;
      hostMap.delete(url.pathname, url.href);
      if (hostMap.size == 0)
        map.delete(url.origin);
      return map;
   }

   removeAASHost(hostURL, skipCommit = false) {
      var ret = this.removeHostFromMap(hostURL, this.aasMap);
      if (ret)
         this.aasMap = ret;
      if (!skipCommit)
         this.writeAASMap();
      if (ret)
         return true;
      return false;
   }

   removeSubmodelHost(hostURL, skipCommit = false) {
      var ret = this.removeHostFromMap(hostURL, this.submodelMap);
      if (ret)
         this.submodelMap = ret;
      if (!skipCommit)
         this.writeSubmodelMap();
      if (ret)
         return true;
      return false;
   }

   removeAASRegistryHost(aasRegistryURL, skipCommit = false) {
      var ret = this.removeHostFromMap(aasRegistryURL, this.aasRegistryMap);
      if (ret)
         this.aasRegistryMap = ret;
      if (!skipCommit)
         this.writeAASRegistryMap();
      if (ret)
         return true;
      return false;
   }

   removeSubmodelRegistryHost(submodelRegistryURL, skipCommit = false) {
      var ret = this.removeHostFromMap(submodelRegistryURL,
         this.submodelRegistryMap);
      if (ret)
         this.submodelRegistryMap = ret;
      if (!skipCommit)
         this.writeSubmodelRegistryMap();
      if (ret)
         return true;
      return false;
   }

   removeHostFromMap(URL_, map) {
      var url = new URL(URL_);
      if (!this.hostExists(url.origin, map))
         return null;
      map.delete(url.origin);
      return map;
   }

   AASHostExists(hostURL, map = null) {
      return this.hostExists(hostURL, this.aasMap);
   }

   SubmodelHostExists(hostURL, map = null) {
      return this.hostExists(hostURL, this.submodelMap);
   }

   aasRegistryHostExists(hostURL, map = null) {
      return this.hostExists(hostURL, this.aasRegistryMap);
   }

   submodelRegistryHostExists(hostURL, map = null) {
      return this.hostExists(hostURL, this.submodelRegistryMap);
   }

   hostExists(hostURL, map) {
      var url = new URL(hostURL);
      if (map.has(url.origin))
         return true;
      return false;
   }

   getAASMap() {
      if (this.aasMap)
         return this.aasMap;
      this.aasMap = this.readMapFromStorage(this.aasStorageSet);
      return this.aasMap;
   }

   getSubmodelMap() {
      if (this.submodelMap)
         return this.submodelMap;
      this.submodelMap = this.readMapFromStorage(this.submodelStorageSet);
      return this.submodelMap;
   }

   getAASRegistryMap() {
      if (this.aasRegistryMap)
         return this.aasRegistryMap;
      this.aasRegistryMap = 
         this.readMapFromStorage(this.aasRegistryStorageSet);
      return this.aasRegistryMap;
   }

   getSubmodelRegistryMap() {
      if (this.submodelRegistryMap)
         return this.submodelRegistryMap;
      this.submodelRegistryMap = 
         this.readMapFromStorage(this.submodelRegistryStorageSet);
      return this.submodelRegistryMap;
   }

   readMapFromStorage(storageIndicator) {
      var storageData = window.localStorage.getItem(storageIndicator);
      if (storageData) {
         try {
            var map = new Map(Object.entries(JSON.parse(storageData)));
            for (var [key, value] of map)
               map.set(key, new Map(Object.entries(value)));
            return map;
         }
         catch(e) {
            return new Map();
         }
      }
      return new Map();
   }

   writeAASMap() {
      this.writeMap(this.aasMap, this.aasStorageSet);
   }

   writeSubmodelMap() {
      this.writeMap(this.submodelMap, this.submodelStorageSet);
   }

   writeAASRegistryMap() {
      this.writeMap(this.aasRegistryMap, this.aasRegistryStorageSet);
   }

   writeSubmodelRegistryMap() {
      this.writeMap(this.submodelRegistryMap, this.submodelRegistryStorageSet);
   }

   writeMap(map, storageIndicator) {
      var map: any = new Map(map);
      for (var [key, value] of map)
         map.set(key, Object.fromEntries(value));
      window.localStorage.setItem(storageIndicator,
         JSON.stringify(Object.fromEntries(map)));
   }
}
