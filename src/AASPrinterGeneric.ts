/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */
import { AASParser, AASPrinterMetamodelElements } from "./imports.js"


export class AASPrinterGeneric extends AASPrinterMetamodelElements {
   constructor() {
      super(document.getElementById("rootElement"));
      /* variables */
      this.parser = new AASParser(this);
      /*
       * We need to make sure the container for our async submodels is ready
       * even if our aas is not printed already
       */
      this.parser.run();

      //window.setInterval(this.timedUpdateValues, 2000);

   }

}

