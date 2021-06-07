export enum DataTypes {
  None = 0,
  Alphanumeric = 1,
  AlphanumericMasked = 2,
  Date = 3,
  Time = 4,
  Numeric = 5,
  YesNo = 6,
  Memo = 7,
  DateTime = 8,
  List = 9,
  Binary = 10,
  Autonumber = 11,
  Calculated = 12,
  Image = 13,
  Audio = 14,
  Video = 15,
  BarCode = 16,
  MultipleSelect = 17,
  TextBlock = 18,
  UniqueIdentifier = 19,
  Illustration = 20,
  Enumeration = 21,
  Telephone = 22,
  Map = 23,
  Location = 24
}

export enum EnumListTypes
{
    Region,
    Question,
    Product,
    Price
}

export enum Actions
{
  Review = 0,
  Edit = 1,
  Delete = 2
}

export enum DataCollectionObectTypes {
  Section,
  Question,
  SubSection,
  None
}

export enum QuestionTypes {
  None,
  Closed,
  Open,
  MultipleChoice,
  Map,
  Location,
  Other
}

export enum ObjectStates {
  None = 0,
  Removed = 1,
  Added = 2,
  Modified = 3
}

export enum ObjectType
{
    Configuration = 0,
    Questionaire = 1,
    Section = 2,
    Subsection = 3,
    Purchase = 4,
    Certification = 5,
    Training = 6,
    Inspection = 7,
    Admin = 8,
    SuperAdmin = 9,
    None = 10
}

export enum PermissionObjects
{
    Questionaire,
    Section,
    SubSection,
    Question
}

export enum PermisionType
{
    None = 0,
    View = 1,
    Add = 2,
    Delete = 4,
    Edit = 8,
}

export enum Statuses {
  Template,
  New,
  Partial,
  Completed,
  Suspended
}

export enum CertificationTypes {
  Organic,
  FairTrade,
  UTZ
}

export enum SyncDirection {
  None = 0,
  Up,
  Down,
  TwoWay
}

export enum Plan
{
    Monthly,
    Quartely,
    Yearly
}

export enum PaymentStatus
{
  Pending,
  Paid
}

export enum TemplateType
{
  Questionaire,
  Certification,
  FieldInspection
}

export  enum ConfigurationTypes
{
    Agriculture,
    Health,
    Education,
    Energy,
    Audits
}

export enum UserStatus
{
    Active,
    Inactive
}
