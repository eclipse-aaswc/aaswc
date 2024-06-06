/*
 * Copyright (c) 2021 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASColors, AASWebStorageHandler, PrinterHtmlElements } from "./imports.js";

import * as bootstrap from "./libraries/bootstrap/5.3.3/js/bootstrap.bundle.js";


enum listTypes {
   AAS = "AAS",
   Submodel = "Submodel",
   AASRegistry = "AASRegistry",
   SubmodelRegistry= "SubmodelRegistry",
}

enum dataTypes {
   AASURL = "AASURL",
   SubmodelURL = "SubmodelURL",
   AASRegistryURL = "AASRegistryURL",
   SubmodelRegistryURL = "SubmodelRegistryURL",
   AASHostURL = "AASHostURL",
   SubmodelHostURL = "SubmodelHostURL",
   AASRegistryHostURL = "AASRegistryHostURL",
   SubmodelRegistryHostURL = "SubmodelRegistryHostURL",
}

class ListBodys {
   aasListBody: HTMLElement;
   submodelListBody: HTMLElement;
   aasRegistryListBody: HTMLElement;
   submodelRegistryListBody: HTMLElement;
}

export class AASListPrinter extends PrinterHtmlElements {
   storageHandler: AASWebStorageHandler;
   
   htmlParent: HTMLElement;
   toggleElement: HTMLElement;
   baseContainer: HTMLElement;
   modalBody: HTMLElement;

   listBodys: ListBodys;

   colors: AASColors;

   constructor(toggleElement, htmlParent) {
      super(null);
      this.run = this.run.bind(this);
      this.show = this.show.bind(this);
      this.cleanModal = this.cleanModal.bind(this);
      this.printBaseElements = this.printBaseElements.bind(this);
      this.printHeader = this.printHeader.bind(this);
      this.printBody = this.printBody.bind(this);
      this.printDialogs = this.printDialogs.bind(this);
      this.printListBodys = this.printListBodys.bind(this);
      this.getHostEntriesByType = this.getHostEntriesByType.bind(this);
      this.printHostEntries = this.printHostEntries.bind(this);
      this.printURLEntry = this.printURLEntry.bind(this);
      this.removeAASEntry = this.removeAASEntry.bind(this);
      this.removeSubmodelEntry = this.removeSubmodelEntry.bind(this);
      this.removeAASRegistryEntry = this.removeAASRegistryEntry.bind(this);
      this.removeSubmodelRegistryEntry = this.removeSubmodelRegistryEntry.bind(this);
      this.removeEntry = this.removeEntry.bind(this);

      this.htmlParent = htmlParent;
      this.toggleElement = toggleElement;
      this.baseContainer = null;
      this.modalBody = null;
      this.listBodys = new ListBodys();

      this.storageHandler = new AASWebStorageHandler();

      this.colors = new AASColors();

   }

   run() {
      this.cleanModal(this.htmlParent);
      this.baseContainer = this.printBaseElements(this.htmlParent);
      this.printHeader(this.baseContainer);
      this.modalBody = this.printBody(this.baseContainer);
      this.printDialogs(this.modalBody);
      this.listBodys = this.printListBodys(this.modalBody, this.listBodys);

      var aasEntries = this.getHostEntriesByType(listTypes.AAS);
      this.printHostEntries(this.listBodys.aasListBody, aasEntries,
         listTypes.AAS);
      var smEntries = this.getHostEntriesByType(listTypes.Submodel);
      this.printHostEntries(this.listBodys.submodelListBody, smEntries,
         listTypes.Submodel);
      var aasRegistryEntries =
         this.getHostEntriesByType(listTypes.AASRegistry);
      this.printHostEntries(this.listBodys.aasRegistryListBody,
         aasRegistryEntries, listTypes.AASRegistry);
      var submodelRegistryEntries =
         this.getHostEntriesByType(listTypes.SubmodelRegistry);
      this.printHostEntries(this.listBodys.submodelRegistryListBody,
         submodelRegistryEntries, listTypes.SubmodelRegistry);

      var modal = new window.bootstrap.Modal(this.toggleElement);
      modal.show();

      //this.show(modal);
   }

   show(element: any) {
      element.show();
   }

   cleanModal(modalElement) {
      if (!this.isNull(modalElement))
         modalElement.replaceChildren();
   }

   printBaseElements(parentElement) {
      var divDialog = document.createElement("div");
      divDialog.classList.add('modal-dialog');
      divDialog.classList.add('modal-xl');
      divDialog.id = "aasModalDialog";

      var divContent = document.createElement("div");
      divContent.classList.add('modal-content');
      divContent.id = "aasModalContent";

      divDialog.appendChild(divContent);
      parentElement.appendChild(divDialog);
      
      return divContent;
   }

   printHeader(parentElement) {
      var divHeader = document.createElement("div");
      divHeader.classList.add('modal-header');
      divHeader.classList.add('d-flex');
      divHeader.classList.add('justify-content-between');

      divHeader.id = "aasModalHeader";

      var h = document.createElement("h3");
      h.classList.add('modal-title');
      h.id = "aasModalHeaderTitle";
      var text = document.createTextNode("Asset Administration Shell List");
      h.appendChild(text);

      var img = this.createImage(
         "local_icons/Breeze/actions/22/window-close.svg", "X", 22, 22);

      var a = this.createHTMLLink("#", img, "");
      a.classList.add("close");
      a.setAttribute("data-bs-dismiss", "modal"); 

      divHeader.appendChild(h);
      divHeader.appendChild(a);
      parentElement.appendChild(divHeader);
   }

   printBody(parentElement) {
      var divBody = document.createElement("div");
      divBody.classList.add('modal-body');
      divBody.id = "aasModalBody";

      parentElement.appendChild(divBody);
      return divBody;
   }

   printDialogs(parentElement) {
      var aasRegistryDialogCtn =this.printNode(parentElement, null, "",
         "New AAS Registry", "bg-white", false, "text-black", 3).container;
      var submodelRegistryDialogCtn =this.printNode(parentElement, null, "",
         "New Submodel Registry", "bg-white", false, "text-black", 3).container;
      var aasDialogCtn = this.printNode(parentElement, null, "",
         "New AAS", "bg-white", false, "text-black", 3).container;
      var submodelDialogCtn = this.printNode(parentElement, null, "",
         "New Submodel", "bg-white", false, "text-black", 3).container;

      aasRegistryDialogCtn.appendChild(document.createTextNode("Placeholder"));
      submodelRegistryDialogCtn.appendChild(document.createTextNode("Placeholder"));
      aasDialogCtn.appendChild(document.createTextNode("Placeholder"));
      submodelDialogCtn.appendChild(document.createTextNode("Placeholder"));

   }

   printListBodys(parentElement, listBodys) {
      listBodys.aasRegistryListBody = this.printNode(parentElement, null, "",
         "AAS Registry List", "bg-white", false, "text-black", 3).container;
      listBodys.submodelRegistryListBody = this.printNode(parentElement, null, "",
         "Submodel Registry List", "bg-white", false, "text-black", 3).container;
      listBodys.aasListBody = this.printNode(parentElement, null, "",
         "AAS List", "bg-white", false, "text-black", 3).container;
      listBodys.submodelListBody = this.printNode(parentElement, null, "",
         "Submodel List", "bg-white", false, "text-black", 3).container;

      return listBodys;
   }
   
   getHostEntriesByType(type: listTypes) {
      switch (type) {
      case listTypes.AAS:
         return this.storageHandler.getAASMap();
      case listTypes.Submodel:
         return this.storageHandler.getSubmodelMap();
      case listTypes.AASRegistry:
         return this.storageHandler.getAASRegistryMap();
      case listTypes.SubmodelRegistry:
         return this.storageHandler.getSubmodelRegistryMap();
      }
   }

   printHostEntries(parentElement, aasMap, type: listTypes) {
      for (var [key, urlMap] of aasMap) {
         var node = this.printNode(parentElement, null, key, "Host", 
                                        this.colors.AASColor, false);
         var img = this.createImage(
           "local_icons/Breeze/actions/22/edit-delete.svg", "X", 22, 22);
         img.classList.add("align-middle");
         img.classList.add("float-right");
         img.setAttribute("data-html-target", "#" + node.contentRow.id);

         node.contentRow.setAttribute("data-bs-target", key);
         switch (type) {
         case listTypes.AAS:
            img.onclick = this.removeAASEntry;
            node.contentRow.setAttribute("data-type", dataTypes.AASHostURL);
            break;
         case listTypes.Submodel:
            img.onclick = this.removeSubmodelEntry;
            node.contentRow.setAttribute("data-type", dataTypes.SubmodelHostURL);
            break;
         case listTypes.AASRegistry:
            img.onclick = this.removeAASRegistryEntry;
            node.contentRow.setAttribute("data-type", dataTypes.AASRegistryHostURL);
            break;
         case listTypes.SubmodelRegistry:
            img.onclick = this.removeSubmodelRegistryEntry;
            node.contentRow.setAttribute("data-type", dataTypes.SubmodelRegistryHostURL);
            break;
         }

         var div_img = document.createElement("div");
         div_img.appendChild(img);

         div_img.classList.add("col-auto");
         div_img.classList.add("d-flex");
         div_img.classList.add("flex-wrap");
         div_img.classList.add("align-items-center");
         div_img.classList.add("p-0");

         // TODO: Content row
         //node.title.contentRow.appendChild(div_img);

         for (var [key2, entry] of urlMap) {
            this.printURLEntry(node.container, node.contentRow, entry, "URL", 
               type);
         }
      }
   }

   printURLEntry(HTMLElement, parentElement, url, valueName, type: listTypes) {
      var browserURL = null;
      switch (type) {
      case listTypes.AAS:
         browserURL = this.tAASBrowserURL;
         break;
      case listTypes.Submodel:
         browserURL = this.tSubmodelBrowserURL;
         break;
      case listTypes.AASRegistry:
         browserURL = this.tAASRegistryBrowserURL;
         break;
      case listTypes.SubmodelRegistry:
         browserURL = this.tSubmodelRegistryBrowserURL;
         break;
      }

      var fullUrl = browserURL + "?endpoint=" + encodeURIComponent(url);
      var bodyElement = this.createHTMLLink(fullUrl, 
         document.createTextNode(url), "_blank");

      var imgLink = this.createImage(
         "local_icons/Breeze/actions/22/link.svg", valueName, 22, 22);
      imgLink.classList.add("align-middle");
      imgLink.classList.add("float-left");

      var img = this.createImage(
         "local_icons/Breeze/actions/22/edit-delete.svg", "X", 22, 22);
      img.classList.add("align-middle");
      img.classList.add("float-right");

      var div_img = document.createElement("div");
      div_img.appendChild(img);

      div_img.classList.add("col-auto");
      div_img.classList.add("d-flex");
      div_img.classList.add("flex-wrap");
      div_img.classList.add("align-items-center");
      var content = [
         imgLink,
         bodyElement,
         img,
         ];
      var row = this.createRowWithContent(HTMLElement, 
         Array("col-auto", "col", "col-auto"), content, true);
         row.setAttribute("data-bs-target", url);
         switch (type) {
         case listTypes.AAS:
            img.onclick = this.removeAASEntry;
            row.setAttribute("data-type", dataTypes.AASURL);
            break;
         case listTypes.Submodel:
            img.onclick = this.removeSubmodelEntry;
            row.setAttribute("data-type", dataTypes.SubmodelURL);
            break;
         case listTypes.AASRegistry:
            img.onclick = this.removeAASRegistryEntry;
            row.setAttribute("data-type", dataTypes.AASRegistryURL);
            break;
         case listTypes.SubmodelRegistry:
            img.onclick = this.removeSubmodelRegistryEntry;
            row.setAttribute("data-type", dataTypes.SubmodelRegistryURL);
            break;
         }

      img.setAttribute("data-html-target", "#" + row.id);
      img.setAttribute("data-html-parent-target", "#" + parentElement.id);
   }

   removeAASEntry(target) {
      this.removeEntry(target, listTypes.AAS);
   }

   removeSubmodelEntry(target) {
      this.removeEntry(target, listTypes.Submodel);
   }

   removeAASRegistryEntry(target) {
      this.removeEntry(target, listTypes.AASRegistry);
   }

   removeSubmodelRegistryEntry(target) {
      this.removeEntry(target, listTypes.SubmodelRegistry);
   }

   removeEntry(target, targetType: listTypes) {
      var elementId = target.target.getAttribute("data-html-target");
      var element = null;
      
      switch (targetType) {
      case listTypes.AAS:
         element = this.listBodys.aasListBody.querySelector(elementId);
         break;
      case listTypes.Submodel:
         element = this.listBodys.submodelListBody.querySelector(elementId);
         break;
      case listTypes.AASRegistry:
         element = this.listBodys.aasRegistryListBody.querySelector(elementId);
         break;
      case listTypes.SubmodelRegistry:
         element = this.listBodys.submodelRegistryListBody.querySelector(elementId);
         break;
      }

      var url = element.getAttribute("data-bs-target");
      var type = element.getAttribute("data-type");
      switch (type) {
      case dataTypes.AASURL:
         this.storageHandler.removeAASURL(url);
         if (!this.storageHandler.AASHostExists(url)) {
            elementId = target.target.getAttribute("data-html-parent-target");
            element = this.listBodys.aasListBody.querySelector(elementId);
         }
         break;
      case dataTypes.SubmodelURL:
         this.storageHandler.removeSubmodelURL(url);
         if (!this.storageHandler.SubmodelHostExists(url)) {
            elementId = target.target.getAttribute("data-html-parent-target");
            element = this.listBodys.submodelListBody.querySelector(elementId);
         }
         break;
     case dataTypes.AASRegistryURL:
         this.storageHandler.removeAASRegistryURL(url);
         if (!this.storageHandler.aasRegistryHostExists(url)) {
            elementId = target.target.getAttribute("data-html-parent-target");
            element = this.listBodys.aasRegistryListBody.querySelector(elementId);
         }
         break;
     case dataTypes.SubmodelRegistryURL:
         this.storageHandler.removeSubmodelRegistryURL(url);
         if (!this.storageHandler.submodelRegistryHostExists(url)) {
            elementId = target.target.getAttribute("data-html-parent-target");
            element =
               this.listBodys.submodelRegistryListBody.querySelector(elementId);
         }
         break;
      case dataTypes.AASHostURL:
         this.storageHandler.removeAASHost(url);
      case dataTypes.SubmodelHostURL:
         this.storageHandler.removeSubmodelHost(url);
         break;
      case dataTypes.AASRegistryHostURL:
         this.storageHandler.removeAASRegistryHost(url);
         break;
      case dataTypes.SubmodelRegistryURL:
         this.storageHandler.removeSubmodelRegistryHost(url);
         break;
      default:
         return;
      }
      element.remove();
   }
}

