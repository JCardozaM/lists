sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "sap/ui/export/Spreadsheet",

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, History, Spreadsheet) {
        "use strict";

        return Controller.extend("list.controller.Details", {

            onInit: function () {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.getRoute("RouteDetails").attachPatternMatched(this._onObjectMatched, this);
            },
        
            _onObjectMatched: function (oEvent) {
                let oArgs = oEvent.getParameter("arguments"),
                    sCentro = oArgs.Centros;
                    
                this.getView().bindElement({
                    path: window.decodeURIComponent(sCentro)
                });
            },

            onNavBack: function (oEvent) {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteApp", {}, true);
                }

            },

            exportToExcel: function () {
                let oRowBinding, oSettings, oSheet, oTable;
                let aColumns = [];

                aColumns.push({
                    label: 'Order ID',
                    property: "OrdenId"
                });

                aColumns.push({
                    label: 'Weight',
                    property: "Weight"
                });

                aColumns.push({
                    label: 'Operation',
                    property: "Operation"
                });

                aColumns.push({
                    label: 'Notification',
                    property: "NotificationQty"
                });

                aColumns.push({
                    label: 'Unit',
                    property: "Unit1"
                });

                oTable = this.getView().byId("orderDetails"),
                oRowBinding = oTable.getBinding("items");

                oSettings = {
                    workbook: {
                        columns: aColumns,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Orders.xlsx'
                };

                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });

            }

        });
    });