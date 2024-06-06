/*
 * Copyright (c) 2021 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

//import { Ajax } from "./AjaxHelper.js";
//import { Base } from "./Base.js"
//import { SubmodelPrinterGeneric } from "./SubmodelPrinterGeneric.js"
import {Ajax, Base, SubmodelPrinterGeneric} from "./imports.js"

class AjaxCallContext {
   constrcutor() {}

   URL: any;
   parentObj: any;
   object: any;
   onSuccess: any;
   onError: any;
   retry: number;
}

export class TreeObject {
   constructor() {}

   tURL: string;
   parentObj;
   childObjs;
   tType;
   tHints: hints;
   tData;
   tName: string;
   tUpdateMethod;
}

class PropertyObject {
   constructor() {}

   parentObj: any;
   childObjs: any;
   data: any;

   printer: Array<any>;
}

class hints {
   constructor() {}
   noPrint: boolean;
   noName: boolean;
   writeable: boolean;
}

type parseArrayCallback = (SubElement: string, key: string, subObject: TreeObject, subhints:hints) => void;

export enum metamodelType {
   /* extra */
   Error,
   AssetAdministrationShellRegistry,
   SubmodelRegistry,
   /* Part 2 */
   Descriptor,
   AssetAdministrationShellDescriptor,
   SubmodelDescriptor,
   Endpoint,
   ProtocolInformation,
   SecurityAttributeObject,
   SecurityType,
   /* Part 1 */
   Identifier,
   AssetAdministrationShell,
   Submodel,
   AdministrativeInformation,
   AssetKind,
   SpecificAssetId,
   /* extra Part 1 */
   value,
   String,
   Submodels,
   SubmodelElement,
   Array,
   /* extra Infrastructure */
   AssetAdministrationShellRoot,
   SubmodelRoot,
   AssetAdministrationShellRegistryRoot,
   SubmodelRegistryRoot,
   /* Legacy V2 - kann weg */
   IdentifierTypeV2,
   AssetV2,
   EntityTypeV2,
   OperationVariableV2,
   DataTypeV2,
   KeyTypeV2,
   LangStringSetV2,
   LangStringV2,
   QualifierV2,
   FormulaV2,
   AssetKindV2,
   ModelingKindV2,
   KeysV2,
   KeyV2,
   modelTypeV2,
}

export enum AssetKind {
   Type = "Type",
   Instance = "Instance",
   NotApplicable = "Not Applicable",
}

export enum SecurityTypeEnum {
   NONE = "NONE",
   RFC_TLSA = "RFC_TLSA",
   W3C_DID = "W3C_DID",
}

export class ParserBase extends Base {
   printer: any;
   AjaxHelper: Ajax.AjaxHelper;

      /* debug */
   URL;
   parentObj;
   object;
   retry;
   onSuccess;
   onError;
   context;


   constructor() {
      super();

      this.parseAAS = this.parseAAS.bind(this);
      this.parseSubmodels = this.parseSubmodels.bind(this);
      this.addSubmodelURLS = this.addSubmodelURLS.bind(this);
      this.parseSubmodel = this.parseSubmodel.bind(this);
      this.parseAsset = this.parseAsset.bind(this);
      this.parseSpecificAssetIdV3 = this.parseSpecificAssetIdV3.bind(this);
      this.parseIdentifiable = this.parseIdentifiable.bind(this);
      this.parseReferable = this.parseReferable.bind(this);
      this.parseSubmodelElement = this.parseSubmodelElement.bind(this);
      this.parseEntity = this.parseEntity.bind(this);
      this.parseEvent = this.parseEvent.bind(this);
      this.parseOperation = this.parseOperation.bind(this);
      this.parseOperationVariable = this.parseOperationVariable.bind(this);
      this.parseSubmodelElementCollection =
         this.parseSubmodelElementCollection.bind(this);
      this.parseCapability = this.parseCapability.bind(this);
      this.parseDataElement = this.parseDataElement.bind(this);
      this.parseDataType = this.parseDataType.bind(this);
      this.parseRelationshipElement = this.parseRelationshipElement.bind(this);
      this.parseString = this.parseString.bind(this);
      this.parseValue = this.parseValue.bind(this);
      this.parseSecurity = this.parseSecurity.bind(this);
      this.parseSemantics = this.parseSemantics.bind(this);
      this.parseReference = this.parseReference.bind(this);
      this.parseDataSpecification = this.parseDataSpecification.bind(this);
      this.parseAdministrativeInformation =
         this.parseAdministrativeInformation.bind(this);
      this.parseIdentifier = this.parseIdentifier.bind(this);
      this.parseIdentifierType = this.parseIdentifierType.bind(this);
      this.parseKeyType = this.parseKeyType.bind(this);
      this.parseLangStringSet = this.parseLangStringSet.bind(this);
      this.parseLangString = this.parseLangString.bind(this);
      this.parseQualifiable = this.parseQualifiable.bind(this);
      this.parseConstraint = this.parseConstraint.bind(this);
      this.parseQualifier = this.parseQualifier.bind(this);
      this.parseFormula = this.parseFormula.bind(this);
      this.parseKind = this.parseKind.bind(this);
      this.parseModelingKind = this.parseModelingKind.bind(this);
      this.parseAssetKind = this.parseAssetKind.bind(this);
      this.parseArrayV3 = this.parseArrayV3.bind(this);
      this.parseKeys = this.parseKeys.bind(this);
      this.parseKey = this.parseKey.bind(this);
      this.parseModelType = this.parseModelType.bind(this);
      this.parseAASRegistryV3 = this.parseAASRegistryV3.bind(this);
      this.parseSubmodelRegistryV3 = this.parseSubmodelRegistryV3.bind(this);
      this.parseAssetAdministrationShellDescriptorV3 =
         this.parseAssetAdministrationShellDescriptorV3.bind(this);
      this.parseSubmodelDescriptor = this.parseSubmodelDescriptor.bind(this);
      this.parseSubmodelDescriptorV3 =
         this.parseSubmodelDescriptorV3.bind(this);
      this.parseEndpointV3 = this.parseEndpointV3.bind(this);
      /* Helper */
      this.getByURL = this.getByURL.bind(this);
      this.newTreeObject = this.newTreeObject.bind(this);
      this.newPropertyObject = this.newPropertyObject.bind(this);
      this.addChildTreeObject = this.addChildTreeObject.bind(this);
      this.setTreeObjectType = this.setTreeObjectType.bind(this);
      this.setURL = this.setURL.bind(this);
      this.copyParentURL = this.copyParentURL.bind(this);
      this.setURLsOperation = this.setURLsOperation.bind(this);
      this.fixSubmodelURL = this.fixSubmodelURL.bind(this);
      this.setRootURLS = this.setRootURLS.bind(this);

      this.AjaxHelper = new Ajax.AjaxHelper();
   }

   parseAAS(JSON, object, fetchSubmodels = false, submodelsCallback = null,
            submodelsErrorCallback = null) {
      console.log(JSON);
       var aas = this.newTreeObject(JSON.idShort, object,
       metamodelType.AssetAdministrationShell);

       this.copyParentURL(aas);

      if (fetchSubmodels) {
         this.getByURL(aas,
                       aas.tURL + "/" + "submodels",
                       submodelsCallback,
                       submodelsErrorCallback);
      }

      // security [Security] - (0-1)
      if (this.elementExists(JSON, "security"))
         this.parseSecurity(JSON.security,
               "security",
               aas);
      // derivedFrom [Key(s)] - (0-1)
      if (this.elementExists(JSON, "derivedFrom"))
         this.parseKeys(JSON.derivedFrom, "derivedFrom", aas);
      // dataSpecification
      this.parseDataSpecification(JSON, name, aas);
      // Identifiable
      this.parseIdentifiable(JSON, name, aas);
      // Referable
      this.parseReferable(JSON, name, aas);
      // asset [Asset]
      if (this.elementExists(JSON, "asset"))
         this.parseAsset(JSON.asset, aas);
      // submodels [Array of Key(s)] - (0-n)
      if (this.elementExists(JSON, "submodels"))
         this.parseArray(JSON.submodels,
               "submodelsOverview",
               aas,
               this.parseKeys);
      // views [Array of Key(s)] - (0-n)
      if (this.elementExists(JSON, "views"))
         this.parseArray(JSON.views, "views", aas, this.parseKeys);

      console.log(aas);
      return aas;
   }

   parseSubmodels(JSON, object, fetchSubmodel = false, submodelCallback = null,
                  submodelErrorCallback = null) {
      if (!this.isArray(JSON)) {
         // Error ?
         return;
      }
      
      var submodelsTree = this.newTreeObject("submodels", object,
      metamodelType.Submodels);

      var submodels = this.newPropertyObject("submodels", object,
      "Submodels");
      this.setURL(submodels, "submodels");

      for (var i = 0; i < JSON.length; i++) {
         var SubElement = JSON[i];

         var submodel = this.newTreeObject("Submodel" + i, submodels as any,
                                           metamodelType.Submodel);

         if (this.elementExists(SubElement, "idShort"))
            this.parseString(SubElement.idShort, "idShort", submodel);
         // - endpoint.XYZ?

         this.addSubmodelURLS(submodel);
         if (fetchSubmodel && (submodel.URLArray.data.length > 0)) {
            var submodelPrinters = this.newPropertyObject("SubmodelPrinters",
                                                          submodels,
                                                          "SubmodelPrinters");
            submodelPrinters.printer = new Array();
            var nextURL =
               submodel.URLArray.data[submodel.URLArray.data.length -1];
            submodel.URLArray.data.pop();

            var printer = new SubmodelPrinterGeneric(
               object,
               this.printer.aasContainer,
               nextURL,
               false
               );
            submodelPrinters.printer.push(printer);
         }
      }
   }

   addSubmodelURLS(obj) {
      //ugly
      var submodels = obj.parentObj;
      var childObjs = obj.childObjs;

      var arrayObj = this.newPropertyObject("URLArray", obj, "tArray");
      arrayObj.data = new Array();

      if (this.elementExists(childObjs, "idShort")) {
         arrayObj.data.push(submodels.tURL + "/" + childObjs.idShort.tData
         + "/complete");
         arrayObj.data.push(submodels.tURL + "/" + childObjs.idShort.tData
         + "/submodel");
      }
   }

   parseSubmodel(JSON, URL, object) {
      var submodel = this.newTreeObject(JSON.idShort, object,
       metamodelType.Submodel);

      submodel.tURL = URL;
      this.fixSubmodelURL(submodel);

      // Semanctics
      this.parseSemantics(JSON, name, submodel);
      // dataSpecification
      this.parseDataSpecification(JSON, name, submodel);
      // Identifiable
      this.parseIdentifiable(JSON, name, submodel);
      // Qualifiable
      this.parseQualifiable(JSON, name, submodel);
      // Kind
      this.parseKind(JSON, name, submodel);
      // Referable
      this.parseReferable(JSON, name, submodel);
      // submodelElements [SubmodelElement] - (0-n)
      if (this.elementExists(JSON, "submodelElement")) { // Missing s in Basyx
                                                         // JSON
         console.log("Basyx Bug: submodelElement!");

         var hints_ = new hints();
         hints_.noPrint = true;
         this.parseArray(JSON.submodelElement,
               "submodelElements",
               submodel,
               this.parseSubmodelElement,
               hints_,
               "submodelElement");
      }
      if (this.elementExists(JSON, "submodelElements")) {
         var hints_ = new hints();
         hints_.noPrint = true;
         this.parseArray(JSON.submodelElements,
               "submodelElements",
               submodel,
               this.parseSubmodelElement,
               hints_);
      }
      return submodel;
   }

   parseAsset(JSON, object) {
      var asset = this.newTreeObject("asset", object, metamodelType.AssetV2);
      if (this.elementExists(JSON, "keys")) {
         var hints_: hints = new hints();
         hints_.noPrint = true;
         this.parseKeys(JSON, "Asset", asset, hints_);
      }

      // kind [AssetKind] - (1)
      if (this.elementExists(JSON, "kind"))
         this.parseAssetKind(JSON.kind, "kind", asset);
      // dataSpecification
      this.parseDataSpecification(JSON, name, asset);
      // Identifiable
      this.parseIdentifiable(JSON, name, asset);
      // Referable
      this.parseReferable(JSON, name, asset);

      // assetIdentificationModel [Key(s)] - (0-1)
      if (this.elementExists(JSON, "assetIdentificationModel"))
         this.parseKeys(JSON.assetIdentificationModel,
               "assetIdentificationModel",
               asset);
      // billOfMaterial [Key(s)] - (0-1)
      if (this.elementExists(JSON, "billOfMaterial"))
         this.parseKeys(JSON.billOfMaterial,  "billOfMaterial", asset);
   }

   parseSpecificAssetIdV3(JSON: string, name: string, obj: TreeObject) {
      var sai = this.newTreeObject(name, obj, metamodelType.SpecificAssetId);
      var jsonObj: any = JSON;
      // name [LabelType -> string] - (1)
      this.parseString(jsonObj.name, "name", sai);
      // value [Identifier] - (1)
      this.parseIdentifierV3(jsonObj.value, "value", sai);
      // externalSubjectId [Reference] - (0-1)
      if (this.elementExists(jsonObj, "externalSubjectId"))
         this.parseReferenceV3(jsonObj.externalSubjectId, "externalSubjectId",
            sai);
   }

   parseIdentifiable(JSON, name, obj) {
      // administration [AdministrativeInformation] - (0-1)
      if (this.elementExists(JSON, "administration"))
         this.parseAdministrativeInformation(JSON.administration,
               "administration",
               obj);
      // identification [Identifier]
      if (this.elementExists(JSON, "identification"))
         this.parseIdentifier(JSON.identification, "identification", obj);
   }

   parseReferable(JSON, name, obj) {
      // idShort [String]
      if (this.elementExists(JSON, "idShort"))
         this.parseString(JSON.idShort, "idShort", obj);
      // category [String] - (0 -1)
      if (this.elementExists(JSON, "category"))
         this.parseString(JSON.category, "category", obj);
      // description [LangStringSet] - (0-1)
      if (this.elementExists(JSON, "description"))
         this.parseLangStringSet(JSON.description, "description", obj);
      // parent [Referable(Pointer)] - (0-1)
      if (this.elementExists(JSON, "parent"))
         this.parseKeys(JSON.parent, "parent", obj);
   }

   parseSubmodelElement(JSON, name, obj) {
      var subElement = this.newTreeObject(name, obj, metamodelType.SubmodelElement);

      // Semanctics
      this.parseSemantics(JSON, name, subElement);
      // dataSpecification
      this.parseDataSpecification(JSON, name, subElement);
      // Referable
      this.parseReferable(JSON, name, subElement);
      // Qualifiable
      this.parseQualifiable(JSON, name, subElement);
      // Kind
      this.parseKind(JSON, name, subElement);

      var ElementType = "";

      if (this.elementExists(JSON, "modelType") &&
          this.elementExists(JSON.modelType, "name")) {
         ElementType = JSON.modelType.name;
      }

      switch (ElementType) {
      case "Operation":
         this.setURLsOperation(subElement);
         break;
      default:
         this.setURL(subElement);
         break;
      }

      switch (ElementType) {
      case "Entity":
         this.parseEntity(JSON, name, subElement);
         return;
      case "BasicEvent":
         this.parseEvent(JSON, name, subElement);
         return;
      case "Operation":
         this.parseOperation(JSON, name, subElement);
         return;
      case "SubmodelElementCollection":
         this.parseSubmodelElementCollection(JSON, name, subElement);
         return;
      case "Capability":
         this.parseCapability(JSON, name, subElement);
         return;
      case "DataElement":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "ReferenceElement":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "File":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "blob":
         /* fallthrough */
      case "Blob":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "Range":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "MultiLanguageProperty":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "Property":
         this.parseDataElement(JSON, name, subElement);
         return;
      case "RelationshipElement":
         this.parseRelationshipElement(JSON, name, subElement);
         return;
      case "AnnotatedRelationshipElement":
         this.parseRelationshipElement(JSON, name, subElement);
         return;
      default:
         console.log("Unknown SubmodelElement found:" + ElementType);
         return;
      }
   }

   parseEntity(JSON, name, obj) {
      // InheritedObject from SubmodelElement:
      // All inherited elements are already done
      this.setTreeObjectType(obj, "Entity");

      // statement [SubmodelElement] - (0-n)
      if (this.elementExists(JSON, "statement")) {
         var hints_ = new hints();
         hints_.noPrint = true;
         this.parseArray(JSON.statement,
               "statement",
               obj,
               this.parseSubmodelElement,
               hints_);
      }
      if (this.elementExists(JSON, "statements")) {
         console.log("AASX Package Explorer Bug: statements");
         var hints_ = new hints();
         hints_.noPrint = true;
         this.parseArray(JSON.statements,
               "statement",
               obj,
               this.parseSubmodelElement,
               hints_);
      }
      // entityType [EntityType]
      if (this.elementExists(JSON, "entityType"))
         this.parseEntityType(JSON.entityType, "entityType", obj);
      // asset [Asset]
      if (this.elementExists(JSON, "asset"))
         this.parseAsset(JSON.asset, obj);
   }

   parseEntityType(JSON, name, obj) {
      switch (JSON) {
      case "CoManagedEntity":
      case "SelfManagedEntity":
         break;
      default:
         return;
      }
      var entity = this.newTreeObject(name, obj, metamodelType.EntityTypeV2);
      entity.tData = JSON;
   }

   parseEvent(JSON, name, obj) {
      // InheritedObject from SubmodelElement:
      // All inherited elements are already done
      var ElementType = "";

      if (this.elementExists(JSON, "modelType") &&
            this.elementExists(JSON.modelType, "name")) {
         ElementType = JSON.modelType.name;
      }

      switch (ElementType) {
      case "BasicEvent":
         this.setTreeObjectType(obj, "BasicEvent");
         if (this.elementExists(JSON, "observed"))
            this.parseKeys(JSON.observed, "observed", obj);
         return;
      default:
         console.log("Unhandled Event (SubmodelElement) found: " + ElementType);
         return;
      }
   }

   parseOperation(JSON, name, obj) {
      // InheritedObject from SubmodelElement:
      // All inherited elements are already done

      console.log("operation: ", JSON);

      this.setTreeObjectType(obj, "Operation");

      if (this.elementExists(JSON, "inputVariable")) {
         var hints_ = new hints();
         hints_.noPrint = false;
         this.parseArray(JSON.inputVariable,
               "inputVariable",
               obj,
               this.parseOperationVariable,
               hints_);
      }
      if (this.elementExists(JSON, "inputVariables")) { // basyx extra s
         var hints_ = new hints();
         hints_.noPrint = false;
         hints_.writeable = true;
         this.parseArray(JSON.inputVariables,
               "inputVariable",
               obj,
               this.parseOperationVariable,
               hints_,
               "inputVariables");
      }
      if (this.elementExists(JSON, "inputArguments")) {
         var hints_ = new hints();
         hints_.noPrint = false;
         hints_.writeable = true;
         this.parseArray(JSON.inputArguments,
               "inputVariable",
               obj,
               this.parseOperationVariable,
               hints_,
               "inputArguments");
      }
      if (this.elementExists(JSON, "inoutputVariable")) {
         var hints_ = new hints();
         hints_.noPrint = false;
         this.parseArray(JSON.inoutputVariable,
               "inoutputVariable",
               obj,
               this.parseOperationVariable,
               hints_);
      }
      if (this.elementExists(JSON, "inoutputVariables")) { // basyx extra s
         var hints_ = new hints();
         hints_.noPrint = false;
         this.parseArray(JSON.inoutputVariables,
               "inoutputVariable",
               obj,
               this.parseOperationVariable,
               hints_,
               "inoutputVariables");
      }
      if (this.elementExists(JSON, "inoutputArguments")) {
         var hints_ = new hints();
         hints_.noPrint = false;
         this.parseArray(JSON.inoutputArguments,
               "inoutputVariable",
               obj,
               this.parseOperationVariable,
               hints_,
               "inoutputArguments");
      }
      if (this.elementExists(JSON, "outputVariable")) {
         var hints_ = new hints();
         this.parseArray(JSON.outputVariable,
               "outputVariable",
               obj,
               this.parseOperationVariable,
               hints_);
      }
      if (this.elementExists(JSON, "outputVariables")) { // basyx extra s
         var hints_ = new hints();
         hints_.noPrint = false;
         this.parseArray(JSON.outputVariables,
               "outputVariable",
               obj,
               this.parseOperationVariable,
               hints_,
               "outputVariables");
      }
      if (this.elementExists(JSON, "outputArguments")) {
         var hints_ = new hints();
         hints_.noPrint = false;
         this.parseArray(JSON.outputArguments,
               "outputVariable",
               obj,
               this.parseOperationVariable,
               hints_,
               "outputArguments");
      }
   }

   parseOperationVariable(JSON, name, obj) {
      var hints_ = new hints();
      hints_.noPrint = true;
      var subObj = this.newTreeObject(name, obj, metamodelType.OperationVariableV2);
      subObj.tHints = hints_;
      subObj.tOriginalJSON = JSON;

      // value [SubmodelElement]
      if (this.elementExists(JSON, "value"))
         this.parseSubmodelElement(JSON.value, "value", subObj);
   }

   parseSubmodelElementCollection(JSON, name, obj) {
      // InheritedObject from SubmodelElement:
      // All inherited elements are already done
      this.setTreeObjectType(obj, "SubmodelElementCollection");
      // value [SubmodelElement] (0-n)

      // Skip creating one hirachy, we do not want the "value" Element as object
      if (this.elementExists(JSON, "value")) {
         var hints_ = new hints();
         hints_.noPrint = true;
         this.parseArray(JSON.value,
               "value",
               obj,
               this.parseSubmodelElement,
               hints_,
               "",
               true);
      }
      // ordered [Boolean] (0-1)
      if (this.elementExists(JSON, "ordered"))
         this.parseString(JSON.ordered, "ordered", obj);
      // allowDuplicates [Boolean] (0-1)
      if (this.elementExists(JSON, "allowDuplicates"))
         this.parseString(JSON.allowDuplicates, "allowDuplicates", obj);
   }

   parseCapability(JSON, name, obj) {
      // Nothing TODO, all Capability Attributes are parsed already
      this.setTreeObjectType(obj, "Capability");
      return;
   }

   parseDataElement(JSON, name, obj) {
      // InheritedObject from SubmodelElement:
      // All inherited elements are already done
      var ElementType = "";

      if (this.elementExists(JSON, "modelType") &&
            this.elementExists(JSON.modelType, "name")) {
         ElementType = JSON.modelType.name;
      }

      switch (ElementType) {
      case "ReferenceElement":
         this.setTreeObjectType(obj, "ReferenceElement");
         if (this.elementExists(JSON, "value"))
            this.parseReference(JSON.value, "value", obj);
         return;
      case "File":
         this.setTreeObjectType(obj, "File");
         if (this.elementExists(JSON, "value"))
            this.parseString(JSON.value, "value", obj);
         if (this.elementExists(JSON, "mimeType"))
            this.parseString(JSON.mimeType, "mimeType", obj);
         return;
      case "blob":
         /* fallthrough */
      case "Blob":
         this.setTreeObjectType(obj, "Blob");
         if (this.elementExists(JSON, "value"))
            this.parseString(JSON.value, "value", obj);
         if (this.elementExists(JSON, "mimeType"))
            this.parseString(JSON.mimeType, "mimeType", obj);
         return;
      case "Range":
         this.setTreeObjectType(obj, "Range");
         if (this.elementExists(JSON, "min"))
            this.parseString(JSON.min, "min", obj);
         if (this.elementExists(JSON, "max"))
            this.parseString(JSON.max, "max", obj);
         if (this.elementExists(JSON, "valueType"))
            this.parseDataType(JSON.valueType, "valueType", obj);
         return;
      case "MultiLanguageProperty":
         this.setTreeObjectType(obj, "MultiLanguageProperty");
         if (this.elementExists(JSON, "value"))
            this.parseLangStringSet(JSON.value, "value", obj);
         if (this.elementExists(JSON, "valueId"))
            this.parseReference(JSON.valueId, "valueId", obj);
         return;
      case "Property":
         this.setTreeObjectType(obj, "Property");
         if (this.elementExists(JSON, "value"))
            this.parseString(JSON.value, "value", obj);
         if (this.elementExists(JSON, "valueType"))
            this.parseDataType(JSON.valueType, "valueType", obj);
         if (this.elementExists(JSON, "valueId"))
            this.parseReference(JSON.valueId, "valueId", obj);
         return;
      default:
         console.log("Unhandled DataElement found: " + ElementType);
      return;
      }
   }

   parseDataType(JSON, name, obj) {
      var object = this.newTreeObject(name, obj, metamodelType.DataTypeV2);

      if (!this.isObject(JSON))
         this.parseString(JSON, "dataObjectType", object);

      if (this.elementExists(JSON, "dataObjectType")) {
         if (this.isObject(JSON.dataObjectType)) {
            if (this.elementExists(JSON.dataObjectType, "name"))
               this.parseString(JSON.dataObjectType.name, "dataObjectType", object);
         }
         else
            this.parseString(JSON.dataObjectType, "dataObjectType", object);
      }
   }

   parseRelationshipElement(JSON, name, obj) {
      // InheritedObject from SubmodelElement:
      // All inherited elements are already done
      var ElementType = "";

      if (this.elementExists(JSON, "modelType") &&
            this.elementExists(JSON.modelType, "name")) {
         ElementType = JSON.modelType.name;
      }

      switch (ElementType) {
      case "RelationshipElement":
         this.setTreeObjectType(obj, "RelationshipElement");
         break;
      case "AnnotatedRelationshipElement":
         this.setTreeObjectType(obj, "AnnotatedRelationshipElement");
         // annotation [DataElement*] (0-n)
         if (this.elementExists(JSON, "annotation")) {
            var hints_ = new hints();
            hints_.noPrint = true;
            this.parseArray(JSON.annotation,
                  "annotation",
                  obj,
                  this.parseDataElement,
                  hints_);
         }
         break;
      default:
         console.log("Unhandled RelationshipElement found: " + ElementType);
         return;
      }

      // common attributes
      // first [Referable*]
      if (this.elementExists(JSON, "first"))
         this.parseKeys(JSON.first, "first", obj);
      // second [Referable*]
      if (this.elementExists(JSON, "second"))
         this.parseKeys(JSON.second, "second", obj);
   }

   parseString(JSON: string, name: string, obj: TreeObject) {
      this.parseValue(JSON, name, obj, metamodelType.String);
   }

   parseValue(JSON: string, name: string, obj: TreeObject, 
              tType = metamodelType.value) {
      var valueObj = this.newTreeObject(name, obj, tType);
      this.setURL(valueObj, name);
      valueObj.tData = JSON;
      if (valueObj.tUpdateMethod)
         valueObj.tUpdateMethod(valueObj);
   }

   parseSecurity(JSON, name, obj) {
      console.log("TODO: Security");
   }

   parseDataSpecification(JSON, name, obj) {
      // dataSpecification [Reference] - (0-n)
      if (this.elementExists(JSON, "dataSpecification"))
         this.parseArray(JSON.dataSpecification,
               "dataSpecification",
               obj,
               this.parseReference);
   }

   parseSemantics(JSON, name, obj) {
      // semanticId [Reference] - (0-1)
      if (this.elementExists(JSON, "semanticId"))
         this.parseReference(JSON.semanticId, "semanticId", obj);
   }

   parseReference(JSON, name, obj) {
      this.parseKeys(JSON, name, obj);
   }
   
   parseReferenceV3(JSON: string, name: string, obj: TreeObject) {
      // TODO: Reference
      console.log("TODO: Reference");
   }

   parseAdministrativeInformation(JSON, name, obj) {
      if (!this.elementExists(JSON, "version") &&
          !this.elementExists(JSON, "revision"))
         return;
      var element = this.newTreeObject(name, obj, metamodelType.AdministrativeInformation);
      if (this.elementExists(JSON, "version"))
         this.parseString(JSON.version, "version", element);
      if (this.elementExists(JSON, "revision"))
         this.parseString(JSON.revision, "revision", element);
   }

   parseAdministrativeInformationV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      if (!this.elementExists(jsonObj, "version"))
         return;
      var element = this.newTreeObject(name, obj, metamodelType.AdministrativeInformation);
      // version - VersionType -> String [0..1]
      if (this.elementExists(jsonObj, "version")) {
         this.parseString(jsonObj.version, "version", element);
      // revision - RevisionType -> String [0..1], only allowed if version exists
         if (this.elementExists(jsonObj, "revision"))
            this.parseString(jsonObj.revision, "revision", element);
      }
      // creator - Reference [0..1]
      if (this.elementExists(jsonObj, "creator"))
         this.parseReferenceV3(jsonObj.creator, "creator", element);
      // templateId - Identifier [0..1]
      if (this.elementExists(jsonObj, "templateId"))
         this.parseIdentifierV3(jsonObj.templateId, "templateId", element);
   }

   parseIdentifier(JSON, name, obj) {
      if (!this.elementExists(JSON, "id") && !this.elementExists(JSON, "value"))
         return;
      if (!this.elementExists(JSON, "idType"))
         return;
      var identifier = this.newTreeObject(name, obj, metamodelType.Identifier);
      if (this.elementExists(JSON, "id"))
         this.parseString(JSON.id, "id", identifier);
      this.parseIdentifierType(JSON.idType, "idType", identifier);
   }

      parseIdentifierV3(JSON: string, name: string, obj: TreeObject) {
         this.parseString(JSON, name, obj);
   }

   parseIdentifierType(JSON, name, obj) {
      var id = this.newTreeObject(name, obj, metamodelType.IdentifierTypeV2);
      switch (JSON) {
      case "Custom":
      case "IRDI":
      case "IRI":
         id.tData = JSON;
         break;
      default:
         id.tData = "Custom";
         break;
      }
   }

   // Details of the Asset Administration Shell Part 1 V2 - Is really another
   // type?
   parseKeyType(JSON, name, obj) {
      var element = this.newTreeObject(name, obj, metamodelType.KeyTypeV2);
      switch (JSON) {
      case "Custom":
      case "FragmentId":
      case "IdShort":
      case "IRDI":
      case "IRI":
         element.tData = JSON;
         break;
      default:
         element.tData = "Custom";
         break;
      }
   }

   parseLangStringSet(JSON, name, obj) {
      if (!this.isArray(JSON) || JSON.length < 1)
         return;
      var element = this.newTreeObject(name, obj, metamodelType.LangStringSetV2);
      for(var key in JSON) {
         var SubElement = JSON[key];
         this.parseLangString(SubElement, key, element);
      }
   }

   parseLangString(JSON, name, obj) {
      if (!this.elementExists(JSON, "language"))
         return;
      var element = this.newTreeObject(name, obj, metamodelType.LangStringV2);
      this.parseString(JSON.language, "language", element);

      if (this.elementExists(JSON, "description"))
        this.parseString(JSON.description, "description", element);
      // old Basyx:
      if (this.elementExists(JSON, "text"))
         this.parseString(JSON.text, "description", element);
   }

   parseMultiLanguageTextTypeV3(JSON: string, name: string, obj: TreeObject) {
      // TODO: MultiLanguageTextType
      // Ablösung von LangStringSet für lange Strings!
      console.log("TODO: MultiLanguageTextType");
   }

   parseMultiLanguageNameTypeV3(JSON: string, name: string, obj: TreeObject) {
      // TODO: MultiLanguageNameType
      // Ablösung von LangStringSet für _kurze_ Strings!
      console.log("TODO: MultiLanguageNameType");
   }

   parseExtensionsV3(JSON: string, name: string, obj: TreeObject) {
      // TODO: Extensions
      console.log("TODO: Extensions");
   }

   parseExtensionV3(JSON: string, name: string, obj: TreeObject) {
      // TODO: Extension
      console.log("TODO: Extension");
   }

   parseQualifiable(JSON, name, obj) {
      var hints_ = new hints();
      hints_.noPrint = true;

      // qualifier [Constraint] - (0-n)
      if (this.elementExists(JSON, "qualifier"))
         this.parseArray(JSON.qualifier,
               "qualifier",
               obj,
               this.parseConstraint);
      // basyx bug, ought to be "qualifier"
      if (this.elementExists(JSON, "constraints")) {
         console.log("Basyx Bug: constraints instead of qualifier");
         this.parseArray(JSON.constraints,
               "constraints",
               obj,
               this.parseConstraint);
      }
      // basyx bug, ought to be "qualifier"
      if (this.elementExists(JSON, "qualifiers")) {
         console.log("Basyx Bug: qualifiers instead of qualifier");
         this.parseArray(JSON.qualifiers,
               "qualifiers",
               obj,
               this.parseConstraint,
               hints_);
      }
   }

   parseConstraint(JSON, name, obj) {
      // Indicator: dependsOn [Reference] (0 - n)
      if (this.elementExists(JSON, "dependsOn"))
         this.parseFormula(JSON, name, obj);
      else
         this.parseQualifier(JSON, name, obj)
   }

   parseQualifier(JSON, name, obj) {
      var element = this.newTreeObject(name, obj, metamodelType.QualifierV2);

      // Semanctics
      this.parseSemantics(JSON, name, element);

      // type [QualifierType] (String)
      if (this.elementExists(JSON, "type"))
         this.parseString(JSON.type, "type", element);
      // valueType [DataTypeDef]
      if (this.elementExists(JSON, "valueType"))
         this.parseDataType(JSON.valueType, "valueType", element);
      // value [ValueDataType] (0 - 1)
      if (this.elementExists(JSON, "value"))
         this.parseString(JSON.value, "value", element);
      // valueId [Reference] (0 - 1)
      if (this.elementExists(JSON, "valueId"))
         this.parseReference(JSON.valueId, "valueId", element);
   }

   parseFormula(JSON, name, obj) {
      var element = this.newTreeObject(name, obj, metamodelType.FormulaV2);
      // dependsOn [Reference] - (0-n)
      if (this.elementExists(JSON, "dependsOn"))
         this.parseArray(JSON.dependsOn,
               "dependsOn",
               element,
               this.parseReference);
   }

   parseKind(JSON, name, obj) {
      // kind [ModelingKind] - (0-1) - Instance
      if (this.elementExists(JSON, "kind"))
         this.parseModelingKind(JSON.kind, "kind", obj);
   }

   parseModelingKind(JSON, name, obj) {
      switch(JSON) {
      default:
         /* return here */
         return;
      case "Template":
      case "Instance":
         break;
      }

      var modelingkind = this.newTreeObject(name, obj, metamodelType.ModelingKindV2);
      modelingkind.tData = JSON;
   }

   parseAssetKind(JSON, name, obj) {
      switch(JSON) {
      default:
         /* return here */
         return;
      case "Type":
      case "Instance":
         break;
      }
      var assetkind = this.newTreeObject(name, obj, metamodelType.AssetKindV2);
      assetkind.tData = JSON;
   }

   parseAssetKindV3(JSON: string, name: string, obj: TreeObject) {
      var t: AssetKind;
      switch (JSON) {
      case "Type":
         t = AssetKind.Type;
         break;
      case "Instance":
         t = AssetKind.Instance;
         break;
      default:
         /* fallthrough */
      case "NotApplicable":
         t = AssetKind.NotApplicable;
         break;
      }
      var assetkind = this.newTreeObject(name, obj, metamodelType.AssetKind);
      assetkind.tData = t;
   }

   // callback: The method to call for every array element
   parseArray(JSON: string, name: string, obj: TreeObject, 
              callback: parseArrayCallback, hints_: hints = new hints(),
              URLname: string = name, skipObjHierachy: boolean = false) {
      if(JSON.length < 1)
         return;
      var subobj = null;
      if (skipObjHierachy)
         subobj = obj;
      else {
         subobj = this.newTreeObject(name, obj, metamodelType.Array);
         this.setURL(subobj, URLname);
         subobj.tHints = hints_;
      }

      for(var key in JSON as any) {
            var SubElement = JSON[key];
            var shints = new hints();
            shints.noPrint = true;
            callback(SubElement, key, subobj, shints);
      }
   }

   // callback: The method to call for every array element
   parseArrayV3(JSON: string, name: string, obj: TreeObject, 
              callback: parseArrayCallback, hints_: hints = new hints(),
              URLname: string = name, skipObjHierachy: boolean = false) {
      if(JSON.length < 1)
         return;
      var subobj = null;
      if (skipObjHierachy)
         subobj = obj;
      else {
         subobj = this.newTreeObject(name, obj, metamodelType.Array);
         this.setURL(subobj, URLname);
         subobj.tHints = hints_;
      }

      for(var key in JSON as any) {
            var SubElement = JSON[key];
            var shints = new hints();
            shints.noPrint = true;
            callback(SubElement, key, subobj, shints);
      }
   }

   parseKeys(JSON, name, obj, hints_: hints = new hints()) {
      var subobj = this.newTreeObject(name, obj, metamodelType.KeysV2);
      subobj.tHints = hints_;
      if (this.elementExists(JSON, "keys") && JSON.keys.length > 0)
         for(var key in JSON.keys) {
            var SubElement = JSON.keys[key];
            var ehints = new hints();
            ehints.noName = true;
            this.parseKey(SubElement, key, subobj, ehints);
         }
   }

   parseKey(JSON, name, obj, hints_: hints = new hints()) {
      var key = this.newTreeObject(name, obj, metamodelType.KeyV2);
      key.hints = hints_;
      this.parseKeyType(JSON.idType, "idType", key);
      this.parseString(JSON.local, "local", key);
      this.parseString(JSON.value, "value", key);
      this.parseModelType(JSON.type, "type", key);
   }

   parseModelType(JSON, name, obj) {
      var type = this.newTreeObject(name, obj, metamodelType.modelTypeV2);
      switch (JSON) {
      case "Asset":
      case "AssetAdministrationShell":
      case "ConceptDescription":
      case "Submodel":
      case "AccessPermissionRule":
      case "AnnotatedRelationshipElement":
      case "BasicEvent":
      case "Blob":
      case "Capability":
      case "ConceptDictionary":
      case "DataElement":
      case "File":
      case "Entity":
      case "Event":
      case "MultiLanguageProperty":
      case "Operation":
      case "Property":
      case "Range":
      case "ReferenceElement":
      case "RelationshipElement":
      case "SubmodelElement":
      case "SubmodelElementCollection":
      case "View":
      case "GlobalReference":
      case "FragmentReference":
      case "Constraint":
      case "Formula":
      case "Qualifier":
         type.tData = JSON;
         break;
      default:
         type.tData = "Unknown model Type";
         break;
      }
   }

   parseAASRegistryV3(JSON: string, object: TreeObject) {
      var registry = this.newTreeObject("AAS Registry" /*JSON.idShort*/, object,
         metamodelType.AssetAdministrationShellRegistry);

      this.copyParentURL(registry);

      this.parseArrayV3(JSON, "AssetAdministrationShellDescriptors", registry,
         this.parseAssetAdministrationShellDescriptorV3, new hints(),
         "AssetAdministrationShellDescriptors", true);
      return registry;
   }

   parseSubmodelRegistryV3(JSON: string, object: TreeObject) {
      var registry = this.newTreeObject("Submodel Registry" /*JSON.idShort*/, object,
         metamodelType.SubmodelRegistry);

      this.copyParentURL(registry);

      this.parseArrayV3(JSON, "SubmodelDescriptors", registry,
         this.parseSubmodelDescriptorV3, new hints(),
         "SubmodelDescriptors", true);
      return registry;
   }

   parseDescriptorV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      if (this.elementExists(jsonObj, "description"))
         this.parseMultiLanguageTextTypeV3(jsonObj.description,
            "description", obj);
      if (this.elementExists(jsonObj, "displayName"))
         this.parseMultiLanguageNameTypeV3(jsonObj.displayName,
            "displayName", obj);
      if (this.elementExists(jsonObj, "extension"))
         this.parseExtensionsV3(jsonObj.extension,
            "extension", obj);
   }

   parseAssetAdministrationShellDescriptorV3(JSON: string, key: string,
                                             obj: TreeObject,
                                             subhints: hints) {
      var name = null;
      var jsonObj: any = JSON;

      if (this.elementExists(jsonObj, "idShort"))
          name = jsonObj.idShort;
      else
          name = jsonObj.id;

      var aasDescriptor = this.newTreeObject(name, obj,
         metamodelType.AssetAdministrationShellDescriptor);

      this.parseDescriptorV3(JSON, name, aasDescriptor);

      // administration [AdministrativeInformation] - (0-1)
      if (this.elementExists(jsonObj, "administration"))
         this.parseAdministrativeInformationV3(jsonObj.administration,
            "adminstration", aasDescriptor);

      // assetKind [AssetKind] - (0-1)
      if (this.elementExists(jsonObj, "assetKind"))
         this.parseAssetKindV3(jsonObj.assetKind,
            "assetKind", aasDescriptor);

      // assetType [Identifier] - (0-1)
      if (this.elementExists(jsonObj, "assetType"))
         this.parseIdentifierV3(jsonObj.assetType,
            "assetType", aasDescriptor);

      // globalAssetId [Identifier] - (0-1)
      if (this.elementExists(jsonObj, "globalAssetId"))
         this.parseIdentifierV3(jsonObj.globalAssetId, "globalAssetId",
            aasDescriptor);

      // idShort [NameType -> String] - (0-1)
      if (this.elementExists(jsonObj, "idShort"))
         this.parseIdentifierV3(jsonObj.idShort, "idShort", aasDescriptor);

      // id [Identifier] - (1)
         this.parseIdentifierV3(jsonObj.id, "id", aasDescriptor);

      // specificAssetId [SpecificAssetId] - (0-n)
      if (this.elementExists(jsonObj, "specificAssetId"))
         this.parseArrayV3(jsonObj.specificAssetId, "specificAssetId",
            aasDescriptor, this.parseSpecificAssetIdV3);

      // endpoint [Endpoint] - (0-n)
      if (this.elementExists(jsonObj, "endpoint"))
         this.parseArrayV3(jsonObj.endpoint,
               "endpoint",
               aasDescriptor,
               this.parseEndpointV3);
      // BUG: endpoints [Endpoint] - (0-n)
      if (this.elementExists(jsonObj, "endpoints"))
         this.parseArrayV3(jsonObj.endpoints,
               "endpoint",
               aasDescriptor,
               this.parseEndpointV3);

      // submodelDescriptor [submodelDescriptor] - (0-n)
      if (this.elementExists(jsonObj, "submodelDescriptor"))
         this.parseArray(jsonObj.submodelDescriptor,
               "submodelDescriptors",
               aasDescriptor,
               this.parseSubmodelDescriptorV3);

      // submodelDescriptor [submodelDescriptor] - (0-n)
      if (this.elementExists(jsonObj, "submodelDescriptors")) {
         this.parseArray(jsonObj.submodelDescriptors,
               "submodelDescriptors",
               aasDescriptor,
               this.parseSubmodelDescriptorV3);
      }
   }

   parseSubmodelDescriptor(JSON, name, obj) {
      var registryElement = this.newTreeObject(JSON.idShort, obj,
         metamodelType.SubmodelDescriptor);

      // administration [AdministrativeInformation] - (0-1)
      if (this.elementExists(JSON, "administration"))
         this.parseAdministrativeInformation(JSON.administration,
            "adminstration", registryElement);
      // Identifiable
      this.parseIdentifiable(JSON, name, registryElement);
      // Referable
      this.parseReferable(JSON, name, registryElement);

      // endpoint [Reference] - (0-1)
      if (this.elementExists(JSON, "endpoint"))
         this.parseArray(JSON.endpoint,
               "endpoint",
               registryElement,
               this.parseKeys);
      // Bug endpoints -> endpoint
      if (this.elementExists(JSON, "endpoints")) {
         console.log("Bug: endpoints instead of endpoint");
         this.parseArray(JSON.endpoints,
               "endpoint",
               registryElement,
               this.parseEndpoint);
      }

      this.parseSemantics(JSON, "semantics", registryElement);
   }

   parseSubmodelDescriptorV3(JSON: string, name: string, obj: TreeObject) {
      // TODO: parseSubmodelDescriptor
      console.log("TODO: parseSubmodelDescriptor");
   }


   parseEndpoint(JSON, name, obj) {
      var endpoint = this.newTreeObject(name, obj,
         metamodelType.Endpoint);
      if (this.elementExists(JSON, "address"))
         this.parseString(JSON.address, "address", endpoint);
      if (this.elementExists(JSON, "type"))
         this.parseString(JSON.type, "type", endpoint);

      if (this.elementExists(endpoint.childObjs, "type") &&
          endpoint.childObjs.type.tData.startsWith("http") &&
          this.elementExists(endpoint.childObjs, "address") &&
          !this.hasInParentTreeType(obj, "SubmodelDescriptor")) {
//            if (this.addURLToList)
//               this.addURLToList(endpoint.childObjs.address.tData);
         }
   }

   parseEndpointV3(JSON: string, name: string, obj: TreeObject) {
      var endpoint = this.newTreeObject(name, obj, metamodelType.Endpoint);
      var jsonObj: any = JSON;
      // protocolInformation [ProtocolInformation] - (1)
      this.parseProtocolInformationV3(jsonObj.protocolInformation,
         "protocolInformation", endpoint);
      // interface [ShortIdType -> string] - (1)
      this.parseString(jsonObj.interface, "interface", endpoint);
   }

   parseProtocolInformationV3(JSON: string, name: string, obj: TreeObject) {
      var pi = this.newTreeObject(name, obj, metamodelType.ProtocolInformation);
      var jsonObj: any = JSON;
      // href [String 2048 -> string] - (1)
      this.parseString(jsonObj.href, "href", pi);
      // endpointProtocol [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "endpointProtocol"))
         this.parseString(jsonObj.endpointProtocol, "endpointProtocol", pi);
      // endpointProtocolVersion [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "endpointProtocolVersion"))
         this.parseArray(jsonObj.endpointProtocolVersion,
            "endpointProtocolVersion", pi, this.parseString);
      // subprotocol [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "subprotocol"))
         this.parseString(jsonObj.subprotocol, "subprotocol", pi);
      // subprotocolBody [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "subprotocolBody"))
         this.parseString(jsonObj.subprotocolBody, "subprotocolBody", pi);
      // subprotocolBodyEncoding [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "subprotocolBodyEncoding"))
         this.parseString(jsonObj.subprotocolBodyEncoding,
            "subprotocolBodyEncoding", pi);
      // securityAttributes [SecurityAttributeObject] - (1-n)
      // BUG: securityAttribures not available
      if (this.elementExists(jsonObj, "securityAttributes"))
         this.parseArrayV3(jsonObj.securityAttributes, "securityAttributes", pi,
            this.parseSecurityAttributeObjectV3);
   }

   parseSecurityAttributeObjectV3(JSON: string, name: string, obj: TreeObject) {
      var sattr = this.newTreeObject(name, obj, 
         metamodelType.SecurityAttributeObject);
      var jsonObj: any = JSON;
      // type [SecurityTypeEnum -> string] - (1)
      this.parseSecurityTypeEnumV3(jsonObj.type, "type", sattr);
      // key [string] - (1)
      this.parseString(jsonObj.key, "key", sattr);
      // value [string] - (1)
      this.parseString(jsonObj.value, "value", sattr);
   }

   parseSecurityTypeEnumV3(JSON: string, name: string, obj: TreeObject) {
      var t: SecurityTypeEnum;
      switch (JSON) {
      case "W3C_DID":
         t = SecurityTypeEnum.W3C_DID;
         break;
      case "RFC_TLSA":
         t = SecurityTypeEnum.RFC_TLSA;
         break;
      default:
         /* fallthrough */
      case "NONE":
         t = SecurityTypeEnum.NONE;
         break;
      }
      var st = this.newTreeObject(name, obj, metamodelType.SecurityType);
      st.tData = t;
   }

   getByURL(object, urlStr, onSuccess, onError) {
      if (!urlStr)
         return;
      urlStr = urlStr.replaceAll("#", "%23");
      var compound = new AjaxCallContext();
      compound.URL = urlStr;
      compound.parentObj = this;
      compound.object = object;
      compound.onSuccess = onSuccess;
      compound.onError = onError;
      compound.retry = 0;

      this.AjaxHelper.getJSON(urlStr,
                              compound.onSuccess,
                              compound.onError,
                              compound);
      return;
   }

   newTreeObject(name: string, parentObj: TreeObject, type: metamodelType,
                 overwrite: boolean = false) {
      if (!overwrite && this.isObject(parentObj) &&
          this.elementExists(parentObj.childObjs, name))
         return parentObj.childObjs[name];

      var obj = new TreeObject();
      obj.parentObj = parentObj;
      obj.childObjs = new Object();
      obj.tType = type;
      obj.tHints = new hints();
      obj.tData = new Object();
      obj.tName = name;
      obj.tUpdateMethod = null;
      if (this.isObject(parentObj))
         parentObj.childObjs[name] = obj;
      return obj;
   }

   newPropertyObject(name, parentObj, type) {
      var obj = new PropertyObject();
      obj.parentObj = parentObj;
      obj.childObjs = new Object();
      if (this.isObject(parentObj))
         parentObj[name] = obj;
      return obj;
   }

   addChildTreeObject(obj, childObj, childObjName) {
      obj.childObjs[childObjName] =childObj;
   }

   setTreeObjectType(obj, type) {
      obj.tType = type;
   }

   setURL(object, name = "") {
      if (!this.elementExists(object.parentObj, "tURL"))
         return false;
      var parentURL = object.parentObj.tURL;

      if (name == "") {
         name = object.childObjs.idShort.tData;
      }
      object.tURL = parentURL + "/" + name;

      return true;
   }

   copyParentURL(object) {
      if (!this.elementExists(object.parentObj, "tURL"))
         return false;
      var parentURL = object.parentObj.tURL;
      object.tURL = parentURL;
      return true;
   }

   setURLsOperation(object, name = "") {
      if (!this.setURL(object, name))
         return;
      object.tURLInvoke = object.tURL + "/" + "invoke";
   }

   fixSubmodelURL(submodel) {
      // fix up AAS Package Explorer Rest Server URLS
      if (submodel.tURL.endsWith("/complete")) {
         var l = "complete".length;
         submodel.tOriginalURL = submodel.tURL;
         submodel.tURL = submodel.tURL.substr(0, submodel.tURL.length - l - 1)
            + "/submodel";
      }
   }

   setRootURLS(rootElement, URL, removePathElementsCount) {
      rootElement.tRootURL = this.trimSuffixSlash(URL.origin);
      rootElement.tLocalRootURL = rootElement.tRootURL;
      var temp_path = URL.pathname + URL.hash;
      var split = temp_path.split("/");
      for (var i = 1; i < split.length - removePathElementsCount; i++)
         rootElement.tLocalRootURL += "/" + split[i];
   }

   trimSuffixSlash(URL) {
      if (!URL.endsWith("/"))
         return URL;
      return URL.slice(0, - 1);
   }
}
