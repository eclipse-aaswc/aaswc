/*
 * Copyright (c) 2021 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

class PrinterHtmlElements extends Base {
   constructor(rootElement) {
      super();
      /* bind this pointer */
      this.rootElement = rootElement;
      this.AjaxHelper = new AjaxHelper();

      this.iconByType = this.iconByType.bind(this);
      this.createBootstrapColCard = this.createBootstrapColCard.bind(this);
      this.createBootstrapCard = this.createBootstrapCard.bind(this);
      this.createBootstrapCardBody = this.createBootstrapCardBody.bind(this);
      this.insertBootstrapCardTitle = this.insertBootstrapCardTitle.bind(this);
      this.createRowWithContent = this.createRowWithContent.bind(this);
      this.createBootstrapContainerFluid =
         this.createBootstrapContainerFluid.bind(this);
      this.createBootstrapContainerRow =
         this.createBootstrapContainerRow.bind(this);
      this.createBootstrapContainerCol =
         this.createBootstrapContainerCol.bind(this);
      this.insertBootstrapCardElement =
         this.insertBootstrapCardElement.bind(this);
      this.prepareContainer = this.prepareContainer.bind(this);
      this.createEmptyForm = this.createEmptyForm.bind(this);
      this.createSingleElementInput = this.createSingleElementInput.bind(this);
      this.createSingleElementForm = this.createSingleElementForm.bind(this);
      this.createMultiElementForm = this.createMultiElementForm.bind(this);
      // this.createInputDiv = this.createInputDiv.bind(this);
      this.createInputField = this.createInputField.bind(this);
      this.createSubmitButton = this.createSubmitButton.bind(this);
      this.createHTMLLink = this.createHTMLLink.bind(this);
      this.createImage = this.createImage.bind(this);
      this.printNode = this.printNode.bind(this);

      this.setBrowserURLS = this.setBrowserURLS.bind(this);
      /* variables */
      this.IDCounter = 0;
      this.idAddition = Math.random().toString(36).substr(2, 5);

      this.setBrowserURLS();
   }

   setBrowserURLS() {
      var tempURL = window.location.origin + window.location.pathname;
      tempURL = tempURL.substring(0, tempURL.lastIndexOf("/") + 1);
      this.tAASBrowserURL = tempURL + "aasBrowser.html";
      this.tSubmodelBrowserURL = tempURL + "submodelBrowser.html";
      this.tRegistryBrowserURL = tempURL + "registryBrowser.html";
   }

   iconByType(object, mimeType = "") {
      if (object == null)
         return null;
      var iconpath = "local_icons/Breeze/";
      switch (object.tType) {
         case "ModelingKind":
         case "AssetKind":
         case "String":
         iconpath += "actions/22/tag.svg";
         break;
         case "AssetAdministrationShell":
         iconpath = "local_icons/aas-alternative.svg";
         break;
         case "AssetAdministrationShellDescriptor":
         iconpath = "local_icons/aas.svg";
         break;
         case "Entity":
         case "Asset":
         iconpath += "devices/22/uav-quadcopter.svg";
         break;
         case "Submodel":
         case "SubmodelDescriptor":
         iconpath += "places/32/folder-blue.svg";
         break;
         case "Array":
         case "SubmodelElementCollection":
         iconpath += "places/32/folder-green.svg";
         break;
         case "LangStringSet":
         iconpath += "places/32/folder-language.svg";
         break;
         case "MultiLanguageProperty":
         case "Property":
         iconpath += "actions/22/code-variable.svg";
         break;
         case "Identifier":
         iconpath += "actions/22/favorite-genres-amarok.svg";
         break;
         case "LangString":
         iconpath += "actions/22/amarok_change_language.svg";
         break;
         case "RelationshipElement":
         case "Keys":
         case "Key":
         iconpath += "actions/22/link.svg";
         break;
         case "File": {
            switch (mimeType) {
               case "image/png":
               case "image/jpeg":
               iconpath += "mimetypes/22/image-jpeg.svg";
               break;
               default:
               iconpath += "mimetypes/32/application-x-m4.svg";
               break;
            }
         
         }
         break;
         case "Operation":
         iconpath += "actions/22/run-build.svg";
         break;
         case "Endpoint":
         iconpath += "actions/22/network-connect.svg";
         break;
         
         default:
         iconpath += "mimetypes/32/application-x-zerosize.svg";
         break;
      }
      return this.createImage(iconpath,"", 22, 22);
   }

   createBootstrapColCard(extraClasses = null) {
      var card = this.createBootstrapCard(extraClasses);
      card.classList.add("col");
      return card;
   }

   createBootstrapCard(extraClasses = null) {
      var card = document.createElement("div");
      card.classList.add("card");
      card.classList.add('shadow');
      card.classList.add('rounded-0');
      card.classList.add('border-0');
      if (this.isArray(extraClasses))
         extraClasses.forEach(element => card.classList.add(element));
      return card;
   }

   createBootstrapCardBody(margin = 0, padding = 0, isRow = false,
                           bgColor = "bg-white") {
      var cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      cardBody.classList.add(bgColor);
      if (isRow)
         cardBody.classList.add("row");
      cardBody.classList.add('p-' + padding);
      cardBody.classList.add('m-' + margin);
      cardBody.id = "cardBody-" + this.idAddition + "-" + this.IDCounter;
      this.IDCounter++;
      return cardBody;
   }

   insertBootstrapCardTitle(cardBody, content, bgcolor, textcolor,
         collapseTarget, expanded = true, titlesize = 3) {
      var img = null;
      if (!expanded) {
         img = this.createImage("local_icons/Breeze/emblems/22/emblem-added.svg", "+", 22,
            22);
         img.classList.add("tplus");
      }
      else {
         img = this.createImage("local_icons/Breeze/emblems/22/emblem-remove.svg", "-",
            22, 22);
         img.classList.add("tminus");
      }
      img.classList.add("align-baseline");
      img.id = "img-" + this.idAddition + "-" + this.IDCounter;
      this.IDCounter++;

      var icontent = [];
      icontent.push(img);
      icontent = icontent.concat(content);

      var row = this.createRowWithContent(HTMLElement,
                                new Array("col-auto", "col-auto", "col"),
                                icontent,
                                false, true, bgcolor);

      var h = document.createElement("h" + titlesize);
      h.classList.add("card-title");
      h.classList.add(bgcolor);
      h.classList.add(textcolor);
      h.classList.add("m-0");
      h.classList.add("px-1");
      h.setAttribute("aria-expanded", "false");
      h.setAttribute("data-bs-toggle" , "collapse");
      h.setAttribute("data-bs-target", "#" + collapseTarget);
      h.setid = "header-" + this.idAddition + "-" + this.IDCounter;
      this.IDCounter++;

      h.onclick = function(clickelement) {
         var element = clickelement.target;
         while (!element.className.includes("card-title"))
            element = element.parentNode;
         var img = element.getElementsByTagName("img")[0];
         if (img.className.includes("tplus")) {
            img.classList.remove("tplus");
            img.classList.add("tminus");
            img.setAttribute("src", "local_icons/Breeze/emblems/22/emblem-remove.svg");
            img.setAttribute("alt", "-");
         }
         else {
            img.classList.remove("tminus");
            img.classList.add("tplus");
            img.setAttribute("src", "local_icons/Breeze/emblems/22/emblem-added.svg");
            img.setAttribute("alt", "+");
         }
      };
      h.appendChild(row);
      cardBody.insertAdjacentElement("afterbegin", h);

      var obj = new Object();
      obj.headline = h;
      obj.contentRow = row;

      return obj;
   }

   insertBootstrapCardElement(cardBody, ContainedElement, bgcolor,
         textcolor, expanded = true) {
      var p = document.createElement("p");
      p.classList.add("card-text");
      p.classList.add("collapse");
      if (expanded)
         p.classList.add("show");
      p.classList.add("ms-2");
      p.classList.add(bgcolor);
      p.classList.add(textcolor);
      p.id = "cardText-" + this.idAddition + "-" + this.IDCounter;
      p.appendChild(ContainedElement);
      cardBody.appendChild(p);
      this.IDCounter++;
      return p;
   }

   prepareContainer(HTMLElement, bgColor, extContainer = null) {
      var row = this.createBootstrapContainerRow();
      var card = this.createBootstrapColCard(Array("p-0", "my-1", "ms-1"));
      var cardBody = this.createBootstrapCardBody(0, 0, false, bgColor);
      var container = null;
      if (extContainer != null)
         container = extContainer;
      else
         container = this.createBootstrapContainerFluid();

      card.appendChild(cardBody);
      row.appendChild(card);
      HTMLElement.appendChild(row);

      var obj = new Object();
      obj.card = card;
      obj.column = card;
      obj.cardBody = cardBody;
      obj.container = container;
      obj.contentRow = row;
      return obj;
   }

   createEmptyForm(submitMethod) {
      var form = document.createElement("form");
      form.classList.add("form-inline");
      form.classList.add("row");
      form.classList.add("m-0");
      form.addEventListener('submit', submitMethod);
      form.action ="javascript:function empty(){};";
      form.id = "form-" + this.idAddition + "-" + this.IDCounter;
      this.IDCounter++;
      return form;
   }

   createSingleElementInput(HTMLElement, elementname, elementdata, element) {
      var input = this.createInputField(elementdata, elementdata);
      HTMLElement.appendChild(input);
      return input;
   }

   createSingleElementForm(HTMLElement, elementname, elementdata, element,
         submitMethod) {
      var form = this.createEmptyForm(submitMethod);

      var divGroup = this.createBootstrapContainerFluid();
      divGroup.classList.add("form-group");
      divGroup.classList.add("col-11");
      divGroup.classList.add("pe-1");

      form.appendChild(divGroup);

      var input = this.createInputField(elementdata, elementdata);

      divGroup.appendChild(input);

      var button = this.createSubmitButton("Update");
      form.appendChild(button);
      HTMLElement.appendChild(form);

      element.tHTMLID = form.id;

      return input;
   }

   createMultiElementForm(HTMLElement, element, submitMethod) {
      var form = this.createEmptyForm(submitMethod);

      var divGroup = this.createBootstrapContainerFluid();
      var divGroupButton = this.createBootstrapContainerFluid();

      form.appendChild(divGroup);
      form.appendChild(divGroupButton);

      var button = this.createSubmitButton("Call");
      var content = [
         button,
         ];
      this.createRowWithContent(divGroupButton, 2, content, true, true);

      HTMLElement.appendChild(form);

      element.tHTMLID = form.id;

      return divGroup;
   }

   createInputField(inputdata, placeholder, colsize = "2") {
      var input = document.createElement("input");
      input.classList.add("form-control");
      input.classList.add("col");
      input.id = "input-" + this.idAddition + "-" + this.IDCounter;
      this.IDCounter++;
      input.placeholder = placeholder;
      input.value = inputdata;
      return input;
   }

   createSubmitButton(text, color = "btn-primary", coltype = "col",
                      alignment = null) {
      var button = document.createElement("button");
      button.type = "submit";
      button.appendChild(document.createTextNode(text));
      button.classList.add("btn");
      button.classList.add(color);
      button.classList.add(coltype);
      if (alignment)
         button.classList.add(alignment);

      return button;
   }

   createHTMLLink(URL, ContainedElement, target = null) {
      var a = document.createElement("a");
      a.href = URL;
      a.appendChild(ContainedElement);
      if (target)
         a.target = target;
      return a;
   }

   createImage(URL, placeHolderText = "", width = null, height = null) {
      var img = document.createElement("img");
      img.setAttribute("src", URL);
      img.setAttribute("alt", placeHolderText);
      img.classList.add("align-baseline");
      if (width)
         img.width = width;
      if (height)
         img.height = height;
      return img;
   }

   createRowWithContent(parent, colwidth, content, attachToParent = false,
                        flat = false, bgcolor ="bg-white") {
      var row = this.createBootstrapContainerRow();
      if (!flat) {
         var card = this.createBootstrapColCard(Array("p-0"));
         var cardBody = this.createBootstrapCardBody(0, 0, true, bgcolor);

         card.appendChild(cardBody);
         row.appendChild(card);
      }

      if (!Array.isArray(colwidth)) {
         var colwidthnum = colwidth;
         colwidth = new Array();
         for (var i = 0; i < content.length - 1; i++) {
            colwidth[i] = "col-" + colwidthnum;
         }
         colwidth[content.length - 1] = "col";
      }

      for (var i = 0; i < content.length; i++) {
         if (content[i] == null)
            continue;
         var element = this.createBootstrapContainerCol(colwidth[i], "p-1", "s-0");
         element.appendChild(content[i]);

         if (!flat)
            cardBody.appendChild(element);
         else
            row.appendChild(element);
      }
      if (attachToParent)
         parent.appendChild(row);
      return row;
   }

   createBootstrapContainerFluid() {
      var div = document.createElement("div");
      div.classList.add("container-fluid");
      div.classList.add("p-0");
      return div;
   }

   createBootstrapContainerRow(extraClasses = null) {
      var div = document.createElement("div");
      div.id = "row-" + this.idAddition + "-" + this.IDCounter;
      this.IDCounter++;
      div.classList.add("row");
      div.classList.add("m-0");
      if (this.isArray(extraClasses))
         extraClasses.forEach(element => div.classList.add(element));
      return div;
   }

   createBootstrapContainerCol(coltype, padding = "p-1", spacing = "s-0",
                               border = null) {
      var div = document.createElement("div");
      div.classList.add(coltype);
      div.classList.add(padding);
      if (!this.isNull(border)) {
         div.classList.add("border-bottom");
      }
      return div;
   }

      printNode(HTMLElement, object, name, titlename, bgColor,
         expanded = true, textColor = "text-white", titlesize = 3, 
         extContainer = null) {

      var icon = this.iconByType(object);
      var HTMLObject = this.prepareContainer(HTMLElement, bgColor, extContainer);
      var collapsable = this.insertBootstrapCardElement(HTMLObject.cardBody,
            HTMLObject.container, "bg-light", "text-black", expanded);

      var title = "";
      if (name != "" && titlename != "")
         title = titlename + ": " + name;
      if (name != "" && titlename == "")
         title = name;
      if (titlename != "" && name == "")
         title = titlename;
         
      var content = [];
      var titlenode = document.createTextNode(title);
      if (icon != null)
         content.push(icon);
      content.push(titlenode);


      HTMLObject.title = this.insertBootstrapCardTitle(HTMLObject.cardBody,
            content, bgColor, textColor, collapsable.id, expanded, titlesize);
      return HTMLObject;
   }
}
