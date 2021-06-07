"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataTypes;
(function (DataTypes) {
    DataTypes[DataTypes["None"] = 0] = "None";
    DataTypes[DataTypes["Alphanumeric"] = 1] = "Alphanumeric";
    DataTypes[DataTypes["AlphanumericMasked"] = 2] = "AlphanumericMasked";
    DataTypes[DataTypes["Date"] = 3] = "Date";
    DataTypes[DataTypes["Time"] = 4] = "Time";
    DataTypes[DataTypes["Numeric"] = 5] = "Numeric";
    DataTypes[DataTypes["YesNo"] = 6] = "YesNo";
    DataTypes[DataTypes["Memo"] = 7] = "Memo";
    DataTypes[DataTypes["DateTime"] = 8] = "DateTime";
    DataTypes[DataTypes["List"] = 9] = "List";
    DataTypes[DataTypes["Binary"] = 10] = "Binary";
    DataTypes[DataTypes["Autonumber"] = 11] = "Autonumber";
    DataTypes[DataTypes["Calculated"] = 12] = "Calculated";
    DataTypes[DataTypes["Image"] = 13] = "Image";
    DataTypes[DataTypes["Audio"] = 14] = "Audio";
    DataTypes[DataTypes["Video"] = 15] = "Video";
    DataTypes[DataTypes["BarCode"] = 16] = "BarCode";
    DataTypes[DataTypes["MultipleSelect"] = 17] = "MultipleSelect";
    DataTypes[DataTypes["TextBlock"] = 18] = "TextBlock";
    DataTypes[DataTypes["UniqueIdentifier"] = 19] = "UniqueIdentifier";
    DataTypes[DataTypes["Illustration"] = 20] = "Illustration";
    DataTypes[DataTypes["Enumeration"] = 21] = "Enumeration";
    DataTypes[DataTypes["Telephone"] = 22] = "Telephone";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
var DataCollectionObectTypes;
(function (DataCollectionObectTypes) {
    DataCollectionObectTypes[DataCollectionObectTypes["Questionaire"] = 0] = "Questionaire";
    DataCollectionObectTypes[DataCollectionObectTypes["Section"] = 1] = "Section";
    DataCollectionObectTypes[DataCollectionObectTypes["Question"] = 2] = "Question";
    DataCollectionObectTypes[DataCollectionObectTypes["SubSection"] = 3] = "SubSection";
    DataCollectionObectTypes[DataCollectionObectTypes["None"] = 4] = "None";
})(DataCollectionObectTypes = exports.DataCollectionObectTypes || (exports.DataCollectionObectTypes = {}));
var QuestionTypes;
(function (QuestionTypes) {
    QuestionTypes[QuestionTypes["None"] = 0] = "None";
    QuestionTypes[QuestionTypes["Closed"] = 1] = "Closed";
    QuestionTypes[QuestionTypes["Open"] = 2] = "Open";
    QuestionTypes[QuestionTypes["MultipleChoice"] = 3] = "MultipleChoice";
    QuestionTypes[QuestionTypes["Map"] = 4] = "Map";
    QuestionTypes[QuestionTypes["Other"] = 5] = "Other";
})(QuestionTypes = exports.QuestionTypes || (exports.QuestionTypes = {}));
var ObjectStates;
(function (ObjectStates) {
    ObjectStates[ObjectStates["None"] = 0] = "None";
    ObjectStates[ObjectStates["Removed"] = 1] = "Removed";
    ObjectStates[ObjectStates["Added"] = 2] = "Added";
    ObjectStates[ObjectStates["Modified"] = 3] = "Modified";
})(ObjectStates = exports.ObjectStates || (exports.ObjectStates = {}));
var Statuses;
(function (Statuses) {
    Statuses[Statuses["Template"] = 0] = "Template";
    Statuses[Statuses["New"] = 1] = "New";
    Statuses[Statuses["Partial"] = 2] = "Partial";
    Statuses[Statuses["Completed"] = 3] = "Completed";
    Statuses[Statuses["Suspended"] = 4] = "Suspended";
})(Statuses = exports.Statuses || (exports.Statuses = {}));
var CertificationTypes;
(function (CertificationTypes) {
    CertificationTypes[CertificationTypes["Organic"] = 0] = "Organic";
    CertificationTypes[CertificationTypes["FairTrade"] = 1] = "FairTrade";
    CertificationTypes[CertificationTypes["UTZ"] = 2] = "UTZ";
})(CertificationTypes = exports.CertificationTypes || (exports.CertificationTypes = {}));
var SyncDirection;
(function (SyncDirection) {
    SyncDirection[SyncDirection["None"] = 0] = "None";
    SyncDirection[SyncDirection["Up"] = 1] = "Up";
    SyncDirection[SyncDirection["Down"] = 2] = "Down";
    SyncDirection[SyncDirection["TwoWay"] = 3] = "TwoWay";
})(SyncDirection = exports.SyncDirection || (exports.SyncDirection = {}));
//# sourceMappingURL=enums.js.map