/*
 * Copyright (c) 2021 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ajax, ParserBase, TreeObject, AASWebStorageHandler, metamodelType } from "./imports.js";

export class AASRegistryParser extends ParserBase {
   registryPrinter: any;
   //AjaxHelper: Ajax.AjaxHelper;

   aasStorageHandler: AASWebStorageHandler;

   registryURL: string;

   RegistryRoot: TreeObject;
   treeRoot: TreeObject;

   constructor(registryPrinter) {
      super();
      /* general */
      this.run = this.run.bind(this);
      this.trimSuffixSlash = this.trimSuffixSlash.bind(this);
      /* AAS Registry */
      this.parseRegistryRaw = this.parseRegistryRaw.bind(this);
      this.addURLToList = this.addURLToList.bind(this);

      this.registryPrinter = registryPrinter;
      this.AjaxHelper = new Ajax.AjaxHelper();
      /* Variables */
      this.registryURL = "";

      this.RegistryRoot = this.newTreeObject("AASRegistryRoot", null,
                                        metamodelType.AssetAdministrationShellRegistryRoot);
      this.treeRoot = this.RegistryRoot;

      this.aasStorageHandler = new AASWebStorageHandler();
   }

   run() {
      var regURL = this.getQueryVariable("endpoint");
      if (regURL) {
         regURL = decodeURIComponent(regURL);
         regURL = this.trimSuffixSlash(regURL);
         this.aasStorageHandler.setCurrentAASRegistry(regURL);
      }

      // Set extra base URL
      if (regURL != null) {
         var registryURL = new URL(regURL); /*new URL(this.aasStorageHandler.getCurrentRegistry());*/
         this.setRootURLS(this.RegistryRoot, registryURL, 2);
         this.RegistryRoot.tURL = registryURL.href;/*this.aasStorageHandler.getCurrentRegistry()*/;
      }
      else
         this.RegistryRoot.tURL = "";

      this.getByURL(this.RegistryRoot,
            this.RegistryRoot.tURL,
            this.parseRegistryRaw,
            this.setErrorRegistry);
   }

   addURLToList(URL) {
      this.aasStorageHandler.addAASRegistryURL(URL, true);
   }

   trimSuffixSlash(URL) {
      if (!URL.endsWith("/"))
         return URL;
      return URL.slice(0, - 1);
   }

   /* unbound for compound -> this */
   setErrorRegistry(status) {
      var URL = this.URL;
      var object = this.object;
      var that = this.parentObj;

      if (status.status == 401) {
         var error = that.newTreeObject("AASRegistryError", object,
            metamodelType.Error);
         that.parseString("Could not retrieve the AAS Registry", "Description", 
            error);
         that.parseString(URL, "URL", error);
         that.parseValue(status.status, "ErrorCode", error);
         that.registryPrinter.printError(error, "");
         return;
      }

      if (this.retry < 2) {
         this.retry++;
         this.parentObj.AjaxHelper.getJSON(this.URL,
                                        this.onSuccess,
                                        this.onError,
                                        this);
         return;
      }

      var error = that.newTreeObject("RegistryError", object,
         metamodelType.Error);
      that.parseString("Could not retrieve the AAS Registry", "Description", error);
      that.parseString(URL, "URL", error);
      if (status.status != 0)
         that.parseValue(status.status, "ErrorCode", error);
      that.registryPrinter.printError(error, "");
   }

   parseRegistryRaw(JSON: any) {
      var RegistryJSON = JSON;
      if (JSON.hasOwnProperty("result"))
         RegistryJSON = RegistryJSON.result;
      var registry = this.parseAASRegistryV3(RegistryJSON, this.RegistryRoot);
      
      this.aasStorageHandler.writeAASRegistryMap();

      console.log(registry);

      this.registryPrinter.printAASRegistryV3(this.registryPrinter.rootElement,
         registry);
   }
}
