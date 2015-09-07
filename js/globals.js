(function(angular) {
    // 'use strict';
    angular.module('IntelLearner').value('Globals', {
        CashedObjects: {},
        CurrentUser: {},
        get: function(id, type) {
            return this.CashedObjects[type + id];
        },
        set: function(obj) {
            this.CashedObjects[obj.type + obj.id] = obj;
        },
        clear: function(clearUser) {
            var CashedObjectsKeys = Object.keys(this.CashedObjects);
            for (var i = 0; i < CashedObjectsKeys.length; i++) {
                delete this.CashedObjects[CashedObjectsKeys[i]]; 
            }
            if(clearUser){
                this.CurrentUser = {};
                delete this.CurrentUser;
            }
        },
        allObjectsaved: function() {
            console.warn("allObjectsaved not implemented!");
            return true;
            // var isSaved = 1;
            // for(var i=0; i<this.CashedObjects.length; i++){
            // 	isSaved *= ((this.CashedObjects[i].inProgress)?0:1);
            // }
            // return isSaved;
        },
        pop: function(id, type) {
            var tempObj = this.CashedObjects[type + id];
            delete this.CashedObjects[type + id];
            return tempObj;
        },
        getMinimized: function(callback) {
            if (this.CurrentUser.id != undefined) {
                var dataToRetrun = [];
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for (var i = 0; i < CashedObjectsKeys.length; i++) {
                    if (this.CashedObjects[CashedObjectsKeys[i]].inProgress == false && (this.CashedObjects[CashedObjectsKeys[i]].type == "Delivery" || this.CashedObjects[CashedObjectsKeys[i]].type == "Kbit")){
                        dataToRetrun.push({
                            "UID": this.CashedObjects[CashedObjectsKeys[i]].id,
                            "TYPE": this.CashedObjects[CashedObjectsKeys[i]].type.toUpperCase(),
                            "CREATION_DATE": ngScope.toServerTime(this.CashedObjects[CashedObjectsKeys[i]].lastModified),
                        });
                    }
                }
                callback(dataToRetrun);
            } else {
                callback([]);
            }
        },
        getRecentObjects: function(type){
            
            if (this.CurrentUser.id != undefined) {
                var dataToRetrun = [];
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for (var i = 0; i < CashedObjectsKeys.length; i++) {
                    if(this.CashedObjects[CashedObjectsKeys[i]].type == type)
                        dataToRetrun.push(this.CashedObjects[CashedObjectsKeys[i]]);
                }
                return dataToRetrun;
            }else{
                return [];
            }
        },
        
        noLockedItems:function(){
            if(this.CashedObjects){
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for(var i=0; i<CashedObjectsKeys.length; i++){
                    if(this.CashedObjects[CashedObjectsKeys[i]].locked){
                        return fasle;
                    }
                }
             return true;
            }
        },

        updateUsedObjects: function(workspace){
            // loop on cashed objects and check if its in workflow

            // Check Terms
            var ChashedTerms = this.getRecentObjects("Term");
            for(var i=0; i<ChashedTerms.length; i++){
                var termInUse = false;
                for(var i2=0; i2<workspace.workflows.length; i2++){
                    for(var i3=0; i3<workspace.workflows[i2].tabs.length; i3++){
                        
                        // 1) In dataHolding.results                      || if results type Term
                        // 2) In dataHolding.results.terms                || if results type Delivery Or Kbit
                        // 3) In dataHolding.results.kBitsNeeded.terms    || if results type Delivery
                        // 4) In dataHolding.results.kBitsProvided.terms  || if results type Delivery
                        if(workspace.workflows[i2].tabs[i3].dataHolding && workspace.workflows[i2].tabs[i3].dataHolding.results){
                            for(var i4=0; i4<workspace.workflows[i2].tabs[i3].dataHolding.results.length; i4++){
                                if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].type == "Term"){
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].id == ChashedTerms[i].id){
                                        workspace.workflows[i2].tabs[i3].dataHolding.results[i4] = ChashedTerms[i];
                                        termInUse = true;
                                    }
                                }else{
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].terms){
                                        for(var i5=0; i5<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].terms.length; i5++){
                                            if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].terms[i5].id == ChashedTerms[i].id){
                                                workspace.workflows[i2].tabs[i3].dataHolding.results[i4].terms[i5] = ChashedTerms[i];
                                                termInUse = true;
                                            }
                                        }
                                    }
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].type == "Delivery"){
                                        if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded)
                                            for(var i5=0; i5<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded.length; i5++){
                                                if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5].terms)
                                                    for(var i6=0; i6<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5].terms.length; i6++){
                                                        if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5].terms[i6].id == ChashedTerms[i].id){
                                                            workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5].terms[i6] = ChashedTerms[i].id;
                                                            termInUse = true;
                                                        }
                                                    }
                                            }
                                        if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided)
                                            for(var i5=0; i5<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided.length; i5++){
                                                if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided[i5].terms)
                                                    for(var i6=0; i6<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided[i5].terms.length; i6++){
                                                        if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided[i5].terms[i6].id == ChashedTerms[i].id){
                                                            workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided[i5].terms[i6] = ChashedTerms[i].id;
                                                            termInUse = true;
                                                        }
                                                    }
                                            }
                                    }
                                }
                            }
                        }

                        // 5) In content                    || if content type Term
                        // 6) In content.terms              || if content type Delivery or Kbit
                        // 7) In content.kBitsNeeded        || if content type Delivery
                        // 8) In content.kBitsProvided      || if content type Delivery
                        if(workspace.workflows[i2].tabs[i3].content){
                            if(workspace.workflows[i2].tabs[i3].content.type == "Term"){
                                if(workspace.workflows[i2].tabs[i3].content.id == ChashedTerms[i].id){
                                    workspace.workflows[i2].tabs[i3].content = ChashedTerms[i];
                                    termInUse = true;
                                }
                            }else{
                                if(workspace.workflows[i2].tabs[i3].content.terms){
                                    for(var i4=0; i4<workspace.workflows[i2].tabs[i3].content.terms.length; i4++){
                                        if(workspace.workflows[i2].tabs[i3].content.terms[i4].id == ChashedTerms[i].id){
                                            workspace.workflows[i2].tabs[i3].content.terms[i4] = ChashedTerms[i];
                                            termInUse = true;
                                        }
                                    }
                                }
                                if(workspace.workflows[i2].tabs[i3].content.type == "Delivery"){
                                    if(workspace.workflows[i2].tabs[i3].content.kBitsNeeded)
                                        for(var i4=0; i4<workspace.workflows[i2].tabs[i3].content.kBitsNeeded.length; i4++){
                                            if(workspace.workflows[i2].tabs[i3].content.kBitsNeeded[i4].terms)
                                                for(var i5=0; i5<workspace.workflows[i2].tabs[i3].content.kBitsNeeded[i4].terms.length; i5++){
                                                    if(workspace.workflows[i2].tabs[i3].content.kBitsNeeded[i4].terms[i5].id == ChashedTerms[i].id){
                                                        workspace.workflows[i2].tabs[i3].content.kBitsNeeded[i4].terms[i5] = ChashedTerms[i].id;
                                                        termInUse = true;
                                                    }
                                                }
                                        }
                                    if(workspace.workflows[i2].tabs[i3].content.kBitsProvided)
                                        for(var i4=0; i4<workspace.workflows[i2].tabs[i3].content.kBitsProvided.length; i4++){
                                            if(workspace.workflows[i2].tabs[i3].content.kBitsProvided[i4].terms)
                                                for(var i5=0; i5<workspace.workflows[i2].tabs[i3].content.kBitsProvided[i4].terms.length; i5++){
                                                    if(workspace.workflows[i2].tabs[i3].content.kBitsProvided[i4].terms[i5].id == ChashedTerms[i].id){
                                                        workspace.workflows[i2].tabs[i3].content.kBitsProvided[i4].terms[i5] = ChashedTerms[i].id;
                                                        termInUse = true;
                                                    }
                                                }
                                        }
                                }
                            }
                        }
                    }
                }
                if(termInUse == false)
                    this.pop(ChashedTerms[i].id, ChashedTerms[i].type);
            }

            // Check Kbits
            var ChashedKbits = this.getRecentObjects("Kbit");
            for(var i=0; i<ChashedKbits.length; i++){
                var kbitInUse = false;
                for(var i2=0; i2<workspace.workflows.length; i2++){
                    for(var i3=0; i3<workspace.workflows[i2].tabs.length; i3++){

                        // 1) In dataHolding.results                || if results type Kbit
                        // 2) In dataHolding.results.kBitsNeeded    || if results type Delivery
                        // 3) In dataHolding.results.kBitsProvided  || if results type Delivery
                        if(workspace.workflows[i2].tabs[i3].dataHolding && workspace.workflows[i2].tabs[i3].dataHolding.results){
                            for(var i4=0; i4<workspace.workflows[i2].tabs[i3].dataHolding.results.length; i4++){
                                if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].type == "Kbit"){
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].id == ChashedKbits[i].id){
                                        workspace.workflows[i2].tabs[i3].dataHolding.results[i4] = ChashedKbits[i];
                                        kbitInUse = true;
                                    }
                                }else if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].type == "Delivery"){
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded){
                                        for(var i5=0; i5<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded.length; i5++){
                                            if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5].id == ChashedKbits[i].id){
                                                workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5] = ChashedKbits[i];
                                                kbitInUse = true;
                                            }
                                        }
                                    }
                                    debugger;
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided){
                                        for(var i5=0; i5<workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsProvided.length; i5++){
                                            if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5].id == ChashedKbits[i].id){
                                                workspace.workflows[i2].tabs[i3].dataHolding.results[i4].kBitsNeeded[i5] = ChashedKbits[i];
                                                kbitInUse = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        // 4) In content                            || if content type Kbit
                        // 5) In content.kBitsNeeded                || if content type Delivery
                        // 6) In content.kBitsProvided              || if content type Delivery
                        if(workspace.workflows[i2].tabs[i3].content){
                            if(workspace.workflows[i2].tabs[i3].content.type == "Kbit"){
                                if(workspace.workflows[i2].tabs[i3].content.id == ChashedKbits[i].id){
                                    workspace.workflows[i2].tabs[i3].content = ChashedKbits[i];
                                    kbitInUse = true;
                                }
                            }else if(workspace.workflows[i2].tabs[i3].content.type == "Delivery"){
                                if(workspace.workflows[i2].tabs[i3].content.kBitsNeeded){
                                    for(var i4=0; i4<workspace.workflows[i2].tabs[i3].content.kBitsNeeded.length; i4++){
                                        if(workspace.workflows[i2].tabs[i3].content.kBitsNeeded[i4].id == ChashedKbits[i].id){
                                            workspace.workflows[i2].tabs[i3].content.kBitsNeeded[i4] = ChashedKbits[i];
                                            kbitInUse = true;
                                        }
                                    }
                                }
                                if(workspace.workflows[i2].tabs[i3].content.kBitsProvided){
                                    for(var i4=0; i4<workspace.workflows[i2].tabs[i3].content.kBitsProvided.length; i4++){
                                        if(workspace.workflows[i2].tabs[i3].content.kBitsProvided[i4].id == ChashedKbits[i].id){
                                            workspace.workflows[i2].tabs[i3].content.kBitsProvided[i4] = ChashedKbits[i];
                                            kbitInUse = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if(kbitInUse == false)
                    this.pop(ChashedKbits[i].id, ChashedKbits[i].type);
            }

            // Check Delivery
            var ChashedDeliveries = this.getRecentObjects("Delivery");
            for(var i=0; i<ChashedDeliveries.length; i++){
                var deliveryInUse = false;
                for(var i2=0; i2<workspace.workflows.length; i2++){
                    for(var i3=0; i3<workspace.workflows[i2].tabs.length; i3++){
                        
                        // 1) In dataHolding.results                || if results type Delivery
                        if(workspace.workflows[i2].tabs[i3].dataHolding && workspace.workflows[i2].tabs[i3].dataHolding.results){
                            for(var i4=0; i4<workspace.workflows[i2].tabs[i3].dataHolding.results.length; i4++){
                                if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].type == "Delivery"){
                                    if(workspace.workflows[i2].tabs[i3].dataHolding.results[i4].id == ChashedDeliveries[i].id){
                                        workspace.workflows[i2].tabs[i3].dataHolding.results[i4] = ChashedDeliveries[i];
                                        deliveryInUse = true;
                                    }
                                }
                            }
                        }

                        // 2) In content                            || if content type Delivery
                        if(workspace.workflows[i2].tabs[i3].content){
                            if(workspace.workflows[i2].tabs[i3].content.type == "Delivery"){
                                if(workspace.workflows[i2].tabs[i3].content.id == ChashedDeliveries[i].id){
                                    workspace.workflows[i2].tabs[i3].content = ChashedDeliveries[i];
                                    deliveryInUse = true;
                                }
                            }
                        }
                    }
                }
                if(deliveryInUse == false)
                    this.pop(ChashedDeliveries[i].id, ChashedDeliveries[i].type);
            }
        },

        getAllObjectToJson: function(){
            var dataToRetrun = [];
            if (this.CurrentUser.id != undefined) {
                var CashedObjectsKeys = Object.keys(this.CashedObjects);
                for (var i = 0; i < CashedObjectsKeys.length; i++) {
                    dataToRetrun.push({
                        "id": this.CashedObjects[CashedObjectsKeys[i]].id,
                        "name": this.CashedObjects[CashedObjectsKeys[i]].name,
                        "kBitsNeeded": this.CashedObjects[CashedObjectsKeys[i]].kBitsNeeded,
                        "kBitsProvided": this.CashedObjects[CashedObjectsKeys[i]].kBitsProvided,
                        "terms": this.CashedObjects[CashedObjectsKeys[i]].terms,
                        "description": this.CashedObjects[CashedObjectsKeys[i]].description,
                        "url": this.CashedObjects[CashedObjectsKeys[i]].url,
                        "locked": this.CashedObjects[CashedObjectsKeys[i]].locked,
                        "lockedBy": this.CashedObjects[CashedObjectsKeys[i]].lockedBy,
                        "lastModified": this.CashedObjects[CashedObjectsKeys[i]].lastModified,
                        "inProgress": this.CashedObjects[CashedObjectsKeys[i]].inProgress,
                        "type": this.CashedObjects[CashedObjectsKeys[i]].type,
                        "termScope": this.CashedObjects[CashedObjectsKeys[i]].termScope,
                        "objectType": this.CashedObjects[CashedObjectsKeys[i]].objectType,
                        "progressWizard": this.CashedObjects[CashedObjectsKeys[i]].progressWizard,
                        "newData": this.CashedObjects[CashedObjectsKeys[i]].newData,
                        "revision": this.CashedObjects[CashedObjectsKeys[i]].revision
                    });
                }
            }
            return dataToRetrun;
        }
    })
    .value('TypeOf', {
        init: function() {
            Number.prototype.objectType = "number";
            Array.prototype.objectType = "array";
            String.prototype.objectType = "string";
            (function() {}).prototype.objectType = "function";
        },
        get: function(obj) {
            return obj.objectType;
        }
    })
    .value('ServerReq', "Not initialized")

    .value('Log', {

        logs: [],
        classFilter: {},
        Push: function(){
            //loop over function arguments
            var logArr = {};
            var argg = arguments;
            for(var i=0; i<argg.length; i++){
                if(i<=1){
                    //Class name
                    if(i==0){
                        logArr["Class"] = argg[i];
                    }
                    //function
                    if(i==1){
                        logArr["Function"] = argg[i];
                    }
                }else{
                    // message
                    if(typeof(argg[i]) == "string"){
                        logArr["Massege"+i.toString()] = "| " + argg[i] ;
                    }else{
                        if(typeof(argg[i]) == "object"){
                            logArr[i.toString()] = argg[i];
                        }
                    }
                }
            }
            this.logs.push(logArr);
        },

        showFilter: function(Class, func){
            if(!this.classFilter[Class])
                this.classFilter[Class] = {};
            this.classFilter[Class][func] = true;
            this.classFilter[Class].hideAllFiltersInClassFilter = false;
        },
        hideFilter: function(Class, func){
            if(func){
                if(this.classFilter[Class])
                    this.classFilter[Class][func] = false;
            }
            else{
                if(!this.classFilter[Class])
                    this.classFilter[Class] = {};
                this.classFilter[Class].hideAllFiltersInClassFilter = true;
            }
        },
        clearFilter: function(){
            classFilter = {};
        },
        // warning log
        i: function(){
            this.Push.apply(this, arguments);
            var arr = [];
            var arguments = [].slice.call(arguments);

            arr[0] = "%c("+(new Date()).format("HH:mm:ss.l")+")%c" + arguments[0].toUpperCase() + "%c" + arguments[1] + ":%c";
            arr[1] = "font-weight:100; color:rgba(0,0,0,.5);";
            arr[2] = "font-size:16px;font-weight:800;color: rgb(207,0,0);";
            arr[3] = "font-weight:400;color: rgb(8, 96, 168);";
            arr[4] = "color:black";
            arr = arr.concat(arguments.splice(2));
            if(!this.classFilter[arguments[0]] || (!this.classFilter[arguments[0]].hideAllFiltersInClassFilter && (!this.classFilter[arguments[0]] || this.classFilter[arguments[0]][arguments[1]] != false))){
                console.warn.apply(console, arr);
            }
        },

        // note log
        d: function(){
            this.Push(arguments);
            var arr = [];
            var arguments = [].slice.call(arguments);

            arr[0] = "%c("+(new Date()).format("HH:mm:ss.l")+")%c" + arguments[0].toUpperCase() + "%c" + arguments[1] + ":%c";
            arr[1] = "font-weight:100; color:rgba(0,0,0,.5);";
            arr[2] = "font-size:16px;font-weight:800;color: rgb(207,0,0);";
            arr[3] = "font-weight:400;color: rgb(8, 96, 168);";
            arr[4] = "color:black";
            arr = arr.concat(arguments.splice(2));
            if(!this.classFilter[arguments[0]] || (!this.classFilter[arguments[0]].hideAllFiltersInClassFilter && (!this.classFilter[arguments[0]] || this.classFilter[arguments[0]][arguments[1]] != false))){
                console.log.apply(console, arr);
            }
        },

        //error log
        e: function(){
            this.Push(arguments);
            var arr = [];
            var arguments = [].slice.call(arguments);

            arr[0] = "%c("+(new Date()).format("HH:mm:ss.l")+")%c" + arguments[0].toUpperCase() + "%c" + arguments[1] + ":%c";
            arr[1] = "font-weight:100; color:rgba(0,0,0,.5);";
            arr[2] = "font-size:16px;font-weight:800;color: rgb(207,0,0);";
            arr[3] = "font-weight:400;color: rgb(8, 96, 168);";
            arr[4] = "color:black";
            arr = arr.concat(arguments.splice(2));
            if(!this.classFilter[arguments[0]] || (!this.classFilter[arguments[0]].hideAllFiltersInClassFilter && (!this.classFilter[arguments[0]] || this.classFilter[arguments[0]][arguments[1]] != false))){
                console.error.apply(console, arr);
            }
        },

        sendToFile: function(){

        }

    })
    .value('$httpR', {

        protocol: "http",
        ip: "109.160.241.160",
        port: "8888",
        baseUrl: "/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/",

        // API function
        logIn: "USERlogIn",
        signUp: "USERsignUp",
        changePassword: "USERchangePassword",
        updateUser: "USERupdateUser",
        KBITremoveTerm: "KBITremoveTerm",
        KBITaddTermByUID: "KBITaddTermByUID",
        KVPsetKeyValuePair: "KVPsetKeyValuePair",
        KVPgetKeyValuePair: "KVPgetKeyValuePair",
        TERMsearchTerms: "TERMsearchTerms",
        DELIVERYsearchDelivery: "DELIVERYsearchDelivery",
        KBITsearchKbits: "KBITsearchKbits",
        TERMremoveTermToTermRelation: "TERMremoveTermToTermRelation",
        TERMgetAllTermsStrings: "TERMgetAllTermsStrings",
        TERMgetRelatedTerms: "TERMgetRelatedTerms",
        TERMaddTermToTermRelation: "TERMaddTermToTermRelation",
        KBITbeginEdit: "KBITbeginEdit",
        KBITcancelEdit: "KBITcancelEdit",
        KBITaddRelatedKbit: "KBITaddRelatedKbit",
        KBITremoveRelatedKbit: "KBITremoveRelatedKbit",
        DELIVERYbeginEdit: "DELIVERYbeginEdit",
        DELIVERYcancelEdit: "DELIVERYcancelEdit",
        DELIVERYpublish: "DELIVERYpublish",
        DELIVERYupdate: "DELIVERYupdate",
        DELIVERYaddRelatedDelivery: "DELIVERYaddRelatedDelivery",
        DELIVERYremoveRelatedDelivery: "DELIVERYremoveRelatedDelivery",
        DELIVERYaddTermByUID: "DELIVERYaddTermByUID",
        DELIVERYremoveTerm: "DELIVERYremoveTerm",
        DELIVERYaddRelatedKbit: "DELIVERYaddRelatedKbit",
        DELIVERYremoveRelatedKbit: "DELIVERYremoveRelatedKbit",
        USERlogout: "USERlogout",
        USERvalidateToken: "USERvalidateToken",
        DELIVERYaddNew: "DELIVERYaddNew",
        USERsaveProfilePicture: "USERsaveProfilePicture",
        DELIVERYupdateFullDelivery: "DELIVERYupdateFullDelivery",
        getLanguages: "getLanguages",
        REFRESHERgetData: "REFRESHERgetData",

        



        connectToServer: function(data, method, Globals, callback) {

            data.serverHash = "DAVIDAMEER";
            data.method = method;
            data.format = "json";
            if(Globals.CurrentUser && Globals.CurrentUser.id){
                data.Token = Globals.CurrentUser.token;
            }
            ngScope.Log.d("$httpR", "connectToServer","Request data:", {LogObject:data});
            // http://109.160.241.160:8888/mopdqwompoaskdqomdiasjdiowqe/server/webservice.php/
            $.ajax({
                // url: "http://testserver-radjybaba.rhcloud.com/webservice.php/",
                url: this.protocol+"://"+this.ip+":"+this.port+this.baseUrl,
                data: data,
                method: "POST",
                header:{
                    "Access-Control-Allow-Origin": "http://"+this.ip+":8888"
                },
                xhrFields: {
                    withCredentials: true
                },
                crossDomain : true,
                timeout: 10000,
                success: function(success) {
                    if (success.status == 200){
                        ngScope.Log.d("$httpR", "connectToServer","Success response data:", {LogObject:success});
                        callback(success.data, null);
                    }
                    else{
                        ngScope.Log.e("$httpR", "connectToServer","Error response", {LogObject:success});
                        if(success.status == 401){
                            ngScope.logout();
                        }
                        callback(null, success);
                    }
                },
                error: function(error) {
                    ngScope.Log.e("$httpR", "connectToServer","Error response", {LogObject:error});
                    if(error.status == 401){
                        ngScope.logout();
                    }
                    callback(null, error);
                }
            });
        }
    }).value('checkChangesInStepsAffectsOnlyNewData', function(content, after, before){

        /**********************************************************************************************************************/
        /* Get all changed values stored in object {changes:"status", value}, Modified by David to support this application. */
        /**********************************************************************************************************************/
        function diff(a, b) {
            if (a === b) {
                return {
                    changed: 'equal',
                    value: a
                }
            }
            var value = {};
            var equal = true;
            for (var key in a) {
                if (key in b) {
                    if (a[key] === b[key]) {} else {
                        var typeA = typeof a[key];
                        var typeB = typeof b[key];
                        if (a[key] && b[key] && (typeA == 'object' || typeA == 'function') && (typeB == 'object' || typeB == 'function')) {
                            var valueDiff = diff(a[key], b[key]);
                            if (valueDiff.changed == 'equal') {} else {
                                if(Object.keys(valueDiff.value) && Object.keys(valueDiff.value)[0] == "$$hashKey"){}
                                else
                                    if(key == "content"){
                                        var foundContent=false;
                                        for(var i=0; i<Object.keys(valueDiff.value).length; i++){
                                            if(Object.keys(valueDiff.value)[i]=="newData" || Object.keys(valueDiff.value)[i]=="progressWizard"){
                                                foundContent = true;
                                            }
                                        }
                                        if(foundContent){
                                            valueDiff.contentId = a.content.id;
                                            valueDiff.contentType = a.content.type;
                                            equal = false;
                                            value[key] = valueDiff;
                                        }else{
                                            equal = false;
                                            value[key] = valueDiff;    
                                        }
                                    }else if(key == "dataHolding"){
                                        if(valueDiff && valueDiff.value && valueDiff.value.results && valueDiff.value.results.value){
                                            if(Object.keys(valueDiff.value.results.value).length != undefined && Object.keys(valueDiff.value.results.value).length > 0){
                                                var mm = Object.keys(valueDiff.value.results.value);
                                                var mm1 = mm[0];
                                                var ss = a.dataHolding.results;
                                                var ss1 = ss[mm1];
                                                if(ss1 && ss1.id && ss1.type){
                                                    valueDiff.contentId = ss1.id;
                                                    valueDiff.contentType = ss1.type;
                                                }
                                            }
                                        }
                                        equal = false;
                                        value[key] = valueDiff;
                                    }else{
                                        equal = false;
                                        value[key] = valueDiff;
                                    }
                            }
                        } else {
                            equal = false;
                            value[key] = {
                                changed: 'primitive change',
                                removed: a[key],
                                added: b[key]
                            }
                        }
                    }
                } else {
                    equal = false;
                    value[key] = {
                        changed: 'removed',
                        value: a[key]
                    }
                }
            }
            for (key in b) {
                if (!(key in a)) {
                    equal = false;
                    value[key] = {
                        changed: 'added',
                        value: b[key]
                    }
                }
            }
            if (equal) {
                return {
                    changed: 'equal',
                    value: a
                }
            } else {
                return {
                    changed: 'object change',
                    value: value
                }
            }
        }
        
        /*************************************************************************/
        /* Get All changed pathes, Modified by David to support this application */
        /*************************************************************************/
        function objectToPaths(data) {
            var validId = /^[a-z_$][a-z0-9_$]*$/i;
            var result = [];
            doIt(data, "");
            return result;

            function doIt(data, s) {
                if (data && typeof data === "object") {
                    if (Array.isArray(data)) {
                        for (var i = 0; i < data.length; i++) {
                            doIt(data[i], s + "[" + i + "]");
                        }
                    } else {
                        for (var p in data) {
                            if (validId.test(p)) {
                                if(p != "$$hashKey"){
                                    if(p != "changed" && p != "removed" && p != "added" && p != "contentType" && p != "contentId"){
                                        if(data.contentId){
                                            doIt(data[p], s + "." + p+"(id="+data.contentId+"&type="+data.contentType+")");
                                        }
                                        else{
                                            doIt(data[p], s + "." + p);
                                        }
                                    }
                                    else {
                                        doIt(data[p], s);
                                    }
                                }
                            } else {
                                doIt(data[p], s + "[\"" + p + "\"]");
                            }
                        }
                    }
                } else {
                    if (data == "primitive change" || data == "added" || data == "removed"){
                        result.push(s);
                    }
                }
            }
        }

        /**************************************************************************/
        /* Get unique array values, Modified by David. Support only string values */
        /**************************************************************************/
        function getUniqueStringValues(array){var flags = {};var unique = [];for( i=0; i< array.length; i++) {if( flags[array[i]]) continue;flags[array[i]] = true;unique.push(array[i]);} return unique;}

        var diffData = diff(before, after);
        if(diffData.changed == "equal")
            return true;
        diffData = objectToPaths(diffData);
        diffData = getUniqueStringValues(diffData);
        for(var i=0; i<diffData.length; i++){
            var s = diffData[i];
            if(s.indexOf("(id=") != -1 && s.indexOf("&type=") != -1){
                var contentId = (s.substring(s.indexOf('(id=')+4)).substring(0,(s.substring(s.indexOf('(id=')+4)).indexOf('&'));
                var contentType = (s.substring(s.indexOf('&type=')+6)).substring(0,(s.substring(s.indexOf('&type=')+6)).indexOf(')'));
                if(content.id != contentId || content.type != contentType){
                    return false;
                }
            }else{
                return false;
            }
        }
        return true;

    }).value("getDiffSteps", function(before, after){
        function getDeletedInsertedByKey(e,t,n){var d={deleted:e.filter(function(e){for(var d=!1,r=0;r<t.length;r++)t[r][n]==e[n]&&(d=!0);return!d}),inserted:t.filter(function(t){for(var d=!1,r=0;r<e.length;r++)e[r][n]==t[n]&&(d=!0);return!d})};return 0==d.deleted.length&&0==d.inserted.length?null:0!=d.deleted.length&&0==d.inserted.length?{deleted:d.deleted}:0==d.deleted.length&&0!=d.inserted.length?{inserted:d.inserted}:d}
        function getSameObjectsByKey(t,e,n){return t.filter(function(t){return 0!=e.filter(function(e){return e[n]==t[n]}).length})}
        function makeIdsAsKeys(e,n){for(var r={},s=0;s<e.length;s++)r[e[s][n]]=e[s];return r}
        
        // var diffObject = {
        //  "affectsOnlyEditingData": true, // Check if steps save while editing content
        //  "contentId": 0,                 // Editing content id
        //  "workflows": {},                // Added or Removed workflows
        //  "workflowsKeys": [{             // Updated Workflows (selectedTab, tabs)
        //      "id": 0,                    // Updated Workflow ID
        //      "selectedTab": {            //  
        //          "before": 0,  
        //          "after": 1
        //      } 
        //      "tabs":[],                  // Added or Removed tabs
        //      "tabsKeys":[{               // Updated Tabs (title, Type, orderTab, color)
        //          "id": 0,                // Updated Workflow ID
        //          "name": {               //
        //              before:"",
        //              after:""
        //          },
        //          ...
        //          ...
        //          ...
        //          "content":{             // Added or Removed content 
        //              "inserted": {}
        //              "deleted": {}
        //          }
        //          "contentKeys":[{        // Updated Content (newData, progressWizard) Steps contains(id, type, newData, progressWizard)
        //              "id": 0,            // Updated Content ID
        //              
        //          }]
        //      }]
        //  }]

        // };
        

        // check workflows
        var diffObject = {};
        var affectsOnlyEditingData = true , contentId = -1, contentType = "";
        // check inserted deleted workflows
        var workflowsDiff = getDeletedInsertedByKey(before, after, "ID");
        if(workflowsDiff){
            diffObject.workflows = workflowsDiff;
            affectsOnlyEditingData = false;
        }


        // loop in same workflows
        var sameWorkflowsKeys = Object.keys(makeIdsAsKeys(getSameObjectsByKey(before, after, "ID"), "ID"));
        before = makeIdsAsKeys(before, "ID");
        after = makeIdsAsKeys(after, "ID");

        for(var i=0; i<sameWorkflowsKeys.length; i++){
            var changedWorkflow = {};
            // check selected tab
            if(before[sameWorkflowsKeys[i]].selectedTab.ID != after[sameWorkflowsKeys[i]].selectedTab.ID){
                changedWorkflow.selectedTab = {
                    "before": before[sameWorkflowsKeys[i]].selectedTab,
                    "after":after[sameWorkflowsKeys[i]].selectedTab
                };
                affectsOnlyEditingData = false;
            }

            // check inserted deleted tabs
            var beforeTabs = before[sameWorkflowsKeys[i]].tabs;
            var afterTabs = after[sameWorkflowsKeys[i]].tabs;
            var tabsDiff = getDeletedInsertedByKey(beforeTabs, afterTabs, "ID");
            if(tabsDiff){
                changedWorkflow.tabs = tabsDiff;
                affectsOnlyEditingData = false;
            }

            // loop in same tabs
            var sameTabsKeys = Object.keys(makeIdsAsKeys(getSameObjectsByKey(beforeTabs, afterTabs, "ID"), "ID"));
            beforeTabs = makeIdsAsKeys(beforeTabs, "ID");
            afterTabs = makeIdsAsKeys(afterTabs, "ID");

            for(var j=0; j<sameTabsKeys.length; j++){
                var changedTab = {};

                // check title
                if(beforeTabs[sameTabsKeys[j]].title != afterTabs[sameTabsKeys[j]].title){
                    changedTab.title = {
                        "before": beforeTabs[sameTabsKeys[j]].title,
                        "after":afterTabs[sameTabsKeys[j]].title
                    };
                    affectsOnlyEditingData = false;
                }

                // check Type
                if(beforeTabs[sameTabsKeys[j]].Type != afterTabs[sameTabsKeys[j]].Type){
                    changedTab.Type = {
                        "before": beforeTabs[sameTabsKeys[j]].Type,
                        "after":afterTabs[sameTabsKeys[j]].Type
                    };
                    affectsOnlyEditingData = false;
                }

                // check Type
                if(beforeTabs[sameTabsKeys[j]].orderTab != afterTabs[sameTabsKeys[j]].orderTab){
                    changedTab.orderTab = {
                        "before": beforeTabs[sameTabsKeys[j]].orderTab,
                        "after":afterTabs[sameTabsKeys[j]].orderTab
                    };
                    affectsOnlyEditingData = false;
                }

                // check Type
                if(beforeTabs[sameTabsKeys[j]].color != afterTabs[sameTabsKeys[j]].color){
                    changedTab.color = {
                        "before": beforeTabs[sameTabsKeys[j]].color,
                        "after":afterTabs[sameTabsKeys[j]].color
                    };
                    affectsOnlyEditingData = false;
                }


                // check content
                if(beforeTabs[sameTabsKeys[j]].content && afterTabs[sameTabsKeys[j]].content){
                    if(beforeTabs[sameTabsKeys[j]].content.id != afterTabs[sameTabsKeys[j]].content.id || beforeTabs[sameTabsKeys[j]].content.type != afterTabs[sameTabsKeys[j]].content.type ){
                        // content changed
                        changedTab.content = {
                            "deleted": beforeTabs[sameTabsKeys[j]].content,
                            "inserted": afterTabs[sameTabsKeys[j]].content
                        };
                        affectsOnlyEditingData = false;
                    }else if(beforeTabs[sameTabsKeys[j]].content.id == afterTabs[sameTabsKeys[j]].content.id && beforeTabs[sameTabsKeys[j]].content.type == afterTabs[sameTabsKeys[j]].content.type){
                        // check content keys
                        var contentChanged = {};
                        if(beforeTabs[sameTabsKeys[j]].content.type == "Delivery" || beforeTabs[sameTabsKeys[j]].content.type != "Kbit"){
                            
                            // check progressWizard if Delivery || Kbit
                            if(!angular.equals(beforeTabs[sameTabsKeys[j]].content.progressWizard, afterTabs[sameTabsKeys[j]].content.progressWizard)){
                                contentChanged.progressWizard = {
                                    "before": beforeTabs[sameTabsKeys[j]].content.progressWizard,
                                    "after": afterTabs[sameTabsKeys[j]].content.progressWizard
                                }
                            }
                            // check newData if Delivery || Kbit
                            if(!angular.equals(beforeTabs[sameTabsKeys[j]].content.newData, afterTabs[sameTabsKeys[j]].content.newData)){
                                contentChanged.newData = {
                                    "before": beforeTabs[sameTabsKeys[j]].content.newData,
                                    "after": afterTabs[sameTabsKeys[j]].content.newData
                                }
                            }

                            // check inProgress if Delivery || Kbit
                            if(!angular.equals(beforeTabs[sameTabsKeys[j]].content.inProgress, afterTabs[sameTabsKeys[j]].content.inProgress)){
                                contentChanged.inProgress = {
                                    "before": beforeTabs[sameTabsKeys[j]].content.inProgress,
                                    "after": afterTabs[sameTabsKeys[j]].content.inProgress
                                }
                            }
                        }

                        if(!$.isEmptyObject(contentChanged)){
                            contentId = ((beforeTabs[sameTabsKeys[j]].content.id)?beforeTabs[sameTabsKeys[j]].content.id:afterTabs[sameTabsKeys[j]].content.id);
                            contentType = ((beforeTabs[sameTabsKeys[j]].content.type)?beforeTabs[sameTabsKeys[j]].content.type:afterTabs[sameTabsKeys[j]].content.type);
                            contentChanged.contentId = contentId;
                            changedTab.contentKeys = contentChanged;
                        }
                    }

                }else if(beforeTabs[sameTabsKeys[j]].content){
                    // content deleted
                    changedTab.content = {
                        "deleted": beforeTabs[sameTabsKeys[j]].content
                    };
                    affectsOnlyEditingData = false;
                }else if(afterTabs[sameTabsKeys[j]].content){
                    // content inserted
                    changedTab.content = {
                        "inserted": afterTabs[sameTabsKeys[j]].content
                    };
                    affectsOnlyEditingData = false;
                }


                // check dataHolding

                if(!angular.equals(beforeTabs[sameTabsKeys[j]].dataHolding, afterTabs[sameTabsKeys[j]].dataHolding)){
                    changedTab.dataHolding = {
                        "deleted": beforeTabs[sameTabsKeys[j]].dataHolding,
                        "inserted": afterTabs[sameTabsKeys[j]].dataHolding
                    }
                }

                if(!$.isEmptyObject(changedTab)){
                    changedTab.tabId = sameTabsKeys[j];
                    if(changedWorkflow.tabsKeys)
                        changedWorkflow.tabsKeys.push(changedTab);
                    else
                        changedWorkflow.tabsKeys = [changedTab];
                }
            }

            if(!$.isEmptyObject(changedWorkflow)){
                changedWorkflow.workflowId = sameWorkflowsKeys[i];
                if(diffObject.workflowsKeys)
                    diffObject.workflowsKeys.push(changedWorkflow);
                else
                    diffObject.workflowsKeys = [changedWorkflow];
            }
        }

        if(!$.isEmptyObject(diffObject)){
            if(affectsOnlyEditingData){
                diffObject.affectsOnlyEditingData = affectsOnlyEditingData;
                diffObject.contentId = contentId;
                diffObject.contentType = contentType;
            }
        }

        return (!$.isEmptyObject(diffObject))?diffObject:null;
            
    }).value("objectServerToClient", function(serverObj){

        if(serverObj.FRONT_DELIVERY){
            // delevery
            return ngScope.deliveryServerToClient(serverObj);
        }else if(serverObj.FRONT_KBIT){
            // kbit
            return ngScope.kbitServerToClient(serverObj);
        }else if(serverObj.ID_TERM_MEAN){
            // term
            return ngScope.termServerToClient(serverObj);
        }

    }).value('deliveryServerToClient', function(serverObj){
        var tempJson = {
            "id": serverObj.UID,
            "name": serverObj.TITLE,
            "description": serverObj.DESCRIPTION,
            "url": serverObj.FRONT_DELIVERY.PATH,
            "revision": serverObj.REVISION,
            "lastModified": ngScope.fromServerTime(serverObj.CREATION_DATE),
            "type": "Delivery",
            "kBitsNeeded": [],
            "kBitsProvided": [],
            "terms": [],

        }
        if(serverObj.LOCKING_USER){
            tempJson.locked = true;
            tempJson.lockedBy = {
                "id": serverObj.LOCKING_USER.UID,
                "firstName": serverObj.LOCKING_USER.FIRST_NAME,
                "lastName": serverObj.LOCKING_USER.LAST_NAME,
                "username": serverObj.LOCKING_USER.USERNAME,
                "email": serverObj.LOCKING_USER.EMAIL,
                "profilePicture": serverObj.LOCKING_USER.PROFILE_PICTURE
            }
        }else{
            tempJson.locked = false;
        }
        if(serverObj.KBITS && serverObj.KBITS.NEEDED)
            for(var i=0; i<serverObj.KBITS.NEEDED.length; i++){
                tempJson.kBitsNeeded.push(ngScope.objectServerToClient(serverObj.KBITS.NEEDED[i]));
            }
        if(serverObj.KBITS && serverObj.KBITS.PROVIDED)
            for(var i=0; i<serverObj.KBITS.PROVIDED.length; i++){
                tempJson.kBitsProvided.push(ngScope.objectServerToClient(serverObj.KBITS.PROVIDED[i]));
            }
        if(serverObj.TERMS)
            for(var i=0; i<serverObj.TERMS.length; i++){
                tempJson.terms.push(ngScope.objectServerToClient(serverObj.TERMS[i]));
            }
        return tempJson;
    }).value('kbitServerToClient', function(serverObj){
        var tempJson = {
            "id": serverObj.UID,
            "name": serverObj.TITLE,
            "description": serverObj.DESCRIPTION,
            "url": serverObj.FRONT_KBIT.PATH,
            "type": "Kbit",
            "revision": serverObj.REVISION,
            "lastModified": ngScope.fromServerTime(serverObj.CREATION_DATE),
            "terms":[]
        }
        if(serverObj.LOCKING_USER){
            tempJson.locked = true;
            tempJson.lockedBy = {
                "id": serverObj.LOCKING_USER.UID,
                "firstName": serverObj.LOCKING_USER.FIRST_NAME,
                "lastName": serverObj.LOCKING_USER.LAST_NAME,
                "username": serverObj.LOCKING_USER.USERNAME,
                "email": serverObj.LOCKING_USER.EMAIL,
                "profilePicture": serverObj.LOCKING_USER.PROFILE_PICTURE
            }
        }else{
            tempJson.locked = false;
        }
        if(serverObj.TERMS)
            for(var i=0; i<serverObj.TERMS.length; i++){
                tempJson.terms.push(ngScope.objectServerToClient(serverObj.TERMS[i]));
            }
        return tempJson;
    }).value('termServerToClient', function(serverObj){
        var tempName={}, tempDescription={};
        tempDescription[Object.keys(serverObj.TERM_MEANING)[0]] = serverObj.TERM_MEANING[Object.keys(serverObj.TERM_MEANING)[0]];
        tempName[Object.keys(serverObj.TERM_STRING)[0]] = serverObj.TERM_STRING[Object.keys(serverObj.TERM_STRING)[0]];
        return {
            "id": serverObj.UID,
            "name": tempName,
            "description": tempDescription,
            "type": "Term",
            "termScope": {
                "id": serverObj.SCOPE_UID,
                "name": serverObj.SCOPE_TITLE,
                "description": serverObj.SCOPE_DESCRIPTION
            }
        };
    }).value('toServerTime', function(time){
        var date = new Date(time);
        return date.format("yyyy-dd-mm HH:MM:ss");
    }).value('fromServerTime', function(time){
        var year = time.substring(0,4);
        var month = time.substring(5,7);
        var day = time.substring(8,10);
        var hour = time.substring(11,13);
        var minute = time.substring(14,16);
        var second = time.substring(17,19);
        var date = new Date(year, (Number(month)-1), day, hour, minute, second);
        return date.getTime();
    }).value('defultFilters', function(){
        ngScope.Log.d("Log", "defultFilters", "Init defaultFilters.");
        ngScope.Log.hideFilter("LZMA");
        // ngScope.Log.hideFilter("$httpR");
        ngScope.Log.hideFilter("Storage");
        // ngScope.Log.hideFilter("User");
        ngScope.Log.hideFilter("Workflows");
        ngScope.Log.hideFilter("Workspace");
        ngScope.Log.hideFilter("Tab");
        ngScope.Log.hideFilter("Toast");
        // ngScope.Log.hideFilter("Content");
        // ngScope.Log.hideFilter("Steps");
        ngScope.Log.hideFilter("Server");
    });
})(window.angular);








