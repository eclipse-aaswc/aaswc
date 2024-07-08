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

export class Pair<A, B> {
   constructor(a: A, b: B) { this.first = a; this.second = b;}
   first: A;
   second: B;
}

export class TreeObject {
   constructor(name: string, parentObj: TreeObject, type: metamodelType) {
      this.childs = new Array<Pair<string, TreeObject>>();
      this.tName = name;
      this.parentObj = parentObj;
      this.tType = type;
      this.tHints = new hints();

      this.tData = new Object();
      this.tUpdateMethod = null;

      if (parentObj != null)
         parentObj.appendChild(name, this);
   }

   tURL: string;
   tURLInvoke: string;
   parentObj: TreeObject;
   childs: Array<Pair<string, TreeObject>>;
   tType: metamodelType;
   tHints: hints;
   tData;
   tName: string;
   tUpdateMethod;

   getChild(name: string): Pair<string, TreeObject> {
      for (var element of this.childs) {
         if (element.first == name)
            return element;
      }
      return null;
   }

   getChildValue(name: string): TreeObject {
      var p = this.getChild(name);
      if (p != null)
         return p.second;
      return null;
   }

   appendChild(name: string, obj: TreeObject) {
      var p: Pair<string, TreeObject> = new Pair(name, obj);
      this.childs.push(p);
   }

   setTreeObjectType(type: metamodelType) {
      this.tType = type;
   }

   setURL(name = ""): boolean {
      var parentURL = this.parentObj.tURL;
      if (name == "") {
         var named = this.getChild("idShort");
         if (named != null)
            name = named.second.tData;
         else
            return false;
      }
      this.tURL = parentURL + "/" + name;
      return true;
   }

   setURLsOperation(name: string = "") {
      if (!this.setURL(name))
         return;
      this.tURLInvoke = this.tURL + "/" + "invoke";
   }
}

class PropertyObject {
   constructor() {}

   parentObj: any;
   childObjs: any;
   data: any;

   printer: Array<any>;
}

class hints {
   constructor(noPrint = false, noName = false, writeable = false) {
      this.noPrint = noPrint;
      this.noName = noName;
      this.writeable = writeable;
   }
   noPrint: boolean;
   noName: boolean;
   writeable: boolean;
}

type parseArrayCallback = (SubElement: string, key: string, subObject: TreeObject, subhints:hints) => void;

export enum metamodelType {
   /* Part 2 */
   Descriptor = "Descriptor",
   AssetAdministrationShellDescriptor = "AssetAdministrationShellDescriptor",
   SubmodelDescriptor = "SubmodelDescriptor",
   Endpoint = "Endpoint",
   ProtocolInformation = "ProtocolInformation",
   SecurityAttributeObject = "SecurityAttributeObject",
   SecurityType = "SecurityType",
   /* Part 1 */
   Identifier = "Identifier",
   AssetAdministrationShell = "AssetAdministrationShell",
   Submodel = "Submodel",
   AdministrativeInformation = "AdministrativeInformation",
   AssetKind = "AssetKind",
   SpecificAssetId = "SpecificAssetId",
   Reference = "Reference",
   ReferenceType = "ReferenceType",
   Key = "Key",
   KeyType = "KeyType",
   Extension = "Extension",
   DataTypeDefXsd = "DataTypeDefXsd",
   ValueDataType = "ValueDataType",
   AssetInformation = "AssetInformation",
   Resource = "Ressource",
   Operation = "Operation",
   OperationVariable = "OperationVariable",
   File = "File",
   Blob = "Blob",
   EventElement = "EventElement",
   BasicEventElement = "BasicEventElement",
   Direction = "Direction",
   StateOfEvent = "StateOfEvent",
   Capability = "Capability",
   RelationshipElement = "RelationshipElement",
   AnnotatedRelationshipElement = "AnnotatedRelationshipElement",
   ReferenceElement = "ReferenceElement",
   SubmodelElementCollection = "SubmodelElementCollection",
   SubmodelElementList = "SubmodelElementList",
   Property = "Property",
   MultiLanguageProperty = "MultiLanguageProperty",
   Range = "Range",
   Entity = "Entity",
   EntityType = "EntityType",
   ModellingKind = "ModellingKind",
   Qualifier = "Qualifier",
   QualifierKind = "QualifierKind",
   AasSubmodelElements = "AasSubmodelElements",
   MultiLanguageNameType = "MultiLanguageNameType",
   MultiLanguageTextType = "MultiLanguageTextType",
   /* extra Part 1 */
   value = "Value",
   String = "String",
   SubmodelElement = "SubmodelElement",
   DataElement = "DataElement",
   Array = "Array",
   /* extra Infrastructure */
   Submodels = "Submodels",
   AssetAdministrationShellRoot = "AssetAdministrationShellRoot",
   SubmodelRoot = "SubmodelRoot",
   AssetAdministrationShellRegistryRoot = "AssetAdministrationShellRegistryRoot",
   SubmodelRegistryRoot  = "SubmodelRegistryRoot",
   /* extra */
   Error = "InternalError",
   AssetAdministrationShellRegistry = "AssetAdministrationShellRegistry",
   SubmodelRegistry = "SubmodelRegistry",
}

export enum AssetKind {
   Type = "Type",
   Instance = "Instance",
   NotApplicable = "Not Applicable",
}

export enum EntityType {
   CoManagedEntity = "CoManagedEntity",
   SelfManagedEntity = "SelfManagedEntity",
}

export enum ModellingKind {
   Instance = "Instance",
   Template = "Template",
}

export enum SecurityTypeEnum {
   NONE = "NONE",
   RFC_TLSA = "RFC_TLSA",
   W3C_DID = "W3C_DID",
}

export enum ReferenceTypes {
   ExternalReference = "ExternalReference",
   ModelReference = "ModelReference",
}

export enum KeyTypes {
   AnnotationRelationshipElement ="AnnotationRelationshipElement",
   AssetAdministrationShell = "AssetAdministrationShell",
   BasicEventElement = "BasicEventElement",
   Blob = "Blob",
   Capability = "Capability",
   ConceptDescription = "ConceptDescription",
   DataElement = "DataElement",
   Entity = "Entity",
   EventElement = "EventElement",
   File = "File",
   FragmentReference = "FragmentReference",
   GlobalReference = "GlobalReference",
   Identifiable = "Identifiable",
   MultiLanguageProperty = "MultiLanguageProperty",
   Operation = "Operation",
   Property = "Property",
   Range = "Range",
   Referable = "Referable",
   ReferenceElement = "ReferenceElement",
   RelationshipElement = "RelationshipElement",
   Submodel = "Submodel",
   SubmodelElement = "SubmodelElement",
   SubmodelElementCollection = "SubmodelElementCollection",
   SubmodelElementList = "SubmodelElementList",
}

export enum QualifierKind /* experimental V3 */ {
   ValueQualifier = "ValueQualifier",
   ConceptQualifier = "ConceptQualifier",
   TemplateQualifier = "TemplateQualifier",
}

export enum DataTypeDefXsd {
   anyURI = "xs:anyURI",
   base64Binary = "xs:base64Binary",
   boolean = "xs:boolean",
   byte = "xs:byte",
   date = "xs:date",
   dateTime = "xs:dateTime",
   decimal = "xs:decimal",
   double = "xs:double",
   duration = "xs:duration",
   gDay = "xs:gDay",
   gMonth = "xs:gMonth",
   gMonthDay = "xs:gMonthDay",
   gYear = "xs:gYear",
   gYearMonth = "xs:gYearMonth",
   float = "xs:float",
   hexBinary = "xs:hexBinary",
   int = "xs:int",
   integer = "xs:integer",
   long = "xs:long",
   negativeInteger = "xs:negativeInteger",
   nonNegativeInteger = "xs:nonNegativeInteger",
   nonPositiveInteger = "xs:nonPositiveInteger",
   positiveInteger = "xs:positiveInteger",
   short = "xs:short",
   string = "xs:string",
   time = "xs:time",
   unsignedByte = "xs:unsignedByte",
   unsigendInt = "xs:unsigendInt",
   unsignedLong = "xs:unsignedLong",
   unsignedShort = "xs:unsignedShort",
}

export enum Direction {
   input = "input",
   output = "output",
}

export enum StateOfEvent {
   on = "on",
   off = "off",
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

      this.parseAASV3 = this.parseAASV3.bind(this);
      this.parseSubmodelV3 = this.parseSubmodelV3.bind(this);
      this.parseAssetInformationV3 = this.parseAssetInformationV3.bind(this);
      this.parseSpecificAssetIdV3 = this.parseSpecificAssetIdV3.bind(this);
      this.parseIdentifiableV3 = this.parseIdentifiableV3.bind(this);
      this.parseReferableV3 = this.parseReferableV3.bind(this);
      this.parseHasExtensionsV3 = this.parseHasExtensionsV3.bind(this);
      this.parseSubmodelElementV3 = this.parseSubmodelElementV3.bind(this);
      this.parseEntityV3 = this.parseEntityV3.bind(this);
      this.parseEntityTypeV3 = this.parseEntityTypeV3.bind(this);
      this.parseEventElementV3 = this.parseEventElementV3.bind(this);
      this.parseBasicEventElementV3 = this.parseBasicEventElementV3.bind(this);
      this.parseEventDirectionV3 = this.parseEventDirectionV3.bind(this);
      this.parseStateOfEventV3 = this.parseStateOfEventV3.bind(this);
      this.parseMessageTopicTypeV3 = this.parseMessageTopicTypeV3.bind(this);
      this.parseOperationV3 = this.parseOperationV3.bind(this);
      this.parseOperationVariableV3 = this.parseOperationVariableV3.bind(this);
      this.parseSubmodelElementCollectionV3 =
         this.parseSubmodelElementCollectionV3.bind(this);
      this.parseSubmodelElementListV3 =
         this.parseSubmodelElementListV3.bind(this);
      this.parseAasSubmodelElementsV3 =
         this.parseAasSubmodelElementsV3.bind(this);
      this.parseCapabilityV3 = this.parseCapabilityV3.bind(this);
      this.parseDataElementV3 = this.parseDataElementV3.bind(this);
      this.parsePropertyV3 = this.parsePropertyV3.bind(this);
      this.parseMultiLanguagePropertyV3 =
         this.parseMultiLanguagePropertyV3.bind(this);
      this.parseRangeV3 = this.parseRangeV3.bind(this);
      this.parseReferenceElementV3 = this.parseReferenceElementV3.bind(this);
      this.parseFileV3 = this.parseFileV3.bind(this);
      this.parseBlobV3 = this.parseBlobV3.bind(this);
      this.parseRelationShipElementV3 =
         this.parseRelationShipElementV3.bind(this);
      this.parseString = this.parseString.bind(this);
      this.parseValue = this.parseValue.bind(this);
      this.parseValueDataTypeV3 = this.parseValueDataTypeV3.bind(this);
      this.parseResourceV3 = this.parseResourceV3.bind(this);
      this.parseHasSemanticsV3 = this.parseHasSemanticsV3.bind(this);
      this.parseReferenceV3 = this.parseReferenceV3.bind(this);
      this.parseAddResolveSubmodelReferenceV3 =
         this.parseAddResolveSubmodelReferenceV3.bind(this);
      this.parseReferenceTypesV3 = this.parseReferenceTypesV3.bind(this);
      this.parseHasDataSpecificationV3 =
         this.parseHasDataSpecificationV3.bind(this);
      this.parseLabelTypeV3 = this.parseLabelTypeV3.bind(this);
      this.parseNameTypeV3 = this.parseNameTypeV3.bind(this);
      this.parseMultiLanguageTextTypeV3 =
         this.parseMultiLanguageTextTypeV3.bind(this);
      this.parseMultiLanguageNameTypeV3 =
         this.parseMultiLanguageNameTypeV3.bind(this);
      this.parsePathTypeV3 = this.parsePathTypeV3.bind(this);
      this.parseBlobTypeV3 = this.parseBlobTypeV3.bind(this);
      this.parseExtensionV3 = this.parseExtensionV3.bind(this);
      this.parseQualifiableV3 = this.parseQualifiableV3.bind(this);
      this.parseQualifierV3 = this.parseQualifierV3.bind(this);
      this.parseQualifierKindV3 = this.parseQualifierKindV3.bind(this);
      this.parseQualifierTypeV3 = this.parseQualifierTypeV3.bind(this);
      this.parseHasKindV3 = this.parseHasKindV3.bind(this);
      this.parseModellingKindV3 = this.parseModellingKindV3.bind(this);
      this.parseArrayV3 = this.parseArrayV3.bind(this);
      this.parseKeyV3 = this.parseKeyV3.bind(this);
      this.parseKeyTypesV3 = this.parseKeyTypesV3.bind(this);
      this.parseAASRegistryV3 = this.parseAASRegistryV3.bind(this);
      this.parseSubmodelRegistryV3 = this.parseSubmodelRegistryV3.bind(this);
      this.parseAssetAdministrationShellDescriptorV3 =
         this.parseAssetAdministrationShellDescriptorV3.bind(this);
      this.parseSubmodelDescriptorV3 =
         this.parseSubmodelDescriptorV3.bind(this);
      this.parseEndpointV3 = this.parseEndpointV3.bind(this);
      /* Helper */
      this.getByURL = this.getByURL.bind(this);
      this.newTreeObject = this.newTreeObject.bind(this);
      this.newPropertyObject = this.newPropertyObject.bind(this);
      this.copyParentURL = this.copyParentURL.bind(this);
      this.setRootURLS = this.setRootURLS.bind(this);

      this.AjaxHelper = new Ajax.AjaxHelper();
   }

   parseAASV3(JSON: string, object: TreeObject, fetchSubmodels: boolean = false,
         submodelsCallback = null, submodelsErrorCallback = null): TreeObject {
      console.log(JSON);
      var jsonObj: any = JSON;
      var aas = this.newTreeObject(jsonObj.id, object,
         metamodelType.AssetAdministrationShell);

      this.copyParentURL(aas);

      // derivedFrom - ModelReference<AssetAdministrationShell> (0-1)
      if (this.elementExists(jsonObj, "derivedFrom"))
         this.parseReferenceV3(jsonObj.derivedFrom, "derivedFrom", aas);
      // Parent class Identifiable
      this.parseIdentifiableV3(JSON, "", aas);
      // Parent class HasDataSpecification
      this.parseHasDataSpecificationV3(JSON, "", aas);
      // assetInformation - AssetInformation (1)
      this.parseAssetInformationV3(jsonObj.assetInformation,
         "assetInformation", aas);

      var h: hints = new hints(false);
      // submodel - ModelReference<Submodel> (0-1)
      if (this.elementExists(jsonObj, "submodel"))
         this.parseArrayV3(jsonObj.submodel, "Submodel Overview", aas,
         this.parseAddResolveSubmodelReferenceV3, h);
      // Bug: submodels
      if (this.elementExists(jsonObj, "submodels"))
         this.parseArrayV3(jsonObj.submodels, "Submodel Overview", aas,
         this.parseAddResolveSubmodelReferenceV3, h);

      console.log(aas);
      return aas;
   }

   parseSubmodelV3(JSON: string, URL: string, object: TreeObject) {
      console.log(JSON);
      var jsonObj: any = JSON;
      var submodel = this.newTreeObject(jsonObj.id, object,
         metamodelType.Submodel);

      // Inherited class Identifiable
      this.parseIdentifiableV3(JSON, "", submodel);
      // Inherited class HasKind
      this.parseHasKindV3(JSON, "", submodel);
      // Inherited class Has Semantics
      this.parseHasSemanticsV3(JSON, "", submodel);
      // Inherited class Qualifiable
      this.parseQualifiableV3(JSON, "", submodel);
      // Inherited class HasDataSpecification
      this.parseHasDataSpecificationV3(JSON, "", submodel);
      // submodelElement - SubmodelElement (0-n)
      if (this.elementExists(jsonObj, "submodelElement"))
         this.parseArrayV3(jsonObj.submodelElement, "submodelElement", submodel,
            this.parseSubmodelElementV3);
      // Bug submodelElements
      if (this.elementExists(jsonObj, "submodelElements"))
         this.parseArrayV3(jsonObj.submodelElements, "submodelElement", submodel,
            this.parseSubmodelElementV3);

      console.log(submodel);
      return submodel;
   }

   parseAssetInformationV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var ai = this.newTreeObject(name, obj, metamodelType.AssetInformation);
      // assetKind - AssetKind (1)
      this.parseAssetKindV3(jsonObj.assetKind, "assetKind", ai);
      // globalAssetId - Identifier (0-1)
      if (this.elementExists(jsonObj, "globalAssetId"))
         this.parseIdentifierV3(jsonObj.globalAssetId, "globalAssetId", ai);
      // assetType - Identifier (0-1)
      if (this.elementExists(jsonObj, "assetType"))
         this.parseIdentifierV3(jsonObj.assetType, "assetType", ai);
      // defaultThumbnail - Resource (0-1)
      if (this.elementExists(jsonObj, "defaultThumbnail"))
         this.parseResourceV3(jsonObj.defaultThumbnail, "defaultThumbnail", ai);
      // specificAssetId - SpecificAssetId (0-n)
      if (this.elementExists(jsonObj, "specificAssetId"))
         this.parseArrayV3(jsonObj.specificAssetId, "specificAssetId", ai,
            this.parseSpecificAssetIdV3);
      // Bug: specificAssetIds
      if (this.elementExists(jsonObj, "specificAssetIds"))
         this.parseArrayV3(jsonObj.specificAssetIds, "specificAssetId", ai,
            this.parseSpecificAssetIdV3);
   }

   parseSpecificAssetIdV3(JSON: string, name: string, obj: TreeObject) {
      var sai = this.newTreeObject(name, obj, metamodelType.SpecificAssetId);
      var jsonObj: any = JSON;
      // name [LabelType -> string] - (1)
      this.parseLabelTypeV3(jsonObj.name, "name", sai);
      // value [Identifier] - (1)
      this.parseIdentifierV3(jsonObj.value, "value", sai);
      // externalSubjectId [Reference] - (0-1)
      if (this.elementExists(jsonObj, "externalSubjectId"))
         this.parseReferenceV3(jsonObj.externalSubjectId, "externalSubjectId",
            sai);
   }

   parseIdentifiableV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      // administration - AdministrativeInformation - (0-1)
      if (this.elementExists(jsonObj, "administration"))
         this.parseAdministrativeInformationV3(jsonObj.administration,
            "adminstration", obj);
      // id [Identifier] - (1)
      this.parseIdentifierV3(jsonObj.id, "id", obj);
      // Inherited class Referable
      this.parseReferableV3(JSON, name, obj);
   }

   parseReferableV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      // category - NameType (0-1)
      if (this.elementExists(jsonObj, "category"))
         this.parseNameTypeV3(jsonObj.category,
            "category", obj);
      // idShort - NameType (0-1)
      if (this.elementExists(jsonObj, "idShort"))
         this.parseNameTypeV3(jsonObj.idShort,
            "idShort", obj);
      // displayName - MultiLanguageNameType (0-1)
      if (this.elementExists(jsonObj, "displayName"))
         this.parseArrayV3(jsonObj.displayName,
            "displayName", obj, this.parseMultiLanguageNameTypeV3);
      // description - MultiLanguageTextType (0-1)
      if (this.elementExists(jsonObj, "description"))
         this.parseArrayV3(jsonObj.description,
            "description", obj, this.parseMultiLanguageTextTypeV3);
      // Inherited class HasExtensions
      this.parseHasExtensionsV3(JSON, name, obj);
   }

   parseHasExtensionsV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      // extension - Extension (0-n)
      if (this.elementExists(jsonObj, "extension"))
         this.parseArrayV3(jsonObj.extension,
            "extension", obj, this.parseExtensionV3);
      // Bug: extensions
      if (this.elementExists(jsonObj, "extension"))
         this.parseArrayV3(jsonObj.extensions,
            "extension", obj, this.parseExtensionV3);
   }

   parseSubmodelElementV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var sme = this.newTreeObject(name, obj, metamodelType.SubmodelElement);

      // Inherited class Referable
      this.parseReferableV3(JSON, "", sme);
      // Inherited class HasSemantics
      this.parseHasSemanticsV3(JSON, "", sme);
      // Inherited class Qualifiable
      this.parseQualifiableV3(JSON, "", sme);
      // Inherited class HasDataSpecification
      this.parseHasDataSpecificationV3(JSON, "", sme);

      var elementType: metamodelType = metamodelType.SubmodelElement;
      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      switch (elementType) {
      case metamodelType.RelationshipElement:
         this.parseRelationShipElementV3(JSON, name, sme);
         return;
      case metamodelType.AnnotatedRelationshipElement:
         this.parseRelationShipElementV3(JSON, name, sme);
         return;
      case metamodelType.Property:
         this.parseDataElementV3(JSON, name, sme);
         return;
      case metamodelType.MultiLanguageProperty:
         this.parseDataElementV3(JSON, name, sme);
         return;
      case metamodelType.Range:
         this.parseDataElementV3(JSON, name, sme);
         return;
      case metamodelType.Blob:
         this.parseDataElementV3(JSON, name, sme);
         return;
      case metamodelType.File:
         this.parseDataElementV3(JSON, name, sme);
         return;
      case metamodelType.ReferenceElement:
         this.parseDataElementV3(JSON, name, sme);
         return;
      case metamodelType.Capability:
         this.parseCapabilityV3(JSON, name, sme);
         return;
      case metamodelType.SubmodelElementList:
         this.parseSubmodelElementListV3(JSON, name, sme);
         return;
      case metamodelType.SubmodelElementCollection:
         this.parseSubmodelElementCollectionV3(JSON, name, sme);
         return;
      case metamodelType.Entity:
         this.parseEntityV3(JSON, name, sme);
         return;
      case metamodelType.BasicEventElement:
         this.parseEventElementV3(JSON, name, sme);
         return;
      case metamodelType.Operation:
         this.parseOperationV3(JSON, name, sme);
         return;
      default:
         /* do nothing */
         console.log("Unknown SubmodelElement found:" + elementType);
         break;
      }
   }

   parseEntityV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.Entity);
      // entityType - EntityType (1)
      this.parseEntityTypeV3(jsonObj.entityType, "entityType", obj);
      // globalAssetId - Identifier (0-1)
      if (this.elementExists(jsonObj, "globalAssetId"))
         this.parseIdentifierV3(jsonObj.globalAssetId, "globalAssetId", obj);

      var hints_ = new hints(true);
      // specificAssetId - SpecificAssetId (0-n)
      if (this.elementExists(jsonObj, "specificAssetId"))
         this.parseArrayV3(jsonObj.specificAssetId,
            "specificAssetId", obj, this.parseSpecificAssetIdV3, hints_);
      if (this.elementExists(jsonObj, "specificAssetId"))
         this.parseArrayV3(jsonObj.specificAssetIds,
            "specificAssetId", obj, this.parseSpecificAssetIdV3, hints_);
      // statement - SubmodelElement  (0-n)
      if (this.elementExists(jsonObj, "statement"))
         this.parseArrayV3(jsonObj.statement,
            "statement", obj, this.parseSubmodelElementV3, hints_);
      if (this.elementExists(jsonObj, "statements"))
         this.parseArrayV3(jsonObj.statements,
            "statement", obj, this.parseSubmodelElementV3, hints_);
   }

   parseEntityTypeV3(JSON: string, name: string, obj: TreeObject) {
      var et = this.newTreeObject(name, obj, metamodelType.EntityType);
      var ete: EntityType = JSON as EntityType;
      et.tData = ete;
   }

   parseEventElementV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.EventElement);

      var elementType: metamodelType = metamodelType.SubmodelElement;
      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      switch (elementType) {
      case metamodelType.BasicEventElement:
         this.parseBasicEventElementV3(JSON, name, obj);
         return;
      default:
         console.log("Unhandled Event (SubmodelElement) found: " + elementType);
         break;
      }
   }

   parseBasicEventElementV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.BasicEventElement);

      // observed - ModelReference<Referable> (1)
      this.parseReferenceV3(jsonObj.observed, "observed", obj);
      // direction - Direction (1)
      this.parseEventDirectionV3(jsonObj.direction, "direction", obj);
      // state - StateOfEvent (1)
      this.parseStateOfEventV3(jsonObj.direction, "direction", obj);
      // messageTopic - MessageTopicType (0-1)
      if (this.elementExists(jsonObj, "messageTopic"))
         this.parseMessageTopicTypeV3(jsonObj.messageTopic,
            "messageTopic", obj);
      // messageBroker - ModelReference<Referable> (0-1)
      if (this.elementExists(jsonObj, "messageBroker"))
         this.parseReferenceV3(jsonObj.messageBroker, "messageBroker", obj);
      // lastUpdate - dateTime (0-1)
      if (this.elementExists(jsonObj, "lastUpdate"))
         this.parseString(jsonObj.lastUpdate, "lastUpdate", obj);
      // minInterval - duration (0-1)
      if (this.elementExists(jsonObj, "minInterval"))
         this.parseString(jsonObj.minInterval, "minInterval", obj);
      // maxInterval - duration (0-1)
      if (this.elementExists(jsonObj, "maxInterval"))
         this.parseString(jsonObj.maxInterval, "maxInterval", obj);
   }

   parseEventDirectionV3(JSON: string, name: string, obj: TreeObject) {
      var d: Direction = JSON as Direction;
      var dob = this.newTreeObject(name, obj, metamodelType.Direction);
      dob.tData = d;
   }

   parseStateOfEventV3(JSON: string, name: string, obj: TreeObject) {
      var st: StateOfEvent = JSON as StateOfEvent;
      var stoe = this.newTreeObject(name, obj, metamodelType.StateOfEvent);
      stoe.tData = st;
   }

   parseMessageTopicTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseString(JSON, name, obj);
   }

   parseOperationV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.Operation);

      var hints_ = new hints(true);
      // inputVariable - OperationVariable (0-n)
      if (this.elementExists(jsonObj, "inputVariable"))
         this.parseArrayV3(jsonObj.inputVariable, "inputVariable", obj,
            this.parseOperationVariableV3, hints_);
      if (this.elementExists(jsonObj, "inputVariables"))
         this.parseArrayV3(jsonObj.inputVariables, "inputVariable", obj,
            this.parseOperationVariableV3, hints_);
      // outputVariable - OperationVariable (0-n)
      if (this.elementExists(jsonObj, "outputVariable"))
         this.parseArrayV3(jsonObj.outputVariable, "outputVariable", obj,
            this.parseOperationVariableV3, hints_);
      if (this.elementExists(jsonObj, "outputVariables"))
         this.parseArrayV3(jsonObj.outputVariables, "outputVariable", obj,
            this.parseOperationVariableV3, hints_);
      // inoutputVariable - OperationVariable (0-n)
      if (this.elementExists(jsonObj, "inoutputVariable"))
         this.parseArrayV3(jsonObj.inoutputVariable, "inoutputVariable", obj,
            this.parseOperationVariableV3, hints_);
      if (this.elementExists(jsonObj, "inoutputVariables"))
         this.parseArrayV3(jsonObj.inoutputVariables, "inoutputVariable", obj,
            this.parseOperationVariableV3, hints_);
      }

   parseOperationVariableV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var opv = this.newTreeObject(name, obj, metamodelType.OperationVariable);
      var hints_ = new hints(true);
      opv.tHints = hints_;
      // value - SubmodelElement (1)
      if (this.elementExists(jsonObj, "value"))
         this.parseSubmodelElementV3(jsonObj.value, "value", opv);
   }

   parseSubmodelElementCollectionV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.SubmodelElementCollection);

      var hints_ = new hints(true);
      // value - SubmodelElement (0-n)
      if (this.elementExists(jsonObj, "value"))
         this.parseArrayV3(jsonObj.value,
            "value", obj, this.parseSubmodelElementV3, hints_);
      if (this.elementExists(jsonObj, "values"))
         this.parseArrayV3(jsonObj.values,
            "value", obj, this.parseSubmodelElementV3, hints_);
   }

   parseSubmodelElementListV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.SubmodelElementList);

      // orderRelevant - boolean -> String (0-1)
      if (this.elementExists(jsonObj, "orderRelevant"))
         this.parseString(jsonObj.orderRelevant, "orderRelevant", obj);
      // semanticIdListElement - Reference (0-1)
      if (this.elementExists(jsonObj, "semanticIdListElement"))
         this.parseReferenceV3(jsonObj.semanticIdListElement,
            "semanticIdListElement", obj);
      // typeValueListElement - AasSubmodelElements (0-1)
      if (this.elementExists(jsonObj, "typeValueListElement"))
         this.parseAasSubmodelElementsV3(jsonObj.typeValueListElement,
            "typeValueListElement", obj);
      // valueTypeListElement - DataTypeDefXsd (0-1)
      if (this.elementExists(jsonObj, "valueTypeListElement"))
         this.parseDataTypeDefXsdV3(jsonObj.valueTypeListElement,
            "valueTypeListElement", obj);

      var hints_ = new hints(false);
      // value - SubmodelElement (0-n)
      if (this.elementExists(jsonObj, "value"))
         this.parseArrayV3(jsonObj.value,
            "value", obj, this.parseSubmodelElementV3, hints_);
      if (this.elementExists(jsonObj, "values"))
         this.parseArrayV3(jsonObj.values,
            "value", obj, this.parseSubmodelElementV3, hints_);
   }

   parseAasSubmodelElementsV3(JSON: string, name: string, obj: TreeObject) {
      var ase = this.newTreeObject(name, obj, metamodelType.AasSubmodelElements);
      var k: metamodelType = JSON as metamodelType;
      switch (k) {
      case metamodelType.AnnotatedRelationshipElement:
      case metamodelType.BasicEventElement:
      case metamodelType.Blob:
      case metamodelType.Capability:
      case metamodelType.DataElement:
      case metamodelType.Entity:
      case metamodelType.EventElement:
      case metamodelType.File:
      case metamodelType.MultiLanguageProperty:
      case metamodelType.Operation:
      case metamodelType.Property:
      case metamodelType.Range:
      case metamodelType.ReferenceElement:
      case metamodelType.RelationshipElement:
      case metamodelType.SubmodelElement:
      case metamodelType.SubmodelElementCollection:
      case metamodelType.SubmodelElementList:
      /* Fallthrough for all above */
        break;
      default:
         k = metamodelType.SubmodelElement;
         break;
      }
      ase.tData = k;
   }

   parseCapabilityV3(JSON: string, name: string, obj: TreeObject) {
      // Nothing TODO, all Capability Attributes are parsed already
      obj.setTreeObjectType(metamodelType.Capability);
      return;
   }

   parseDataElementV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;

      var elementType: metamodelType = metamodelType.DataElement;
      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      switch (elementType) {
      case metamodelType.Property:
         this.parsePropertyV3(JSON, name, obj);
         return;
      case metamodelType.MultiLanguageProperty:
         this.parseMultiLanguagePropertyV3(JSON, name, obj);
         return;
      case metamodelType.Range:
         this.parseRangeV3(JSON, name, obj);
         return;
      case metamodelType.ReferenceElement:
         this.parseReferenceElementV3(JSON, name, obj);
         return;
      case metamodelType.File:
         this.parseFileV3(JSON, name, obj);
         return;
      case metamodelType.Blob:
         this.parseBlobV3(JSON, name, obj);
         return;
      default:
         console.log("Unhandled DataElement found: " + elementType);
         return;
      }
   }

   parsePropertyV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.Property);
      // valueType - DataTypeDefXsd (1)
      this.parseDataTypeDefXsdV3(jsonObj.valueType, "valueType", obj);
      // value - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "value"))
         this.parseValueDataTypeV3(jsonObj.value, "value", obj);
      // valueId - Reference (0-1)
      if (this.elementExists(jsonObj, "valueId"))
         this.parseReferenceV3(jsonObj.valueId, "valueId", obj);
   }

   parseMultiLanguagePropertyV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.MultiLanguageProperty);
      // value - MultiLanguageTextType (0-1)
      if (this.elementExists(jsonObj, "value"))
         this.parseArrayV3(jsonObj.value,
            "value", obj, this.parseMultiLanguageTextTypeV3);
      // valueId - Reference (0-1)
      if (this.elementExists(jsonObj, "valueId"))
         this.parseReferenceV3(jsonObj.valueId, "valueId", obj);
   }

   parseRangeV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.Range);
      // valueType - DataTypeDefXsd (1)
      this.parseDataTypeDefXsdV3(jsonObj.valueType, "valueType", obj);
      // min - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "min"))
         this.parseValueDataTypeV3(jsonObj.min, "min", obj);
      // max - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "max"))
         this.parseValueDataTypeV3(jsonObj.max, "max", obj);
   }

   parseReferenceElementV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.ReferenceElement);
      // value - Reference (0-1)
      if (this.elementExists(jsonObj, "value"))
         this.parseReferenceV3(jsonObj.value, "value", obj);
   }

   parseFileV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.File);
      // value - PathType (0-1)
      if (this.elementExists(jsonObj, "value"))
         this.parsePathTypeV3(jsonObj.value, "value", obj);
      // contentType - ContentType (1)
      this.parseContentTypeV3(jsonObj.contentType, "contentType", obj);
   }

   parseBlobV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      obj.setTreeObjectType(metamodelType.Blob);
      // value - BlobType (0-1)
      if (this.elementExists(jsonObj, "value"))
         this.parseBlobTypeV3(jsonObj.value, "value", obj);
      // contentType - ContentType (1)
      this.parseContentTypeV3(jsonObj.contentType, "contentType", obj);
   }

   parseDataTypeDefXsdV3(JSON: string, name: string, obj: TreeObject) {
      var dt: TreeObject = this.newTreeObject(name, obj,
            metamodelType.DataTypeDefXsd);
      var d: DataTypeDefXsd = JSON as DataTypeDefXsd
      dt.tData = d;
   }

   parseRelationShipElementV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var elementType = metamodelType.SubmodelElement;

      this.parseReferenceV3(jsonObj.first, "first", obj);
      this.parseReferenceV3(jsonObj.second, "second", obj);

      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      switch (elementType) {
      case metamodelType.RelationshipElement:
         obj.setTreeObjectType(metamodelType.RelationshipElement);
         break;
      case metamodelType.AnnotatedRelationshipElement:
         obj.setTreeObjectType(metamodelType.AnnotatedRelationshipElement);
         if (this.elementExists(jsonObj, "annotation"))
            this.parseArrayV3(jsonObj.annotation,
               "annotation", obj, this.parseSubmodelElementV3);
         if (this.elementExists(jsonObj, "annotations"))
            this.parseArrayV3(jsonObj.annotations,
               "annotation", obj, this.parseSubmodelElementV3);
         break;
      default:
         console.log("Unhandled RelationshipElement found: " + elementType);
         break;
      }
   }

   parseString(JSON: string, name: string, obj: TreeObject) {
      this.parseValue(JSON, name, obj, metamodelType.String);
   }

   parseValue(JSON: string, name: string, obj: TreeObject, 
              tType = metamodelType.value) {
      var valueObj = this.newTreeObject(name, obj, tType);
      valueObj.setURL(name);
      valueObj.tData = JSON;
      if (valueObj.tUpdateMethod)
         valueObj.tUpdateMethod(valueObj);
   }

   parseValueDataTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseValue(JSON, name, obj, metamodelType.ValueDataType)
   }

   parseResourceV3(JSON: string, name: string, obj: TreeObject) {
      var r: TreeObject = this.newTreeObject(name, obj, metamodelType.Resource);
      var jsonObj: any = JSON;
      // path - PathType (1)
      this.parsePathTypeV3(jsonObj.path, "path", r);
      // contentType - ContentType (0-1)
      if (this.elementExists(jsonObj, "contentType"))
         this.parseContentTypeV3(jsonObj.contentType, "contentType", r);
   }

   parseHasDataSpecificationV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      // dataSpecification - Reference - (0-n)
      if (this.elementExists(jsonObj, "dataSpecification"))
         this.parseArrayV3(jsonObj.dataSpecification,
            "dataSpecification", obj, this.parseReferenceTypesV3);
      // Bug dataSpecifications
      if (this.elementExists(jsonObj, "dataSpecifications"))
         this.parseArrayV3(jsonObj.dataSpecifications,
            "dataSpecification", obj, this.parseReferenceTypesV3);
   }

   parseHasSemanticsV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      // semanticId - Reference - (0-1)
      if (this.elementExists(jsonObj, "semanticId"))
         this.parseReferenceV3(jsonObj.semanticId, "semanticId", obj);
      // supplementalSemanticId - Reference (0-n)
      if (this.elementExists(jsonObj, "supplementalSemanticId"))
         this.parseArrayV3(jsonObj.supplementalSemanticId,
            "supplementalSemanticId", obj, this.parseReferenceV3);
      // Bug: supplementalSemanticIds
      if (this.elementExists(jsonObj, "supplementalSemanticIds"))
         this.parseArrayV3(jsonObj.supplementalSemanticIds,
            "supplementalSemanticId", obj, this.parseReferenceV3);
   }

   parseReferenceV3(JSON: string, name: string, obj: TreeObject): TreeObject {
      var jsonObj: any = JSON;
      var ref: TreeObject = this.newTreeObject(name, obj,
         metamodelType.Reference);

      // type - ReferenceType - (0-1)
      this.parseReferenceTypesV3(jsonObj.type, "Reference type", ref);

      // referredSemanticId - Reference (0-1)
      if (this.elementExists(jsonObj, "referredSemanticId"))
         this.parseReferenceV3(jsonObj.referredSemanticId,
            "referredSemanticId", ref);

       var hints_: hints = new hints(true);
      // key <<ordered>>  [Key] - (1-n)
      if (this.elementExists(jsonObj, "key"))
         this.parseArrayV3(jsonObj.key, "key", ref, this.parseKeyV3, hints_);
      // Bug: keys
      if (this.elementExists(jsonObj, "keys"))
         this.parseArrayV3(jsonObj.keys, "key", ref, this.parseKeyV3, hints_);

      return ref;
   }

   parseAddResolveSubmodelReferenceV3(JSON: string, name: string,
         obj: TreeObject) {
      
      var ref: TreeObject = this.parseReferenceV3(JSON, name, obj);

      // TODO: Resolve Submodels via Registry
      console.log("TODO: Resolve Submodel via Registry");
   }

   parseReferenceTypesV3(JSON: string, name: string, obj: TreeObject) {
      var rt = this.newTreeObject(name, obj, metamodelType.ReferenceType);
      var r: ReferenceTypes = JSON as ReferenceTypes;
      rt.tData = r;
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

   parseIdentifierV3(JSON: string, name: string, obj: TreeObject) {
      this.parseString(JSON, name, obj);
   }

   parseLabelTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseString(JSON, name, obj);
   }

   parseNameTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseString(JSON, name, obj);
   }

   parseMultiLanguageTextTypeV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var mlnt = this.newTreeObject(name, obj, metamodelType.MultiLanguageTextType);
      if (this.elementExists(jsonObj, "language"))
         this.parseString(jsonObj.language, "language", mlnt);
      if (this.elementExists(jsonObj, "text"))
         this.parseString(jsonObj.text, "text", mlnt);
   }

   parseMultiLanguageNameTypeV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var mlnt = this.newTreeObject(name, obj, metamodelType.MultiLanguageNameType);
      if (this.elementExists(jsonObj, "language"))
         this.parseString(jsonObj.language, "language", mlnt);
      if (this.elementExists(jsonObj, "text"))
         this.parseString(jsonObj.text, "text", mlnt);
   }

   parsePathTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseIdentifierV3(JSON, name, obj);
   }

   parseBlobTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseString(JSON, name, obj);
   }

   parseContentTypeV3(JSON: string, name: string, obj: TreeObject) {
      this.parseString(JSON, name, obj);
   }

   parseExtensionV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var ext = this.newTreeObject(name, obj, metamodelType.Extension);
      // name - NameType (1)
      this.parseNameTypeV3(jsonObj.name, "name", ext);
      // valueType - DataTypeDefXsd (0-1)
      if (this.elementExists(jsonObj, "valueType"))
      this.parseDataTypeDefXsdV3(jsonObj.valueType, "valueType", ext);
      // value - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "value"))
      this.parseValueDataTypeV3(jsonObj.value, "value", ext);
      // refersTo - ModelReference<Referable> (0-n)
      if (this.elementExists(jsonObj, "refersTo"))
      this.parseArrayV3(jsonObj.refersTo, "refersTo", ext,
         this.parseReferenceV3);
      // Bug: refersTos
      if (this.elementExists(jsonObj, "refersTos"))
      this.parseArrayV3(jsonObj.refersTos, "refersTo", ext,
         this.parseReferenceV3);
      // Inherited class HasSemantics
      this.parseHasSemanticsV3(JSON, name, ext);
   }

   parseQualifiableV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var hints_: hints = new hints(true);
      // qualifier - Qualifier (0-n)
      if (this.elementExists(jsonObj, "qualifier"))
      this.parseArrayV3(jsonObj.qualifier, "qualifier", obj,
         this.parseQualifierV3, hints_);
      // Bug: qualifiers
      if (this.elementExists(jsonObj, "qualifiers"))
      this.parseArrayV3(jsonObj.qualifiers, "qualifier", obj,
         this.parseQualifierV3, hints_);
   }

   parseQualifierV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      var q = this.newTreeObject(name, obj, metamodelType.Qualifier);

      // kind - QualifierKind (0-1)
      if (this.elementExists(jsonObj, "kind"))
         this.parseQualifierKindV3(jsonObj.kind, "kind", q);
      // type - QualifierType (1)
      this.parseQualifierTypeV3(jsonObj.type, "type", q);
      // valueType - DataTypeDefXsd (1)
      this.parseDataTypeDefXsdV3(jsonObj.valueType, "valueType", q)
      // value - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "value"))
         this.parseValueDataTypeV3(jsonObj.value, "value", q);
      // valueId - Reference (0-1)
      if (this.elementExists(jsonObj, "valueId"))
         this.parseReferenceV3(jsonObj.valueId, "valueId", q);
      /* Inherited class HasSemantics */
      this.parseHasSemanticsV3(jsonObj, name, q);
   }

   parseQualifierKindV3(JSON: string, name: string, obj: TreeObject) {
      var qk = this.newTreeObject(name, obj, metamodelType.QualifierKind);
      var qke: QualifierKind = JSON as QualifierKind;
      qk.tData = qke;
   }

   parseQualifierTypeV3(JSON: string, name: string, obj: TreeObject) {
      /* String?! */
      this.parseString(JSON, name, obj);
   }

   parseHasKindV3(JSON: string, name: string, obj: TreeObject) {
      var jsonObj: any = JSON;
      // kind - ModellingKind (0-1)
      if (this.elementExists(jsonObj, "kind"))
         this.parseModellingKindV3(jsonObj.kind, "kind", obj);
   }

   parseModellingKindV3(JSON: string, name: string, obj: TreeObject) {
      var mk = this.newTreeObject(name, obj, metamodelType.ModellingKind);
      var mke: ModellingKind = JSON as ModellingKind;
      mk.tData = mke;
   }

   parseAssetKindV3(JSON: string, name: string, obj: TreeObject) {
      var t: AssetKind = JSON as AssetKind;
      var assetkind = this.newTreeObject(name, obj, metamodelType.AssetKind);
      assetkind.tData = t;
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
         subobj.setURL(URLname);
         subobj.tHints = hints_;
      }

      for(var key in JSON as any) {
            var SubElement = JSON[key];
            var shints = new hints();
            shints.noPrint = true;
            callback(SubElement, key, subobj, shints);
      }
   }

   parseKeyV3(JSON: string, name: string, obj: TreeObject,
      hints_: hints = new hints()) {
      var jsonObj: any = JSON;
      var  k: TreeObject = this.newTreeObject(name, obj, metamodelType.Key);
      // type - KeyTypes - (1)
      this.parseKeyTypesV3(jsonObj.type, "type", k);
      // value - Identifier - (1)
      this.parseIdentifierV3(jsonObj.value, "value", k);
   }

   parseKeyTypesV3(JSON: string, name: string, obj: TreeObject) {
      var kt: TreeObject = this.newTreeObject(name, obj, metamodelType.KeyType);
      var k: KeyTypes = JSON as KeyTypes;
      kt.tData = k;
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
         this.parseArrayV3(jsonObj.description,
            "description", obj, this.parseMultiLanguageTextTypeV3);
      if (this.elementExists(jsonObj, "displayName"))
         this.parseArrayV3(jsonObj.displayName,
            "displayName", obj, this.parseMultiLanguageNameTypeV3);
      if (this.elementExists(jsonObj, "extension"))
         this.parseArrayV3(jsonObj.extension,
            "extension", obj, this.parseExtensionV3);
      // Bug extensions
      if (this.elementExists(jsonObj, "extensions"))
         this.parseArrayV3(jsonObj.extensions,
            "extension", obj, this.parseExtensionV3);
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
         this.parseNameTypeV3(jsonObj.idShort, "idShort", aasDescriptor);

      // id [Identifier] - (1)
         this.parseIdentifierV3(jsonObj.id, "id", aasDescriptor);

      // specificAssetId [SpecificAssetId] - (0-n)
      if (this.elementExists(jsonObj, "specificAssetId"))
         this.parseArrayV3(jsonObj.specificAssetId, "specificAssetId",
            aasDescriptor, this.parseSpecificAssetIdV3);
      // Bug specificAssetIds
      if (this.elementExists(jsonObj, "specificAssetIds"))
         this.parseArrayV3(jsonObj.specificAssetIds, "specificAssetId",
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
         this.parseArrayV3(jsonObj.submodelDescriptor,
               "submodelDescriptors",
               aasDescriptor,
               this.parseSubmodelDescriptorV3);

      // submodelDescriptor [submodelDescriptor] - (0-n)
      if (this.elementExists(jsonObj, "submodelDescriptors")) {
         this.parseArrayV3(jsonObj.submodelDescriptors,
               "submodelDescriptors",
               aasDescriptor,
               this.parseSubmodelDescriptorV3);
      }
   }

   parseSubmodelDescriptorV3(JSON: string, name: string, obj: TreeObject) {
      var name: string;
      var jsonObj: any = JSON;

      if (this.elementExists(jsonObj, "idShort"))
          name = jsonObj.idShort;
      else
          name = jsonObj.id;

      var smDescriptor = this.newTreeObject(name, obj,
         metamodelType.SubmodelDescriptor);

      this.parseDescriptorV3(JSON, name, smDescriptor);

      // administration [AdministrativeInformation] - (0-1)
      if (this.elementExists(jsonObj, "administration"))
         this.parseAdministrativeInformationV3(jsonObj.administration,
            "adminstration", smDescriptor);

      // idShort [NameType -> String] - (0-1)
      if (this.elementExists(jsonObj, "idShort"))
         this.parseNameTypeV3(jsonObj.idShort, "idShort", smDescriptor);

      // id [Identifier] - (1)
         this.parseIdentifierV3(jsonObj.id, "id", smDescriptor);

      // semanticId [Reference] - (0-1)
      if (this.elementExists(jsonObj, "semanticId"))
         this.parseReferenceV3(jsonObj.semanticId, "semanticId", smDescriptor);

      // supplementalSemanticId [Reference] - (0-n)
      if (this.elementExists(jsonObj, "supplementalSemanticId"))
         this.parseArrayV3(jsonObj.supplementalSemanticId,
            "supplementalSemanticId", smDescriptor, this.parseReferenceV3);
      // Bug supplementalSemanticIds
      if (this.elementExists(jsonObj, "supplementalSemanticIds"))
         this.parseArrayV3(jsonObj.supplementalSemanticIds,
            "supplementalSemanticId", smDescriptor, this.parseReferenceV3);

      // endpoint [Endpoint] - (0-n)
      if (this.elementExists(jsonObj, "endpoint"))
         this.parseArrayV3(jsonObj.endpoint,
               "endpoint",
               smDescriptor,
               this.parseEndpointV3);
      // BUG: endpoints [Endpoint] - (0-n)
      if (this.elementExists(jsonObj, "endpoints"))
         this.parseArrayV3(jsonObj.endpoints,
               "endpoint",
               smDescriptor,
               this.parseEndpointV3);
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
         this.parseArrayV3(jsonObj.endpointProtocolVersion,
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
      var t: SecurityTypeEnum = JSON as SecurityTypeEnum;
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
                 overwrite: boolean = false): TreeObject {
      if (!overwrite && this.isObject(parentObj) &&
          parentObj.getChild(name) != null)
         return parentObj.getChild(name).second;

      var obj: TreeObject = new TreeObject(name, parentObj, type);
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

   copyParentURL(object) {
      if (!this.elementExists(object.parentObj, "tURL"))
         return false;
      var parentURL = object.parentObj.tURL;
      object.tURL = parentURL;
      return true;
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
