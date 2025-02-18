/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASPrinterMetamodelElements, SubmodelParser } from "./imports.js";


export class SubmodelPrinterGeneric extends AASPrinterMetamodelElements {
   expandedView: any;

   constructor(parentElement = null, parentHTMLEle = null, submodelURL = null, 
               expandedView = true) {
     var parentHTMLElement = null;
     if (parentHTMLEle == null)
        parentHTMLElement = document.getElementById("rootElement");
     else
        parentHTMLElement = parentHTMLEle;

      super(parentHTMLElement);

      this.expandedView = expandedView;
      /* variables */
      this.parser = new SubmodelParser(this, parentElement, submodelURL);
      this.parser.run();

      //window.setInterval(this.timedUpdateValues, 2000);
   }

}
