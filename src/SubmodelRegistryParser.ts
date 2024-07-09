/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ajax, ParserBase, TreeObject, AASWebStorageHandler, metamodelType } from "./imports.js";

export class SubmodelRegistryParser extends ParserBase {
   smRegistryPrinter: any;
   //AjaxHelper: Ajax.AjaxHelper;

   aasStorageHandler: AASWebStorageHandler;

   smRegistryURL: string;

   smRegistryRoot: TreeObject;
   treeRoot: TreeObject;

   constructor(smRegistryPrinter) {
      super();
      /* general */
      this.run = this.run.bind(this);
      this.trimSuffixSlash = this.trimSuffixSlash.bind(this);
      /* Submodel Registry */
      this.parseRegistryRaw = this.parseRegistryRaw.bind(this);
      this.addURLToList = this.addURLToList.bind(this);

      this.smRegistryPrinter = smRegistryPrinter;
      this.AjaxHelper = new Ajax.AjaxHelper();
      /* Variables */
      this.smRegistryURL = "";

      this.smRegistryRoot = this.newTreeObject("SubmodelRegistryRoot", null,
                                        metamodelType.SubmodelRegistryRoot);
      this.treeRoot = this.smRegistryRoot;

      this.aasStorageHandler = new AASWebStorageHandler();
   }

   run() {
      var regURL = this.getQueryVariable("endpoint");
      if (regURL) {
         regURL = decodeURIComponent(regURL);
         regURL = this.trimSuffixSlash(regURL);
         this.aasStorageHandler.setCurrentSubmodelRegistry(regURL);
      }

      // Set extra base URL
      if (regURL != null) {
         var registryURL = new URL(regURL); /*new URL(this.aasStorageHandler.getCurrentRegistry());*/
         this.setRootURLS(this.smRegistryRoot, registryURL, 2);
         this.smRegistryRoot.tURL = registryURL.href;/*this.aasStorageHandler.getCurrentRegistry()*/;
      }
      else
         this.smRegistryRoot.tURL = "";

      this.getByURL(this.smRegistryRoot,
            this.smRegistryRoot.tURL,
            this.parseRegistryRaw,
            this.setErrorRegistry);
   }

   addURLToList(URL) {
      this.aasStorageHandler.addSubmodelRegistryURL(URL, true);
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
         var error = that.newTreeObject("SubmodelRegistryError", object,
            metamodelType.Error);
         that.parseString("Could not retrieve the Submodel Registry", "Description", 
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

      var error = that.newTreeObject("SubmodelRegistryError", object,
         metamodelType.Error);
      that.parseString("Could not retrieve the Submodel Registry", "Description", error);
      that.parseString(URL, "URL", error);
      if (status.status != 0)
         that.parseValue(status.status, "ErrorCode", error);
      that.registryPrinter.printError(error, "");
   }

   parseRegistryRaw(JSON: any) {
      var RegistryJSON = JSON;
      if (JSON.hasOwnProperty("result"))
         RegistryJSON = RegistryJSON.result;
      var registry = this.parseSubmodelRegistryV3(RegistryJSON, this.smRegistryRoot);

      this.aasStorageHandler.writeSubmodelRegistryMap();

      console.log(registry);

      this.smRegistryPrinter.printSubmodelRegistryV3(this.smRegistryPrinter.rootElement,
         registry);
   }
}
