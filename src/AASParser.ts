/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASWebStorageHandler, ParserBase, TreeObject, types, metamodelV3, apiV3, Ajax } from "./imports.js"

export class AASParser extends ParserBase {

   aasURL: string;
   submodelsURL: string;

   treeRoot: TreeObject;
   env: metamodelV3.Environment;

   constructor(printer: any) {

      super();
      /* general */
      this.run = this.run.bind(this);
      /* AAS */
      this.triggerParse = this.triggerParse.bind(this);

      this.printer = printer;
      /* Variables */
      this.aasURL = "";
      this.submodelsURL  = "";

      this.treeRoot = new TreeObject("Environment", null,
         types.metamodelType.Environment);

      this.env = new metamodelV3.Environment();

      this.treeRoot.setMetamodelObject(this.env);
   }

   run() {
      var aasStorageHandler = new AASWebStorageHandler();

      var shellURL = this.getQueryVariable("endpoint");
      if (shellURL) {
         shellURL = decodeURIComponent(shellURL);
         shellURL = apiV3.Helper.trimSuffixSlash(shellURL);

         var envURL = apiV3.Helper.getBaseEnvironmentURL(shellURL,
            types.metamodelType.AssetAdministrationShell);
         var idp = apiV3.Helper.getIdByURL(shellURL, envURL);

         var apicl = new apiV3.APIClient();
         apicl.GetAssetAdministrationShellById(envURL, idp.getFirst(),
            this.triggerParse, this.setError);

         this.treeRoot.setPath(envURL, true);

         aasStorageHandler.setCurrentAAS(shellURL);
      }

      // Set extra base URL
      var aasURL = new URL(aasStorageHandler.getCurrentAAS());
   }

   setError(errObj: any) {
      console.log(errObj);
   }

   triggerParse(JSON: string) {
      console.log(JSON);
      this.parseAssetAdministrationShellV3(JSON, this.env);
      this.printer.printEnvironmentV3Typed(this.printer.rootElement, this.env,
         this.treeRoot);
   }
}
