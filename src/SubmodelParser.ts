/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ajax, AASWebStorageHandler, ParserBase, TreeObject, types, metamodelV3, apiV3 } from "./imports.js";

class ErrorObject {
   component: string;
   errorString: string;
   URL: string;

}

export class SubmodelParser extends ParserBase {
   submodelURLStr: string;
   submodelURL: URL;
   env: metamodelV3.Environment;
   parent: TreeObject;

   newEnv: boolean;

   constructor(printer: any, parentElement: TreeObject = null,
         env: metamodelV3.Environment = null, URL: string = null) {
      super();
      /* general */
      this.run = this.run.bind(this);
      /* Submodel */
      this.triggerParse = this.triggerParse.bind(this);

      this.printer = printer;
      /* Variables */
      this.submodelURLStr = URL;

      if (env == null) {
         this.env = new metamodelV3.Environment();
         this.parent = new TreeObject("Environment", null,
            types.metamodelType.Environment);
         this.newEnv = true;
      }
      else {
         this.env = env;
         this.parent = parentElement;
         this.newEnv = false;
      }
   }

   run() {
      var aasStorageHandler = new AASWebStorageHandler();
      if (this.submodelURLStr == null) {
         this.submodelURLStr = this.getQueryVariable("endpoint");
         if (this.submodelURLStr) {
            this.submodelURLStr = decodeURIComponent(this.submodelURLStr);
            this.submodelURLStr = apiV3.Helper.trimSuffixSlash(this.submodelURLStr);
            if (this.newEnv) {
               var envURL = apiV3.Helper.getBaseEnvironmentURL(
                  this.submodelURLStr,
                  types.metamodelType.Submodel);
            this.parent.setPath(envURL, true);
            }

            var idp = apiV3.Helper.getIdByURL(this.submodelURLStr, envURL);

            var apicl = new apiV3.APIClient();
            apicl.GetSubmodelById(envURL, idp.getFirst(),
               this.triggerParse, this.setError);

            aasStorageHandler.setCurrentSubmodel(this.submodelURLStr);
         }
      }

      // Set extra base URL
      this.submodelURL = new URL(this.submodelURLStr);
   }

   setError(errObj: any) {
      console.log(errObj);
   }

   triggerParse(JSON: string) {
      console.log(JSON);
      this.parseSubmodelV3(JSON, this.env);
      this.printer.printEnvironmentV3Typed(this.printer.rootElement, this.env,
         this.parent);
   }
}
