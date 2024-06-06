/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASColors, PrinterHtmlElements, TreeObject, metamodelType } from "./imports.js"

class AjaxCallContext {
   context: any;
   printer: any;
}

class MethodCallObject {
   timeout: number;
   requestId: string= "";
   inputArguments: Array<any>;
   inoutputArguments : Array<any>;
}


export class AASPrinterMetamodelElements extends PrinterHtmlElements {
   valueUpdateArray : Array<any>;
   colors: AASColors;
   aasContainer: HTMLElement;

   treeRoot: any;
   parser: any;
   
   /* debug */
   URL;
   parentObj;
   object;
   retry;
   onSuccess;
   onError;
   context;
   printer;


   constructor(rootElement) {
      super(rootElement);
      /* bind this pointer */
      this.printAAS = this.printAAS.bind(this);
      this.printSubmodel = this.printSubmodel.bind(this);
      this.printError = this.printError.bind(this);
      this.print = this.print.bind(this);
      this.printAsset = this.printAsset.bind(this);
      this.printSpecifcAssetId = this.printSpecifcAssetId.bind(this);
      this.printArray = this.printArray.bind(this);
      this.printKeys = this.printKeys.bind(this);
      this.printKey = this.printKey.bind(this);
      this.printLocalityInformation = this.printLocalityInformation.bind(this);
      this.printIdentifier = this.printIdentifier.bind(this);
      this.printAdministrativeInformation =
         this.printAdministrativeInformation.bind(this);
      this.printLangStringSet = this.printLangStringSet.bind(this);
      this.printLangString = this.printLangString.bind(this);
      this.printEntity = this.printEntity.bind(this);
      this.printFile = this.printFile.bind(this);
      this.printFileByType = this.printFileByType.bind(this);
      this.printGenericFile = this.printGenericFile.bind(this);
      this.printFileImage = this.printFileImage.bind(this);
      this.printBlob = this.printBlob.bind(this);
      this.printProperty = this.printProperty.bind(this);
      this.printMultiLanguageProperty =
         this.printMultiLanguageProperty.bind(this);
      this.printRange = this.printRange.bind(this);
      this.printReferenceElement = this.printReferenceElement.bind(this);
      this.printBasicEvent = this.printBasicEvent.bind(this);
      this.printSubmodelElementCollection =
         this.printSubmodelElementCollection.bind(this);
      this.printRelationshipElement = this.printRelationshipElement.bind(this);
      this.printAnnotatedRelationshipElement =
         this.printAnnotatedRelationshipElement.bind(this);
      this.printQualifier = this.printQualifier.bind(this);
      this.printFormula = this.printFormula.bind(this);
      this.printOperation = this.printOperation.bind(this);
      this.printOperationVariable = this.printOperationVariable.bind(this);
      this.printCapability = this.printCapability.bind(this);
      this.printDataType = this.printDataType.bind(this);
      this.createValueElement = this.createValueElement.bind(this);
      this.getCategoryByObject = this.getCategoryByObject.bind(this);
      this.printGenericSubmodelElement =
         this.printGenericSubmodelElement.bind(this);
      this.printString = this.printString.bind(this);
      this.printValue = this.printValue.bind(this);
      /* AAS Part 2 */
      this.printAASRegistry = this.printAASRegistry.bind(this);
      this.printSubmodelRegistry = this.printSubmodelRegistry.bind(this);
      this.printAssetAdministrationShellDescriptor =
         this.printAssetAdministrationShellDescriptor.bind(this);
      this.printSubmodelDescriptor = this.printSubmodelDescriptor.bind(this);
      this.printEndpoint = this.printEndpoint.bind(this);
      this.printProtocolInformation = this.printProtocolInformation.bind(this);
      this.printSecurityAttributeObject =
         this.printSecurityAttributeObject.bind(this);
      /* Helper */
      this.handleLinkTypes = this.handleLinkTypes.bind(this);
      this.isLink = this.isLink.bind(this);
      this.submitValue = this.submitValue.bind(this);
      this.callOperation = this.callOperation.bind(this);
      this.findChildElementUpward = this.findChildElementUpward.bind(this);
      this.findPropertyElementUpward = this.findPropertyElementUpward.bind(this);
      this.findElementByHtmlId = this.findElementByHtmlId.bind(this);
      this.findElementsByType = this.findElementsByType.bind(this);
      this.timedUpdateValues = this.timedUpdateValues.bind(this);
      this.updateValue = this.updateValue.bind(this);
      this.addGenericBrowserURL = this.addGenericBrowserURL.bind(this);
      this.addAASBrowserURL = this.addAASBrowserURL.bind(this);
      this.addSubmodelBrowserURL = this.addSubmodelBrowserURL.bind(this);
      this.makeURLFromAASID = this.makeURLFromAASID.bind(this);
      this.makeURLFromSubmodelID = this.makeURLFromSubmodelID.bind(this);
      /* variables */
      this.valueUpdateArray = new Array();

      this.colors = new AASColors();

      /*
       * We need to make sure the container for our async submodels is ready
       * even if our aas is not printed already
       */
      this.aasContainer = this.createBootstrapContainerFluid();

      window.setInterval(this.timedUpdateValues, 2000);
   }

   printAAS(HTMLElement, object) {
      if (this.treeRoot == null)
         this.treeRoot = object;
      var childObjs = object.childObjs;

      var HTMLObject = this.printNode(HTMLElement, object,
            childObjs.idShort.tData, "Asset Administration Shell",
             this.colors.AASColor, true, "text-white", 3, this.aasContainer);

      this.print(HTMLObject.container, object);
   }

   printSubmodel(HTMLElement, object, expand = false) {
      if (this.treeRoot == null)
         this.treeRoot = object;
      var childObjs = object.childObjs;

      var HTMLObject = this.printNode(HTMLElement, object, childObjs.idShort.tData,
            "Submodel", this.colors.submodelColor, expand);

      this.print(HTMLObject.container, object);
   }

   printError(object, name, key) {
      // We can only print Errors on the most upper level for now
      console.log("Fixme: Add tHTMLContainer to object-tree and print error in its domain");
      var HTMLObject = this.printNode(this.rootElement, object, name,
            "Error", this.colors.errorColor, true);

      this.print(HTMLObject.container, object);


      //this.rootElement.appendChild(HTMLObject);
   }

   print(HTMLElement: HTMLElement, object: TreeObject) {
      var childObjs = object.childObjs;
      for(var key in childObjs) {
         var element = childObjs[key];
         if (key == "parentObj" ||
             !this.isObject(element) ||
             !this.elementExists(element, "tType")) {
            continue;
         }
         switch (element.tType) {
         case metamodelType.String:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.value:
            this.printValue(HTMLElement, element, key);
            break;
         case metamodelType.Array:
            this.printArray(HTMLElement, element, key);
            break;
         case "Keys":
            this.printKeys(HTMLElement, element, key);
            break;
         case "Key":
            this.printKey(HTMLElement, element, key);
            break;
         case "ModelType":
            this.printString(HTMLElement, element, key);
            break;
         case "EntityType":
            this.printString(HTMLElement, element, key);
            break;
         case "KeyType":
            this.printString(HTMLElement, element, key);
            break;
         case "Identifier":
            this.printIdentifier(HTMLElement, element, key);
            break;
         case "AdministrativeInformation":
            this.printAdministrativeInformation(HTMLElement, element, key);
            break;
         case "IdentifierType":
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.AssetKind:
            this.printString(HTMLElement, element, key);
            break;
         case "ModelingKind":
            this.printString(HTMLElement, element, key);
            break;
         case "Asset":
            this.printAsset(HTMLElement, element, key);
            break;
         case metamodelType.SpecificAssetId:
            this.printSpecifcAssetId(HTMLElement, element, key);
            break;
         case "LangStringSet":
            this.printLangStringSet(HTMLElement, element, key);
            break;
         case "LangString":
            this.printLangString(HTMLElement, element, key);
            break;
         case "Entity":
            this.printEntity(HTMLElement, element, key);
            break;
         case "File":
            this.printFile(HTMLElement, element, key);
            break;
         case "Blob":
            this.printBlob(HTMLElement, element, key);
            break;
         case "Property":
            this.printProperty(HTMLElement, element, key);
            break;
         case "MultiLanguageProperty":
            this.printMultiLanguageProperty(HTMLElement, element, key);
            break;
         case "Range":
            this.printRange(HTMLElement, element, key);
            break;
         case "DataType":
            this.printDataType(HTMLElement, element, key);
            break;
         case "Range":
            this.printRange(HTMLElement, element, key);
            break;
         case "ReferenceElement":
            this.printReferenceElement(HTMLElement, element, key);
            break;
         case "BasicEvent":
            this.printBasicEvent(HTMLElement, element, key);
            break;
         case "SubmodelElementCollection":
            this.printSubmodelElementCollection(HTMLElement, element, key);
            break;
         case "RelationshipElement":
            this.printRelationshipElement(HTMLElement, element, key);
            break;
         case "AnnotatedRelationshipElement":
            this.printAnnotatedRelationshipElement(HTMLElement, element, key);
            break;
         case "Qualifier":
            this.printQualifier(HTMLElement, element, key);
            break;
         case "Formula":
            this.printFormula(HTMLElement, element, key);
            break;
         case "Operation":
            this.printOperation(HTMLElement, element, key);
            break;
         case "OperationVariable":
            this.printOperationVariable(HTMLElement, element, key);
            break;
         case "Capability":
            this.printCapability(HTMLElement, element, key);
            break;
         case "AssetAdministrationShell":
         case "Submodel":
         case "Submodels":
            /* fallthrough - handled seperately */
            break;
         /* Extra Elements from AAS Part 2 */
         case metamodelType.AssetAdministrationShellDescriptor:
            this.printAssetAdministrationShellDescriptor(HTMLElement, element, key);
            break;
         case "SubmodelDescriptor":
            this.printSubmodelDescriptor(HTMLElement, element, key);
            break;
         case "SubmodelDescriptor":
            this.printSubmodelDescriptor(HTMLElement, element, key);
            break;
         case metamodelType.Endpoint:
            this.printEndpoint(HTMLElement, element, key);
            break;
         case metamodelType.ProtocolInformation:
            this.printProtocolInformation(HTMLElement, element, key);
            break;
         case metamodelType.SecurityAttributeObject:
            this.printSecurityAttributeObject(HTMLElement, element, key);
         case metamodelType.SecurityType:
            this.printString(HTMLElement, element, key);
         // Generic error to show the user something went wrong
         case metamodelType.Error:
            this.printError(HTMLElement, element, key);
         default:
            console.log("Unhandled Type in print: " + element.tType, element);
            break;
         }
      }
   }

   printAsset(HTMLElement, object, name) {
      var HTMLObject = this.printNode(HTMLElement, object, name, "",
            this.colors.assetColor, true);

      this.print(HTMLObject.container, object);
   }

   printSpecifcAssetId(HTMLElement: HTMLElement, element: TreeObject,
      key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, name, "",
            this.colors.assetColor, true);

      this.print(HTMLObject.container, element);
   }

   printArray(HTMLElement, object, name) {
      if (!this.elementExists(object.tHints, "noPrint") ||
          object.tHints.noPrint == false) {
         var HTMLObject = this.printNode(HTMLElement, object, name, "",
               this.colors.submodelColor, false);

         this.print(HTMLObject.container, object);
      }
      else
         this.print(HTMLElement, object);
   }

   printKeys(HTMLElement, object, name) {
      if (!this.elementExists(object.tHints, "noPrint") ||
          object.tHints.noPrint == false) {
         var HTMLObject = this.printNode(HTMLElement, object, name, "",
               this.colors.referenceColor, false);

         this.print(HTMLObject.container, object);
      }
      else
         this.print(HTMLElement, object);
   }

   printKey(HTMLElement, object, name) {
      
      var childObjs = object.childObjs;

      var content = [];
      var content2 = [];


      var img = this.iconByType(object);
      content.push(img);

      var img2 = this.iconByType(object);
      content2.push(img2);


      if (!this.elementExists(object.hints, "noName") ||
          object.hints.noName == false) {
         content.push(document.createTextNode(name));
         content2.push(document.createTextNode(name));
      }

      content.push(document.createTextNode("ID Type: " + childObjs.idType.tData));
      content.push(document.createTextNode(this.printLocalityInformation(childObjs.local.tData)));
      content.push(document.createTextNode("Referenced Type: " + childObjs.type.tData));

//      content2.push(document.createTextNode("ID Type: " + childObjs.idType.tData));
//      content2.push(document.createTextNode(this.printLocalityInformation(childObjs.local.tData)));
//      content2.push(document.createTextNode("Referenced Type: " + childObjs.type.tData));

      content2.push(document.createTextNode(""));
      content2.push(document.createTextNode(""));
      content2.push(document.createTextNode(""));

      var dataElement = null;
      var dataElement2 = null;
      if (childObjs.local.tData) {
         if (childObjs.type.tData == "AssetAdministrationShell") {
            var url = this.makeURLFromAASID(object, childObjs.value.tData);
            var completeURL = this.addAASBrowserURL(object, url);
            dataElement = this.createHTMLLink(completeURL,
                  document.createTextNode(childObjs.value.tData));

            var url2 = this.makeURLFromAASID(object, 
            btoa(childObjs.value.tData));
            var completeURL2 = this.addAASBrowserURL(object, url2);
            dataElement2 = this.createHTMLLink(completeURL2,
                  document.createTextNode(
                     btoa(childObjs.value.tData)));
         }
         if (childObjs.type.tData == "Submodel") {
            var url = this.makeURLFromSubmodelID(object, childObjs.value.tData);
            var completeURL = this.addSubmodelBrowserURL(object, url);
            dataElement = this.createHTMLLink(completeURL,
                  document.createTextNode(childObjs.value.tData));

            var url2 = this.makeURLFromSubmodelID(object, 
            btoa(childObjs.value.tData));
            var completeURL2 = this.addSubmodelBrowserURL(object, url2);
            dataElement2 = this.createHTMLLink(completeURL2,
                  document.createTextNode(
                     btoa(childObjs.value.tData)));
         }
      }
      else {
         // handle non-local references here!
         console.log("Non-local reference as URL");
      }
      // default
      if (this.isNull(dataElement)) {
         dataElement = document.createTextNode(childObjs.value.tData);
         dataElement2 = document.createTextNode(
            btoa(childObjs.value.tData));
      }

      content.push(dataElement);
      content2.push(dataElement2);

      this.createRowWithContent(HTMLElement, 
                                new Array("col-auto", "col-2", "col-2", "col-2", "col"),
                                content,
                                true);
                                
      this.createRowWithContent(HTMLElement, 
                                new Array("col-auto", "col-2", "col-2", "col-2", "col"),
                                content2,
                                true);
   }

   printLocalityInformation(local) {
      if (local)
         return "Local Reference";
      else
         return "Remote Reference";
   }

   printIdentifier(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var link = false;
      var node = null;
      var img = this.iconByType(object);

      var node2 = null;
      var img2 = this.iconByType(object);


      if (!link)
         node = document.createTextNode(childObjs.id.tData);
      var content = [
         img,
         document.createTextNode(name),
         document.createTextNode("ID Type: " + childObjs.idType.tData),
         node
         ];
      this.createRowWithContent(HTMLElement,
                                new Array("col-auto", "col-2", "col-2", "col"),
                                content,
                                true);

    if (!link)
         node2 = document.createTextNode(btoa(childObjs.id.tData));
      var content2 = [
         img2,
         document.createTextNode(""),
         document.createTextNode(""),
         node2
         ];
      this.createRowWithContent(HTMLElement,
                                new Array("col-auto", "col-2", "col-2", "col"),
                                content2,
                                true);

   }

   printAdministrativeInformation(HTMLElement, object, name) {
      this.print(HTMLElement, object);
   }

   printLangStringSet(HTMLElement, object, name) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            name, "Lang String Set");

      this.print(HTMLObject.container, object);
   }

   printLangString(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var language = this.createValueElement(childObjs.language, name);
      var text = this.createValueElement(childObjs.description, name);
      var img = this.iconByType(object);
      var content = [
         img,
         language,
         text,
         ];
      this.createRowWithContent(HTMLElement, 
                                new Array("col-auto", "col-2", "col"),
                                content,
                                true);
   }

   printEntity(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Entity");

      this.print(HTMLObject.container, object);
   }

   printFile(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "File");
      this.printFileByType(HTMLObject.container, object);
   }

   printFileByType(HTMLElement, object) {
      if (!this.elementExists(object.childObjs, "mimeType"))
         this.printGenericFile(HTMLElement, object);
      else {
         var type = object.childObjs.mimeType.tData.toLowerCase();
         switch (type) {
         case "image/jpeg":
         case "image/png":
            this.printFileImage(HTMLElement, object);
            break;
         default:
            console.log("TODO: Print file by type: ", type, object);
            this.printGenericFile(HTMLElement, object);
            break;
         }
      }
   }

   printGenericFile(HTMLElement, object) {
      var fileURL = this.handleLinkTypes(object);
      if (fileURL) {
         // TODO: Fix the placeholderName
         var bodyElement = this.createHTMLLink(fileURL,
            document.createTextNode(fileURL), "_blank");
         var img = this.iconByType(object);
         var content = [
            img,
            bodyElement,
            ];
         this.createRowWithContent(HTMLElement,
                                   new Array("col-auto", "col"),
                                   content,
                                   true);
      }
      this.print(HTMLElement, object);
   }

   printFileImage(HTMLElement, object) {
      var imageURL = this.handleLinkTypes(object);
      if (imageURL) {
         // TODO: Fix the placeholderName
         var placeHolderName = "Image: " + object.childObjs.idShort.tData;
         var bodyElement = this.createImage(imageURL, placeHolderName);
         var img = this.iconByType(object, object.childObjs.mimeType.tData);
         var content = [
            img,
            bodyElement,
            ];
         this.createRowWithContent(HTMLElement,
                                   new Array("col-auto", "col"),
                                   content,
                                   true);
      }

      this.print(HTMLElement, object);
   }

   printBlob(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Blob");

      this.print(HTMLObject.container, object);
   }

   printProperty(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Property");

      this.print(HTMLObject.container, object);
   }

   printMultiLanguageProperty(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Multi Language Property");

      this.print(HTMLObject.container, object);
   }

   printRange(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Range");

      this.print(HTMLObject.container, object);
   }

   printReferenceElement(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Reference Element");

      this.print(HTMLObject.container, object);
   }

   printBasicEvent(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Basic Event");

      this.print(HTMLObject.container, object);
   }

   printSubmodelElementCollection(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Submodel Element Collection");

      this.print(HTMLObject.container, object);
   }

   printRelationshipElement(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Relationship Element");

      this.print(HTMLObject.container, object);
   }

   printAnnotatedRelationshipElement(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            childObjs.idShort.tData, "Annotated Relationship Element");

      this.print(HTMLObject.container, object);
   }

   printQualifier(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printNode(HTMLElement, object, 
           childObjs.type.tData, "Qualifier", this.colors.qualifierColor,
           false);

      this.print(HTMLObject.container, object);
   }

   printFormula(HTMLElement, object, name) {
      var HTMLObject = this.printNode(HTMLElement, object, name,
            "Formula", this.colors.qualifierColor, false);

      this.print(HTMLObject.container, object);
   }

   printOperation(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printNode(HTMLElement, object, 
            childObjs.idShort.tData, "Operation", this.colors.operationColor,
            false);

      var formGroup = this.createMultiElementForm(HTMLObject.container,
            object, this.callOperation);

      this.print(formGroup, object);
   }

   printOperationVariable(HTMLElement, object, name) {
      if (!this.elementExists(object.tHints, "noPrint") ||
            object.tHints.noPrint == false) {
         var HTMLObject = this.printNode(HTMLElement, object, "",
            "OperationVariable", this.colors.submodelElementColor, false);

         this.print(HTMLObject.container, object);
      }
      else
         this.print(HTMLElement, object);
   }

   printCapability(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      var HTMLObject = this.printNode(HTMLElement, object,
           childObjs.idShort.tData, "Capability",
           this.colors.submodelElementColor, false);
      this.print(HTMLObject.container, object);
   }

   printDataType(HTMLElement, object, name) {
      var childObjs = object.childObjs;
      this.printString(HTMLElement, childObjs.dataObjectType, name)
   }

   createValueElement(object, valueName = null, update = false) {
      var childObjs = object.childObjs;
      var bodyElement = null;
      var category = "CONSTANT";
      if (valueName == "value")
         category = this.getCategoryByObject(object);

      if (category == "")
         category = "CONSTANT";

      switch (category) {
      default:
         /* fallthrough */
         console.log("Unhandled category found: " + category);
      case "DEFAULT":
      case "CONSTANT":
            if (this.isLink(object)) {
               var URL = object.tData;
               if (this.hasInParentTreeType(object, "Endpoint")) {
                  if (this.hasInParentTreeType(object, "AssetAdministrationShellDescriptor"))
                     URL = this.addAASBrowserURL(object, object.tData);
                  if (this.hasInParentTreeType(object, "SubmodelDescriptor"))
                     URL = this.addSubmodelBrowserURL(object, object.tData);
                  }

               bodyElement = this.createHTMLLink(URL,
                  document.createTextNode(object.tData));
                  }
            else
               bodyElement = document.createTextNode(object.tData);
         break;
      case "VARIABLE":
         var idData = "";

         if (object.parentObj.childObjs.hasOwnProperty("idShort"))
            idData = object.parentObj.childObjs.idShort.tData;
//         else
//            idData = childObjs.idShort.tData;

         bodyElement = this.createBootstrapContainerFluid();
         bodyElement.classList.add("pl-0");
         if (object.parentObj.parentObj.tType != "OperationVariable")
            object.tHTMLContainer = this.createSingleElementForm(bodyElement,
                  idData, object.tData, object, this.submitValue);
         else
            object.tHTMLContainer = this.createSingleElementInput(bodyElement,
                  idData, object.tData, object);
         if (!update &&
             object.parentObj.parentObj.tType != "OperationVariable")
            this.valueUpdateArray.push(object);

         break;
      case "PARAMETER":
         bodyElement = this.createBootstrapContainerFluid();
         bodyElement.classList.add("pl-0");

         var output = document.createTextNode(object.tData);

         bodyElement.appendChild(output);

         object.tHTMLContainer = bodyElement;
         object.tHTMLID = object.tHTMLContainer.id;
         break;
      }
      return bodyElement;
   }

   getCategoryByObject(object) {
      if (this.elementExists(object.parentObj.childObjs, "category"))
         return object.parentObj.childObjs.category.tData;
      // default
      return "CONSTANT";
   }

   printGenericSubmodelElement(HTMLElement, object, name, titlename) {
      return this.printNode(HTMLElement, object, name, titlename,
            this.colors.submodelElementColor, false);
   }

   printString(HTMLElement, object, valueName) {
      this.printValue(HTMLElement, object, valueName);
   }

   printValue(HTMLElement, object, valueName) {
      var bodyElement = this.createValueElement(object, valueName);
      var img = this.iconByType(object);
      var content = [
         img,
         document.createTextNode(valueName),
         bodyElement,
         ];
      this.createRowWithContent(HTMLElement,
                                new Array("col-auto","col-2", "col"),
                                content,
                                true);
      object.tUpdateMethod = this.updateValue;
   }

   printAASRegistry(HTMLElement: HTMLElement, object: TreeObject) {
      if (this.treeRoot == null)
         this.treeRoot = object;
      var childObjs = object.childObjs;

      var HTMLObject = this.printNode(HTMLElement, object, "",
            "Asset Administration Shell Registry", this.colors.AASColor, true);

      this.print(HTMLObject.container, object);
   }

   printSubmodelRegistry(HTMLElement: HTMLElement, object: TreeObject) {
      if (this.treeRoot == null)
         this.treeRoot = object;
      var childObjs = object.childObjs;

      var HTMLObject = this.printNode(HTMLElement, object, "",
            "Submodel Registry", this.colors.AASColor, true);

      this.print(HTMLObject.container, object);
   }

   printAssetAdministrationShellDescriptor(HTMLElement, element, key) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.submodelElementColor, false);

      this.print(HTMLObject.container, element);
   }

   printSubmodelDescriptor(HTMLElement, element, key) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.submodelElementColor, false);

      this.print(HTMLObject.container, element);
   }

   printEndpoint(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var name = null;
      if (this.elementExists(element.childObjs, "interface"))
         name ="[" + key + "] : " +  element.childObjs.interface.tData;
      else
         name = key;
      var HTMLObject = this.printNode(HTMLElement, element, name, "",
          this.colors.referenceColor, false);

      this.print(HTMLObject.container, element);
   }
   
   printProtocolInformation(HTMLElement: HTMLElement, element: TreeObject, 
      key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.submodelElementColor, false);

      this.print(HTMLObject.container, element);
   }

   printSecurityAttributeObject(HTMLElement: HTMLElement, element: TreeObject,
      key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.qualifierColor, false);

      this.print(HTMLObject.container, element);
}

   handleLinkTypes(object) {
      if (this.elementExists(object.childObjs, "value")) {
         var fURL = object.childObjs.value.tData;
         if (this.isNull(fURL) || fURL == "")
            return null;
         if (!(fURL.startsWith("http://") ||
               fURL.startsWith("https://"))) {
            var rootUrl = this. findPropertyElementUpward(object,
               "tRootURL");
            // Relative path from current element
            if (!fURL.startsWith("/"))
               fURL = object.tURL + "/" + fURL;
            // Absolute path from root element
            else
               fURL = rootUrl + fURL;
         }
         return fURL;
      }
      return null;
   }

   isLink(element) {
      if (typeof(element.tData) != "string")
         return false;
      var url: URL = new URL("http://...");
      try {
         url = new URL(element.tData);
      }
      catch (_) {
         return false;
      }
      return true;
   }

   addGenericBrowserURL(browserURL, URL) {
      return browserURL + "?endpoint=" + encodeURIComponent(URL);
   }

   addAASBrowserURL(object, URL) {
      return this.addGenericBrowserURL(this.tAASBrowserURL, URL);
   }

   addSubmodelBrowserURL(object, URL) {
      return this.addGenericBrowserURL(this.tSubmodelBrowserURL, URL);
   }

   makeURLFromAASID(object, id) {
      var baseURL = this.findPropertyElementUpward(object, "tLocalRootURL");
      if (!this.isNull(baseURL)) {
         return baseURL + "/" + id + "/aas";
      }
      return id;
   }

   makeURLFromSubmodelID(object, id) {
      var submodel = this.getParentByType(object, "Submodel");
      if (!this.isNull(submodel) && this.elementExists(submodel, "tURL"))
         return submodel.tURL;
      /* FIXME: We have to find the submodel idShort for various references to
       * submodels.
       */
      return id;
   }

   // PUT on /submodelElements/$name/value
   submitValue(val) {
      var valueType = "string";
      var elementID = val.target.id;
      var value = val.target.getElementsByTagName("input")[0].value;
      var element = this.findElementByHtmlId(elementID, this.treeRoot);

      if (element.parentObj.childObjs.hasOwnProperty("valueType"))
         valueType = element.parentObj.childObjs.valueType.tData;

      var data = this.convertToJSON(value, valueType);

      this.parser.AjaxHelper.putJSON(element.tURL, JSON.stringify(data),
            null, null, null);
   }

   // POST on /submodelElements/$name/invoke
   callOperation(val) {
      var outputJSON = new MethodCallObject();
      outputJSON.timeout = 10;
      outputJSON.requestId = "";
      outputJSON.inputArguments = new Array();
      outputJSON.inoutputArguments = new Array();

      var elementID = val.target.id;
      var operationElement = this.findElementByHtmlId(elementID, this.treeRoot);

      //console.log("Operation called with: ", operationElement.tURLInvoke,
      //   operationElement, val);

      var var_array = this.findElementsByType("OperationVariable", operationElement);
      var i = 0;
      // filter output only Variables
      while (i < var_array.length) {
         var element = var_array[i];
         if (element.parentObj.tName == "outputVariable") {
            var_array.splice(i, 1);
            i--;
         }
         i++;
      }

      for (var valName in var_array) {
         var varElement = var_array[valName];
         if (this.elementExists(varElement.childObjs, "value")) {
            var valueObj = varElement.childObjs.value;
            switch (valueObj.tType) {
            case "Property":
               var value = valueObj.childObjs.value.tHTMLContainer.value;
               var valJSON = varElement.tOriginalJSON;
               valJSON.value.value = this.convertToJSON(value,
                  valueObj.childObjs.valueType.childObjs.dataObjectType.tData);
               if (varElement.parentObj.tName == "inputArguments" ||
                   varElement.parentObj.tName == "inputVariable")
                   outputJSON.inputArguments.push(valJSON);
               if (varElement.parentObj.tName == "inoutputArguments" ||
                   varElement.parentObj.tName == "inoutputVariable")
                   outputJSON.inoutputArguments.push(valJSON);
               break;
            default:
               break;
            }
         }
      }

      var ctxObj = new AjaxCallContext();
      ctxObj.context = operationElement;
      ctxObj.printer = this;

      this.parser.AjaxHelper.postJSON(operationElement.tURLInvoke,
         JSON.stringify(outputJSON),
         this.operationResult,
         null, ctxObj);
   }

   // unbound for this -> context
   operationResult(ret) {
      var context = this.context;
      var printer = this.printer;

      printer.parser.parseOperation(ret, context.tName, context);
}

   findChildElementUpward(object, name) {
      if (this.elementExists(object.childObjs, name))
         return object.childObjs[name];

      if (this.elementExists(object, "parentObj"))
         return this.findChildElementUpward(object["parentObj"], name);

      return null;
   }

   findPropertyElementUpward(object, name) {
      if (this.elementExists(object, name))
         return object[name];

      if (this.elementExists(object, "parentObj"))
         return this.findPropertyElementUpward(object["parentObj"], name);

      return null;
   }

   findElementByHtmlId(name, root) {
      for(var key in root) {
         if (key == "parentObj" ||
             key == "tHTMLContainer" ||
             !this.isObject(root[key]))
            continue;
         var child = root[key];
         if (child.hasOwnProperty("tHTMLID") && (child.tHTMLID == name))
            return child;
         else {
            if (this.isObject(child)) {
               var element = this.findElementByHtmlId(name, child);
               if (element != null)
                  return element;
            }
         }
      }
      return null;
   }

   findElementsByType(type, rootElement, parentType = null, parentName = null) {
      var result = new Array();
      if (!this.isObject(rootElement) ||
         !rootElement.hasOwnProperty("childObjs"))
         return;
      var childs = rootElement.childObjs;
      for (var key in childs) {
         var child = childs[key];
         if (this.isObject(child)) {
            if (child.hasOwnProperty("tType") && child.tType == type &&
                (parentType == null || child.parentObj.tType == parentType))
               result.push(child);
            var arr_tmp = this.findElementsByType(type, child);
            if (arr_tmp.length > 0)
               result.push.apply(result, arr_tmp);
         }
      }
      return result;
   }

   timedUpdateValues() {
      var values = this.valueUpdateArray;
      for (var key in values) {
         var transObj = new AjaxCallContext();
         transObj.context = values[key];
         transObj.printer = this;
         this.parser.getByURL(transObj,
               values[key].tURL,
               this.valueResult,
               null);
      }
   }

   updateValue(obj) {
      if (!this.elementExists(obj, "tHTMLContainer"))
         return;
      // TODO: Save for later?
      if (document.activeElement != obj.tHTMLContainer)
         obj.tHTMLContainer.value = obj.tData;
   }

   // unbound for this -> context
   valueResult(ret) {
      var context = this.object.context;
      var printer = this.object.printer;
      var value = ret;
      if (printer.isObject(value))
         value = value.value;
      printer.parser.parseValue(value, context.tName, context.parentObj);
   }
}
