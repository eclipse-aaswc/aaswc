/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import {Ajax, Base, SubmodelPrinterGeneric, util,types, interfaces,
   metamodelV3, registryV3 } from "./imports.js"

class AjaxCallContext {
   constrcutor() {}

   path: any;
   parentObj: any;
   object: any;
   onSuccess: any;
   onError: any;
   retry: number;
}

export class TreeObject {
   constructor(name: string, parentObj: TreeObject, metamodelType:
         types.metamodelType) {
      this.childs = new Array<util.Pair<string, TreeObject>>();
      this.parentObj = parentObj;
      this.name = name;
      this.metamodelObj = null;
      this.metamodelType = metamodelType;
      this.path = "";
      this.parentObj = null;

   }

   path: string;
   parentObj: TreeObject;
   childs: Array<util.Pair<string, TreeObject>>;
   name: string;
   metamodelObj: any;
   metamodelType: types.metamodelType;

   setParent(newParent: TreeObject) {
      if (this.parentObj) {
         this.parentObj.removeChild(this.name);
         this.parentObj = null;
      }
      if (newParent != null) {
         newParent.appendChild(this.name, this);
         this.parentObj = newParent;
      }
   }

   removeChild(name: string) {
      var i:number = 0;
      for (var element of this.childs) {
         if (element.getFirst() == name) {
            this.childs.splice(i, 1);
         }
         i = i + 1;
      }
   }

   getChild(name: string): util.Pair<string, TreeObject> {
      for (var element of this.childs) {
         if (element.getFirst() == name)
            return element;
      }
      return null;
   }

   getChildValue(name: string): TreeObject {
      var p = this.getChild(name);
      if (p != null)
         return p.getSecond();
      return null;
   }

   appendChild(name: string, obj: TreeObject) {
      var p: util.Pair<string, TreeObject> = new util.Pair(name, obj);
      this.childs.push(p);
   }

   setPath(name = "", absolute: boolean = false): boolean {
      if (absolute) {
         this.path = name;
         return true;
      }
      var pPath = this.parentObj.getPath();
      this.path = pPath + "/" + name;
      return true;
   }

   getPath() {
      return this.path;
   }

   setMetamodelObject(obj: any) { this.metamodelObj = obj; }
   getMetaModelObject(): any { return this.metamodelObj; }

   setMetamodelType(type: types.metamodelType) { this.metamodelType = type; }
   getMetamodelType(): types.metamodelType { return this.metamodelType; }
}

type parseArrayCallback<V = string> = (SubElement: string, key: string) => V;

export class ParserBase extends Base {
   printer: any;
   AjaxHelper: Ajax.AjaxHelper;

      /* debug */
   object;
   retry;
   onSuccess;
   onError;
   context;


   constructor() {
      super();

      this.parseAssetAdministrationShellV3 =
         this.parseAssetAdministrationShellV3.bind(this);
      this.parseSubmodelV3 = this.parseSubmodelV3.bind(this);
      this.parseAssetInformationV3 = this.parseAssetInformationV3.bind(this);
      this.parseSpecificAssetIdV3 = this.parseSpecificAssetIdV3.bind(this);
      this.parseIdentifiableIdV3 = this.parseIdentifiableIdV3.bind(this);
      this.parseIdentifiableV3 = this.parseIdentifiableV3.bind(this);
      this.parseReferableIdShortV3 = this.parseReferableIdShortV3.bind(this);
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
      this.parseAnnotatedRelationshipElement =
         this.parseAnnotatedRelationshipElement.bind(this);
      this.parseString = this.parseString.bind(this);
      this.parseBoolean = this.parseBoolean.bind(this);
      this.parseValue = this.parseValue.bind(this);
      this.parseValueDataTypeV3 = this.parseValueDataTypeV3.bind(this);
      this.parseResourceV3 = this.parseResourceV3.bind(this);
      this.parseHasSemanticsV3 = this.parseHasSemanticsV3.bind(this);
      this.parseReferenceV3Simple = this.parseReferenceV3Simple.bind(this);
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
      this.parseMultiLanguageTypeV3 = this.parseMultiLanguageTypeV3.bind(this);
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
      this.testExtS = this.testExtS.bind(this);
      this.getByURL = this.getByURL.bind(this);
      this.copyParentURL = this.copyParentURL.bind(this);

      this.AjaxHelper = new Ajax.AjaxHelper();
   }

   parseAssetAdministrationShellV3(JSON: string, env: metamodelV3.Environment,
         fetchSubmodels: boolean = false):
         metamodelV3.AssetAdministrationShell {
      console.log(JSON);
      var jsonObj: any = JSON;

      var id = this.parseIdentifiableIdV3(JSON, "");
      // assetInformation - AssetInformation (1)
      var ai = this.parseAssetInformationV3(jsonObj.assetInformation,
         "assetInformation");

      var aasObj = new metamodelV3.AssetAdministrationShell(id, ai);
      // Parent class Identifiable
      this.parseIdentifiableV3(JSON, "", aasObj);

      // derivedFrom - ModelReference<AssetAdministrationShell> (0-1)
      if (this.elementExists(jsonObj, "derivedFrom")) {
         var df: types.Reference = this.parseReferenceV3Simple(
            jsonObj.derivedFrom, "derivedFrom");
         aasObj.setDerivedFrom(df);
      }

      // Parent class HasDataSpecification
      this.parseHasDataSpecificationV3(JSON, "", aasObj);

      // submodel - ModelReference<Submodel> (0-1)
      if (this.testExtS(jsonObj, "submodel").getFirst()) {
         var sms: types.ModelReferenceArray<metamodelV3.Reference> =
            this.parseArrayV3(this.testExtS(jsonObj, "submodel").getSecond(),
            "Submodel Overview", this.parseAddResolveSubmodelReferenceV3);
         aasObj.setSubmodels(sms);
      }

      env.addAssetAdministrationShells(aasObj);

      console.log(aasObj);
      return aasObj;
   }

   parseSubmodelV3(JSON: string, env: metamodelV3.Environment):
         metamodelV3.Submodel {
      console.log(JSON);
      var jsonObj: any = JSON;

      var id = this.parseIdentifiableIdV3(JSON, "");
      var submodelObj = new metamodelV3.Submodel(id);

      // Inherited class Identifiable
      this.parseIdentifiableV3(JSON, "", submodelObj);
      // Inherited class HasKind
      this.parseHasKindV3(JSON, "", submodelObj);
      // Inherited class Has Semantics
      this.parseHasSemanticsV3(JSON, "", submodelObj);
      // Inherited class Qualifiable
      this.parseQualifiableV3(JSON, "", submodelObj);
      // Inherited class HasDataSpecification
      this.parseHasDataSpecificationV3(JSON, "", submodelObj);
      // submodelElement - SubmodelElement (0-n)
      if (this.testExtS(jsonObj, "submodelElement").getFirst()) {
         var smea: types.SubmodelElementArray = this.parseArrayV3<
            metamodelV3.SubmodelElement>(
            this.testExtS(jsonObj, "submodelElement").getSecond(),
            "submodelElements", this.parseSubmodelElementV3);
         submodelObj.setSubmodelElements(smea);
      }
      env.addSubmodel(submodelObj);

      console.log(submodelObj);
      return submodelObj;
   }

   parseAssetInformationV3(JSON: string, name: string):
         interfaces.AssetInformation {
      var jsonObj: any = JSON;

      // assetKind - AssetKind (1)
      var ak = this.parseAssetKindV3(jsonObj.assetKind, "assetKind");

      var aiObj = new metamodelV3.AssetInformation(ak);

      // globalAssetId - Identifier (0-1)
      if (this.elementExists(jsonObj, "globalAssetId")) {
        var gaid = this.parseIdentifierV3(jsonObj.globalAssetId,
           "globalAssetId");
         aiObj.setGlobalAssetId(gaid);
      }
      // assetType - Identifier (0-1)
      if (this.elementExists(jsonObj, "assetType")) {
         var at = this.parseIdentifierV3(jsonObj.assetType, "assetType");
         aiObj.setAssetType(at);
      }
      // defaultThumbnail - Resource (0-1)
      if (this.elementExists(jsonObj, "defaultThumbnail")) {
         var dtn = this.parseResourceV3(jsonObj.defaultThumbnail,
            "defaultThumbnail");
         aiObj.setDefaultTumbnail(dtn);
         
      }
      // specificAssetId - SpecificAssetId (0-n)
      if (this.testExtS(jsonObj, "specificAssetId").getFirst()) {
         var saids = this.parseArrayV3<metamodelV3.SpecificAssetId>(
            this.testExtS(jsonObj, "specificAssetId").getSecond(),
            "specificAssetIds", this.parseSpecificAssetIdV3);
         aiObj.setSpecificAssetIds(saids);
      }

      return aiObj;
   }

   parseSpecificAssetIdV3(JSON: string, name: string):
         metamodelV3.SpecificAssetId {
      var jsonObj: any = JSON;
      // name [LabelType -> string] - (1)
      var name = this.parseLabelTypeV3(jsonObj.name, "name");
      // value [Identifier] - (1)
      var val = this.parseIdentifierV3(jsonObj.value, "value");

      if (!name || !val)
         return null;

      var saiObj = new metamodelV3.SpecificAssetId(name, val);

      // externalSubjectId [Reference] - (0-1)
      if (this.elementExists(jsonObj, "externalSubjectId")) {
         var esid = this.parseReferenceV3Simple(jsonObj.externalSubjectId,
            "externalSubjectId");
         saiObj.setExternalSubjectId(esid);
      }

      return saiObj;
   }

   parseIdentifiableIdV3(JSON: string, name: string) {
      var jsonObj: any = JSON;
      return this.parseIdentifierV3(jsonObj.id, "id");
   }

   parseIdentifiableV3(JSON: string, name: string,
         identifiable: interfaces.Identifiable) {
      var jsonObj: any = JSON;
      var idObj = identifiable as metamodelV3.Identifable;
      // administration - AdministrativeInformation - (0-1)
      if (this.elementExists(jsonObj, "administration")) {
         var ai = this.parseAdministrativeInformationV3(jsonObj.administration,
            "adminstration");
         idObj.setAdministration(ai);
      }
      // id [Identifier] - (1)
      // in parseIdentifiableIdV3()

      // Inherited class Referable
      var idShort = this.parseReferableIdShortV3(JSON, name);
      idObj.setIdShort(idShort);
      this.parseReferableV3(JSON, name, identifiable);
   }

   parseReferableIdShortV3(JSON: string, name: string): types.NameType {
      var jsonObj: any = JSON;
      if (this.elementExists(jsonObj, "idShort")) {
         return this.parseNameTypeV3(jsonObj.idShort,
            "idShort");
      }
      return "";
   }

   parseReferableV3(JSON: string, name: string,
         referable: interfaces.Referable) {
      var jsonObj: any = JSON;
      var refObj: metamodelV3.Referable = referable as metamodelV3.Referable;
      // category - NameType (0-1)
      if (this.elementExists(jsonObj, "category")) {
         var c = this.parseNameTypeV3(jsonObj.category, "category");
         refObj.setCategory(c);
      }
      // idShort - NameType (0-1)
      // in parseReferableIdShortV3()
      // displayName - MultiLanguageNameType (0-1)
      if (this.testExtS(jsonObj, "displayName").getFirst()) {
         var dna: types.MultiLanguageArray =
            this.parseArrayV3<types.MultiLangageEntry>(
               this.testExtS(jsonObj, "displayName").getSecond(),
               "displayName", this.parseMultiLanguageNameTypeV3);
         var dn = new metamodelV3.MultiLanguageType();
         dn.setName("displayName");
         dn.setElements(dna);
         refObj.setDisplayName(dn);
      }
      // description - MultiLanguageTextType (0-1)
      if (this.testExtS(jsonObj, "description").getFirst()) {
         var desca: types.MultiLanguageArray =
         this.parseArrayV3<types.MultiLangageEntry>(
            this.testExtS(jsonObj, "description").getSecond(), "description",
            this.parseMultiLanguageTextTypeV3);
         var desc = new metamodelV3.MultiLanguageType();
         desc.setName("description");
         desc.setElements(desca);
         refObj.setDescription(desc);
      }
      // Inherited class HasExtensions
      this.parseHasExtensionsV3(JSON, name, referable);
   }

   parseHasExtensionsV3(JSON: string, name: string,
         hasExt: interfaces.HasExtension) {
      var hasExtObj: metamodelV3.HasExtension =
         hasExt as metamodelV3.HasExtension;
      var jsonObj: any = JSON;
      // extension - Extension (0-n)
      if (this.testExtS(jsonObj, "extension").getFirst()) {
         var exta: types.ExtensionArray =
            this.parseArrayV3<metamodelV3.Extension>(
            this.testExtS(jsonObj, "extension").getSecond(),
            "extensions", this.parseExtensionV3);
         hasExtObj.setExtensions(exta);
      }
   }

   parseSubmodelElementV3(JSON: string, name: string):
         metamodelV3.SubmodelElement {
      var jsonObj: any = JSON;

      var idShort = this.parseReferableIdShortV3(JSON, "");

      var elementType: types.metamodelType =
         types.metamodelType.SubmodelElement;
      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      var smeObj: metamodelV3.SubmodelElement;

      switch (elementType) {
      case types.metamodelType.RelationshipElement:
         smeObj = this.parseRelationShipElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.AnnotatedRelationshipElement:
         smeObj = this.parseAnnotatedRelationshipElement(JSON, name, idShort);
         break;
      case types.metamodelType.Property:
         smeObj = this.parseDataElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.MultiLanguageProperty:
         smeObj = this.parseDataElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.Range:
         smeObj = this.parseDataElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.Blob:
         smeObj = this.parseDataElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.File:
         smeObj = this.parseDataElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.ReferenceElement:
         smeObj = this.parseDataElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.Capability:
         smeObj = this.parseCapabilityV3(JSON, name, idShort);
         break;
      case types.metamodelType.SubmodelElementList:
         smeObj = this.parseSubmodelElementListV3(JSON, name, idShort);
         break;
      case types.metamodelType.SubmodelElementCollection:
         smeObj = this.parseSubmodelElementCollectionV3(JSON, name, idShort);
         break;
      case types.metamodelType.Entity:
         smeObj = this.parseEntityV3(JSON, name, idShort);
         break;
      case types.metamodelType.BasicEventElement:
         smeObj = this.parseEventElementV3(JSON, name, idShort);
         break;
      case types.metamodelType.Operation:
         smeObj = this.parseOperationV3(JSON, name, idShort);
         break;
      default:
         /* do nothing */
         console.log("Unknown SubmodelElement found:" + elementType);
         return;
      }

      // Inherited class Referable
      this.parseReferableV3(JSON, "", smeObj);
      // Inherited class HasSemantics
      this.parseHasSemanticsV3(JSON, "", smeObj);
      // Inherited class Qualifiable
      this.parseQualifiableV3(JSON, "", smeObj);
      // Inherited class HasDataSpecification
      this.parseHasDataSpecificationV3(JSON, "", smeObj);

      return smeObj;

   }

   parseEntityV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.Entity {
      var jsonObj: any = JSON;
      // entityType - EntityType (1)
      var et: types.EntityType = this.parseEntityTypeV3(jsonObj.entityType,
         "entityType");

      var etObj: metamodelV3.Entity = new metamodelV3.Entity(idShort, et);

      // globalAssetId - Identifier (0-1)
      if (this.elementExists(jsonObj, "globalAssetId")) {
         var gaid: types.Identifier = this.parseIdentifierV3(
            jsonObj.globalAssetId, "globalAssetId");
         etObj.setGlobalAssetId(gaid);
      }

      // specificAssetId - SpecificAssetId (0-n)
      if (this.testExtS(jsonObj, "specificAssetId").getFirst()) {
         var saids: types.SpecificAssetIdArray = this.parseArrayV3<
            metamodelV3.SpecificAssetId>(
            this.testExtS(jsonObj, "specificAssetId").getSecond(),
            "specificAssetIds", this.parseSpecificAssetIdV3);
         etObj.setSpecifcAssetIds(saids);
      }
      // statement - SubmodelElement  (0-n)
      if (this.testExtS(jsonObj, "statement").getFirst()) {
         var stmts: types.SubmodelElementArray = this.parseArrayV3<
            metamodelV3.SubmodelElement>(
            this.testExtS(jsonObj, "statement").getSecond(), "statements",
            this.parseSubmodelElementV3);
         etObj.setStatements(stmts);
      }
      return etObj;
   }

   parseEntityTypeV3(JSON: string, name: string): types.EntityType {
      var ete: types.EntityType = JSON as types.EntityType;
      return ete;
   }

   parseEventElementV3(JSON: string, name: string,idShort: types.NameType):
         metamodelV3.EventElement {
      var jsonObj: any = JSON;

      var elementType: types.metamodelType = types.metamodelType.SubmodelElement;
      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      switch (elementType) {
      case types.metamodelType.BasicEventElement:
         return this.parseBasicEventElementV3(JSON, name, idShort);
      default:
         console.log("Unhandled Event (SubmodelElement) found: " + elementType);
         break;
      }
      return null;
   }

   parseBasicEventElementV3(JSON: string, name: string,
         idShort: types.NameType): metamodelV3.BasicEventElement {
      var jsonObj: any = JSON;

      // observed - ModelReference<Referable> (1)
      var obs: metamodelV3.Reference =
         this.parseReferenceV3Simple(jsonObj.observed, "observed");
      // direction - Direction (1)
      var dr: types.Direction =
         this.parseEventDirectionV3(jsonObj.direction, "direction");
      // state - StateOfEvent (1)
      var st: types.StateOfEvent =
         this.parseStateOfEventV3(jsonObj.state, "state");

      var bet: metamodelV3.BasicEventElement =
         new metamodelV3.BasicEventElement(idShort, obs, dr, st);

      // messageTopic - MessageTopicType (0-1)
      if (this.elementExists(jsonObj, "messageTopic")) {
         var mt: types.MessageTopicType = this.parseMessageTopicTypeV3(
            jsonObj.messageTopic, "messageTopic");
         bet.setMessageTopic(mt);
      }
      // messageBroker - ModelReference<Referable> (0-1)
      if (this.elementExists(jsonObj, "messageBroker")) {
         var mb: types.ModelReference = this.parseReferenceV3Simple(
            jsonObj.messageBroker, "messageBroker");
         bet.setMessageBroker(mb);
      }
      // lastUpdate - dateTime (0-1)
      if (this.elementExists(jsonObj, "lastUpdate")) {
         var lu: types.DateTime = this.parseString<types.DateTime>(
            jsonObj.lastUpdate, "lastUpdate");
         bet.setLastUpdate(lu);
      }
      // minInterval - duration (0-1)
      if (this.elementExists(jsonObj, "minInterval")) {
         var mi: types.Duration = this.parseString<types.Duration>(
            jsonObj.minInterval, "minInterval");
         bet.setMinInterval(mi);
      }
      // maxInterval - duration (0-1)
      if (this.elementExists(jsonObj, "maxInterval")) {
         var mai: types.Duration = this.parseString<types.Duration>(
            jsonObj.maxInterval, "maxInterval");
         bet.setMaxInterval(mai);
      }
      return bet;
   }

   parseEventDirectionV3(JSON: string, name: string): types.Direction {
      var d: types.Direction = JSON as types.Direction;
      return d;
   }

   parseStateOfEventV3(JSON: string, name: string): types.StateOfEvent {
      var st: types.StateOfEvent = JSON as types.StateOfEvent;
      return st;
   }

   parseMessageTopicTypeV3(JSON: string, name: string): types.MessageTopicType {
      return this.parseString<types.MessageTopicType>(JSON, name);
   }

   parseOperationV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.Operation {
      var jsonObj: any = JSON;

      var op = new metamodelV3.Operation(idShort);

      // inputVariable - OperationVariable (0-n)
      if (this.testExtS(jsonObj, "inputVariable").getFirst()) {
         var iva: types.OperationVariableArray = this.parseArrayV3<
            metamodelV3.OperationVariable>(
            this.testExtS(jsonObj, "inputVariable").getSecond(),
            "inputVariables", this.parseOperationVariableV3);
         op.setInputVariables(iva);
      }
      // outputVariable - OperationVariable (0-n)
      if (this.testExtS(jsonObj, "outputVariable").getFirst()) {
         var ova: types.OperationVariableArray = this.parseArrayV3<
            metamodelV3.OperationVariable>(
            this.testExtS(jsonObj, "outputVariable").getSecond(),
            "outputVariables", this.parseOperationVariableV3);
         op.setOutputVariables(ova);
      }
      // inoutputVariable - OperationVariable (0-n)
      if (this.testExtS(jsonObj, "inoutputVariable").getFirst()) {
         var iova: types.OperationVariableArray = this.parseArrayV3<
            metamodelV3.OperationVariable>(
            this.testExtS(jsonObj, "inoutputVariable").getSecond(),
            "inoutputVariables", this.parseOperationVariableV3);
         op.setInOutputVariables(iova);
      }
      return op;
   }

   parseOperationVariableV3(JSON: string, name: string):
         metamodelV3.OperationVariable {
      var jsonObj: any = JSON;

      // value - SubmodelElement (1)
      var v: metamodelV3.SubmodelElement = this.parseSubmodelElementV3(
         jsonObj.value, "value");
      return new metamodelV3.OperationVariable(v);
   }

   parseSubmodelElementCollectionV3(JSON: string, name: string,
         idShort: types.NameType): metamodelV3.SubmodelElementCollection {
      var jsonObj: any = JSON;

      var smec: metamodelV3.SubmodelElementCollection = 
         new metamodelV3.SubmodelElementCollection(idShort);

      // value - SubmodelElement (0-n)
      if (this.testExtS(jsonObj, "value").getFirst()) {
         var v: types.SubmodelElementArray = this.parseArrayV3<
            metamodelV3.SubmodelElement>(
            this.testExtS(jsonObj, "value").getSecond(), "values",
            this.parseSubmodelElementV3);
         smec.setValues(v);
      }
      return smec;
   }

   parseSubmodelElementListV3(JSON: string, name: string,
      idShort: types.NameType): metamodelV3.SubmodelElementList {
      var jsonObj: any = JSON;

      // typeValueListElement - AasSubmodelElements (1)
      var tv: types.AasSubmodelElements = this.parseAasSubmodelElementsV3(
         jsonObj.typeValueListElement, "typeValueListElement");

      var smlObj = new metamodelV3.SubmodelElementList(idShort, tv);

      // orderRelevant - boolean -> String (0-1)
      if (this.elementExists(jsonObj, "orderRelevant")) {
         var or: boolean = this.parseBoolean(jsonObj.orderRelevant,
            "orderRelevant");
         smlObj.setOrderRelevant(or);
      }
      // semanticIdListElement - Reference (0-1)
      if (this.elementExists(jsonObj, "semanticIdListElement")) {
         var sidle: types.Reference = this.parseReferenceV3Simple(
            jsonObj.semanticIdListElement, "semanticIdListElement");
         smlObj.setSemanticIdListElement(sidle);
      }
      // valueTypeListElement - DataTypeDefXsd (0-1)
      if (this.elementExists(jsonObj, "valueTypeListElement")) {
         var vtle: types.DataTypeDefXsd = this.parseDataTypeDefXsdV3(
            jsonObj.valueTypeListElement, "valueTypeListElement");
         smlObj.setValueTypeListElement(vtle);
      }

      // value - SubmodelElement (0-n)
      if (this.testExtS(jsonObj, "value").getFirst()) {
         var v: types.SubmodelElementArray = this.parseArrayV3<
            metamodelV3.SubmodelElement>(
            this.testExtS(jsonObj, "value").getSecond(), "values",
            this.parseSubmodelElementV3);
         smlObj.setValues(v);
      }
      return smlObj;
   }

   parseAasSubmodelElementsV3(JSON: string, name: string):
         types.AasSubmodelElements {
      var k: types.AasSubmodelElements = JSON as types.AasSubmodelElements;
      switch (k) {
      case types.AasSubmodelElements.AnnotatedRelationshipElement:
      case types.AasSubmodelElements.BasicEventElement:
      case types.AasSubmodelElements.Blob:
      case types.AasSubmodelElements.Capability:
      case types.AasSubmodelElements.DataElement:
      case types.AasSubmodelElements.Entity:
      case types.AasSubmodelElements.EventElement:
      case types.AasSubmodelElements.File:
      case types.AasSubmodelElements.MultiLanguageProperty:
      case types.AasSubmodelElements.Operation:
      case types.AasSubmodelElements.Property:
      case types.AasSubmodelElements.Range:
      case types.AasSubmodelElements.ReferenceElement:
      case types.AasSubmodelElements.RelationshipElement:
      case types.AasSubmodelElements.SubmodelElement:
      case types.AasSubmodelElements.SubmodelElementCollection:
      case types.AasSubmodelElements.SubmodelElementList:
      /* Fallthrough for all above */
        break;
      default:
         k = types.AasSubmodelElements.SubmodelElement;
         break;
      }
      return k;
   }

   parseCapabilityV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.Capability {
      // Nothing TODO, all Capability Attributes are parsed already
      return new metamodelV3.Capability(idShort);
   }

   parseDataElementV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.DataElement {
      var jsonObj: any = JSON;

      var elementType: types.metamodelType = types.metamodelType.DataElement;
      if (this.elementExists(jsonObj, "modelType"))
         elementType = jsonObj.modelType;

      switch (elementType) {
      case types.metamodelType.Property:
         return this.parsePropertyV3(JSON, name, idShort);
      case types.metamodelType.MultiLanguageProperty:
         return this.parseMultiLanguagePropertyV3(JSON, name, idShort);
      case types.metamodelType.Range:
         return this.parseRangeV3(JSON, name, idShort);
      case types.metamodelType.ReferenceElement:
         return this.parseReferenceElementV3(JSON, name, idShort);
      case types.metamodelType.File:
         return this.parseFileV3(JSON, name, idShort);
      case types.metamodelType.Blob:
         return this.parseBlobV3(JSON, name, idShort);
      default:
         console.log("Unhandled DataElement found: " + elementType);
         return;
      }
      return null;
   }

   parsePropertyV3(JSON: string, name: string, idShort: types.NameType) {
      var jsonObj: any = JSON;
      // valueType - DataTypeDefXsd (1)
      var vt: types.DataTypeDefXsd = this.parseDataTypeDefXsdV3(
         jsonObj.valueType, "valueType");

      var pObj: metamodelV3.Property = new metamodelV3.Property(idShort, vt);

      // value - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "value")) {
         var v: types.ValueDataType = this.parseValueDataTypeV3(jsonObj.value,
            "value");
         pObj.setValue(v);
      }
      // valueId - Reference (0-1)
      if (this.elementExists(jsonObj, "valueId")) {
         var vid: types.Reference = this.parseReferenceV3Simple(jsonObj.valueId,
            "valueId");
         pObj.setValueId(vid);
      }
      return pObj;
   }

   parseMultiLanguagePropertyV3(JSON: string, name: string,
         idShort: types.NameType): metamodelV3.MultiLanguageProperty {
      var jsonObj: any = JSON;

      var mlp: metamodelV3.MultiLanguageProperty =
         new metamodelV3.MultiLanguageProperty(idShort);

      // value - MultiLanguageTextType (0-1)
      if (this.testExtS(jsonObj, "value").getFirst()) {
         var va: metamodelV3.MultiLanguageType = this.parseMultiLanguageTypeV3(
            this.testExtS(jsonObj, "value").getSecond(),
            "value", this.parseMultiLanguageTextTypeV3);
         mlp.setValues(va);
      }
      // valueId - Reference (0-1)
      if (this.elementExists(jsonObj, "valueId")) {
         var vid: types.Reference = this.parseReferenceV3Simple(
            jsonObj.valueId, "valueId");
         mlp.setValueId(vid);
      }
      return mlp;
   }

   parseRangeV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.Range {
      var jsonObj: any = JSON;
      // valueType - DataTypeDefXsd (1)
      var vt: types.DataTypeDefXsd = this.parseDataTypeDefXsdV3(
         jsonObj.valueType, "valueType");

      var rngObj: metamodelV3.Range = new metamodelV3.Range(idShort, vt);

      // min - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "min")) {
         var min: types.ValueDataType = this.parseValueDataTypeV3(jsonObj.min,
            "min");
         rngObj.setMin(min);
      }
      // max - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "max")) {
         var max: types.ValueDataType = this.parseValueDataTypeV3(jsonObj.max,
            "max");
         rngObj.setMax(max);
      }
      return rngObj;
   }

   parseReferenceElementV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.ReferenceElement {
      var jsonObj: any = JSON;

      var refObj: metamodelV3.ReferenceElement =
         new metamodelV3.ReferenceElement(idShort);

      // value - Reference (0-1)
      if (this.elementExists(jsonObj, "value")) {
         var v: metamodelV3.Reference = this.parseReferenceV3Simple(
            jsonObj.value, "value");
         if (v != null)
            refObj.setValue(v);
      }
      return refObj;
   }

   parseFileV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.File {
      var jsonObj: any = JSON;

      // contentType - ContentType (1)
      var ct: types.ContentType = this.parseContentTypeV3(jsonObj.contentType,
         "contentType");
      var fObj: metamodelV3.File = new metamodelV3.File(idShort, ct);

      // value - PathType (0-1)
      if (this.elementExists(jsonObj, "value")) {
         var v: types.PathType = this.parsePathTypeV3(jsonObj.value, "value");
         fObj.setValue(v);
      }
      return fObj;
   }

   parseBlobV3(JSON: string, name: string, idShort: types.NameType):
         metamodelV3.Blob {
      var jsonObj: any = JSON;

      // contentType - ContentType (1)
      var ct: types.ContentType = this.parseContentTypeV3(jsonObj.contentType,
         "contentType");
      var bObj: metamodelV3.Blob = new metamodelV3.Blob(idShort, ct);

      // value - BlobType (0-1)
      if (this.elementExists(jsonObj, "value")) {
         var v: types.BlobType = this.parseBlobTypeV3(jsonObj.value, "value");
         bObj.setValue(v);
      }
      return bObj;
   }

   parseDataTypeDefXsdV3(JSON: string, name: string):
         types.DataTypeDefXsd {
      var d: types.DataTypeDefXsd = JSON as types.DataTypeDefXsd;
      return d;
   }

   parseRelationShipElementV3(JSON: string, name: string,
         idShort: types.NameType):
      metamodelV3.RelationshipElement {
      var jsonObj: any = JSON;

      var first = this.parseReferenceV3Simple(jsonObj.first, "first");
      var second = this.parseReferenceV3Simple(jsonObj.second, "second");

      return new metamodelV3.RelationshipElement(idShort, first,
         second);
   }

   parseAnnotatedRelationshipElement(JSON: string, name: string,
         idShort: types.NameType):
         metamodelV3.AnnotatedRelationshipElement {
      var jsonObj: any = JSON;

      var first = this.parseReferenceV3Simple(jsonObj.first, "first");
      var second = this.parseReferenceV3Simple(jsonObj.second, "second");

      var refObj = new metamodelV3.AnnotatedRelationshipElement(idShort,
         first, second);

      if (this.testExtS(jsonObj, "annotation").getFirst()) {
         var smea: types.DataElementArray = this.parseArrayV3<
            metamodelV3.SubmodelElement>(
            this.testExtS(jsonObj, "annotation").getSecond(), "annotations",
            this.parseSubmodelElementV3);
         refObj.setAnnotations(smea);
      }
      return refObj;
   }

   parseString<T = string>(JSON: string, name: string): T {
      return this.parseValue<T>(JSON, name, types.metamodelType.String);
   }

   parseBoolean(j: string, name: string): boolean {
      return JSON.parse(j);
   }

   parseValue<T = string>(JSON: string, name: string, 
         tType = types.metamodelType.value): T {
      return JSON as T;
   }

   parseValueDataTypeV3(JSON: string, name: string) {
      return this.parseValue<types.ValueDataType>(JSON, name,
         types.metamodelType.ValueDataType)
   }

   parseResourceV3(JSON: string, name: string):
         interfaces.Resource {
      var jsonObj: any = JSON;
      // path - PathType (1)
      var p = this.parsePathTypeV3(jsonObj.path, "path");

      var resObj = new metamodelV3.Resource(p);
      // contentType - ContentType (0-1)
      if (this.elementExists(jsonObj, "contentType")) {
         var ct = this.parseContentTypeV3(jsonObj.contentType, "contentType");
         resObj.setContentType(ct);
      }

      return resObj;
   }

   parseHasDataSpecificationV3(JSON: string, name: string,
         hasDs: metamodelV3.HasDataSpecification) {
      var jsonObj: any = JSON;
      // dataSpecification - Reference - (0-n)
      if (this.testExtS(jsonObj, "dataSpecification").getFirst()) {
         var dsa: types.ReferenceArray = this.parseArrayV3<
            metamodelV3.Reference>(
            this.testExtS(jsonObj, "dataSpecification").getSecond(),
            "dataSpecifications", this.parseReferenceV3Simple);
         hasDs.setDataspecification(dsa);
      }
   }

   parseHasSemanticsV3(JSON: string, name: string, 
         hasSem: metamodelV3.HasSemantics) {
      var jsonObj: any = JSON;

      // semanticId - Reference - (0-1)
      if (this.elementExists(jsonObj, "semanticId")) {
         var semId: types.Reference = this.parseReferenceV3Simple(
            jsonObj.semanticId, "semanticId");
         hasSem.setSemanticId(semId);
      }
      // supplementalSemanticId - Reference (0-n)
      if (this.testExtS(jsonObj, "supplementalSemanticId").getFirst()) {
         var sSIds: types.ReferenceArray = this.parseArrayV3<
            metamodelV3.Reference>(
            this.testExtS(jsonObj, "supplementalSemanticId").getSecond(),
            "supplementalSemanticIds", this.parseReferenceV3Simple);
         hasSem.setSupplementalSemanticIds(sSIds);
      }
   }
   
   parseReferenceV3Simple(JSON: string, name: string):
         metamodelV3.Reference {
      return this.parseReferenceV3(JSON, name);
   }

   parseReferenceV3(JSON: string, name: string): metamodelV3.Reference {
      var jsonObj: any = JSON;

      // type - ReferenceType - (0-1)
      var reft: types.ReferenceTypes = types.ReferenceTypes.ModelReference;
      if (this.elementExists(jsonObj, "type")) {
         reft = this.parseReferenceTypesV3(jsonObj.type, "Reference type");
      }

      var keys: types.KeyArray;
      // key <<ordered>>  [Key] - (1-n)
      if (this.testExtS(jsonObj, "key").getFirst()) {
         keys = this.parseArrayV3(this.testExtS(jsonObj, "key").getSecond(),
            "keys", this.parseKeyV3);
         if (keys == null)
            null;
      }
      else
         null;

      var refObj: metamodelV3.Reference;
      switch (reft) {
      case types.ReferenceTypes.ExternalReference:
         refObj = new metamodelV3.Reference(
            types.ReferenceTypes.ExternalReference, keys);
         break;
      case types.ReferenceTypes.ModelReference:
         refObj = new metamodelV3.Reference(
            types.ReferenceTypes.ModelReference, keys);
         break;
      }

      // referredSemanticId - Reference (0-1)
      if (this.elementExists(jsonObj, "referredSemanticId")) {
         var rsid: types.Reference = this.parseReferenceV3Simple(
            jsonObj.referredSemanticId, "referredSemanticId");
         refObj.setRefferedSemanticId(rsid);
      }

      return refObj;
   }

   parseAddResolveSubmodelReferenceV3(JSON: string, name: string):
      metamodelV3.Reference {
      var refObj: metamodelV3.Reference = this.parseReferenceV3(JSON, name);

      // TODO: Resolve Submodels via Registry
      console.log("TODO: Resolve Submodel via Registry");
      return refObj;
   }

   parseReferenceTypesV3(JSON: string, name: string):
         types.ReferenceTypes {
      var r: types.ReferenceTypes = JSON as types.ReferenceTypes;
      return r;
   }

   parseAdministrativeInformationV3(JSON: string, name: string) {
      var jsonObj: any = JSON;
      if (!this.elementExists(jsonObj, "version"))
         return null;

      var aiObj = new metamodelV3.AdministrativeInformation();

      // version - VersionType -> String [0..1]
      if (this.elementExists(jsonObj, "version")) {
         var ver = this.parseString<types.VersionType>(
            jsonObj.version, "version");
         aiObj.setVersion(ver);

      // revision - RevisionType -> String [0..1], only allowed if version exists
         if (this.elementExists(jsonObj, "revision")) {
            var rev = this.parseString<types.RevisionType>(
               jsonObj.revision, "revision");
            aiObj.setRevision(rev);
         }
      }
      // creator - Reference [0..1]
      if (this.elementExists(jsonObj, "creator")) {
         var c: types.Reference = this.parseReferenceV3Simple(jsonObj.creator,
            "creator");
         aiObj.setCreator(c);
      }
      // templateId - Identifier [0..1]
      if (this.elementExists(jsonObj, "templateId")) {
         var ti = this.parseIdentifierV3(jsonObj.templateId, "templateId");
         aiObj.setTemplateId(ti);
      }
      return aiObj;
   }

   parseIdentifierV3(JSON: string, name: string):
         types.Identifier {
      return this.parseString<types.Identifier>(JSON, name);
   }

   parseLabelTypeV3(JSON: string, name: string):
         types.LabelType {
      return this.parseString<types.LabelType>(JSON, name);
   }

   parseNameTypeV3(JSON: string, name: string):
         types.NameType {
      return this.parseString<types.NameType>(JSON, name);
   }

   parseMultiLanguageTextTypeV3(JSON: string, name: string):
         types.MultiLangageEntry {
      var jsonObj: any = JSON;
      var lang: string;
      var text: string;
      if (this.elementExists(jsonObj, "language"))
         lang = this.parseString<string>(jsonObj.language, "language");
      if (this.elementExists(jsonObj, "text"))
         text = this.parseString<string>(jsonObj.text, "text");
      return new util.Pair<string, string>(lang, text);
   }

   parseMultiLanguageNameTypeV3(JSON: string, name: string):
      types.MultiLangageEntry {
      var jsonObj: any = JSON;
      var lang: string;
      var text: string;
      if (this.elementExists(jsonObj, "language"))
         lang = this.parseString<string>(jsonObj.language, "language");
      if (this.elementExists(jsonObj, "text"))
         text = this.parseString<string>(jsonObj.text, "text");
      return new util.Pair<string, string>(lang, text);
   }

   parsePathTypeV3(JSON: string, name: string):
         types.PathType {
      return this.parseString<types.PathType>(JSON, name);
   }

   parseBlobTypeV3(JSON: string, name: string):
      types.BlobType {
      return this.parseString<types.BlobType>(JSON, name);
   }

   parseContentTypeV3(JSON: string, name: string):
         types.ContentType {
      return this.parseString<types.ContentType>(JSON, name);
   }

   parseExtensionV3(JSON: string, name: string):
      metamodelV3.Extension {
      var jsonObj: any = JSON;

      if (!this.elementExists(jsonObj, "name") || jsonObj.name == null)
         return;

      // name - NameType (1)
      var name = this.parseNameTypeV3(jsonObj.name, "name");

      var extObj = new metamodelV3.Extension(name);

      // valueType - DataTypeDefXsd (0-1)
      if (this.elementExists(jsonObj, "valueType")) {
         var vt: types.DataTypeDefXsd = this.parseDataTypeDefXsdV3(
            jsonObj.valueType, "valueType");
         extObj.setValueType(vt);
      }
      // value - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "value")) {
         var v: types.ValueDataType = this.parseValueDataTypeV3(jsonObj.value,
            "value");
         extObj.setValue(v);
      }
      // refersTo - ModelReference<Referable> (0-n)
      if (this.testExtS(jsonObj, "refersTo").getFirst()) {
         var refa: types.ReferenceArray = this.parseArrayV3<
         metamodelV3.Reference>(this.testExtS(jsonObj, "refersTo").getSecond(),
         "refersTo", this.parseReferenceV3Simple);
         extObj.setRefersTo(refa);
      }
      // Inherited class HasSemantics
      this.parseHasSemanticsV3(JSON, name, extObj);

      return extObj;
   }

   parseQualifiableV3(JSON: string, name: string,
         qualfiaible: metamodelV3.Qualifiable) {
      var jsonObj: any = JSON;
      // qualifier - Qualifier (0-n)
      if (this.testExtS(jsonObj, "qualifier").getFirst()) {
         var qa: types.QualifierArray = this.parseArrayV3<
            metamodelV3.Qualifier>(
            this.testExtS(jsonObj, "qualifier").getSecond(), "qualifier",
            this.parseQualifierV3);
         qualfiaible.setQualifiers(qa);
      }
   }

   parseQualifierV3(JSON: string, name: string): metamodelV3.Qualifier {
      var jsonObj: any = JSON;

      // type - QualifierType (1)
      var type: types.QualifierType = this.parseQualifierTypeV3(jsonObj.type,
         "type");
      // valueType - DataTypeDefXsd (1)
      var vt: types.DataTypeDefXsd = this.parseDataTypeDefXsdV3(
         jsonObj.valueType, "valueType");

      var qObj = new metamodelV3.Qualifier(type, vt);

      // kind - QualifierKind (0-1)
      if (this.elementExists(jsonObj, "kind")) {
         var k: types.QualifierKind = this.parseQualifierKindV3(jsonObj.kind,
            "kind");
         qObj.setKind(k);
      }
      // value - ValueDataType (0-1)
      if (this.elementExists(jsonObj, "value")) {
         var v: types.ValueDataType = this.parseValueDataTypeV3(jsonObj.value,
            "value");
         qObj.setValue(v);
      }
      // valueId - Reference (0-1)
      if (this.elementExists(jsonObj, "valueId")) {
         var vi: types.Reference = this.parseReferenceV3Simple(jsonObj.valueId,
            "valueId");
         qObj.setValueId(vi);
      }
      /* Inherited class HasSemantics */
      this.parseHasSemanticsV3(jsonObj, name, qObj);

      return qObj;
   }

   parseQualifierKindV3(JSON: string, name: string): types.QualifierKind {
      var qke: types.QualifierKind = JSON as types.QualifierKind;
      return qke;
   }

   parseQualifierTypeV3(JSON: string, name: string): types.QualifierType {
      return this.parseString<types.QualifierType>(JSON, name);
   }

   parseHasKindV3(JSON: string, name: string, hasKind: metamodelV3.HasKind) {
      var jsonObj: any = JSON;
      // kind - ModellingKind (0-1)
      if (this.elementExists(jsonObj, "kind")) {
         var mk:types.ModellingKind = this.parseModellingKindV3(jsonObj.kind,
            "kind");
         hasKind.setModellingKind(mk);
      }
   }

   parseModellingKindV3(JSON: string, name: string):
      types.ModellingKind {
      var mke: types.ModellingKind = JSON as types.ModellingKind;
      return mke;
   }

   parseAssetKindV3(JSON: string, name: string):
         types.AssetKind {
      var t: types.AssetKind = JSON as types.AssetKind;
      return t;
   }

   // callback: The method to call for every array element
   parseArrayV3<V>(JSON: string, name: string, callback: parseArrayCallback<V>,
         URLname: string = name, skipObjHierachy: boolean = false):
              util.NamedArray<V> {
      if(JSON.length < 1)
         return null;
      var ea: util.NamedArray<V> = new util.NamedArray<V>;
      ea.setName(name);
      for(var key in JSON as any) {
         var SubElement = JSON[key];
         var e: V = callback(SubElement, key);
         if (e)
            ea.push(e);
      }
      return ea;
   }

   // callback: The method to call for every array element
   parseMultiLanguageTypeV3(JSON: string, name: string, 
            callback: parseArrayCallback<types.MultiLangageEntry>,
            URLname: string = name):
            metamodelV3.MultiLanguageType {
      if(JSON.length < 1)
         return;
      var ea: metamodelV3.MultiLanguageType =
         new metamodelV3.MultiLanguageType();
      ea.setName(name);
      for(var key in JSON as any) {
         var SubElement = JSON[key];
         var e: types.MultiLangageEntry = callback(SubElement, key);
         if (e)
            ea.addElement(e);
      }
      return ea;
   }

   parseKeyV3(JSON: string, name: string): interfaces.Key {
      var jsonObj: any = JSON;

      // type - KeyTypes - (1)
      var kt = this.parseKeyTypesV3(jsonObj.type, "type");
      // value - Identifier - (1)
      var id = this.parseIdentifierV3(jsonObj.value, "value");

      var key = new metamodelV3.Key(kt, id);
      return key;
   }

   parseKeyTypesV3(JSON: string, name: string):
         types.KeyTypes {
      var k: types.KeyTypes = JSON as types.KeyTypes;
      return k;
   }

   parseAASRegistryV3(JSON: string,
         env: registryV3.RegistryEnvironment): registryV3.RegistryEnvironment {

      var aasdescs: types.AssetAdministrationShellDescriptorArray =
         this.parseArrayV3<metamodelV3.AssetAdministrationShellDescriptor>(
         JSON, "AssetAdministrationShellDescriptors",
         this.parseAssetAdministrationShellDescriptorV3,
         "AssetAdministrationShellDescriptors", true);
      env.setAssetAdministrationShellDescriptors(aasdescs);
      return env;
   }

   parseSubmodelRegistryV3(JSON: string,
         env: registryV3.RegistryEnvironment): registryV3.RegistryEnvironment {

      var smdescs: types.SubmodelDescriptorsArray =
         this.parseArrayV3<metamodelV3.SubmodelDescriptor>(
         JSON, "SubmodelDescriptors", this.parseSubmodelDescriptorV3,
         "SubmodelDescriptors", true);
      env.setSubmodelDescriptors(smdescs);
      return env;
   }

   parseDescriptorV3(JSON: string, name: string, desc: metamodelV3.Descriptor) {
      var jsonObj: any = JSON;
      if (this.testExtS(jsonObj, "description").getFirst()) {
         var descA: metamodelV3.MultiLanguageType =
            this.parseMultiLanguageTypeV3(
               this.testExtS(jsonObj, "description").getSecond(),
               "description", this.parseMultiLanguageTextTypeV3);
         desc.setDescription(descA);
      }
      if (this.testExtS(jsonObj, "displayName").getFirst()) {
         var dnA: metamodelV3.MultiLanguageType =
         this.parseMultiLanguageTypeV3(
            this.testExtS(jsonObj, "displayName").getSecond(),
            "displayName", this.parseMultiLanguageNameTypeV3);
         desc.setDisplayName(dnA);
      }
      if (this.testExtS(jsonObj, "extension").getFirst())
         this.parseArrayV3(this.testExtS(jsonObj, "extension").getSecond(),
            "extensions", this.parseExtensionV3);
   }

   parseAssetAdministrationShellDescriptorV3(JSON: string, key: string):
         metamodelV3.AssetAdministrationShellDescriptor {
      var name = null;
      var jsonObj: any = JSON;

      if (this.elementExists(jsonObj, "idShort"))
          name = jsonObj.idShort;
      else
          name = jsonObj.id;

      // id [Identifier] - (1)
      var id: types.Identifier = this.parseIdentifierV3(jsonObj.id, "id");
      var endpoints: types.EndpointArray;
      // endpoint [Endpoint] - (0-n)
      if (this.testExtS(jsonObj, "endpoint").getFirst())
         endpoints = this.parseArrayV3<metamodelV3.Endpoint>(
            this.testExtS(jsonObj, "endpoint").getSecond(),
            "endpoints", this.parseEndpointV3);

      var aasDescObj = new metamodelV3.AssetAdministrationShellDescriptor(id,
         endpoints);

      this.parseDescriptorV3(JSON, name, aasDescObj);

      // administration [AdministrativeInformation] - (0-1)
      if (this.elementExists(jsonObj, "administration")) {
         var ai : metamodelV3.AdministrativeInformation =
         this.parseAdministrativeInformationV3(jsonObj.administration,
            "adminstration");
         aasDescObj.setAdministration(ai);
         }

      // assetKind [AssetKind] - (0-1)
      if (this.elementExists(jsonObj, "assetKind")) {
         var ak: types.AssetKind = this.parseAssetKindV3(jsonObj.assetKind,
            "assetKind");
         aasDescObj.setAssetType(ak);
      }

      // assetType [Identifier] - (0-1) {
      if (this.elementExists(jsonObj, "assetType")) {
         var at: types.Identifier = this.parseIdentifierV3(jsonObj.assetType,
            "assetType");
         aasDescObj.setAssetType(at);
      }

      // globalAssetId [Identifier] - (0-1)
      if (this.elementExists(jsonObj, "globalAssetId")) {
         var gaid: types.Identifier = this.parseIdentifierV3(
            jsonObj.globalAssetId, "globalAssetId");
         aasDescObj.setGlobalAssetId(gaid);
      }
      // idShort [NameType -> String] - (0-1)
      if (this.elementExists(jsonObj, "idShort")) {
         var ids: types.NameType = this.parseNameTypeV3(jsonObj.idShort,
            "idShort");
         aasDescObj.setIdShort(ids);
      }

      // specificAssetId [SpecificAssetId] - (0-n)
      if (this.testExtS(jsonObj, "specificAssetId").getFirst()) {
         var saa: types.SpecificAssetIdArray = this.parseArrayV3<
            metamodelV3.SpecificAssetId>(
            this.testExtS(jsonObj, "specificAssetId").getSecond(),
            "specificAssetIds", this.parseSpecificAssetIdV3);
         aasDescObj.setSpecificAssetIds(saa);
      }

      // submodelDescriptor [submodelDescriptor] - (0-n)
      if (this.testExtS(jsonObj, "submodelDescriptor").getFirst()) {
         var smda: types.SubmodelDescriptorsArray = this.parseArrayV3<
            metamodelV3.SubmodelDescriptor>(
            this.testExtS(jsonObj, "submodelDescriptor").getSecond(),
            "submodelDescriptors", this.parseSubmodelDescriptorV3);
         aasDescObj.setSubmodelDescriptors(smda);
      }
      return aasDescObj;
   }

   parseSubmodelDescriptorV3(JSON: string, name: string):
         metamodelV3.SubmodelDescriptor {
      var name: string;
      var jsonObj: any = JSON;

      if (this.elementExists(jsonObj, "idShort"))
          name = jsonObj.idShort;
      else
          name = jsonObj.id;

      // id [Identifier] - (1)
         var id: types.Identifier = this.parseIdentifierV3(jsonObj.id, "id");

      // endpoint [Endpoint] - (0-n)
      var endpoints: types.EndpointArray;
      if (this.testExtS(jsonObj, "endpoint").getFirst()) {
         endpoints = this.parseArrayV3<metamodelV3.Endpoint>(
            this.testExtS(jsonObj, "endpoint").getSecond(),
            "endpoints", this.parseEndpointV3);
      }

      var smDescObj = new metamodelV3.SubmodelDescriptor(id,
         endpoints);

      this.parseDescriptorV3(JSON, name, smDescObj);

      // administration [AdministrativeInformation] - (0-1)
      if (this.elementExists(jsonObj, "administration")) {
         var ai : metamodelV3.AdministrativeInformation =
         this.parseAdministrativeInformationV3(jsonObj.administration,
            "adminstration");
         smDescObj.setAdministration(ai);
      }

      // idShort [NameType -> String] - (0-1)
      if (this.elementExists(jsonObj, "idShort")) {
         var ids: types.NameType = this.parseNameTypeV3(jsonObj.idShort,
            "idShort");
         smDescObj.setIdShort(ids);
      }

      // semanticId [Reference] - (0-1)
      if (this.elementExists(jsonObj, "semanticId")) {
         var semId: types.Reference =
            this.parseReferenceV3(jsonObj.semanticId, "semanticId");
         smDescObj.setSemanticId(semId);
      }

      // supplementalSemanticId [Reference] - (0-n)
      if (this.testExtS(jsonObj, "supplementalSemanticId").getFirst()) {
         var ssida: types.ReferenceArray = this.parseArrayV3<types.Reference>(
            this.testExtS(jsonObj, "supplementalSemanticId").getSecond(),
            "supplementalSemanticIds", this.parseReferenceV3Simple);
         smDescObj.setSupplemantalSemanticIds(ssida);
      }
      return smDescObj;
   }

   parseEndpointV3(JSON: string, name: string):
         metamodelV3.Endpoint {
      var jsonObj: any = JSON;
      // protocolInformation [ProtocolInformation] - (1)
      var pi: metamodelV3.ProtocolInformation =
         this.parseProtocolInformationV3(jsonObj.protocolInformation,
         "protocolInformation");
      // interface [ShortIdType -> string] - (1)
      var interf: types.NameType = this.parseString<types.NameType>(
         jsonObj.interface, "interface");
      return new metamodelV3.Endpoint(pi, interf);
   }

   parseProtocolInformationV3(JSON: string, name: string):
         metamodelV3.ProtocolInformation {
      var jsonObj: any = JSON;
      // href [String 2048 -> string] - (1)
      var href: types.LocatorType = this.parseString<types.LocatorType>(
         jsonObj.href, "href");

      var piObj: metamodelV3.ProtocolInformation =
         new metamodelV3.ProtocolInformation(href);

      // endpointProtocol [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "endpointProtocol")) {
         var endProt: types.ShortIdType = this.parseString<types.ShortIdType>(
            jsonObj.endpointProtocol,"endpointProtocol");
         piObj.setEndpointProtocol(endProt);
      }
      // endpointProtocolVersion [LabelType -> string] - (0-1)
      if (this.testExtS(jsonObj, "endpointProtocolVersion").getFirst()) {
         var epva: types.LabelTypeArray = this.parseArrayV3<types.LabelType>(
            this.testExtS(jsonObj, "endpointProtocolVersion").getSecond(),
            "endpointProtocolVersions", this.parseString<types.LabelType>);
         piObj.setEndpointProtocolVersions(epva);
      }
      // subprotocol [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "subprotocol")) {
         var sp: types.ShortIdType = this.parseString<types.ShortIdType>(
            jsonObj.subprotocol, "subprotocol");
         piObj.setSubprotocol(sp);
      }
      // subprotocolBody [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "subprotocolBody")) {
         var spb: types.ShortIdType = this.parseString<types.ShortIdType>(
            jsonObj.subprotocolBody, "subprotocolBody");
            piObj.setSubprotocolBody(spb);
      }
      // subprotocolBodyEncoding [ShortIdType -> string] - (0-1)
      if (this.elementExists(jsonObj, "subprotocolBodyEncoding")) {
         var spbe: types.ShortIdType = this.parseString<types.ShortIdType>(
            jsonObj.subprotocolBodyEncoding, "subprotocolBodyEncoding");
         piObj.setSubprotocolBodyEncoding(spbe);
      }
      // securityAttributes [SecurityAttributeObject] - (1-n)
      if (this.testExtS(jsonObj, "securityAttribute").getFirst()) {
         var saa: types.SecurityAttributeObjectArray =
            this.parseArrayV3<metamodelV3.SecurityAttributeObject>(
            this.testExtS(jsonObj, "securityAttribute").getSecond(),
            "securityAttributes", this.parseSecurityAttributeObjectV3);
         piObj.setSecurityAttributes(saa);
      }
      return piObj;
   }

   parseSecurityAttributeObjectV3(JSON: string, name: string):
         metamodelV3.SecurityAttributeObject {
      var jsonObj: any = JSON;
      // type [SecurityTypeEnum -> string] - (1)
      var t: types.SecurityTypeEnum = this.parseSecurityTypeEnumV3(
         jsonObj.type, "type");
      // key [string] - (1)
      var k: string =  this.parseString(jsonObj.key, "key");
      // value [string] - (1)
      var v: string  = this.parseString(jsonObj.value, "value");
      return new metamodelV3.SecurityAttributeObject(t, k ,v);
   }

   parseSecurityTypeEnumV3(JSON: string, name: string):
      types.SecurityTypeEnum {
      var t: types.SecurityTypeEnum = JSON as types.SecurityTypeEnum;
      return t;
   }

   testExtS(JSON: string, s: string): util.Pair<boolean, string> {
      var jsonObj: any = JSON;
      if (this.elementExists(jsonObj, s))
         return new util.Pair<boolean, string>(true, jsonObj[s]);
      var s2 = s + "s";
      if (this.elementExists(jsonObj, s2))
         return new util.Pair<boolean, string>(true, jsonObj[s2]);
      return new util.Pair<boolean, string>(false, "");
   }

   getByURL(object, urlStr, onSuccess, onError) {
      if (!urlStr)
         return;
      urlStr = urlStr.replaceAll("#", "%23");
      var compound = new AjaxCallContext();
      compound.path = urlStr;
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

   copyParentURL(object) {
      if (!this.elementExists(object.parentObj, "tURL"))
         return false;
      var parentURL = object.parentObj.tURL;
      object.tURL = parentURL;
      return true;
   }
}
