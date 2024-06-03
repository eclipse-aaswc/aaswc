/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */
import { AASParser, AASPrinterMetamodelElements } from "./imports.js"


export class AASPrinterGeneric extends AASPrinterMetamodelElements {
//   parser: AASParser;
   constructor() {
      super(document.getElementById("rootElement"));
      /* bind this pointer */
      /* Helper */
      //this.findChildElementUpward = this.findChildElementUpward.bind(this);
      //this.findPropertyElementUpward = this.findPropertyElementUpward.bind(this);
      //this.findElement = this.findElement.bind(this);
      /* variables */
      this.treeRoot = null;
      this.parser = new AASParser(this);

      /*
       * We need to make sure the container for our async submodels is ready
       * even if our aas is not printed already
       */
      //this.aasContainer = this.createBootstrapContainerFluid();

      this.parser.run();

      //window.setInterval(this.timedUpdateValues, 2000);
      
      // load: /api/v1/registry
   }

}

