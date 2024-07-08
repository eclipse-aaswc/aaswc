/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { AASColors, PrinterHtmlElements, TreeObject, metamodelType, Pair } from "./imports.js"

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


   constructor(rootElement: HTMLElement) {
      super(rootElement);
      /* bind this pointer */
      this.printAASV3 = this.printAASV3.bind(this);
      this.printAssetInformationV3 = this.printAssetInformationV3.bind(this);
      this.printSubmodelV3 = this.printSubmodelV3.bind(this);
      this.printError = this.printError.bind(this);
      this.print = this.print.bind(this);
      this.printSpecifcAssetIdV3 = this.printSpecifcAssetIdV3.bind(this);
      this.printArrayV3 = this.printArrayV3.bind(this);
      this.printKeyV3 = this.printKeyV3.bind(this);
      this.printAdministrativeInformationV3 =
         this.printAdministrativeInformationV3.bind(this);
      this.printMultiLanguageNameTypeV3 =
         this.printMultiLanguageNameTypeV3.bind(this);
      this.printEntityV3 = this.printEntityV3.bind(this);
      this.printExtensionV3 = this.printExtensionV3.bind(this);
      this.printFileV3 = this.printFileV3.bind(this);
      this.printResourceV3 = this.printResourceV3.bind(this);
      this.printFileByType = this.printFileByType.bind(this);
      this.printGenericFile = this.printGenericFile.bind(this);
      this.printFileImage = this.printFileImage.bind(this);
      this.printBlobV3 = this.printBlobV3.bind(this);
      this.printBasicEventElementV3 = this.printBasicEventElementV3.bind(this);
      this.printMultiLanguagePropertyV3 =
         this.printMultiLanguagePropertyV3.bind(this);
      this.printRangeV3 = this.printRangeV3.bind(this);
      this.printReferenceElementV3 = this.printReferenceElementV3.bind(this);
      this.printReferenceV3 = this.printReferenceV3.bind(this);
      this.printSubmodelElementCollectionV3 =
         this.printSubmodelElementCollectionV3.bind(this);
      this.printSubmodelElementListV3 =
         this.printSubmodelElementListV3.bind(this);
      this.printRelationshipElementV3 =
         this.printRelationshipElementV3.bind(this);
         this.printAnnotatedRelationshipElementV3 =
            this.printAnnotatedRelationshipElementV3.bind(this);
      this.printQualifierV3 = this.printQualifierV3.bind(this);
      this.printOperationV3 = this.printOperationV3.bind(this);
      this.printOperationVariableV3 = this.printOperationVariableV3.bind(this);
      this.printCapabilityV3 = this.printCapabilityV3.bind(this);
      this.createValueElement = this.createValueElement.bind(this);
      this.printGenericSubmodelElement =
         this.printGenericSubmodelElement.bind(this);
      this.printString = this.printString.bind(this);
      this.printValue = this.printValue.bind(this);
      /* AAS Part 2 */
      this.printAASRegistryV3 = this.printAASRegistryV3.bind(this);
      this.printSubmodelRegistryV3 = this.printSubmodelRegistryV3.bind(this);
      this.printAssetAdministrationShellDescriptorV3 =
         this.printAssetAdministrationShellDescriptorV3.bind(this);
      this.printSubmodelDescriptorV3 = this.printSubmodelDescriptorV3.bind(this);
      this.printEndpointV3 = this.printEndpointV3.bind(this);
      this.printProtocolInformationV3 = this.printProtocolInformationV3.bind(this);
      this.printSecurityAttributeObjectV3 =
         this.printSecurityAttributeObjectV3.bind(this);
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

   printAASV3(HTMLElement: HTMLElement, object: TreeObject) {
      if (this.treeRoot == null)
         this.treeRoot = object;
      var name = object.getChildValue("id");

      var HTMLObject = this.printNode(HTMLElement, object,
            name.tData, "Asset Administration Shell",
            this.colors.AASColor, true, "text-white", 3, this.aasContainer);

      this.print(HTMLObject.container, object);
   }

   printAssetInformationV3(HTMLElement: HTMLElement, element: TreeObject,
         key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
         this.colors.assetColor, false);
      this.print(HTMLObject.container, element);
   }

   printSubmodelV3(HTMLElement: HTMLElement, object: TreeObject,
         expand: boolean = false) {
      if (this.treeRoot == null)
         this.treeRoot = object;
      var name = object.getChildValue("id");

      var HTMLObject = this.printNode(HTMLElement, object, name.tData,
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
      for(var keyPair of object.childs) {
         if (keyPair.first == "parentObj" ||
             !this.isObject(keyPair.second)) {
            continue;
         }
         var element = keyPair.second;
         var key = keyPair.second.tName;
         switch (element.tType) {
         /* Basics */
         case metamodelType.String:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.value:
            this.printValue(HTMLElement, element, key);
            break;
         case metamodelType.DataTypeDefXsd:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.ValueDataType:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.Array:
            this.printArrayV3(HTMLElement, element, key);
            break;
         /* Part 1 */
         case metamodelType.KeyType:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.SpecificAssetId:
            this.printSpecifcAssetIdV3(HTMLElement, element, key);
            break;
         case metamodelType.AssetInformation:
            this.printAssetInformationV3(HTMLElement, element, key);
            break;
         case metamodelType.Key:
            this.printKeyV3(HTMLElement, element, key);
            break;
         case metamodelType.Reference:
            this.printReferenceV3(HTMLElement, element, key);
            break;
         case metamodelType.ReferenceType:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.AssetKind:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.AssetAdministrationShell:
            this.printAASV3(HTMLElement, element);
            break;
         case metamodelType.Submodel:
            this.printSubmodelV3(HTMLElement, element);
            break;
         case metamodelType.MultiLanguageTextType:
            /* fallthrough */
         case metamodelType.MultiLanguageNameType:
            this.printMultiLanguageNameTypeV3(HTMLElement, element, key);
            break;
         case metamodelType.ModellingKind:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.Property:
            this.printPropertyV3(HTMLElement, element, key);
            break;
         case metamodelType.MultiLanguageProperty:
            this.printMultiLanguagePropertyV3(HTMLElement, element, key);
            break;
         case metamodelType.Capability:
            this.printCapabilityV3(HTMLElement, element, key);
            break;
         case metamodelType.Entity:
            this.printEntityV3(HTMLElement, element, key);
            break;
         case metamodelType.EntityType:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.ReferenceElement:
            this.printReferenceElementV3(HTMLElement, element, key);
            break;
         case metamodelType.RelationshipElement:
            this.printRelationshipElementV3(HTMLElement, element, key);
            break;
         case metamodelType.AnnotatedRelationshipElement:
            this.printAnnotatedRelationshipElementV3(HTMLElement, element, key);
            break;
         case metamodelType.Range:
            this.printRangeV3(HTMLElement, element, key);
            break;
         case metamodelType.Qualifier:
            this.printQualifierV3(HTMLElement, element, key);
            break;
         case metamodelType.QualifierKind:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.File:
            this.printFileV3(HTMLElement, element, key);
            break;
         case metamodelType.Blob:
            this.printBlobV3(HTMLElement, element, key);
            break;
         case metamodelType.BasicEventElement:
            this.printBasicEventElementV3(HTMLElement, element, key);
            break;
         case metamodelType.SubmodelElementCollection:
            this.printSubmodelElementCollectionV3(HTMLElement, element, key);
            break;
         case metamodelType.SubmodelElementList:
            this.printSubmodelElementListV3(HTMLElement, element, key);
            break;
         case metamodelType.Operation:
            this.printOperationV3(HTMLElement, element, key);
            break;
         case metamodelType.OperationVariable:
            this.printOperationVariableV3(HTMLElement, element, key);
            break;
         case metamodelType.AasSubmodelElements:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.Direction:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.Identifier:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.Extension:
            this.printExtensionV3(HTMLElement, element, key);
            break;
         case metamodelType.AdministrativeInformation:
            this.printAdministrativeInformationV3(HTMLElement, element, key);
            break;
         case metamodelType.StateOfEvent:
            this.printString(HTMLElement, element, key);
            break;
         case metamodelType.Resource:
            this.printResourceV3(HTMLElement, element, key);
            break;
         /* Part 2 */
         case metamodelType.AssetAdministrationShellDescriptor:
            this.printAssetAdministrationShellDescriptorV3(HTMLElement,
               element, key);
            break;
         case metamodelType.SubmodelDescriptor:
            this.printSubmodelDescriptorV3(HTMLElement, element, key);
            break;
         case metamodelType.Endpoint:
            this.printEndpointV3(HTMLElement, element, key);
            break;
         case metamodelType.ProtocolInformation:
            this.printProtocolInformationV3(HTMLElement, element, key);
            break;
         case metamodelType.SecurityAttributeObject:
            this.printSecurityAttributeObjectV3(HTMLElement, element, key);
            break;
         case metamodelType.SecurityType:
            this.printString(HTMLElement, element, key);
            break;
         /* End Part 2 */
         /* Extra - do print */
         /* Extra - do not print */
         /* Abstract class, noting todo */
         case metamodelType.EventElement:
         case metamodelType.SubmodelElement:
         case metamodelType.DataElement:
         /* -- */
         case metamodelType.Submodels:
         case metamodelType.AssetAdministrationShellRoot:
         case metamodelType.SubmodelRoot:
         case metamodelType.AssetAdministrationShellRegistryRoot:
         case metamodelType.SubmodelRegistryRoot:
         case metamodelType.Error:
         case metamodelType.AssetAdministrationShellRegistry:
         case metamodelType.SubmodelRegistry:
         case metamodelType.Descriptor:
            /* nothing todo */
            break;
         default:
            console.log("Unhandled Type in print: " + element.tType, element);
            break;
         }
      }
   }

   printSpecifcAssetIdV3(HTMLElement: HTMLElement, element: TreeObject,
      key: string) {
      var img = this.iconByType(element);
      var content = [
         img,
         document.createTextNode(key),
         document.createTextNode(element.getChildValue("name").tData),
         document.createTextNode(element.getChildValue("value").tData),
         ];

      this.createRowWithContent(HTMLElement,
                                new Array("col-auto","col-2", "col-2","col"),
                                content,
                                true);
      if (element.getChild("externalSubjectId") != null)
        this.print(HTMLElement, element.getChildValue("externalSubjectId"));
   }

   printArrayV3(HTMLElement: HTMLElement, object: TreeObject, name: string) {
      if (object.tHints.noPrint == false) {
         var HTMLObject = this.printNode(HTMLElement, object, name, "Array",
               this.colors.submodelColor, false);

         this.print(HTMLObject.container, object);
      }
      else
         this.print(HTMLElement, object);
   }

   printKeyV3(HTMLElement: HTMLElement, object: TreeObject, name: string) {
      var content = [];
      var img = this.iconByType(object);
      content.push(img);
      content.push(document.createTextNode("Key type"));
      content.push(document.createTextNode(object.getChildValue("type").tData));
      content.push(document.createTextNode(object.getChildValue("value").tData));
      this.createRowWithContent(HTMLElement,
                                new Array("col-auto", "col-2", "col-2", "col"),
                                content,
                                true);
      console.log("printKeyV3: Add links to AAS/Submodel via Registry lookup")
   }

   printAdministrativeInformationV3(HTMLElement: HTMLElement,
         object: TreeObject, name: string) {
      this.print(HTMLElement, object);
   }

   printMultiLanguageNameTypeV3(HTMLElement: HTMLElement, element: TreeObject,
      key: string) {
         if (!element.getChild("language") || !element.getChild("text"))
            return;
         
         var img = this.iconByType(element);
         var content = [
            img,
            document.createTextNode(element.getChildValue("language").tData),
            document.createTextNode(element.getChildValue("text").tData),
            ];

         this.createRowWithContent(HTMLElement,
                                   new Array("col-auto","col-2", "col"),
                                   content,
                                   true);
   }

   printEntityV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "Entity");

      this.print(HTMLObject.container, element);
   }

   printExtensionV3(HTMLElement: HTMLElement, element: TreeObject,
         key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "Extension",
            this.colors.qualifierColor);

      this.print(HTMLObject.container, element);
   }

   printFileV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "File");
      this.printFileByType(HTMLObject.container, element);
   }

   printResourceV3(HTMLElement: HTMLElement, element: TreeObject,
         key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "File");
      this.printFileByType(HTMLObject.container, element);
   }

   printFileByType(HTMLElement: HTMLElement, element: TreeObject) {
      if (!element.getChild("contentType"))
         this.printGenericFile(HTMLElement, element);
      else {
         var type = element.getChildValue("contentType").tData.toLowerCase();
         switch (type) {
         case "image/jpeg":
         case "image/png":
         case "image/svg":
         case "image/svg+xml":
            this.printFileImage(HTMLElement, element);
            break;
         default:
            console.log("TODO: Print file by type: ", type, element);
            this.printGenericFile(HTMLElement, element);
            break;
         }
      }
   }

   printGenericFile(HTMLElement: HTMLElement, element: TreeObject) {
      var fileURL = this.handleLinkTypes(element);
      if (fileURL) {
         // TODO: Fix the placeholderName
         var bodyElement = this.createHTMLLink(fileURL,
            document.createTextNode(fileURL), "_blank");
         var img = this.iconByType(element);
         var content = [
            img,
            bodyElement,
            ];
         this.createRowWithContent(HTMLElement,
                                   new Array("col-auto", "col"),
                                   content,
                                   true);
      }
      this.print(HTMLElement, element);
   }

   printFileImage(HTMLElement: HTMLElement, element: TreeObject) {
      var imageURL = this.handleLinkTypes(element);
      if (imageURL) {
         // TODO: Fix the placeholderName
         var placeHolderName = "Image: " + 
            element.getChildValue("idShort").tData;
         var bodyElement = this.createImage(imageURL, placeHolderName);
         var img = this.iconByType(element,
            element.getChildValue("contentType").tData);
         var content = [
            img,
            bodyElement,
            ];
         this.createRowWithContent(HTMLElement,
                                   new Array("col-auto", "col"),
                                   content,
                                   true);
      }

      this.print(HTMLElement, element);
   }

   printBlobV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "Blob");

      this.print(HTMLObject.container, element);
   }

   printPropertyV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "Property");

      this.print(HTMLObject.container, element);
   }

   printMultiLanguagePropertyV3(HTMLElement: HTMLElement,
      element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "Multi Language Property");

      this.print(HTMLObject.container, element);
   }

   printRangeV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData, "Range");

      this.print(HTMLObject.container, element);
   }

   printReferenceElementV3(HTMLElement: HTMLElement, object: TreeObject,
         name: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            object.getChildValue("idShort").tData, "Reference Element");

      this.print(HTMLObject.container, object);
   }

   printReferenceV3(HTMLElement: HTMLElement, object: TreeObject,
      name: string) {
      /* If we encounter an Reference with just one key, we can assume its name
       * or else we just set a generic name
       */
      var new_name: string = "Reference: " + name;
      var keyArr = object.getChildValue("key");
      if (keyArr && keyArr.childs.length == 1) 
         new_name += " : " +
         keyArr.childs.at(0).second.getChildValue("value").tData;

      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            new_name, "", this.colors.referenceColor);

      this.print(HTMLObject.container, object);
   }

   printBasicEventElementV3(HTMLElement: HTMLElement, element: TreeObject,
         key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, 
            element.getChildValue("idShort").tData,
            "Basic Event Element", this.colors.eventColor,
            false);

      this.print(HTMLObject.container, element);
   }

   printSubmodelElementCollectionV3(HTMLElement: HTMLElement, 
         element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData,
            "Submodel Element Collection");

      this.print(HTMLObject.container, element);
   }

   printSubmodelElementListV3(HTMLElement: HTMLElement, 
         element: TreeObject, key: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, element,
            element.getChildValue("idShort").tData,
            "Submodel Element List");

      this.print(HTMLObject.container, element);
   }

   printRelationshipElementV3(HTMLElement: HTMLElement, object: TreeObject,
         name: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            object.getChildValue("idShort").tData, "Relationship Element");

      this.print(HTMLObject.container, object);
   }

   printAnnotatedRelationshipElementV3(HTMLElement: HTMLElement,
      object: TreeObject, name: string) {
      var HTMLObject = this.printGenericSubmodelElement(HTMLElement, object,
            object.getChildValue("idShort").tData,
            "Annotated Relationship Element");

      this.print(HTMLObject.container, object);
   }

   printQualifierV3(HTMLElement: HTMLElement, object: TreeObject,
      name: string) {
      var HTMLObject = this.printNode(HTMLElement, object, 
           object.getChildValue("type").tData, "Qualifier",
           this.colors.qualifierColor, false);

      this.print(HTMLObject.container, object);
   }

   printOperationV3(HTMLElement: HTMLElement, object: TreeObject,
         name: string) {
      var HTMLObject = this.printNode(HTMLElement, object, 
            object.getChildValue("idShort").tData,
            "Operation", this.colors.operationColor,
            false);

      var formGroup = this.createMultiElementForm(HTMLObject.container,
            object, this.callOperation);

      this.print(formGroup, object);
   }

   printOperationVariableV3(HTMLElement: HTMLElement, object: TreeObject,
            name: string) {
      if (object.tHints.noPrint == false) {
         var HTMLObject = this.printNode(HTMLElement, object, "",
            "OperationVariable", this.colors.submodelElementColor, false);

         this.print(HTMLObject.container, object);
      }
      else
         this.print(HTMLElement, object);
   }

   printCapabilityV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var HTMLObject = this.printNode(HTMLElement, element,
           element.getChildValue("idShort").tData, "Capability",
           this.colors.submodelElementColor, false);
      this.print(HTMLObject.container, element);
   }

   createValueElement(object: any, valueName: string = null,
      update: boolean = false) {

      var bodyElement = null;
      // TODO: Category
      var category = "CONSTANT";

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

   printGenericSubmodelElement(HTMLElement, object, name, titlename,
         color = "") {
      if (color == "")
         color = this.colors.submodelElementColor;
      return this.printNode(HTMLElement, object, name, titlename,
            color, false);
   }

   printString(HTMLElement: HTMLElement, object: TreeObject, valueName: string) {
      this.printValue(HTMLElement, object, valueName);
   }

   printValue(HTMLElement: HTMLElement, object: TreeObject, valueName: string) {
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

   printAASRegistryV3(HTMLElement: HTMLElement, object: TreeObject) {
      if (this.treeRoot == null)
         this.treeRoot = object;

      var HTMLObject = this.printNode(HTMLElement, object, "",
            "Asset Administration Shell Registry", this.colors.AASColor, true);

      this.print(HTMLObject.container, object);
   }

   printSubmodelRegistryV3(HTMLElement: HTMLElement, object: TreeObject) {
      if (this.treeRoot == null)
         this.treeRoot = object;

      var HTMLObject = this.printNode(HTMLElement, object, "",
            "Submodel Registry", this.colors.AASColor, true);

      this.print(HTMLObject.container, object);
   }

   printAssetAdministrationShellDescriptorV3(HTMLElement, element, key) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.submodelElementColor, false);

      this.print(HTMLObject.container, element);
   }

   printSubmodelDescriptorV3(HTMLElement, element, key) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.submodelElementColor, false);

      this.print(HTMLObject.container, element);
   }

   printEndpointV3(HTMLElement: HTMLElement, element: TreeObject, key: string) {
      var name = null;
      if (element.getChild("interface") != null)
         name ="[" + key + "] : " +  element.getChildValue("interface").tData;
      else
         name = key;
      var HTMLObject = this.printNode(HTMLElement, element, name, "",
          this.colors.referenceColor, false);

      this.print(HTMLObject.container, element);
   }

   printProtocolInformationV3(HTMLElement: HTMLElement, element: TreeObject, 
      key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.submodelElementColor, false);

      this.print(HTMLObject.container, element);
   }

   printSecurityAttributeObjectV3(HTMLElement: HTMLElement, element: TreeObject,
      key: string) {
      var HTMLObject = this.printNode(HTMLElement, element, key, "",
          this.colors.qualifierColor, false);

      this.print(HTMLObject.container, element);
}

   handleLinkTypes(element: TreeObject) {
      if (element.getChild("value")) {
         var fURL = element.getChildValue("value").tData;
         if (this.isNull(fURL) || fURL == "")
            return null;
         if (!(fURL.startsWith("http://") ||
               fURL.startsWith("https://"))) {
            var rootUrl = this. findPropertyElementUpward(element,
               "tRootURL");
            // Relative path from current element
            if (!fURL.startsWith("/"))
               fURL = element.tURL + "/" + fURL;
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
