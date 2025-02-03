/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ajax, ParserBase, TreeObject, AASWebStorageHandler, types,
   registryV3,
   apiV3,
   metamodelV3} from "./imports.js";

export class AASRegistryParser extends ParserBase {
   aasStorageHandler: AASWebStorageHandler;

   registryURL: string;

   RegistryRoot: TreeObject;
   treeRoot: TreeObject;

   registryEnv: registryV3.RegistryEnvironment =
      new registryV3.RegistryEnvironment();

   constructor(printer: any) {
      super();
      /* general */
      this.run = this.run.bind(this);
      /* AAS Registry */
      this.triggerParse = this.triggerParse.bind(this);
      this.addURLToList = this.addURLToList.bind(this);

      this.printer = printer;
      /* Variables */
      this.registryURL = "";

      this.registryEnv = new registryV3.RegistryEnvironment();
      this.treeRoot = this.RegistryRoot;

      this.aasStorageHandler = new AASWebStorageHandler();
   }

   run() {
      var regURL = this.getQueryVariable("endpoint");
      if (regURL) {
         regURL = decodeURIComponent(regURL);
         regURL = apiV3.Helper.trimSuffixSlash(regURL);
         this.aasStorageHandler.setCurrentAASRegistry(regURL);

         var regURL = apiV3.Helper.getBaseRegURL(regURL,
            types.metamodelType.AssetAdministrationShellRegistry);

         var apicl = new apiV3.APIClient();
         apicl.GetAllAssetAdministrationShellDescriptors(regURL,
         this.triggerParse, this.setError);
      }
      else
         this.RegistryRoot.setPath("");
   }

   addURLToList(URL) {
      this.aasStorageHandler.addAASRegistryURL(URL, true);
   }

   setError(errObj: any) {
      console.log(errObj);
   }

   triggerParse(JSON: string) {
      console.log(JSON);
      this.parseAASRegistryV3(JSON["result"], this.registryEnv);
      this.printer.printRegistryEnvironmentV3Typed(this.printer.rootElement,
         this.registryEnv, this.treeRoot);
   }
}
