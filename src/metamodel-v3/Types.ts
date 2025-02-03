/*
 * Copyright (c) 2024 Lenze SE
 * SPDX-License-Identifier: Apache-2.0
 */

import { interfaces } from "./exports.js";
import { util } from "./exports.js";

export module types {

   export type NameType = string; 
   export type Identifier = string;

   export type QualifierType = string;

   export type VersionType = string;
   export type RevisionType = string;

   export type LabelType = string;

   export type PathType = string;
   export type ContentType = string;

   export type BlobType = string;
   
   export type MessageTopicType = string;
   
   export type DateTime = string;
   export type Duration = string;

   export type MultiLanguageNameType = interfaces.MultiLanguageType;
   export type MultiLanguageTextType = interfaces.MultiLanguageType;

   export type MultiLangageEntry = util.Pair<string, string>;
   export type MultiLanguageArray = Array<MultiLangageEntry>;

   export type ExtensionArray = util.NamedArray<interfaces.Extension>;
   export type ValueDataType = string;

   export type ModelReference<T = interfaces.Referable> =
      interfaces.Reference;
   export type ExternalReference<T = interfaces.Referable> =
      interfaces.Reference;
   export type Reference = interfaces.Reference;

   export type ModelReferenceArray<T = interfaces.Referable> =
      util.NamedArray<ModelReference<T>>;
   export type ExternalReferenceArray<T = interfaces.Referable> =
      util.NamedArray<ExternalReference<T>>;
   export type ReferenceArray<T = interfaces.Referable> =
      util.NamedArray<Reference>;

   export type KeyArray = util.NamedArray<interfaces.Key>;

   export type QualifierArray = Array<interfaces.Qualifier>;

   export type SpecificAssetIdArray = Array<interfaces.SpecificAssetId>;

   export type SubmodelElementArray<T = interfaces.SubmodelElement> =
      util.NamedArray<T>;

   export type DataElementArray = util.NamedArray<interfaces.DataElement>;

   export type OperationVariableArray =
      util.NamedArray<interfaces.OperationVariable>;

   export type AssetAdministrationShellArray =
      util.NamedArray<interfaces.AssetAdministrationShell>;

   export type SubmodelArray = util.NamedArray<interfaces.Submodel>;

   export type ConceptDescriptionArray =
      util.NamedArray<interfaces.ConceptDescription>;

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
      Environment = "Environment",
      AssetAdministrationShell = "AssetAdministrationShell",
      ConceptDescription = "ConceptDescription",
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
      /* extra */
      MultiLanguageType = "MultiLanguageType",
      Array = "Array",
      /* extra Infrastructure */
      Submodels = "Submodels",
      SubmodelRoot = "SubmodelRoot",
      /* extra */
      Error = "InternalError",
      RegistryEnvironment = "RegistryEnvironment",
      AssetAdministrationShellRegistry = "AssetAdministrationShellRegistry",
      SubmodelRegistry = "SubmodelRegistry",
   }

   export enum AasSubmodelElements {
      AnnotatedRelationshipElement = metamodelType.AnnotatedRelationshipElement,
      BasicEventElement = metamodelType.BasicEventElement,
      Blob = metamodelType.Blob,
      Capability = metamodelType.Capability,
      DataElement = metamodelType.DataElement,
      Entity = metamodelType.Entity,
      EventElement = metamodelType.EventElement,
      File = metamodelType.File,
      MultiLanguageProperty = metamodelType.MultiLanguageProperty,
      Operation = metamodelType.Operation,
      Property = metamodelType.Property,
      Range = metamodelType.Range,
      ReferenceElement = metamodelType.ReferenceElement,
      RelationshipElement = metamodelType.RelationshipElement,
      SubmodelElement = metamodelType.SubmodelElement,
      SubmodelElementCollection = metamodelType.SubmodelElementCollection,
      SubmodelElementList = metamodelType.SubmodelElementList,
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


   /* Asset Admininstration Shell Part 2 */

   export type LocatorType = string;
   export type SchemeType = string;
   export type ShortIdType = string;
   export type TextType = string;

   export type LabelTypeArray = util.NamedArray<types.LabelType>;
   export type SecurityAttributeObjectArray =
      Array<interfaces.SecurityAttributeObject>;
   export type EndpointArray = util.NamedArray<interfaces.Endpoint>;
   export type SubmodelDescriptorsArray =
      util.NamedArray<interfaces.SubmodelDescriptor>;
   export type AssetAdministrationShellDescriptorArray =
      util.NamedArray<interfaces.AssetAdministrationShellDescriptor>;

   export enum SecurityTypeEnum {
      NONE = "NONE",
      RFC_TLSA = "RFC_TLSA",
      W3C_DID = "W3C_DID",
   }

}