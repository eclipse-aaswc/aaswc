/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASPrinterMetamodelElements, AASRegistryParser } from "./imports.js";


export class AASRegistryPrinterGeneric extends AASPrinterMetamodelElements {
   registryParser: AASRegistryParser;

   constructor() {
      super(document.getElementById("rootElement"));
      /* bind this pointer */
      /* Helper */
      //this.findChildElementUpward = this.findChildElementUpward.bind(this);
      //this.findPropertyElementUpward = this.findPropertyElementUpward.bind(this);
      //this.findElement = this.findElement.bind(this);
      /* variables */
      this.treeRoot = null;
      this.registryParser = new AASRegistryParser(this);

      /*
       * We need to make sure the container for our async submodels is ready
       * even if our aas is not printed already
       */
      //this.aasContainer = this.createBootstrapContainerFluid();

      this.registryParser.run();

      //window.setInterval(this.timedUpdateValues, 2000);

      // load: /api/v1/registry
   }

}

