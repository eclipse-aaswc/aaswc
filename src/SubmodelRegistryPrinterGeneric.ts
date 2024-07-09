/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASPrinterMetamodelElements, SubmodelRegistryParser } from "./imports.js";


export class SubmodelRegistryPrinterGeneric extends AASPrinterMetamodelElements {
   smRegistryParser: SubmodelRegistryParser;

   constructor() {
      super(document.getElementById("rootElement"));

      /* variables */
      this.treeRoot = null;
      this.smRegistryParser = new SubmodelRegistryParser(this);

      /*
       * We need to make sure the container for our async submodels is ready
       * even if our aas is not printed already
       */
      //this.aasContainer = this.createBootstrapContainerFluid();

      this.smRegistryParser.run();

      //window.setInterval(this.timedUpdateValues, 2000);
      
      // load: /api/v1/registry
   }

}

